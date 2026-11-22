import { isMainThread, workerData, parentPort } from "node:worker_threads";
import mongoose from "mongoose";
import fs from "node:fs/promises";
import path from "node:path";
import { config } from "../config.js";
import { Listing } from "../models/listing.js";
import { runScoringPipeline } from "./pipeline.js";
import { persistScoringGeneration } from "./modelRegistry.js";

export async function writeListingSnapshotFromCursor(input, documents) {
  await fs.mkdir(path.dirname(input), { recursive: true });
  const temporary = `${input}.${process.pid}.tmp`;
  const handle = await fs.open(temporary, "w");
  let count = 0;
  try {
    await handle.write(`{"schemaVersion":"1.0.0","derivedFrom":"mongodb","updatedAt":${JSON.stringify(new Date().toISOString())},"listings":[`);
    for await (const document of documents) {
      const value = typeof document?.toObject === "function" ? document.toObject() : document;
      const { _id, ...listing } = value;
      await handle.write(`${count ? "," : ""}${JSON.stringify(listing)}`);
      count += 1;
    }
    await handle.write("]}");
  } catch (error) {
    await handle.close();
    await fs.unlink(temporary).catch(() => {});
    throw error;
  }
  await handle.close();
  await fs.rename(temporary, input);
  return { count };
}

async function refreshMongoSnapshot(input) {
  if (!config.mongoUri) return;
  await mongoose.connect(config.mongoUri, {
    dbName: config.mongoDbName,
    autoIndex: false,
    serverSelectionTimeoutMS: 30_000,
    maxPoolSize: 5,
  });
  const documents = Listing.find({}).sort({ token: 1 }).allowDiskUse(true).lean().cursor({ batchSize: 500 });
  await writeListingSnapshotFromCursor(input, documents);
}

async function runWorker() {
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
}

if (!isMainThread) await runWorker();
