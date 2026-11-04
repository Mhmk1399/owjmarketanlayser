import test from "node:test";
import assert from "node:assert/strict";
import { calculateDrift } from "../src/scoring/modelRegistry.js";
import { DriftMetric, ListingScore, ModelVersion, TrainingRun } from "../src/models/scoringState.js";

test("model-state schemas reject unknown fields and invalid score ranges", () => {
  assert.throws(() => new ModelVersion({ unexpected: true }), /strict mode/i);
  assert.throws(() => new TrainingRun({ unexpected: true }), /strict mode/i);
  assert.throws(() => new DriftMetric({ unexpected: true }), /strict mode/i);
  const score = new ListingScore({
    token: "abc", runId: "run", modelId: "model", scoringVersion: "v1",
    generatedAt: new Date(), rank: 1, recommendation: 101, dealValue: 50,
    confidence: 50, propertyQuality: 50, risk: 50, snapshot: {},
  });
  assert.match(score.validateSync().message, /recommendation/);
});

test("drift monitoring classifies material score and validation movement", () => {
  const baseline = { metrics: {
    modelValidation: { medianAbsolutePercentageError: 10, qualityScore: 80, sampleCount: 100 },
    scoring: { scoreDistribution: { median: 50, p90: 75 } },
  } };
  const current = { metrics: {
    modelValidation: { medianAbsolutePercentageError: 22, qualityScore: 62, sampleCount: 110 },
    scoring: { scoreDistribution: { median: 68, p90: 85 } },
  } };
  const drift = calculateDrift(baseline, current);
  assert.equal(drift.severity, "critical");
  assert.equal(drift.metrics.sampleCountDelta, 10);
});
