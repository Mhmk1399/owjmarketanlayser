import mongoose from "mongoose";

const { Schema } = mongoose;
const boundedStrings = {
  type: [{ type: String, trim: true, maxlength: 120 }],
  default: [],
  validate: {
    validator: (values) => values.length <= 30,
    message: "Buyer requirement arrays may contain at most 30 values",
  },
};

// Temporary Analytics copy for the standalone matching pilot. Ownership will
// move to the Web/CRM service when cross-repository integration is introduced.
const buyerRequirementSchema = new Schema({
  buyerCase: {
    type: Schema.Types.ObjectId,
    ref: "BuyerCase",
    required: true,
    index: true,
  },
  transactionType: { type: String, enum: ["buy", "rent"], required: true },
  propertyTypes: boundedStrings,
  locations: boundedStrings,
  minPrice: { type: Number, min: 0, default: null },
  maxPrice: { type: Number, min: 0, default: null },
  minDeposit: { type: Number, min: 0, default: null },
  maxDeposit: { type: Number, min: 0, default: null },
  minRent: { type: Number, min: 0, default: null },
  maxRent: { type: Number, min: 0, default: null },
  minArea: { type: Number, min: 0, default: null },
  maxArea: { type: Number, min: 0, default: null },
  minRooms: { type: Number, min: 0, default: null },
  maxBuildingAge: { type: Number, min: 0, default: null },
  requiredAmenities: boundedStrings,
  optionalAmenities: boundedStrings,
  urgency: {
    type: String,
    enum: ["low", "normal", "high", "immediate"],
    default: "normal",
  },
  financingStatus: {
    type: String,
    enum: ["unknown", "ready", "needs_financing", "not_ready"],
    default: "unknown",
  },
  notes: { type: String, trim: true, maxlength: 4000, default: "" },
  status: {
    type: String,
    enum: ["draft", "active", "paused", "fulfilled", "cancelled"],
    default: "draft",
    index: true,
  },
  version: { type: Number, min: 1, default: 1 },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true, strict: "throw", versionKey: false, minimize: false });

buyerRequirementSchema.index({ buyerCase: 1, status: 1, createdAt: -1 });
buyerRequirementSchema.index({ status: 1, transactionType: 1, updatedAt: -1 });

export const BuyerRequirement = mongoose.models.BuyerRequirement
  || mongoose.model("BuyerRequirement", buyerRequirementSchema);

export default BuyerRequirement;
