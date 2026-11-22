import test from "node:test";
import assert from "node:assert/strict";
import { createAnalyticsServer } from "../src/api/server.js";

const consultantToken = "empty-db-consultant-000000000000000";

test("empty store returns stable listing, facet, and buyer-match contracts", async (t) => {
  const store = {
    async queryListings() { return { total: 0, listings: [] }; },
    async listingFacets() { return { districts: [], categories: [], bounds: {} }; },
    async matchBuyerRequirement() {
      return { total: 0, evaluated: 0, truncated: false, nextCursor: null, model: null, matches: [] };
    },
  };
  const server = createAnalyticsServer({
    config: {
      paths: {}, security: { consultantToken },
      search: { maxCandidates: 500, maxConcurrent: 2, queryMaxTimeMs: 1_500 },
    },
    store, analytics: {}, crawler: {}, logger: { info() {}, warn() {}, error() {} },
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;

  const listings = await (await fetch(`${origin}/listings`)).json();
  assert.equal(listings.total, 0);
  assert.deepEqual(listings.listings, []);
  assert.equal(listings.hasMore, false);

  const facets = await (await fetch(`${origin}/listing-facets`)).json();
  assert.deepEqual(facets, { districts: [], categories: [], bounds: {} });

  const matches = await fetch(`${origin}/buyer-matches/search`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${consultantToken}`,
    },
    body: JSON.stringify({ requirement: { transactionType: "buy" } }),
  });
  assert.equal(matches.status, 200);
  const matchBody = await matches.json();
  assert.equal(matchBody.total, 0);
  assert.deepEqual(matchBody.matches, []);
});
