import "dotenv/config";
import mongoose from "mongoose";
import { config } from "../src/config.js";

if (!config.mongoUri) throw new Error("MONGODB_URI is required");
const apply = process.argv.includes("--apply");
const definitions = [
  {
    name: "buyer_match_location_price",
    keys: { "lifecycle.status": 1, "quality.outcome": 1, subcategory: 1, neighborhood: 1, "pricing.price": 1 },
  },
  {
    name: "buyer_match_location_property",
    keys: { "lifecycle.status": 1, "quality.outcome": 1, subcategory: 1, neighborhood: 1, "property.area": 1, "property.rooms": 1 },
  },
  {
    name: "buyer_match_rent",
    keys: { "lifecycle.status": 1, "quality.outcome": 1, subcategory: 1, "pricing.deposit": 1, "pricing.rent": 1 },
  },
  {
    name: "buyer_match_location_recent",
    keys: { "lifecycle.status": 1, "quality.outcome": 1, subcategory: 1, neighborhood: 1, lastSeenAt: -1, token: 1 },
  },
];

await mongoose.connect(config.mongoUri, {
  dbName: config.mongoDbName,
  autoIndex: false,
  serverSelectionTimeoutMS: 30_000,
});
try {
  const collection = mongoose.connection.collection("listings");
  const existing = await collection.indexes();
  const existingNames = new Set(existing.map((index) => index.name));
  const plan = definitions.map((definition) => ({
    ...definition,
    status: existingNames.has(definition.name) ? "present" : apply ? "create" : "missing",
  }));
  if (apply) {
    for (const definition of plan.filter((item) => item.status === "create")) {
      await collection.createIndex(definition.keys, { name: definition.name, background: true });
    }
  }
  process.stdout.write(`${JSON.stringify({
    mode: apply ? "apply" : "dry-run",
    database: mongoose.connection.name,
    collection: collection.collectionName,
    plan,
    rollback: definitions.map(({ name }) => `db.listings.dropIndex(${JSON.stringify(name)})`),
  }, null, 2)}\n`);
} finally {
  await mongoose.disconnect();
}
