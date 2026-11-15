import mongoose from "mongoose";

const { Schema } = mongoose;
const strict = { _id: false, strict: "throw" };
const areaSchema = new Schema({
  id: { type: Number, required: true, min: 1 },
  name: { type: String, required: true, maxlength: 160 },
  slug: { type: String, required: true, match: /^[a-z0-9-]+$/i },
  municipalDistricts: { type: [Number], default: [] },
  secondSlugs: { type: [String], default: [] },
}, strict);
const partitionSchema = new Schema({
  area: { type: areaSchema, required: true },
  limit: { type: Number, required: true, min: 1, max: 100 },
}, strict);
const cycleSchema = new Schema({
  cycleId: { type: String, required: true },
  scope: { type: String, enum: ["tehran-buy-apartment"], required: true },
  mode: { type: String, enum: ["full", "targeted"], required: true },
  status: { type: String, enum: ["active", "completed"], required: true },
  partitions: { type: [partitionSchema], required: true, validate: (items) => items.length > 0 && items.length <= 168 },
  nextAreaOffset: { type: Number, required: true, min: 0 },
  owner: { type: String, default: null },
  leaseUntil: { type: Date, default: null },
  cooldownUntil: { type: Date, default: null },
  completedAt: { type: Date, default: null },
  expiresAt: { type: Date, default: null },
}, { strict: "throw", timestamps: true, versionKey: false });
cycleSchema.index({ cycleId: 1 }, { unique: true });
cycleSchema.index({ scope: 1 }, { unique: true, partialFilterExpression: { status: "active" } });
cycleSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const candidateSchema = new Schema({
  token: { type: String, required: true, match: /^[A-Za-z0-9_-]+$/ },
  work: { type: String, enum: ["new-detail", "refresh", "confirm"], required: true },
  outcome: { type: String, enum: ["pending", "new-listing", "refreshed", "unchanged", "confirmed", "failed"], default: "pending" },
  attempts: { type: Number, default: 0, min: 0 },
  changed: { type: Boolean, default: false },
}, strict);
const areaJobSchema = new Schema({
  jobId: { type: String, required: true },
  cycleId: { type: String, required: true },
  area: { type: areaSchema, required: true },
  limit: { type: Number, required: true, min: 1, max: 100 },
  stage: { type: String, enum: ["discovery", "details", "enrichment"], default: "discovery" },
  stagePriority: { type: Number, enum: [100, 200, 300], default: 300 },
  priority: { type: Number, default: 0, min: 0, max: 100 },
  status: { type: String, enum: ["queued", "running", "completed", "failed"], default: "queued" },
  requestedAt: { type: Date, required: true },
  startedAt: { type: Date, default: null },
  endedAt: { type: Date, default: null },
  leaseOwner: { type: String, default: null },
  leaseUntil: { type: Date, default: null },
  availableAt: { type: Date, required: true },
  attempts: { type: Number, default: 0, min: 0 },
  cursor: { type: Number, default: 0, min: 0, max: 100 },
  candidates: { type: [candidateSchema], default: [], validate: (items) => items.length <= 100 },
  discoveryComplete: { type: Boolean, default: false },
  stopReason: { type: String, default: null, maxlength: 80 },
  errorCode: { type: String, default: null, maxlength: 100 },
  expiresAt: { type: Date, default: null },
}, { strict: "throw", timestamps: true, versionKey: false });
areaJobSchema.index({ jobId: 1 }, { unique: true });
areaJobSchema.index({ cycleId: 1, "area.id": 1 }, { unique: true });
areaJobSchema.index({ cycleId: 1, status: 1, stagePriority: -1, priority: -1, availableAt: 1 });
areaJobSchema.index({ "area.id": 1, requestedAt: -1 });
areaJobSchema.index({ status: 1, leaseUntil: 1 });
areaJobSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const CrawlCycle = mongoose.models.CrawlCycle || mongoose.model("CrawlCycle", cycleSchema);
export const AreaCrawlJob = mongoose.models.AreaCrawlJob || mongoose.model("AreaCrawlJob", areaJobSchema);
