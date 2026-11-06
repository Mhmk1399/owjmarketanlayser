import test from "node:test";
import assert from "node:assert/strict";
import { createAnalyticsServer } from "../src/api/server.js";

test("area crawl API starts and reports a bounded neighborhood job", async (t) => {
  const jobs = new Map();
  const crawler = {
    startAreaJob(areaId) {
      assert.equal(areaId, 1019);
      const job = {
        jobId: "area-job-one",
        area: { id: 1019, name: "اتابک", slug: "atabak" },
        status: "starting",
      };
      jobs.set(job.jobId, job);
      return { started: true, job };
    },
    getAreaJob(jobId) { return jobs.get(jobId) || null; },
  };
  const server = createAnalyticsServer({
    config: { paths: {} },
    store: { getListings: () => [] },
    analytics: {}, crawler,
    logger: { info() {}, warn() {}, error() {} },
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;

  const started = await fetch(`${origin}/area-crawl-jobs`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ areaId: 1019 }),
  });
  assert.equal(started.status, 202);
  assert.equal((await started.json()).job.jobId, "area-job-one");

  const status = await fetch(`${origin}/area-crawl-jobs/area-job-one`);
  assert.equal(status.status, 200);
  assert.equal((await status.json()).job.area.slug, "atabak");

  const invalid = await fetch(`${origin}/area-crawl-jobs`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ areaId: "not-a-number" }),
  });
  assert.equal(invalid.status, 400);
});
