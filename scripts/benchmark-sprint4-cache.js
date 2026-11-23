import mongoose from "mongoose";
import { performance } from "node:perf_hooks";
import { Listing } from "../src/models/listing.js";
import { MongoMarketStore } from "../src/storage/mongoMarketStore.js";

const uri = process.env.SPRINT4_SYNTHETIC_MONGODB_URI || "mongodb://127.0.0.1:27028";
const parsed = new URL(uri);
if (!new Set(["localhost", "127.0.0.1", "::1"]).has(parsed.hostname) || parsed.username || parsed.password) {
  throw new Error("Cache benchmark accepts only credential-free loopback MongoDB");
}
const mode = process.argv.find((item) => item.startsWith("--mode="))?.split("=")[1] || "bounded";
if (!new Set(["legacy", "bounded"]).has(mode)) throw new Error("--mode must be legacy or bounded");
const limit = mode === "bounded" ? 5_000 : 0;
const logger = { info() {}, warn() {}, error() {}, debug() {} };
const memory = () => Object.fromEntries(Object.entries(process.memoryUsage())
  .map(([key, value]) => [key, Number((value / 1_048_576).toFixed(2))]));

try {
  await mongoose.connect(uri, {
    dbName: "owj_analytics_s4_synthetic", autoCreate: false, autoIndex: false,
    serverSelectionTimeoutMS: 5_000, maxPoolSize: 2, minPoolSize: 0,
  });
  global.gc?.();
  const before = memory();
  const started = performance.now();
  let query = Listing.find({}).sort({ lastSeenAt: -1, token: 1 });
  if (limit) query = query.limit(limit);
  const documents = await query.lean();
  const store = new MongoMarketStore({}, logger, {
    listingCacheLimit: limit || documents.length, processRole: `benchmark-${mode}`,
  });
  store.hydrateListingCache(documents, await Listing.countDocuments({}));
  global.gc?.();
  process.stdout.write(`${JSON.stringify({
    mode, elapsedMs: Number((performance.now() - started).toFixed(2)),
    cache: store.cacheStatus(), memoryBeforeMiB: before, memoryAfterMiB: memory(),
  }, null, 2)}\n`);
} finally {
  await mongoose.disconnect().catch(() => {});
}
