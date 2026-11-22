import mongoose from "mongoose";
import { config } from "../src/config.js";
import {
  ANALYTICS_MODELS,
  ANALYTICS_SCHEMA_VERSION,
  databasePlan,
  validateAnalyticsDatabaseTarget,
} from "../src/storage/analyticsDatabasePlan.js";

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const apply = process.argv.includes("--apply");
const backupConfirmed = process.argv.includes("--backup-confirmed");
const confirmedName = argument("--confirm-database");
const databaseName = validateAnalyticsDatabaseTarget(config.mongoDbName, apply ? confirmedName : null);

if (!config.mongoUri) throw new Error("MONGODB_URI is required");
if (apply && !backupConfirmed) {
  throw new Error("--apply requires --backup-confirmed after the operator verifies backup/restore readiness");
}

const output = {
  operation: apply ? "apply" : "dry-run",
  database: databaseName,
  schemaVersion: ANALYTICS_SCHEMA_VERSION,
  plan: databasePlan(),
  existingCollections: [],
  applied: [],
};

try {
  await mongoose.connect(config.mongoUri, {
    dbName: databaseName,
    autoCreate: false,
    autoIndex: false,
    serverSelectionTimeoutMS: 10_000,
    maxPoolSize: 2,
    minPoolSize: 0,
  });
  output.connection = { ok: true, hostCount: mongoose.connection.client?.options?.hosts?.length ?? null };
  output.existingCollections = (await mongoose.connection.db.listCollections({}, { nameOnly: true }).toArray())
    .map(({ name }) => name).sort();

  if (apply) {
    for (const model of ANALYTICS_MODELS) {
      const collection = model.collection.collectionName;
      if (!output.existingCollections.includes(collection)) {
        await model.createCollection();
      }
      await model.createIndexes();
      const indexes = await mongoose.connection.db.collection(collection).listIndexes().toArray();
      output.applied.push({ collection, indexNames: indexes.map(({ name }) => name).sort() });
    }
  }

  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
} finally {
  await mongoose.disconnect().catch(() => {});
}
