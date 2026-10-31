import test from "node:test";
import assert from "node:assert/strict";
import { ScoringScenario } from "../src/models/scoringScenario.js";
import {
  calculateSavedScenario,
  normalizeScenarioConfig,
  scenarioDocument,
} from "../src/scoring/scenarioService.js";
import { DEFAULT_SCORING_CONFIG } from "../dashboard/src/scoringWorkshopModel.js";

const scoredDocument = {
  scoringVersion: "test-v1",
  listings: [
    { token: "a", rank: 1, title: "A", neighborhood: "A", property: {}, amenities: {},
      scores: { modelValue: 90, nearbyValue: 80, localPosition: 70, confidence: 80, risk: 10, recommendation: 70, band: "promising" } },
    { token: "b", rank: 2, title: "B", neighborhood: "B", property: {}, amenities: {},
      scores: { modelValue: 40, nearbyValue: 60, localPosition: 90, confidence: 90, risk: 10, recommendation: 55, band: "fair" } },
  ],
};

test("saved scoring scenario validates and recalculates ranked results", async () => {
  const scenario = scenarioDocument({ name: "Local priority", config: {
    ...DEFAULT_SCORING_CONFIG, modelValue: 0, nearbyValue: 0, localPosition: 100,
  } }, scoredDocument.scoringVersion, null, "2026-10-28T00:00:00.000Z");
  await new ScoringScenario(scenario).validate();
  const calculated = calculateSavedScenario(scoredDocument, scenario);
  assert.equal(calculated.rows[0].token, "b");
  assert.equal(calculated.rows[0].scenario.rank, 1);
});

test("scenario configuration rejects invalid thresholds and clamps neighborhood scores", () => {
  assert.throws(() => normalizeScenarioConfig({
    ...DEFAULT_SCORING_CONFIG, strongThreshold: 50, promisingThreshold: 60,
  }), /thresholds/);
  const config = normalizeScenarioConfig({
    ...DEFAULT_SCORING_CONFIG, neighborhoodScores: { A: 150, B: -10 },
  });
  assert.deepEqual(config.neighborhoodScores, { A: 100, B: 0 });
});

test("scoring scenario model is strict", () => {
  const scenario = scenarioDocument({ name: "Strict scenario", config: DEFAULT_SCORING_CONFIG }, "test-v1");
  assert.throws(() => new ScoringScenario({ ...scenario, unexpected: true }), /strict mode/i);
});
