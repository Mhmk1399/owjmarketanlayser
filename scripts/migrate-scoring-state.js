import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import { config } from "../src/config.js";
import { ModelVersion } from "../src/models/scoringState.js";
import { persistScoringGeneration } from "../src/scoring/modelRegistry.js";

const readJson = async (file) => JSON.parse(await fs.readFile(file, "utf8"));
if (!config.mongoUri) throw new Error("MONGODB_URI is required");

await mongoose.connect(config.mongoUri, {
  dbName: config.mongoDbName,
  serverSelectionTimeoutMS: 30_000,
});

try {
  const result = {};
  const activeBatch = await ModelVersion.findOne({ kind: "batch-price", status: "active" }).lean();
  if (activeBatch) {
    result.batch = { status: "already-migrated", modelId: activeBatch.modelId };
  } else {
    const [report, modelDocument, scoredDocument] = await Promise.all([
      readJson(config.paths.scoringReport),
      readJson(config.paths.scoringModel),
      readJson(config.paths.scoredListings),
    ]);
    result.batch = {
      status: "migrated",
      ...await persistScoringGeneration({ report, modelDocument, scoredDocument }),
    };
  }

  const onlineArtifact = await readJson(config.paths.model);
  const activeOnline = await ModelVersion.findOne({ kind: "online-ridge", status: "active" }).lean();
  if (activeOnline) {
    result.online = { status: "already-migrated", modelId: activeOnline.modelId };
  } else {
    const version = onlineArtifact.locationModelVersion || "online-ridge-v1";
    const modelId = `online-${version}-${Date.now()}`.replace(/[^A-Za-z0-9_-]/g, "-");
    await ModelVersion.create({
      modelId,
      kind: "online-ridge",
      version,
      status: "active",
      generatedAt: onlineArtifact.updatedAt || new Date(),
      promotedAt: new Date(),
      archivedAt: null,
      parentModelId: null,
      trainingRunId: null,
      dataset: { count: onlineArtifact.trainedObservations || 0 },
      metrics: { modelCount: Object.keys(onlineArtifact.models || {}).length },
      artifact: onlineArtifact,
    });
    result.online = { status: "migrated", modelId };
  }
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} finally {
  await mongoose.disconnect();
}
