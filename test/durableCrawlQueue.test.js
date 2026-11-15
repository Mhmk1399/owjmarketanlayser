import test from "node:test";
import assert from "node:assert/strict";
import { runDurableCycle, cycleProgress } from "../src/collector/runDurableCycle.js";
import { DurableCrawlQueue, publicAreaJob, queuePartition } from "../src/collector/durableCrawlQueue.js";
import { AreaCrawlJob, CrawlCycle } from "../src/models/crawlJob.js";

const clone = (value) => structuredClone(value);
const area = (id) => ({ id, name: `محله ${id}`, slug: `area-${id}` });
const cycle = { cycleId: "cycle-one" };

// Port fixture represents persisted documents, shared by fresh runner instances.
class QueueFixture {
  constructor(ids = [1, 2]) {
    this.rows = ids.map((id) => ({ jobId: `job-${id}`, cycleId: cycle.cycleId,
      area: area(id), limit: 3, stage: "discovery", stagePriority: 300,
      status: "queued", cursor: 0, candidates: [], attempts: 0,
      discoveryComplete: false, priority: 0 }));
  }
  async cycleJobs() { return clone(this.rows); }
  async claim() {
    const row = this.rows.filter((item) => item.status === "queued")
      .sort((a, b) => b.stagePriority - a.stagePriority || b.priority - a.priority)[0];
    if (!row) return null;
    row.status = "running";
    row.attempts += 1;
    return clone(row);
  }
  async checkpoint(job, owner, fields) {
    Object.assign(this.rows.find((row) => row.jobId === job.jobId), clone(fields));
  }
  async retry(job, owner, errorCode, { terminal }) {
    Object.assign(this.rows.find((row) => row.jobId === job.jobId), {
      status: terminal ? "failed" : "queued", errorCode,
    });
  }
  recover() { for (const row of this.rows) if (row.status === "running") row.status = "queued"; }
}

function options(queue, overrides = {}) {
  return { queue, cycle, owner: "worker", existing: async () => null,
    search: async (item) => ({ listings: [{ token: `token-${item.id}` }], stopReason: "source-exhausted" }),
    detail: async () => ({ success: true, changed: true }),
    confirm: async () => {}, wait: async () => {}, onProgress: async () => {}, ...overrides };
}

test("all neighborhood discovery precedes new details, which precede routine enrichment", async () => {
  const queue = new QueueFixture();
  const order = [];
  const result = await runDurableCycle(options(queue, {
    search: async (item) => {
      order.push(`discover-${item.id}`);
      return { listings: [{ token: `token-${item.id}`, contact: { phone: "unsafe-fixture" } }], stopReason: "source-exhausted" };
    },
    existing: async (token) => token === "token-1" ? {
      lifecycle: { status: "active", detailFetchedAt: "2020-01-01T00:00:00.000Z" },
    } : null,
    detail: async (listing) => { order.push(`detail-${listing.token}`); return { success: true, changed: true }; },
  }));
  assert.deepEqual(order, ["discover-1", "discover-2", "detail-token-2", "detail-token-1"]);
  assert.equal(result.progress.newListings, 1);
  assert.equal(result.progress.refreshedListings, 1);
  assert.equal(result.pending, false);
  assert.doesNotMatch(JSON.stringify(queue.rows), /contact|phone|unsafe-fixture/);
});

test("restart resumes a discovered area and its detail cursor without losing pending ads", async () => {
  const queue = new QueueFixture([1]);
  const searched = [];
  const written = new Set();
  let crash = true;
  const checkpoint = queue.checkpoint.bind(queue);
  queue.checkpoint = async (job, owner, fields) => {
    if (crash && fields.cursor === 1) {
      crash = false;
      throw Object.assign(new Error("worker died after durable listing commit"), { code: "crawl-lease-lost" });
    }
    return checkpoint(job, owner, fields);
  };
  const settings = options(queue, {
    search: async () => { searched.push(1); return {
      listings: [{ token: "first" }, { token: "second" }], stopReason: "source-exhausted",
    }; },
    detail: async ({ token }) => { written.add(token); return { success: true, changed: true }; },
  });
  await assert.rejects(runDurableCycle(settings), /worker died/);
  assert.equal(queue.rows[0].cursor, 0);
  queue.recover();
  const resumed = await runDurableCycle(settings);
  assert.equal(searched.length, 1);
  assert.deepEqual([...written], ["first", "second"]);
  assert.equal(resumed.progress.newListings, 2);
  assert.equal(resumed.progress.successful, 2);
});

test("request-budget interruption leaves work resumable and does not exhaust recovery attempts", async () => {
  const queue = new QueueFixture();
  await assert.rejects(runDurableCycle(options(queue, {
    search: async ({ id }) => {
      if (id === 2) throw Object.assign(new Error("budget exhausted"), { code: "request-budget-exhausted" });
      return { listings: [{ token: "one" }], stopReason: "source-exhausted" };
    },
  })), /budget exhausted/);
  assert.equal(queue.rows[0].discoveryComplete, true);
  assert.equal(queue.rows[1].status, "running");
  queue.recover();
  const resumed = await runDurableCycle(options(queue));
  assert.equal(resumed.pending, false);
  assert.equal(resumed.progress.successful, 2);
});

test("terminal detail failure does not block other ads and cannot authorize lifecycle removal", async () => {
  const queue = new QueueFixture([1]);
  let attempts = 0;
  const result = await runDurableCycle(options(queue, {
    search: async () => ({ listings: [{ token: "bad" }, { token: "good" }], stopReason: "source-exhausted" }),
    detail: async ({ token }) => {
      if (token === "bad") { attempts += 1; return { success: false, error: new Error("temporary failure") }; }
      return { success: true, changed: true };
    },
  }));
  assert.equal(attempts, 3);
  assert.equal(result.progress.successful, 1);
  assert.equal(result.progress.failed, 1);
  assert.deepEqual(result.lifecycleAreaIds, []);
  assert.equal(publicAreaJob(result.jobs[0]).status, "failed");
});

test("fresh confirmations are separate from fetched and changed listings", async () => {
  const queue = new QueueFixture([1]);
  const confirmed = [];
  const result = await runDurableCycle(options(queue, {
    existing: async () => ({ lifecycle: { status: "active", detailFetchedAt: new Date().toISOString() } }),
    detail: async () => { throw new Error("fresh listing must not fetch details"); },
    confirm: async (token) => { confirmed.push(token); },
  }));
  assert.equal(confirmed.length, 1);
  assert.equal(result.progress.confirmedListings, 1);
  assert.equal(result.progress.refreshedListings, 0);
  assert.equal(result.progress.newListings, 0);
});

test("area metrics deduplicate ads across neighboring search partitions", () => {
  const candidate = { token: "same-ad", outcome: "new-listing", changed: true };
  const progress = cycleProgress([{ discoveryComplete: true, candidates: [candidate] }, { discoveryComplete: true, candidates: [candidate] }]);
  assert.equal(progress.discovered, 1);
  assert.equal(progress.newListings, 1);
  assert.equal(progress.areasCompleted, 2);
});

test("the same token discovered in two areas is fetched only once per cycle", async () => {
  const queue = new QueueFixture();
  let fetched = 0;
  const result = await runDurableCycle(options(queue, {
    search: async () => ({ listings: [{ token: "shared-ad" }], stopReason: "source-exhausted" }),
    detail: async () => { fetched += 1; return { success: true, changed: true }; },
  }));
  assert.equal(fetched, 1);
  assert.equal(result.progress.discovered, 1);
  assert.equal(result.progress.newListings, 1);
});

test("expired owners cannot overwrite checkpoints", async () => {
  let received;
  const queue = new DurableCrawlQueue({ jobModel: { async updateOne(filter) {
    received = filter; return { matchedCount: 0 };
  } } });
  await assert.rejects(queue.checkpoint({ jobId: "one" }, "expired-worker", { cursor: 9 }), /lease was lost/);
  assert.equal(received.leaseOwner, "expired-worker");
  assert.ok(received.leaseUntil.$gt instanceof Date);
});

test("a database checkpoint failure cannot mark the following advertisement failed", async () => {
  const queue = new QueueFixture([1]);
  const checkpoint = queue.checkpoint.bind(queue);
  queue.checkpoint = async (job, owner, fields) => {
    if (fields.cursor === 1) throw new Error("database temporarily unavailable");
    return checkpoint(job, owner, fields);
  };
  await assert.rejects(runDurableCycle(options(queue, {
    search: async () => ({ listings: [{ token: "first" }, { token: "next" }], stopReason: "source-exhausted" }),
  })), /database temporarily unavailable/);
  assert.equal(queue.rows[0].cursor, 0);
  assert.equal(queue.rows[0].candidates[1].outcome, "pending");
});

test("strict durable schemas bound candidates and discard no arbitrary payload silently", async () => {
  const job = new AreaCrawlJob({ jobId: "one", cycleId: "cycle", area: area(1), limit: 15,
    requestedAt: new Date(), availableAt: new Date(), candidates: [{ token: "safe", work: "new-detail" }] });
  await job.validate();
  assert.throws(() => new AreaCrawlJob({ ...job.toObject(), credentials: "forbidden" }), /strict mode/i);
  job.candidates = Array.from({ length: 101 }, (_, i) => ({ token: `t-${i}`, work: "new-detail" }));
  await assert.rejects(job.validate(), /candidates/);
  assert.ok(CrawlCycle.schema.indexes().some(([keys, opts]) => keys.scope === 1 && opts.unique && opts.partialFilterExpression.status === "active"));
  assert.equal(queuePartition({ area: { ...area(1), contact: "drop" }, limit: 1000 }).limit, 100);
});
