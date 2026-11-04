import mongoose from "mongoose";

const { Schema } = mongoose;
const strictOptions = { strict: "throw", versionKey: false, minimize: false };

const modelVersionSchema = new Schema({
  modelId: { type: String, required: true, immutable: true, match: /^[A-Za-z0-9_-]+$/ },
  kind: { type: String, required: true, enum: ["batch-price", "online-ridge"] },
  version: { type: String, required: true, trim: true },
  status: { type: String, required: true, enum: ["candidate", "active", "archived", "failed"] },
  generatedAt: { type: Date, required: true },
  promotedAt: { type: Date, default: null },
  archivedAt: { type: Date, default: null },
  parentModelId: { type: String, default: null },
  trainingRunId: { type: String, default: null },
  dataset: { type: Schema.Types.Mixed, required: true },
  metrics: { type: Schema.Types.Mixed, required: true },
  artifact: { type: Schema.Types.Mixed, required: true },
}, strictOptions);
modelVersionSchema.index({ modelId: 1 }, { unique: true });
modelVersionSchema.index({ kind: 1, status: 1, generatedAt: -1 });
modelVersionSchema.index(
  { kind: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: "active" } },
);

const trainingRunSchema = new Schema({
  runId: { type: String, required: true, immutable: true, match: /^[A-Za-z0-9_-]+$/ },
  pipelineVersion: { type: String, required: true },
  scoringVersion: { type: String, required: true },
  status: { type: String, required: true, enum: ["running", "completed", "failed"] },
  startedAt: { type: Date, required: true },
  endedAt: { type: Date, default: null },
  durationMs: { type: Number, default: null, min: 0 },
  sourceListingCount: { type: Number, required: true, min: 0 },
  acceptedCount: { type: Number, required: true, min: 0 },
  rejectedCount: { type: Number, required: true, min: 0 },
  modelId: { type: String, default: null },
  metrics: { type: Schema.Types.Mixed, required: true },
  error: { type: String, default: null },
}, strictOptions);
trainingRunSchema.index({ runId: 1 }, { unique: true });
trainingRunSchema.index({ startedAt: -1, status: 1 });

const listingScoreSchema = new Schema({
  token: { type: String, required: true, match: /^[A-Za-z0-9_-]+$/ },
  runId: { type: String, required: true },
  modelId: { type: String, required: true },
  scoringVersion: { type: String, required: true },
  generatedAt: { type: Date, required: true },
  rank: { type: Number, required: true, min: 1 },
  recommendation: { type: Number, required: true, min: 0, max: 100 },
  dealValue: { type: Number, required: true, min: 0, max: 100 },
  confidence: { type: Number, required: true, min: 0, max: 100 },
  propertyQuality: { type: Number, required: true, min: 0, max: 100 },
  risk: { type: Number, required: true, min: 0, max: 100 },
  band: { type: String, default: null },
  snapshot: { type: Schema.Types.Mixed, required: true },
}, strictOptions);
listingScoreSchema.index({ token: 1, generatedAt: -1 });
listingScoreSchema.index({ runId: 1, rank: 1 }, { unique: true });
listingScoreSchema.index({ modelId: 1, recommendation: -1 });
listingScoreSchema.index({ scoringVersion: 1, generatedAt: -1 });

const driftMetricSchema = new Schema({
  driftId: { type: String, required: true, immutable: true, match: /^[A-Za-z0-9_-]+$/ },
  modelId: { type: String, required: true },
  baselineModelId: { type: String, default: null },
  evaluatedAt: { type: Date, required: true },
  severity: { type: String, required: true, enum: ["none", "warning", "critical"] },
  metrics: { type: Schema.Types.Mixed, required: true },
}, strictOptions);
driftMetricSchema.index({ driftId: 1 }, { unique: true });
driftMetricSchema.index({ modelId: 1, evaluatedAt: -1 });
driftMetricSchema.index({ severity: 1, evaluatedAt: -1 });

export const ModelVersion = mongoose.models.ModelVersion
  || mongoose.model("ModelVersion", modelVersionSchema);
export const TrainingRun = mongoose.models.TrainingRun
  || mongoose.model("TrainingRun", trainingRunSchema);
export const ListingScore = mongoose.models.ListingScore
  || mongoose.model("ListingScore", listingScoreSchema);
export const DriftMetric = mongoose.models.DriftMetric
  || mongoose.model("DriftMetric", driftMetricSchema);
