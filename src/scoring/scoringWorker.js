import { workerData, parentPort } from "node:worker_threads";
import mongoose from "mongoose";
import { config } from "../config.js";
import { Listing } from "../models/listing.js";
import { _jsonHelpers } from "../storage/jsonStore.js";
import { runScoringPipeline } from "./pipeline.js";
import { persistScoringGeneration } from "./modelRegistry.js";

async function refreshMongoSnapshot(input) {
  if (!config.mongoUri) return;
  await mongoose.connect(config.mongoUri, {
    dbName: config.mongoDbName,
    autoIndex: false,
    serverSelectionTimeoutMS: 30_000,
    maxPoolSize: 5,
  });
  const documents = (await Listing.find({}).sort({ token: 1 }).allowDiskUse(true).lean())
    .map(({ _id, ...listing }) => listing);
  await _jsonHelpers.writeJsonAtomic(input, {
    schemaVersion: "1.0.0",
    derivedFrom: "mongodb",
    updatedAt: new Date().toISOString(),
    listings: documents,
  });
}

try {
  const paths = workerData?.paths || {};
  await refreshMongoSnapshot(paths.input);
  const result = await runScoringPipeline({ paths }, {
    onPersist: config.mongoUri ? (documents) => persistScoringGeneration(documents) : undefined,
  });
  parentPort?.postMessage({
    ok: true,
    scoredCount: result.report?.scoring?.scoredCount ?? null,
    generatedAt: result.documents?.scoredDocument?.generatedAt ?? null,
  });
} catch (error) {
  parentPort?.postMessage({ ok: false, error: error.stack || error.message });
  process.exitCode = 1;
} finally {
  if (config.mongoUri) await mongoose.disconnect().catch(() => {});
}
