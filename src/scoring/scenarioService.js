import { randomUUID } from "node:crypto";
import {
  calculateScenario,
  DEFAULT_SCORING_CONFIG,
} from "../../dashboard/src/scoringWorkshopModel.js";

const NUMERIC_KEYS = Object.keys(DEFAULT_SCORING_CONFIG)
  .filter((key) => key !== "neighborhoodScores");

function finiteInRange(value, minimum = -100, maximum = 100) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error("Scenario contains a non-numeric setting");
  return Math.max(minimum, Math.min(maximum, number));
}

export function normalizeScenarioConfig(input = {}) {
  const config = {};
  for (const key of NUMERIC_KEYS) {
    config[key] = finiteInRange(input[key] ?? DEFAULT_SCORING_CONFIG[key]);
  }
  if (!(config.strongThreshold > config.promisingThreshold
    && config.promisingThreshold > config.fairThreshold)) {
    throw new Error("Scenario thresholds must be strictly descending");
  }
  const neighborhoodScores = input.neighborhoodScores && typeof input.neighborhoodScores === "object"
    ? input.neighborhoodScores : {};
  config.neighborhoodScores = Object.fromEntries(Object.entries(neighborhoodScores)
    .filter(([name]) => typeof name === "string" && name.trim())
    .slice(0, 500)
    .map(([name, value]) => [name.trim().slice(0, 120), finiteInRange(value, 0, 100)]));
  return config;
}

export function scenarioDocument(input, scoringVersion, existing = null, now = new Date().toISOString()) {
  const name = String(input?.name || "").trim();
  if (name.length < 2 || name.length > 100) throw new Error("Scenario name must contain 2 to 100 characters");
  return {
    scenarioId: existing?.scenarioId || randomUUID(),
    name,
    description: String(input?.description || "").trim().slice(0, 500),
    config: normalizeScenarioConfig(input?.config),
    sourceScoringVersion: String(scoringVersion || "unknown"),
    active: existing?.active ?? true,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}

export function calculateSavedScenario(scoredDocument, scenario) {
  const calculated = calculateScenario(scoredDocument?.listings || [], scenario.config);
  return {
    scenarioId: scenario.scenarioId,
    name: scenario.name,
    description: scenario.description,
    sourceScoringVersion: scenario.sourceScoringVersion,
    currentScoringVersion: scoredDocument?.scoringVersion || "unknown",
    updatedAt: scenario.updatedAt,
    summary: calculated.summary,
    histogram: calculated.histogram,
    rows: calculated.rows,
  };
}

export const scenarioConfigKeys = NUMERIC_KEYS;
