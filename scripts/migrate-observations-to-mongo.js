import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import { ListingObservation } from "../src/models/listingObservation.js";
import { _jsonHelpers } from "../src/storage/jsonStore.js";

const serviceRoot = path.resolve(new URL("..", import.meta.url).pathname);
const observationsRoot = path.join(serviceRoot, "data", "observations");
const reportRoot = path.join(serviceRoot, "data", "migrations");

async function writeAtomic(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(temporary, file);
}

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");
await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB_NAME || "owj_market_analytics",
  serverSelectionTimeoutMS: 30_000,
});

try {
  await ListingObservation.init();
  const startedAt = new Date().toISOString();
  const names = (await fs.readdir(observationsRoot)).filter((name) => name.endsWith(".json")).sort();
  let sourceObservations = 0;
  let validObservations = 0;
  let invalidObservations = 0;
  const invalidSamples = [];
  let operations = [];

  const flush = async () => {
    if (!operations.length) return;
    await ListingObservation.bulkWrite(operations, { ordered: false });
    operations = [];
  };

  for (const name of names) {
    const history = JSON.parse(await fs.readFile(path.join(observationsRoot, name), "utf8"));
    for (const raw of history.observations || []) {
      sourceObservations += 1;
      try {
        const snapshot = _jsonHelpers.migrateListing(raw.listing);
        const value = {
          token: snapshot.token,
          observedAt: raw.observedAt || snapshot.lastSeenAt,
          runId: raw.runId || "legacy-json-import",
          eventType: "legacy-import",
          contentFingerprint: snapshot.contentFingerprint,
          snapshot,
        };
        const validated = new ListingObservation(value);
        await validated.validate();
        const document = validated.toObject({ depopulate: true, versionKey: false });
        delete document._id;
        operations.push({
          updateOne: {
            filter: {
              token: value.token, contentFingerprint: value.contentFingerprint,
              observedAt: new Date(value.observedAt), runId: value.runId,
            },
            update: { $setOnInsert: document },
            upsert: true,
          },
        });
        validObservations += 1;
        if (operations.length >= 250) await flush();
      } catch (error) {
        invalidObservations += 1;
        if (invalidSamples.length < 20) invalidSamples.push({ file: name, error: error.message });
      }
    }
  }
  await flush();
  const completedAt = new Date().toISOString();
  const report = {
    schemaVersion: "1.0.0",
    migration: "listing-observations-json-to-mongodb-v1",
    startedAt,
    completedAt,
    sourceFiles: names.length,
    sourceObservations,
    validObservations,
    invalidObservations,
    mongoObservations: await ListingObservation.countDocuments({}),
    invalidSamples,
  };
  const reportFile = path.join(reportRoot, `observation-migration-${completedAt.replace(/[:.]/g, "-")}.json`);
  await writeAtomic(reportFile, report);
  process.stdout.write(`${JSON.stringify({ ...report, reportFile }, null, 2)}\n`);
} finally {
  await mongoose.disconnect();
}
