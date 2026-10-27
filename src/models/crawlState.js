import mongoose from "mongoose";

const { Schema } = mongoose;
const nullable = (type, extra = {}) => ({ type, default: null, ...extra });
const strict = { _id: false, strict: "throw" };

const crawlAreaSchema = new Schema({
  id: nullable(Number), name: nullable(String), slug: nullable(String),
  municipalDistricts: { type: [Number], default: [] },
  reviewStatuses: { type: [String], default: [] },
  secondSlugs: { type: [String], default: [] },
}, strict);

const lifecycleSummarySchema = new Schema({
  active: { type: Number, default: 0, min: 0 },
  notSeen: { type: Number, default: 0, min: 0 },
  possiblyRemoved: { type: Number, default: 0, min: 0 },
  removed: { type: Number, default: 0, min: 0 },
}, strict);

const requestBudgetSchema = new Schema({
  total: { type: Number, default: 0, min: 0 },
  lastMinute: { type: Number, default: 0, min: 0 },
  byKind: { type: Map, of: Number, default: {} },
  maxPerRun: nullable(Number, { min: 0 }),
  maxPerMinute: nullable(Number, { min: 0 }),
}, strict);

const completenessSchema = new Schema({
  status: nullable(String), areaCoverage: nullable(Number, { min: 0, max: 100 }),
  detailCoverage: nullable(Number, { min: 0, max: 100 }),
  failedDetails: { type: Number, default: 0, min: 0 },
  stopRequested: { type: Boolean, default: false },
}, strict);

export const crawlSnapshotSchema = new Schema({
  status: { type: String, required: true, enum: ["idle", "starting", "discovering", "processing", "stopped", "completed", "failed"] },
  runId: nullable(String), startedAt: nullable(Date), endedAt: nullable(Date),
  partition: nullable(String), area: { type: crawlAreaSchema, default: null },
  areasTotal: { type: Number, default: 0, min: 0 }, areasCompleted: { type: Number, default: 0, min: 0 },
  discovered: { type: Number, default: 0, min: 0 }, queued: { type: Number, default: 0, min: 0 },
  processed: { type: Number, default: 0, min: 0 }, successful: { type: Number, default: 0, min: 0 },
  failed: { type: Number, default: 0, min: 0 }, recovered: { type: Number, default: 0, min: 0 },
  retries: { type: Number, default: 0, min: 0 }, skippedFresh: { type: Number, default: 0, min: 0 },
  newListings: { type: Number, default: 0, min: 0 }, refreshedListings: { type: Number, default: 0, min: 0 },
  scoringReady: { type: Number, default: 0, min: 0 }, historyOnly: { type: Number, default: 0, min: 0 },
  lifecycle: { type: lifecycleSummarySchema, default: () => ({}) },
  requestBudget: { type: requestBudgetSchema, default: () => ({}) },
  completeness: { type: completenessSchema, default: () => ({}) },
  cooldownUntil: nullable(Date), changed: { type: Number, default: 0, min: 0 },
  contactEndpointAttempts: { type: Number, default: 0, min: 0 },
  httpWarnings: { type: Map, of: Number, default: {} },
  lastListingToken: nullable(String), error: nullable(String),
}, strict);

const planningSchema = new Schema({
  areaOffset: { type: Number, required: true, min: 0 },
  nextAreaOffset: { type: Number, required: true, min: 0 },
}, strict);

const serviceStateSchema = new Schema({
  key: { type: String, required: true, immutable: true, enum: ["crawler"] },
  schemaVersion: { type: String, required: true, enum: ["1.0.0"] },
  updatedAt: { type: Date, required: true },
  crawl: { type: crawlSnapshotSchema, required: true },
  planning: { type: planningSchema, required: true },
}, { strict: "throw", versionKey: false, minimize: false });
serviceStateSchema.index({ key: 1 }, { unique: true });

const crawlRunSchema = new Schema({
  runId: { type: String, required: true, immutable: true },
  startedAt: { type: Date, required: true }, endedAt: nullable(Date),
  status: { type: String, required: true, enum: ["starting", "discovering", "processing", "stopped", "completed", "failed"] },
  updatedAt: { type: Date, required: true },
  snapshot: { type: crawlSnapshotSchema, required: true },
}, { strict: "throw", versionKey: false, minimize: false });
crawlRunSchema.index({ runId: 1 }, { unique: true });
crawlRunSchema.index({ startedAt: -1, status: 1 });
crawlRunSchema.index({ status: 1, endedAt: -1 });

export const ServiceState = mongoose.models.ServiceState || mongoose.model("ServiceState", serviceStateSchema);
export const CrawlRun = mongoose.models.CrawlRun || mongoose.model("CrawlRun", crawlRunSchema);
