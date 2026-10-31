import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import os from "node:os";
import { randomUUID } from "node:crypto";
import { createAnalyticsServer } from "../src/api/server.js";

test("data quality navigation serves the app while JSON clients retain their API", async (t) => {
  const directory = path.join(os.tmpdir(), `owj-navigation-${randomUUID()}`);
  const server = createAnalyticsServer({
    config: {
      paths: {
        scoredListings: path.join(directory, "scored-listings.json"),
        scoringReport: path.join(directory, "scoring-report.json"),
      },
    },
    store: { getListings: () => [] },
    analytics: {},
    crawler: {},
    logger: { info() {}, error() {} },
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;

  const page = await fetch(`${origin}/data-quality`, { headers: { accept: "text/html" } });
  assert.equal(page.status, 200);
  assert.match(page.headers.get("content-type"), /text\/html/);
  assert.match(await page.text(), /<div id="root">/);

  for (const endpoint of ["/data-quality-data", "/data-quality"]) {
    const response = await fetch(`${origin}${endpoint}`, { headers: { accept: "application/json" } });
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /application\/json/);
    assert.equal((await response.json()).inventory.total, 0);
  }
});

test("listings API defaults and caps pages at 40 and forwards pagination to the store", async (t) => {
  const requests = [];
  const server = createAnalyticsServer({
    config: { paths: {} },
    store: { async queryListings(options) {
      requests.push(options);
      return { total: 81, listings: Array.from({ length: Math.min(options.limit, Math.max(0, 81 - options.offset)) }, (_, i) => ({ token: String(options.offset + i) })) };
    } },
    analytics: {}, crawler: {}, logger: { info() {}, error() {} },
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const first = await (await fetch(`${origin}/listings`)).json();
  assert.equal(first.limit, 40);
  assert.equal(first.listings.length, 40);
  assert.equal(first.hasMore, true);
  const second = await (await fetch(`${origin}/listings?offset=40&limit=500&status=active`)).json();
  assert.equal(second.offset, 40);
  assert.equal(second.limit, 40);
  assert.equal(second.listings[0].token, "40");
  assert.equal(requests[1].status, "active");
  const last = await (await fetch(`${origin}/listings?offset=80`)).json();
  assert.equal(last.listings.length, 1);
  assert.equal(last.hasMore, false);
});
