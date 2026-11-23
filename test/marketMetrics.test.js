import test from "node:test";
import assert from "node:assert/strict";
import { buildMarketMetricsPipeline, normalizeMarketMetrics } from "../src/storage/marketMetrics.js";

test("market metrics pipeline is a single deadline-compatible full-database facet", () => {
  const pipeline = buildMarketMetricsPipeline(new Date("2026-11-23T00:00:00.000Z"));
  assert.equal(pipeline.length, 1);
  const facets = pipeline[0].$facet;
  assert.ok(facets.summary);
  assert.ok(facets.neighborhoods);
  assert.ok(facets.priceDistribution);
  assert.equal(facets.neighborhoods.at(-1).$limit, 200);
});

test("market metrics normalization exposes complete scope without raw listing values", () => {
  const metrics = normalizeMarketMetrics({
    summary: [{
      total: 100, active: 80, inScopeListings: 90, inScopeQualityTotal: 8_100,
      descriptionAvailable: 70, coordinatesAvailable: 60, imagesAvailable: 50,
      advertiserClassified: 40, nearbyPlacesAvailable: 30, scoringEligible: 55,
    }],
    advertiser: [{ _id: "personal", count: 70 }],
    blockers: [{ invalidCoordinates: 40 }],
    neighborhoods: [{ _id: "synthetic-area", count: 20, active: 18, removed: 2, priced: 19 }],
    priceDistribution: [{ _id: 0, count: 5 }],
  }, {
    activeModel: { modelId: "model-one", generatedAt: new Date("2026-11-22T00:00:00.000Z") },
    activeScoreCount: 50,
    generatedAt: "2026-11-23T00:00:00.000Z",
  });
  assert.deepEqual(metrics.scope, { kind: "full-database", completeness: "complete", sampled: false, filtered: false });
  assert.equal(metrics.summary.averageInScopeQualityScore, 90);
  assert.equal(metrics.coverage.find((row) => row.key === "coordinates").percent, 60);
  assert.equal(metrics.scoring.populationCoveragePercent, 50);
  assert.equal(metrics.blockers[0].reason, "missing-or-out-of-bounds-coordinates");
  assert.equal(JSON.stringify(metrics).includes("token"), false);
});
