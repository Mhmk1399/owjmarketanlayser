import { Listing } from "../models/listing.js";
import { ListingObservation } from "../models/listingObservation.js";
import { ListingActivity } from "../models/listingActivity.js";
import { ListingPropertyLink } from "../models/listingPropertyLink.js";
import { CrawlRun, ServiceState } from "../models/crawlState.js";
import { CrawlCycle, AreaCrawlJob } from "../models/crawlJob.js";
import { ScoringScenario } from "../models/scoringScenario.js";
import { BuyerRequirement } from "../models/buyerRequirement.js";
import { DriftMetric, ListingScore, ModelVersion, TrainingRun } from "../models/scoringState.js";
import { AnalyticsAuthState, AnalyticsSession } from "../models/analyticsSession.js";

export const ANALYTICS_SCHEMA_VERSION = "2026-11-23.1";

export const ANALYTICS_MODELS = Object.freeze([
  Listing,
  ListingObservation,
  ListingActivity,
  ListingPropertyLink,
  ServiceState,
  CrawlRun,
  CrawlCycle,
  AreaCrawlJob,
  ModelVersion,
  TrainingRun,
  ListingScore,
  DriftMetric,
  ScoringScenario,
  BuyerRequirement,
  AnalyticsSession,
  AnalyticsAuthState,
]);

const FORBIDDEN_DATABASE_NAMES = new Set([
  "admin", "config", "local", "test", "owj", "owj_web", "owj_chat", "web", "chat",
]);

export function validateAnalyticsDatabaseTarget(databaseName, confirmedName = null) {
  const name = String(databaseName || "").trim();
  if (!/^[A-Za-z0-9_-]{3,64}$/.test(name)) {
    throw new Error("MONGODB_DB_NAME must be an explicit 3-64 character database name");
  }
  if (FORBIDDEN_DATABASE_NAMES.has(name.toLowerCase()) || /(?:^|[_-])(?:web|chat)(?:$|[_-])/i.test(name)) {
    throw new Error(`Refusing Analytics initialization against protected database '${name}'`);
  }
  if (confirmedName !== null && confirmedName !== name) {
    throw new Error("--confirm-database must exactly match MONGODB_DB_NAME");
  }
  return name;
}

export function databasePlan() {
  return {
    schemaVersion: ANALYTICS_SCHEMA_VERSION,
    models: ANALYTICS_MODELS.map((model) => ({
      model: model.modelName,
      collection: model.collection.collectionName,
      indexes: model.schema.indexes().map(([keys, options]) => ({ keys, options })),
    })),
  };
}
