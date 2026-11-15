import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  eventId: { type: String, required: true, match: /^[a-f0-9]{64}$/ },
  token: { type: String, required: true, match: /^[A-Za-z0-9_-]+$/ },
  runId: { type: String, required: true, maxlength: 120 },
  observedAt: { type: Date, required: true },
  type: { type: String, required: true, enum: ["new-listing", "refreshed", "unchanged", "seen", "price-changed", "reappeared", "not-seen", "possibly-removed", "removed"] },
  basis: { type: String, enum: ["public-observation", "coverage-inference"], default: "public-observation" },
  contentFingerprint: { type: String, required: true, match: /^[a-f0-9]{64}$/ },
  previousPrice: { type: Number, default: null, min: 0 },
  price: { type: Number, default: null, min: 0 },
  // A new advertisement is not proof of a distinct apartment. Future verified
  // same-property/repost links belong to the property-resolution service.
  propertyIdentity: { type: String, enum: ["unresolved"], default: "unresolved" },
}, { strict: "throw", versionKey: false });
activitySchema.index({ eventId: 1 }, { unique: true });
activitySchema.index({ token: 1, observedAt: -1 });
activitySchema.index({ runId: 1, type: 1, observedAt: -1 });
activitySchema.index({ type: 1, observedAt: -1 });
activitySchema.index({ observedAt: -1 });
export const ListingActivity = mongoose.models.ListingActivity || mongoose.model("ListingActivity", activitySchema);
