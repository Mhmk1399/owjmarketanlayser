import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import { config } from "../src/config.js";
import { ListingScore, ModelVersion, TrainingRun } from "../src/models/scoringState.js";

if (!config.mongoUri) throw new Error("MONGODB_URI is required");
const compactSnapshot = (snapshot = {}) => ({
  schemaVersion: snapshot.schemaVersion || "1.0.0",
  scoringVersion: snapshot.scoringVersion,
  rank: snapshot.rank,
  token: snapshot.token,
  title: snapshot.title,
  neighborhood: snapshot.neighborhood,
  asking: snapshot.asking,
  valuation: snapshot.valuation,
  scores: snapshot.scores,
});

await mongoose.connect(config.mongoUri, { dbName: config.mongoDbName, serverSelectionTimeoutMS: 30_000 });
try {
  const [active, snapshotDocument] = await Promise.all([
    ModelVersion.findOne({ kind: "batch-price", status: "active" }).lean(),
    fs.readFile(config.paths.scoredListings, "utf8").then(JSON.parse),
  ]);
  if (!active) throw new Error("No active batch-price model exists");
  const compact = (snapshotDocument.listings || []).map((snapshot) => ({
    token: snapshot.token,
    runId: active.trainingRunId,
    modelId: active.modelId,
    scoringVersion: snapshotDocument.scoringVersion,
    generatedAt: snapshotDocument.generatedAt,
    rank: snapshot.rank,
    recommendation: snapshot.scores.recommendation,
    dealValue: snapshot.scores.dealValue,
    confidence: snapshot.scores.confidence,
    propertyQuality: snapshot.scores.propertyQuality,
    risk: snapshot.scores.risk,
    band: snapshot.scores.band,
    snapshot: compactSnapshot(snapshot),
  }));
  const generatedAt = new Date().toISOString();
  const backupFile = path.join(config.paths.data, "migrations", `score-compaction-${generatedAt.replace(/[:.]/g, "-")}.json`);
  await fs.mkdir(path.dirname(backupFile), { recursive: true });
  await fs.writeFile(backupFile, `${JSON.stringify({ generatedAt, source: config.paths.scoredListings, scores: compact }, null, 2)}\n`, "utf8");

  await ListingScore.deleteMany({});
  for (let offset = 0; offset < compact.length; offset += 500) {
    await ListingScore.insertMany(compact.slice(offset, offset + 500), { ordered: true });
  }
  const failedModels = await ModelVersion.deleteMany({ status: "failed" });
  const failedRuns = await TrainingRun.deleteMany({ status: "failed" });
  process.stdout.write(`${JSON.stringify({
    exported: compact.length,
    restoredCompact: compact.length,
    failedModelsRemoved: failedModels.deletedCount,
    failedRunsRemoved: failedRuns.deletedCount,
    backupFile,
  }, null, 2)}\n`);
} finally {
  await mongoose.disconnect();
}
