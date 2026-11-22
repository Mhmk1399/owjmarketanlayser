import mongoose from "mongoose";

const { Schema } = mongoose;

const analyticsSessionSchema = new Schema({
  digest: { type: String, required: true, unique: true, match: /^[a-f0-9]{64}$/ },
  subject: { type: String, required: true, match: /^[a-f0-9]{24}$/ },
  scopes: { type: [String], required: true, default: [] },
  accountStatus: { type: String, required: true, enum: ["active"] },
  authorizationCheckedAt: { type: Date, required: true },
  authorizationCacheMaxAgeSeconds: { type: Number, required: true, min: 0, max: 60 },
  expiresAt: { type: Date, required: true },
  revokedAt: { type: Date, default: null },
  createdAt: { type: Date, required: true, default: Date.now },
}, { strict: "throw", versionKey: false, minimize: false });

analyticsSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, name: "analytics_session_expiry" });
analyticsSessionSchema.index({ subject: 1, revokedAt: 1, expiresAt: 1 }, { name: "analytics_session_subject" });

const analyticsAuthStateSchema = new Schema({
  digest: { type: String, required: true, unique: true, match: /^[a-f0-9]{64}$/ },
  redirectUri: { type: String, required: true, maxlength: 2048 },
  expiresAt: { type: Date, required: true },
  consumedAt: { type: Date, default: null },
  createdAt: { type: Date, required: true, default: Date.now },
}, { strict: "throw", versionKey: false, minimize: false });

analyticsAuthStateSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, name: "analytics_auth_state_expiry" });

export const AnalyticsSession = mongoose.models.AnalyticsSession
  || mongoose.model("AnalyticsSession", analyticsSessionSchema);
export const AnalyticsAuthState = mongoose.models.AnalyticsAuthState
  || mongoose.model("AnalyticsAuthState", analyticsAuthStateSchema);

