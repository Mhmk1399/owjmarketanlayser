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
  assert.equal(baseline.freshness.notObservedWithin7Days, 0);
  assert.equal(baseline.freshness.missingPropertyCharacteristics, 2);
  assert.equal(baseline.freshness.modelStatus, "current");
  assert.match(baseline.freshness.valuationGuidance, /valuationStatus/);
});

test("data quality uses exact database aggregates while keeping samples explicitly bounded", () => {
  const baseline = buildDataQualityBaseline({
    listings: [listing("cached")],
    workingSet: { cachedListings: 1, totalListings: 10_000, complete: false, authority: "mongodb" },
    databaseMetrics: {
      scope: { kind: "full-database", completeness: "complete", sampled: false, filtered: false },
      summary: {
        total: 10_000, active: 9_000, latestListingAt: "2026-01-03T00:00:00.000Z",
        notObservedWithin7Days: 400, possiblyRemoved: 30, removed: 50,
        missingPropertyCharacteristics: 600, missingPricing: 20,
        insufficientComparableSignals: 7_000,
      },
      coverage: [{ key: "coordinates", count: 9_500, missing: 500, percent: 95 }],
      classifications: { advertiser: [], property: [], quality: [], lifecycle: [] },
      blockers: [{ reason: "missing-or-out-of-bounds-coordinates", count: 500, percent: 5 }],
      scoring: { activeScoreCount: 8_000, populationCoveragePercent: 80, eligibleListings: 8_500, generatedAt: "2026-01-03T00:00:00.000Z" },
      neighborhoods: [], priceDistribution: [], recentActivity: [], limits: { neighborhoods: 200 },
    },
    now: "2026-01-03T00:00:00.000Z",
  });
  assert.equal(baseline.inventory.analyzed, 10_000);
  assert.equal(baseline.freshness.notObservedWithin7Days, 400);
  assert.equal(baseline.scoring.totalScored, 8_000);
  assert.equal(baseline.scoring.eligible, 8_500);
  assert.equal(baseline.metricScopes.inventory, "full-database");
  assert.equal(baseline.metricScopes.samples, "bounded-recent-working-set");
  assert.equal(baseline.samples.scope, "bounded-recent-working-set");
});
