import mongoose from "mongoose";
import { listingSchema } from "./listing.js";

const { Schema } = mongoose;
const snapshotSchema = listingSchema.clone();
snapshotSchema.clearIndexes();
snapshotSchema.set("_id", false);

const listingObservationSchema = new Schema({
  token: { type: String, required: true, match: /^[A-Za-z0-9_-]+$/ },
  observedAt: { type: Date, required: true },
  runId: { type: String, required: true, trim: true },
  eventType: { type: String, required: true, enum: ["created", "changed", "legacy-import"] },
  contentFingerprint: { type: String, required: true, match: /^[a-f0-9]{64}$/ },
  snapshot: { type: snapshotSchema, required: true },
}, { strict: "throw", versionKey: false, minimize: false, timestamps: true });

listingObservationSchema.index({ token: 1, observedAt: -1 });
listingObservationSchema.index({ runId: 1, observedAt: -1 });
listingObservationSchema.index(
  { token: 1, contentFingerprint: 1, observedAt: 1, runId: 1 },
  { unique: true },
);

export const ListingObservation = mongoose.models.ListingObservation
  || mongoose.model("ListingObservation", listingObservationSchema);
export default ListingObservation;
