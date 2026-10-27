import test from "node:test";
import assert from "node:assert/strict";
import { buildDataQualityBaseline } from "../src/api/dataQuality.js";

function listing(token, overrides = {}) {
  return {
    token, description: null, imageCount: 1, subcategory: "buy-residential-apartment",
    property: { area: 100 }, pricing: { price: 10_000_000_000 },
    coordinates: { latitude: 35.7, longitude: 51.4 }, advertiserType: "unknown",
    quality: { outcome: "scoring-ready" }, lifecycle: { status: "active" },
    lastSeenAt: "2026-01-02T00:00:00.000Z", nearbyPlaces: [], ...overrides,
  };
}

test("data quality baseline separates eligible-unscored records from blockers", () => {
  const baseline = buildDataQualityBaseline({
    listings: [listing("one", { description: "public text", advertiserType: "personal" }), listing("two", { property: { area: null }, quality: { outcome: "history-only" } })],
    scoredDocument: { generatedAt: "2026-01-01T00:00:00.000Z", listings: [{ token: "one" }] },
    scoringReport: { status: "completed" }, now: "2026-01-03T00:00:00.000Z",
  });
  assert.equal(baseline.inventory.total, 2);
  assert.equal(baseline.scoring.eligible, 1);
  assert.equal(baseline.scoring.eligibleScored, 1);
  assert.equal(baseline.scoring.eligibleUnscored, 0);
  assert.equal(baseline.scoring.populationCoveragePercent, 50);
  assert.equal(baseline.scoring.unscoredTotal, 1);
  assert.equal(baseline.coverage.find((item) => item.key === "description").percent, 50);
  assert.ok(baseline.blockers.some((item) => item.reason === "not-scoring-ready"));
  assert.ok(baseline.blockers.some((item) => item.reason === "invalid-or-implausible-area"));
});
