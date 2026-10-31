import mongoose from "mongoose";

const { Schema } = mongoose;
const strict = { _id: false, strict: "throw" };

const numericFields = [
  "modelValue", "nearbyValue", "localPosition",
  "valuationWeight", "propertyWeight", "neighborhoodWeight",
  "confidenceFloor", "riskPenalty",
  "elevatorYes", "elevatorNo", "parkingYes", "parkingNo",
  "storageYes", "storageNo", "balconyYes", "balconyNo",
  "basementPenalty", "groundFloorPenalty", "floorAboveSecondPenalty",
  "noElevatorHighFloorPenalty", "topFloorPenalty", "newBuildBonus",
  "agePerYearPenalty", "singleUnitBonus", "extraUnitPenalty",
  "areaPer25Sqm", "roomPoint", "strongThreshold", "promisingThreshold", "fairThreshold",
];

const configSchema = new Schema({
  ...Object.fromEntries(numericFields.map((key) => [key, { type: Number, required: true }])),
  neighborhoodScores: { type: Map, of: Number, default: {} },
}, strict);

const scoringScenarioSchema = new Schema({
  scenarioId: { type: String, required: true, immutable: true, match: /^[A-Za-z0-9_-]+$/ },
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  description: { type: String, default: "", trim: true, maxlength: 500 },
  config: { type: configSchema, required: true },
  sourceScoringVersion: { type: String, required: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
}, { strict: "throw", versionKey: false, minimize: false });

scoringScenarioSchema.index({ scenarioId: 1 }, { unique: true });
scoringScenarioSchema.index({ active: 1, updatedAt: -1 });
scoringScenarioSchema.index({ name: 1 });

export const ScoringScenario = mongoose.models.ScoringScenario
  || mongoose.model("ScoringScenario", scoringScenarioSchema);

export default ScoringScenario;
