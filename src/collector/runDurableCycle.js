import { refreshDecision } from "./listingPolicy.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const stageFor = (candidate) => candidate?.work === "new-detail"
  ? { stage: "details", stagePriority: 200 }
  : { stage: "enrichment", stagePriority: 100 };

export function cycleProgress(jobs) {
  const candidates = jobs.flatMap((job) => job.candidates || []);
  // A token can appear in adjacent search areas. Metrics count advertisements,
  // never individual search hits and never inferred unique apartments.
  const unique = new Map();
  for (const item of candidates) {
    const before = unique.get(item.token);
    if (!before || before.outcome === "pending" || before.outcome === "failed") unique.set(item.token, item);
  }
  const rows = [...unique.values()];
  return {
    areasTotal: jobs.length,
    areasCompleted: jobs.filter((job) => job.discoveryComplete).length,
    discovered: rows.length, queued: rows.length,
    processed: rows.filter((item) => item.outcome !== "pending").length,
    successful: rows.filter((item) => !["pending", "failed"].includes(item.outcome)).length,
    failed: rows.filter((item) => item.outcome === "failed").length,
    newListings: rows.filter((item) => item.outcome === "new-listing").length,
    refreshedListings: rows.filter((item) => item.outcome === "refreshed").length,
    unchangedListings: rows.filter((item) => item.outcome === "unchanged").length,
    confirmedListings: rows.filter((item) => item.outcome === "confirmed").length,
    skippedFresh: rows.filter((item) => item.outcome === "confirmed").length,
    changed: rows.filter((item) => item.changed).length,
    enrichmentPending: rows.filter((item) => item.outcome === "pending" && item.work !== "new-detail").length,
  };
}

// Only minimal, allowlisted discovery references cross this checkpoint boundary.
// Each detail is committed before its cursor advances. A crash can replay one
// idempotent listing upsert, but cannot lose the remainder of an area.
export async function runDurableCycle({
  queue, cycle, owner, search, detail, confirm, existing,
  shouldStop = () => false, onProgress = async () => {},
  freshness = {}, maxAttempts = 3, retryBaseMs = 1_000, wait = sleep,
}) {
  const cached = new Map((await queue.cycleJobs(cycle.cycleId)).map((job) => [job.jobId, job]));
  const completedByToken = new Map([...cached.values()].flatMap((job) => job.candidates || [])
    .filter((item) => !["pending", "failed"].includes(item.outcome)).map((item) => [item.token, item]));
  const report = async (job) => {
    if (job) {
      cached.set(job.jobId, job);
      for (const item of job.candidates || []) {
        if (!["pending", "failed"].includes(item.outcome)) completedByToken.set(item.token, item);
      }
    }
    await onProgress(cycleProgress([...cached.values()]), job);
  };
  await report();
  while (!shouldStop()) {
    const job = await queue.claim(cycle.cycleId, owner);
    if (!job) {
      const jobs = await queue.cycleJobs(cycle.cycleId);
      for (const item of jobs) cached.set(item.jobId, item);
      if (!jobs.some((item) => ["queued", "running"].includes(item.status))) break;
      await wait(5_000);
      continue;
    }
    let operationComplete = false;
    try {
      if (job.stage === "discovery") {
        const result = await search(job.area, job.limit);
        operationComplete = true;
        const unique = new Map();
        for (const found of result.listings) {
          if (!/^[A-Za-z0-9_-]+$/.test(String(found.token || ""))) continue;
          const record = await existing(found.token);
          unique.set(found.token, {
            token: found.token,
            work: !record ? "new-detail" : refreshDecision(record, freshness).refresh ? "refresh" : "confirm",
            outcome: "pending", attempts: 0, changed: false,
          });
          if (unique.size >= job.limit) break;
        }
        job.candidates = [...unique.values()].sort((a, b) => Number(b.work === "new-detail") - Number(a.work === "new-detail"));
        const fields = {
          candidates: job.candidates, discoveryComplete: true,
          stopReason: result.stopReason, cursor: 0, attempts: 0, errorCode: null,
          ...stageFor(job.candidates[0]),
          status: job.candidates.length ? "queued" : "completed",
          endedAt: job.candidates.length ? null : new Date(),
          leaseOwner: null, leaseUntil: null,
        };
        await queue.checkpoint(job, owner, fields);
        Object.assign(job, fields);
      } else {
        const item = job.candidates[job.cursor];
        if (!item) throw Object.assign(new Error("Invalid detail checkpoint"), { code: "invalid-detail-checkpoint" });
        const previousResult = completedByToken.get(item.token);
        if (previousResult) {
          operationComplete = true;
          item.outcome = previousResult.outcome;
          item.changed = previousResult.changed;
        } else if (item.work === "confirm") {
          operationComplete = true;
          await confirm(item.token);
          item.outcome = "confirmed";
        } else {
          const result = await detail({
            token: item.token, url: `https://divar.ir/v/${item.token}`,
            category: "buy-apartment", expectedSubcategory: "buy-residential-apartment", area: job.area,
          });
          if (!result.success) throw result.error || new Error("Detail extraction failed");
          operationComplete = true;
          item.outcome = item.work === "new-detail" ? "new-listing" : result.changed ? "refreshed" : "unchanged";
          item.changed = Boolean(result.changed);
        }
        job.cursor += 1;
        const done = job.cursor >= job.candidates.length;
        const fields = {
          candidates: job.candidates, cursor: job.cursor, attempts: 0, errorCode: null,
          status: done ? "completed" : "queued", endedAt: done ? new Date() : null,
          ...stageFor(job.candidates[job.cursor]), leaseOwner: null, leaseUntil: null,
        };
        await queue.checkpoint(job, owner, fields);
        Object.assign(job, fields);
      }
      await report(job);
    } catch (error) {
      // Storage/progress failures after a successful public operation are not
      // evidence that another ad failed. Leave the durable cursor recoverable.
      if (operationComplete || error.code === "invalid-detail-checkpoint") throw error;
      if ([403, 429].includes(error.status) || ["request-budget-exhausted", "crawl-lease-lost"].includes(error.code)) throw error;
      const terminal = job.attempts >= maxAttempts;
      const errorCode = /^[a-z0-9-]{1,100}$/i.test(error.code || "") ? error.code : "public-operation-failed";
      if (terminal && job.stage !== "discovery") {
        const item = job.candidates[job.cursor];
        item.outcome = "failed";
        item.attempts = job.attempts;
        job.cursor += 1;
        const done = job.cursor >= job.candidates.length;
        const fields = {
          candidates: job.candidates, cursor: job.cursor, attempts: 0, errorCode,
          status: done ? "completed" : "queued", endedAt: done ? new Date() : null,
          ...stageFor(job.candidates[job.cursor]), leaseOwner: null, leaseUntil: null,
        };
        await queue.checkpoint(job, owner, fields);
        Object.assign(job, fields);
        await report(job);
        continue;
      }
      await queue.retry(job, owner, errorCode, {
        terminal, delayMs: Math.round(Math.min(60_000, retryBaseMs * 2 ** Math.min(job.attempts - 1, 5))
          * (0.75 + Math.random() * 0.5)),
      });
      job.status = terminal ? "failed" : "queued";
      job.errorCode = errorCode;
      // A terminal detail failure is retained and other areas still progress.
      // Pending entries remain explicitly unprocessed rather than successes.
      await report(job);
    }
  }
  const jobs = await queue.cycleJobs(cycle.cycleId);
  return {
    jobs,
    progress: cycleProgress(jobs),
    pending: jobs.some((job) => ["queued", "running"].includes(job.status)),
    // A partial/failed detail pass is not reliable evidence of disappearance.
    lifecycleAreaIds: jobs.filter((job) => job.status === "completed" && job.stopReason === "source-exhausted"
      && !job.candidates.some((item) => ["failed", "pending"].includes(item.outcome)))
      .map((job) => job.area.id),
    observedTokens: [...new Set(jobs.flatMap((job) => (job.candidates || []).map((item) => item.token)))],
  };
}
