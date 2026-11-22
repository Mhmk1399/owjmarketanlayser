import test from "node:test";
import assert from "node:assert/strict";
import { createAnalyticsServer } from "../src/api/server.js";

const operatorToken = "test-operator-token-000000000000000";
const auth = { authorization: `Bearer ${operatorToken}` };

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
    config: { paths: {}, security: { operatorToken } },
    store: { getListings: () => [] },
    analytics: {}, crawler,
    logger: { info() {}, warn() {}, error() {} },
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;

  const started = await fetch(`${origin}/area-crawl-jobs`, {
    method: "POST",
    headers: { "content-type": "application/json", ...auth },
    body: JSON.stringify({ areaId: 1019 }),
  });
  assert.equal(started.status, 202);
  assert.equal((await started.json()).job.jobId, "area-job-one");

  const status = await fetch(`${origin}/area-crawl-jobs/area-job-one`, { headers: auth });
  assert.equal(status.status, 200);
  assert.equal((await status.json()).job.area.slug, "atabak");

  const invalid = await fetch(`${origin}/area-crawl-jobs`, {
    method: "POST",
    headers: { "content-type": "application/json", ...auth },
    body: JSON.stringify({ areaId: "not-a-number" }),
  });
  assert.equal(invalid.status, 400);
});

test("collection history API returns bounded timelines and keeps candidate identity unresolved", async (t) => {
  const server = createAnalyticsServer({
    config: { paths: {}, security: { operatorToken } }, analytics: {}, crawler: {},
    store: {
      async listingHistory(token, options) {
        assert.equal(token, "sample-ad");
        assert.equal(options.limit, 100);
        return [{ token, type: "new-listing" }];
      },
      async listingObservations() { return [{ type: "created", price: 1000 }]; },
      async propertyLinks() { return [{ status: "candidate", relation: "repost" }]; },
    },
    logger: { info() {}, warn() {}, error() {} },
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const response = await fetch(`${origin}/listings/sample-ad/history?limit=10000`, { headers: auth });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.propertyIdentity, "unresolved");
  assert.equal(body.observations[0].price, 1000);
  assert.equal((await fetch(`${origin}/listings/sample-ad/history?before=not-a-date`, { headers: auth })).status, 400);
});
