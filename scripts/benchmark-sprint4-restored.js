import { performance } from "node:perf_hooks";
import mongoose from "mongoose";
import { Listing } from "../src/models/listing.js";
import { MongoMarketStore } from "../src/storage/mongoMarketStore.js";
import { normalizeBuyerMatchRequest } from "../src/search/buyerMatcher.js";

const DATABASE = "owj_market_analytics";
const uri = process.env.SPRINT4_RESTORED_MONGODB_URI || "mongodb://mongodb:27017";
const parsed = new URL(uri);
const allowedHosts = new Set(["mongodb", "localhost", "127.0.0.1", "::1"]);
if (!allowedHosts.has(parsed.hostname) || parsed.username || parsed.password) {
  throw new Error("Restored-data benchmark accepts only the credential-free dedicated local Analytics Mongo host");
}
if (parsed.pathname && parsed.pathname !== "/" && parsed.pathname !== `/${DATABASE}`) {
  throw new Error(`Restored-data benchmark is fixed to ${DATABASE}`);
}

const iterations = Math.max(5, Math.min(100, Number.parseInt(
  process.argv.find((item) => item.startsWith("--iterations="))?.split("=")[1] || "30",
  10,
)));
if (!Number.isInteger(iterations)) throw new Error("--iterations must be an integer");
const cacheMode = process.argv.find((item) => item.startsWith("--cache-mode="))?.split("=")[1] || "both";
if (!new Set(["legacy", "bounded", "both"]).has(cacheMode)) {
  throw new Error("--cache-mode must be legacy, bounded, or both");
}

const logger = { info() {}, warn() {}, error() {}, debug() {} };
const memory = () => Object.fromEntries(["rss", "heapUsed", "heapTotal", "external"]
  .map((key) => [key, Number((process.memoryUsage()[key] / 1_048_576).toFixed(2))]));

function percentile(values, fraction) {
  const sorted = [...values].sort((left, right) => left - right);
  return Number(sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * fraction))].toFixed(3));
}

function indexNames(plan, names = new Set()) {
  if (!plan || typeof plan !== "object") return [...names];
  if (plan.indexName) names.add(plan.indexName);
  for (const value of Object.values(plan)) {
    if (value && typeof value === "object") indexNames(value, names);
  }
  return [...names].sort();
}

function explainSummary(explain) {
  const stats = explain.executionStats || {};
  return {
    executionTimeMillis: stats.executionTimeMillis ?? null,
    totalKeysExamined: stats.totalKeysExamined ?? null,
    totalDocsExamined: stats.totalDocsExamined ?? null,
    nReturned: stats.nReturned ?? null,
    indexes: indexNames(explain.queryPlanner?.winningPlan),
    rejectedPlans: explain.queryPlanner?.rejectedPlans?.length ?? null,
  };
}

async function samples(operation) {
  await operation();
  const values = [];
  for (let index = 0; index < iterations; index += 1) {
    const started = performance.now();
    await operation();
    values.push(performance.now() - started);
  }
  return { p50: percentile(values, 0.5), p95: percentile(values, 0.95) };
}

const output = {
  safety: {
    readOnly: true,
    localDedicatedDatabaseOnly: true,
    database: DATABASE,
    credentialsAccepted: false,
    listingValuesEmitted: false,
    externalProvidersCalled: false,
  },
  parameters: { iterations, cacheMode },
  machine: { platform: process.platform, arch: process.arch, node: process.version },
};

try {
  await mongoose.connect(uri, {
    dbName: DATABASE,
    autoCreate: false,
    autoIndex: false,
    serverSelectionTimeoutMS: 5_000,
    maxPoolSize: 5,
    minPoolSize: 0,
  });
  const collection = Listing.collection;
  const total = await Listing.countDocuments({});

  if (cacheMode !== "bounded") {
    global.gc?.();
    const legacyBefore = memory();
    const legacyStarted = performance.now();
    const documents = await Listing.find({}).sort({ lastSeenAt: -1, token: 1 }).lean();
    const legacyStore = new MongoMarketStore({}, logger, {
      listingCacheLimit: documents.length,
      processRole: "restored-benchmark-legacy",
    });
    legacyStore.hydrateListingCache(documents, total);
    output.legacyHydration = {
      elapsedMs: Number((performance.now() - legacyStarted).toFixed(2)),
      entries: legacyStore.listings.size,
      memoryBeforeMiB: legacyBefore,
      memoryAfterMiB: memory(),
    };
    legacyStore.listings.clear();
    global.gc?.();
  }

  if (cacheMode !== "legacy") {
    global.gc?.();
    const boundedBefore = memory();
    const boundedStarted = performance.now();
    const boundedDocuments = await Listing.find({}).sort({ lastSeenAt: -1, token: 1 }).limit(5_000).lean();
    const boundedStore = new MongoMarketStore({}, logger, {
      listingCacheLimit: 5_000,
      processRole: "restored-benchmark-bounded",
    });
    boundedStore.hydrateListingCache(boundedDocuments, total);
    output.boundedHydration = {
      elapsedMs: Number((performance.now() - boundedStarted).toFixed(2)),
      entries: boundedStore.listings.size,
      memoryBeforeMiB: boundedBefore,
      memoryAfterMiB: memory(),
      cache: boundedStore.cacheStatus(),
    };
  }

  const representative = (await collection.aggregate([
    { $match: {
      "lifecycle.status": "active",
      "quality.outcome": "scoring-ready",
      subcategory: { $type: "string" },
      neighborhood: { $type: "string" },
      "pricing.price": { $type: "number" },
    } },
    { $group: {
      _id: { subcategory: "$subcategory", neighborhood: "$neighborhood" },
      count: { $sum: 1 }, minimumPrice: { $min: "$pricing.price" }, maximumPrice: { $max: "$pricing.price" },
    } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]).toArray())[0];
  const detail = await collection.findOne({}, { projection: { _id: 0, token: 1 } });
  const area = (await collection.aggregate([
    { $match: { "crawlPartition.area.id": { $type: "number" } } },
    { $group: { _id: "$crawlPartition.area.id", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]).toArray())[0];
  if (!representative || !detail || !area) throw new Error("Restored database lacks representative query records");

  const newestQuery = () => collection.find({}, { projection: { _id: 0, token: 1, lastSeenAt: 1 } })
    .sort({ lastSeenAt: -1, token: 1 }).limit(40).toArray();
  const filteredShape = {
    "lifecycle.status": "active",
    "quality.outcome": "scoring-ready",
    subcategory: representative._id.subcategory,
    neighborhood: representative._id.neighborhood,
    "pricing.price": { $gte: representative.minimumPrice, $lte: representative.maximumPrice },
  };
  const filteredQuery = () => collection.find(filteredShape, { projection: { _id: 0, token: 1, lastSeenAt: 1 } })
    .sort({ lastSeenAt: -1, token: 1 }).limit(40).toArray();
  const detailQuery = () => collection.find({ token: detail.token }, { projection: { _id: 0, token: 1 } }).limit(1).toArray();
  const lifecycleShape = {
    "crawlPartition.area.id": { $in: [area._id] },
    "lifecycle.lastReconciledCycleId": { $ne: "read-only-benchmark-never-written" },
    "lifecycle.lastConfirmedRunId": { $ne: "read-only-benchmark-never-written" },
  };
  const lifecycleQuery = () => collection.find(lifecycleShape, { projection: {
    _id: 0, token: 1, lifecycle: 1, lastSeenAt: 1, "crawlPartition.area.id": 1,
  } }).toArray();

  output.latencyMs = {
    newest: await samples(newestQuery),
    filtered: await samples(filteredQuery),
    detail: await samples(detailQuery),
    lifecycleAreaStreamShape: await samples(lifecycleQuery),
  };
  output.queryPlans = {
    newest: explainSummary(await collection.find({}, { projection: { _id: 0, token: 1, lastSeenAt: 1 } })
      .sort({ lastSeenAt: -1, token: 1 }).limit(40).explain("executionStats")),
    filtered: explainSummary(await collection.find(filteredShape, { projection: { _id: 0, token: 1, lastSeenAt: 1 } })
      .sort({ lastSeenAt: -1, token: 1 }).limit(40).explain("executionStats")),
    detail: explainSummary(await collection.find({ token: detail.token }, { projection: { _id: 0, token: 1 } })
      .limit(1).explain("executionStats")),
    lifecycleAreaStreamShape: explainSummary(await collection.find(lifecycleShape, { projection: {
      _id: 0, token: 1, lifecycle: 1, lastSeenAt: 1, "crawlPartition.area.id": 1,
    } }).explain("executionStats")),
  };
  output.representativeShape = {
    filteredPopulation: representative.count,
    lifecycleAreaPopulation: area.count,
    actualValuesRedacted: true,
  };

  const matchStore = new MongoMarketStore({}, logger, { listingCacheLimit: 0 });
  matchStore.mongo = { benchmark: true };
  const requirement = normalizeBuyerMatchRequest({
    transactionType: "buy",
    propertyTypes: [representative._id.subcategory],
    locations: [representative._id.neighborhood],
    minPrice: representative.minimumPrice,
    maxPrice: representative.maximumPrice,
  });
  const buyerTimes = [];
  let buyerResult;
  for (let index = 0; index < Math.min(10, iterations); index += 1) {
    const started = performance.now();
    buyerResult = await matchStore.matchBuyerRequirement(requirement, {
      limit: 30,
      candidateLimit: 500,
      queryMaxTimeMs: 2_000,
    });
    buyerTimes.push(performance.now() - started);
  }
  output.buyerMatch = {
    p50Ms: percentile(buyerTimes, 0.5),
    p95Ms: percentile(buyerTimes, 0.95),
    total: buyerResult.total,
    evaluated: buyerResult.evaluated,
    returned: buyerResult.matches.length,
    truncated: buyerResult.truncated,
    criteriaValuesRedacted: true,
  };

  const stats = await mongoose.connection.db.command({ dbStats: 1, scale: 1 });
  output.database = {
    collections: stats.collections,
    objects: stats.objects,
    dataSizeBytes: stats.dataSize,
    storageSizeBytes: stats.storageSize,
    indexSizeBytes: stats.indexSize,
    totalSizeBytes: stats.totalSize,
  };
  output.status = "completed";
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
} finally {
  await mongoose.disconnect().catch(() => {});
}
