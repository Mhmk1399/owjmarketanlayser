import "dotenv/config";
import mongoose from "mongoose";
import { config } from "../src/config.js";

if (!config.mongoUri) throw new Error("MONGODB_URI is required");
const apply = process.argv.includes("--apply");
const definitions = [
  {
    name: "active_score_rank",
    keys: { modelId: 1, rank: 1 },
  },
  {
    name: "catalog_score_filters",
    keys: { modelId: 1, band: 1, recommendation: -1, confidence: -1, risk: 1 },
  },
];

await mongoose.connect(config.mongoUri, {
  dbName: config.mongoDbName,
  autoIndex: false,
  serverSelectionTimeoutMS: 30_000,
});
try {
  const collection = mongoose.connection.collection("listingscores");
  const existing = await collection.indexes();
  const indexes = [];
  for (const definition of definitions) {
    const present = existing.some((index) => index.name === definition.name);
    if (apply && !present) {
      await collection.createIndex(definition.keys, { name: definition.name, background: true });
    }
    indexes.push({
      ...definition,
      status: present ? "present" : apply ? "created" : "missing",
      rollback: `db.listingscores.dropIndex(${JSON.stringify(definition.name)})`,
    });
  }
  process.stdout.write(`${JSON.stringify({
    mode: apply ? "apply" : "dry-run",
    database: mongoose.connection.name,
    collection: collection.collectionName,
    indexes,
  }, null, 2)}\n`);
} finally {
  await mongoose.disconnect();
}
