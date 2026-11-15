import mongoose from "mongoose";
import { config } from "../src/config.js";
import { AreaCrawlJob, CrawlCycle } from "../src/models/crawlJob.js";
import { ListingActivity } from "../src/models/listingActivity.js";
import { ListingPropertyLink } from "../src/models/listingPropertyLink.js";

if (!config.mongoUri) throw new Error("MONGODB_URI is required");
const apply = process.argv.includes("--apply");
await mongoose.connect(config.mongoUri, {
  dbName: config.mongoDbName, autoIndex: false, maxPoolSize: 2,
  serverSelectionTimeoutMS: 15_000,
});
try {
  const definitions = [AreaCrawlJob, CrawlCycle, ListingActivity, ListingPropertyLink].flatMap((model) => (
    model.schema.indexes().map(([keys, options]) => ({ collection: model.collection.name, keys, options }))
  ));
  definitions.push({
    collection: "listings",
    keys: { "images.url": 1, subcategory: 1, "property.area": 1 },
    options: { name: "public_property_link_candidates" },
  });
  const plan = [];
  for (const definition of definitions) {
    const collection = mongoose.connection.collection(definition.collection);
    const indexes = await collection.indexes().catch((error) => {
      if (error.code === 26) return [];
      throw error;
    });
    const existing = indexes.find((index) => JSON.stringify(index.key) === JSON.stringify(definition.keys));
    if (existing && Boolean(existing.unique) !== Boolean(definition.options.unique)) {
      throw new Error(`Incompatible index in ${definition.collection}; inspect before migration`);
    }
    const name = existing?.name || (apply ? await collection.createIndex(definition.keys, definition.options) : definition.options.name || null);
    plan.push({ collection: definition.collection, keys: definition.keys, name, status: existing ? "present" : apply ? "created" : "missing" });
  }
  let propertyLinkQuery = null;
  if (process.argv.includes("--explain")) {
    const collection = mongoose.connection.collection("listings");
    const sample = await collection.findOne({ "images.1": { $exists: true } }, {
      projection: { token: 1, subcategory: 1, "property.area": 1, images: { $slice: 20 } },
      maxTimeMS: 5_000,
    });
    if (sample) {
      const explanation = await collection.find({
        token: { $ne: sample.token }, subcategory: sample.subcategory,
        "property.area": sample.property?.area,
        "images.url": { $in: sample.images.map((image) => image.url) },
      }, { projection: { token: 1 }, limit: 10, maxTimeMS: 5_000 }).explain("executionStats");
      propertyLinkQuery = {
        executionTimeMillis: explanation.executionStats.executionTimeMillis,
        keysExamined: explanation.executionStats.totalKeysExamined,
        documentsExamined: explanation.executionStats.totalDocsExamined,
        returned: explanation.executionStats.nReturned,
        indexNames: [],
      };
      const inspectPlan = (value) => {
        if (!value || typeof value !== "object") return;
        if (value.indexName) propertyLinkQuery.indexNames.push(value.indexName);
        for (const child of Object.values(value)) {
          if (Array.isArray(child)) child.forEach(inspectPlan);
          else if (child && typeof child === "object") inspectPlan(child);
        }
      };
      inspectPlan(explanation.queryPlanner.winningPlan);
    }
  }
  console.log(JSON.stringify({
    migration: "collection-history-v1", mode: apply ? "apply" : "dry-run", plan, propertyLinkQuery,
    rollback: "Stop the crawler and use the previous image. Retain additive job/history collections; do not delete checkpoints or listing data.",
  }, null, 2));
} finally { await mongoose.disconnect(); }
