import test from "node:test";
import assert from "node:assert/strict";
import { PublicCrawler } from "../src/collector/publicCrawler.js";

const logger = { info() {}, warn() {}, error() {}, debug() {} };
const config = {
  crawl: {
    maxRequestsPerRun: 100,
    maxRequestsPerMinute: 20,
    targetedCooldownMs: 1_800_000,
  },
};

test("crawler snapshots expose live request and completeness progress", () => {
  const crawler = new PublicCrawler({ config, store: {}, analytics: {}, logger });
  crawler.state = {
    ...crawler.state,
    status: "discovering",
    areasTotal: 10,
    areasCompleted: 4,
    queued: 100,
    successful: 75,
    failed: 2,
  };
  crawler.requestBudget = { snapshot: () => ({ total: 91, maxPerRun: 100 }) };
  const state = crawler.snapshot();
  assert.equal(state.requestBudget.total, 91);
  assert.equal(state.completeness.areaCoverage, 40);
  assert.equal(state.completeness.detailCoverage, 75);
  assert.equal(state.completeness.failedDetails, 2);
});

test("an early MongoDB failure produces a truthful failed crawler state", async () => {
  const saved = [];
  const store = {
    async readServiceState() { throw new Error("Mongo buffering timed out after 10000ms"); },
    async saveServiceState(value) { saved.push(value); },
  };
  const crawler = new PublicCrawler({ config, store, analytics: {}, logger });
  assert.equal(crawler.start().started, true);
  const state = await crawler.waitForCompletion();
  assert.equal(state.status, "failed");
  assert.equal(state.completeness.status, "failed");
  assert.match(state.error, /buffering timed out/);
  assert.equal(saved.at(-1).crawl.status, "failed");
});

test("targeted area jobs share the crawler lock and de-duplicate the same neighborhood", async () => {
  let release;
  const gate = new Promise((resolve) => { release = resolve; });
  const crawler = new PublicCrawler({ config, store: {}, analytics: {}, logger });
  crawler.runTargetedArea = async () => gate;

  const started = crawler.startAreaJob(1019);
  assert.equal(started.started, true);
  assert.equal(started.job.area.slug, "atabak");
  assert.equal(crawler.currentRunKind, "targeted-area");

  const duplicate = crawler.startAreaJob(1019);
  assert.equal(duplicate.started, false);
  assert.equal(duplicate.deduplicated, true);
  assert.equal(duplicate.job.jobId, started.job.jobId);

  const otherArea = crawler.startAreaJob(992);
  assert.equal(otherArea.reason, "crawler-busy");
  const fullCrawl = crawler.start();
  assert.equal(fullCrawl.reason, "targeted-area-job-running");

  release();
  await crawler.waitForCompletion();
  assert.equal(crawler.currentRunKind, null);
});

test("targeted area jobs reject unknown areas and honor the completion cooldown", () => {
  const crawler = new PublicCrawler({ config, store: {}, analytics: {}, logger });
  assert.equal(crawler.startAreaJob(999999).reason, "area-not-found");
  const recent = {
    jobId: "recent-atabak", area: { id: 1019, name: "اتابک", slug: "atabak" },
    status: "completed", endedAt: new Date().toISOString(),
  };
  crawler.rememberAreaJob(recent);
  const result = crawler.startAreaJob(1019);
  assert.equal(result.started, false);
  assert.equal(result.reason, "area-job-cooldown");
  assert.equal(result.job.jobId, recent.jobId);
});

test("a full crawl accepts a bounded neighborhood priority without starting another crawler", () => {
  const crawler = new PublicCrawler({
    config: { crawl: { ...config.crawl, targetedQueueLimit: 2 } },
    store: {}, analytics: {}, logger,
  });
  crawler.currentPromise = new Promise(() => {});
  crawler.currentRunKind = "full";

  const accepted = crawler.startAreaJob(1019);
  assert.equal(accepted.started, false);
  assert.equal(accepted.accepted, true);
  assert.equal(accepted.queued, true);
  assert.equal(accepted.job.status, "queued");
  assert.equal(crawler.priorityAreaJobIds.length, 1);

  const duplicate = crawler.startAreaJob(1019);
  assert.equal(duplicate.deduplicated, true);
  assert.equal(crawler.priorityAreaJobIds.length, 1);

  const promoted = crawler.takePriorityAreaJob();
  assert.equal(promoted.jobId, accepted.job.jobId);
  assert.equal(crawler.priorityAreaJobIds.length, 0);
  assert.equal(crawler.currentPromise instanceof Promise, true);
});
