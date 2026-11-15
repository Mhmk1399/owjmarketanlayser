import mongoose from "mongoose";

const evidenceSchema = new mongoose.Schema({
  sharedImageCount: { type: Number, required: true, min: 2, max: 20 },
  sameArea: { type: Boolean, required: true },
  sameRooms: { type: Boolean, required: true },
  sameBuildingYear: { type: Boolean, required: true },
}, { _id: false, strict: "throw" });
const schema = new mongoose.Schema({
  linkId: { type: String, required: true, match: /^[a-f0-9]{64}$/ },
  tokens: { type: [String], required: true, validate: (tokens) => tokens.length === 2
    && tokens[0] < tokens[1] && tokens.every((token) => /^[A-Za-z0-9_-]+$/.test(token)) },
  relation: { type: String, enum: ["same-property", "repost", "different-properties"], required: true },
  status: { type: String, enum: ["candidate", "confirmed", "rejected"], default: "candidate" },
  evidence: { type: evidenceSchema, required: true },
  verificationRef: { type: String, default: null, maxlength: 200 },
}, { strict: "throw", timestamps: true, versionKey: false });
schema.pre("validate", function () {
  if (this.status === "confirmed" && !this.verificationRef) this.invalidate("verificationRef", "Confirmation requires independent verification");
});
schema.index({ linkId: 1 }, { unique: true });
schema.index({ tokens: 1, status: 1, updatedAt: -1 });
schema.index({ updatedAt: -1, status: 1, relation: 1 });
export const ListingPropertyLink = mongoose.models.ListingPropertyLink || mongoose.model("ListingPropertyLink", schema);
