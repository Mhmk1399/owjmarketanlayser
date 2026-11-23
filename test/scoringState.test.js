import test from "node:test";
import assert from "node:assert/strict";
import { calculateDrift, persistScoringGeneration } from "../src/scoring/modelRegistry.js";
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

test("failed score publication restores the prior active model and removes partial scores", async () => {
  const models = new Map([["baseline", { modelId: "baseline", kind: "batch-price", status: "active", metrics: {} }]]);
  const training = new Map();
  const modelVersionModel = {
    findOne(filter) { return { async lean() {
      return [...models.values()].find((item) => item.kind === filter.kind && item.status === filter.status) || null;
    } }; },
    async create(value) { models.set(value.modelId, structuredClone(value)); },
    async updateOne(filter, update) {
      const value = models.get(filter.modelId);
      if (!value || (filter.status && value.status !== filter.status)) return { matchedCount: 0 };
      Object.assign(value, update.$set || {});
      return { matchedCount: 1 };
    },
  };
  const trainingRunModel = {
    async create(value) { training.set(value.runId, structuredClone(value)); },
    async updateOne(filter, update) { Object.assign(training.get(filter.runId), update.$set || {}); },
  };
  let partialScoreCount = 0;
  const listingScoreModel = {
    async bulkWrite(batch) { partialScoreCount += batch.length; },
    async deleteMany() { partialScoreCount = 0; },
  };
  const report = {
    pipelineVersion: "synthetic-v1", startedAt: "2026-11-23T00:00:00.000Z",
    endedAt: "2026-11-23T00:00:01.000Z", durationMs: 1_000,
    cleaning: { inputCount: 1, acceptedCount: 1, rejectedCount: 0 },
    modelValidation: {}, scoring: { scoreDistribution: {} },
  };
  const row = { token: "synthetic-one", rank: 1, scores: {
    recommendation: 50, dealValue: 50, confidence: 50, propertyQuality: 50, risk: 50,
  } };
  await assert.rejects(persistScoringGeneration({
    report,
    modelDocument: { generatedAt: report.endedAt, model: { modelVersion: "s4-synthetic" } },
    scoredDocument: { generatedAt: report.endedAt, scoringVersion: "s4-synthetic", listings: [row] },
  }, {
    connection: null, modelVersionModel, trainingRunModel, listingScoreModel,
    driftMetricModel: { async create() { throw new Error("synthetic-interruption"); } },
    runId: "synthetic-run", modelId: "synthetic-candidate", chunkSize: 1,
  }), /synthetic-interruption/);
  assert.equal(models.get("baseline").status, "active");
  assert.equal(models.get("synthetic-candidate").status, "failed");
  assert.equal(training.get("synthetic-run").status, "failed");
  assert.equal(partialScoreCount, 0);
});

test("duplicate generation identifiers fail without mutating the existing model", async () => {
  let updates = 0;
  const existing = { modelId: "duplicate-model", kind: "batch-price", status: "candidate" };
  const modelVersionModel = {
    findOne() { return { async lean() { return null; } }; },
    async create() { throw Object.assign(new Error("duplicate model id"), { code: 11000 }); },
    async updateOne() { updates += 1; },
  };
  await assert.rejects(persistScoringGeneration({
    report: {
      pipelineVersion: "v1", startedAt: "2026-11-23T00:00:00.000Z",
      endedAt: "2026-11-23T00:00:01.000Z", durationMs: 1_000,
      cleaning: { inputCount: 0, acceptedCount: 0, rejectedCount: 0 },
      modelValidation: {}, scoring: {},
    },
    modelDocument: { generatedAt: "2026-11-23T00:00:01.000Z", model: { modelVersion: "v1" } },
    scoredDocument: { generatedAt: "2026-11-23T00:00:01.000Z", scoringVersion: "v1", listings: [] },
  }, {
    connection: null, modelVersionModel,
    trainingRunModel: { async create() {}, async updateOne() {} },
    listingScoreModel: { async bulkWrite() {}, async deleteMany() {} },
    driftMetricModel: { async create() {} },
    modelId: existing.modelId, runId: "duplicate-run",
  }), /duplicate model id/);
  assert.equal(existing.status, "candidate");
  assert.equal(updates, 0);
});
