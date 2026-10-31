import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import mongoose from "mongoose";
import { config } from "../src/config.js";

if (!config.mongoUri) {
  throw new Error("MONGODB_URI is required for database-only development; JSON fallback is disabled.");
}

const scratch = await mkdtemp(path.join(os.tmpdir(), "owj-mongodb-dev-"));
Object.assign(config.paths, {
  data: scratch,
  logs: scratch,
  listings: path.join(scratch, "listings.json"),
  listingRecords: path.join(scratch, "listings"),
  analytics: path.join(scratch, "analytics.json"),
  model: path.join(scratch, "online-models.json"),
  scoringReady: path.join(scratch, "scoring-ready.json"),
  scoredListings: path.join(scratch, "scored-listings.json"),
  scoringModel: path.join(scratch, "scoring-model.json"),
  scoringReport: path.join(scratch, "scoring-report.json"),
  serviceState: path.join(scratch, "service-state.json"),
  observations: path.join(scratch, "observations"),
  logFile: path.join(scratch, "service.jsonl"),
});
config.autoCrawl = false;
// Keep local startup independent of index creation on the remote database.
mongoose.set("autoIndex", false);

console.log("MongoDB development mode: no existing project data snapshots will be loaded.");
console.log("Scoring snapshots start empty; generated runtime files are isolated in the system temporary directory.");
await import("../src/index.js");
