import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { createAnalyticsServer } from "../src/api/server.js";

test("buyer matching API forwards only normalized criteria and returns bounded results", async (t) => {
  let received = null;
  const store = {
    async matchBuyerRequirement(requirement, options) {
      received = { requirement, options };
      return { total: 1, evaluated: 1, truncated: false, nextCursor: null, model: null, matches: [{
        matchScore: 88, components: { price: 30 }, reasons: ["price-close-to-demand"], market: null,
        listing: { token: "one", coordinates: { latitude: 35.7, longitude: 51.4 } },
      }] };
    },
  };
  const server = createAnalyticsServer({
    config: { search: { maxCandidates: 500, maxConcurrent: 2, queryMaxTimeMs: 1_500 }, paths: {} },
    store, analytics: {}, crawler: {}, logger: { info() {}, error() {} },
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const response = await fetch(`http://127.0.0.1:${server.address().port}/buyer-matches/search`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ requirement: {
      transactionType: "buy", locations: ["ونک"], maxPrice: 20_000_000_000,
      notes: "must not cross into matching", createdBy: "browser-value",
    }, page: { limit: 100 } }),
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.matches[0].matchScore, 88);
  assert.equal(received.options.limit, 50);
  assert.equal(received.options.queryMaxTimeMs, 1_500);
  assert.equal(received.requirement.notes, undefined);
  assert.equal(received.requirement.createdBy, undefined);
});

test("buyer match request schema is strict JSON", async () => {
  const schema = JSON.parse(await fs.readFile(new URL("../schemas/buyer-match-request.schema.json", import.meta.url), "utf8"));
  assert.equal(schema.additionalProperties, false);
  assert.equal(schema.properties.requirement.additionalProperties, false);
  assert.equal(schema.properties.page.properties.limit.maximum, 50);
});
