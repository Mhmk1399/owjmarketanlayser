import { performance } from "node:perf_hooks";
import mongoose from "mongoose";
import { toPublicMarketListing } from "../src/collector/publicListing.js";
import { Listing } from "../src/models/listing.js";
import { MongoMarketStore } from "../src/storage/mongoMarketStore.js";
import { normalizeBuyerMatchRequest } from "../src/search/buyerMatcher.js";

const DATABASE = "owj_analytics_s4_synthetic";
const logger = { info() {}, warn() {}, error() {}, debug() {} };

function argument(name, fallback) {
  const prefix = `${name}=`;
  const value = process.argv.find((item) => item.startsWith(prefix))?.slice(prefix.length);
  return value ?? fallback;
}

function integer(name, fallback, minimum, maximum) {
  const value = Number.parseInt(argument(name, fallback), 10);
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new Error(`${name} must be between ${minimum} and ${maximum}`);
  }
  return value;
}

function localMongoUri() {
  const value = process.env.SPRINT4_SYNTHETIC_MONGODB_URI || "mongodb://127.0.0.1:27028";
  const parsed = new URL(value);
  if (!new Set(["localhost", "127.0.0.1", "::1"]).has(parsed.hostname)) {
    throw new Error("Sprint 4 benchmark refuses non-loopback MongoDB hosts");
  }
  if (parsed.username || parsed.password) {
    throw new Error("Sprint 4 benchmark refuses credentials; use an isolated local MongoDB instance");
  }
  return value;
}

const count = integer("--count", 14_000, 1_000, 50_000);
const iterations = integer("--iterations", 30, 5, 200);
const apply = process.argv.includes("--apply");
const skipSeed = process.argv.includes("--skip-seed");
const uri = localMongoUri();
const neighborhoods = [
  [101, "ونک", "vanak"], [102, "یوسف‌آباد", "yousef-abad"],
  [103, "سعادت‌آباد", "saadat-abad"], [104, "قلهک", "qolhak"],
  [105, "نارمک", "narmak"], [106, "تهران‌پارس", "tehran-pars"],
  [107, "پونک", "punak"], [108, "جنت‌آباد", "jannat-abad"],
  [109, "مرزداران", "marzdaran"], [110, "هروی", "heravi"],
];

function syntheticListing(index) {
  const [areaId, neighborhood, slug] = neighborhoods[index % neighborhoods.length];
  const area = 55 + index % 145;
  const pricePerMeter = 75_000_000 + (index % 80) * 1_000_000;
  const seenAt = new Date(Date.UTC(2026, 10, 23) - (index % 45) * 3_600_000).toISOString();
  return toPublicMarketListing({
    token: `s4-synthetic-${String(index).padStart(6, "0")}`,
    url: `https://example.invalid/sprint4/${index}`,
    title: `واحد مصنوعی شماره ${index}`,
    description: "داده عمومی کاملاً مصنوعی برای سنجش محلی؛ آگهی واقعی نیست.",
    category: "real-estate", subcategory: "buy-residential-apartment",
    city: "تهران", neighborhood, sourceNeighborhoodSlug: slug,
    extractionSource: "sprint4-synthetic-benchmark", attributes: [],
    property: { area, constructionYear: 1380 + index % 44, rooms: 1 + index % 4 },
    pricing: { price: area * pricePerMeter },
    amenities: { elevator: index % 5 !== 0, parking: index % 3 !== 0, storage: index % 2 === 0 },
    advertiser: { type: index % 4 ? "personal" : "real-estate-business", isBusiness: index % 4 === 0 },
    images: [], coordinates: {
      latitude: 35.65 + (index % 100) / 1_000,
      longitude: 51.32 + (index % 120) / 1_000,
      source: "sprint4-synthetic-benchmark",
    },
    quality: { score: 100, missingFields: [] },
  }, null, seenAt, {
    category: "buy-apartment", expectedSubcategory: "buy-residential-apartment",
    area: { id: areaId, name: neighborhood, slug, municipalDistricts: [3 + index % 13] },
  });
}

function percentile(values, fraction) {
  const sorted = [...values].sort((a, b) => a - b);
  return Number(sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * fraction))].toFixed(3));
}

function memory() {
  const value = process.memoryUsage();
  return Object.fromEntries(["rss", "heapUsed", "heapTotal", "external"]
    .map((key) => [key, Number((value[key] / 1_048_576).toFixed(2))]));
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

async function timed(operation) {
  const started = performance.now();
  await operation();
  return performance.now() - started;
}

const output = {
  safety: {
    syntheticOnly: true, host: new URL(uri).hostname, database: DATABASE,
    credentialsAccepted: false, externalProvidersCalled: false,
  },
  parameters: { count, iterations, apply, skipSeed },
  machine: { platform: process.platform, arch: process.arch, node: process.version, cpu: process.env.PROCESSOR_IDENTIFIER || null },
};

if (!apply) {
  process.stdout.write(`${JSON.stringify({ ...output, status: "dry-run", next: "Re-run with --apply against an isolated local MongoDB." }, null, 2)}\n`);
  process.exit(0);
}

try {
  await mongoose.connect(uri, {
    dbName: DATABASE, autoCreate: true, autoIndex: false,
    serverSelectionTimeoutMS: 5_000, maxPoolSize: 5, minPoolSize: 0,
  });
  await Listing.createCollection().catch((error) => {
    if (error.codeName !== "NamespaceExists") throw error;
  });
  const seedStarted = performance.now();
  if (!skipSeed) {
    for (let offset = 0; offset < count; offset += 500) {
      const batch = Array.from({ length: Math.min(500, count - offset) }, (_, index) => syntheticListing(offset + index));
      await Listing.bulkWrite(batch.map((listing) => ({ replaceOne: {
        filter: { token: listing.token }, replacement: listing, upsert: true,
      } })), { ordered: false });
    }
  }
  output.seed = {
    mode: skipSeed ? "reused-existing-synthetic" : "upserted-synthetic",
    elapsedMs: Number((performance.now() - seedStarted).toFixed(2)), documents: await Listing.countDocuments({}),
  };
  const indexStarted = performance.now();
  await Listing.createIndexes();
  output.indexBuild = { elapsedMs: Number((performance.now() - indexStarted).toFixed(2)), names: (await Listing.collection.indexes()).map((item) => item.name).sort() };

  global.gc?.();
  const beforeFull = memory();
  const fullStarted = performance.now();
  let documents = await Listing.find({}).lean();
  const fullMap = new Map(documents.map((item) => [item.token, item]));
  output.legacyHydration = {
    elapsedMs: Number((performance.now() - fullStarted).toFixed(2)), entries: fullMap.size,
    memoryBeforeMiB: beforeFull, memoryAfterMiB: memory(),
  };
  documents = null;
  fullMap.clear();
  global.gc?.();
  const beforeBounded = memory();
  const boundedStarted = performance.now();
  const boundedDocuments = await Listing.find({}).sort({ lastSeenAt: -1, token: 1 }).limit(5_000).lean();
  const boundedStore = new MongoMarketStore({}, logger, { listingCacheLimit: 5_000, processRole: "benchmark" });
  boundedStore.hydrateListingCache(boundedDocuments, output.seed.documents);
  output.boundedHydration = {
    elapsedMs: Number((performance.now() - boundedStarted).toFixed(2)), entries: boundedStore.listings.size,
    memoryBeforeMiB: beforeBounded, memoryAfterMiB: memory(), cache: boundedStore.cacheStatus(),
  };

  const collection = Listing.collection;
  const newest = () => collection.find({}, { projection: { token: 1, title: 1, lastSeenAt: 1 } })
    .sort({ lastSeenAt: -1, token: 1 }).limit(40).toArray();
  const filteredQuery = {
    $and: [
      { "lifecycle.status": "active" }, { "quality.outcome": "scoring-ready" },
      { subcategory: "buy-residential-apartment" }, { neighborhood: "ونک" },
      { "pricing.price": { $gte: 5_000_000_000, $lte: 25_000_000_000 } },
    ],
  };
  const filtered = () => collection.find(filteredQuery, { projection: { token: 1, pricing: 1, property: 1, lastSeenAt: 1 } })
    .sort({ lastSeenAt: -1, token: 1 }).limit(40).toArray();
  await newest();
  await filtered();
  const newestTimes = [];
  const filteredTimes = [];
  for (let index = 0; index < iterations; index += 1) {
    newestTimes.push(await timed(newest));
    filteredTimes.push(await timed(filtered));
  }
  output.latencyMs = {
    newest: { p50: percentile(newestTimes, 0.50), p95: percentile(newestTimes, 0.95) },
    filtered: { p50: percentile(filteredTimes, 0.50), p95: percentile(filteredTimes, 0.95) },
  };
  output.queryPlans = {
    newest: explainSummary(await collection.find({}, { projection: { token: 1, lastSeenAt: 1 } })
      .sort({ lastSeenAt: -1, token: 1 }).limit(40).explain("executionStats")),
    filtered: explainSummary(await collection.find(filteredQuery, { projection: { token: 1, lastSeenAt: 1 } })
      .sort({ lastSeenAt: -1, token: 1 }).limit(40).explain("executionStats")),
    detail: explainSummary(await collection.find({ token: "s4-synthetic-007000" }, { projection: { token: 1, title: 1 } })
      .limit(1).explain("executionStats")),
    lifecycle: explainSummary(await collection.find({
      "crawlPartition.area.id": { $in: [101, 102] },
      "lifecycle.lastReconciledCycleId": { $ne: "synthetic-cycle" },
    }, { projection: { token: 1, lifecycle: 1 } }).explain("executionStats")),
  };

  const matchStore = new MongoMarketStore({}, logger, { listingCacheLimit: 0 });
  matchStore.mongo = { benchmark: true };
  const requirement = normalizeBuyerMatchRequest({
    transactionType: "buy", propertyTypes: ["buy-residential-apartment"], locations: ["ونک"],
    minPrice: 5_000_000_000, maxPrice: 25_000_000_000, minArea: 60, maxArea: 160,
    requiredAmenities: ["storage"], optionalAmenities: ["elevator", "parking"],
  });
  const buyerTimes = [];
  let buyerResult;
  for (let index = 0; index < Math.min(10, iterations); index += 1) {
    const started = performance.now();
    buyerResult = await matchStore.matchBuyerRequirement(requirement, { limit: 30, candidateLimit: 500, queryMaxTimeMs: 2_000 });
    buyerTimes.push(performance.now() - started);
  }
  output.buyerMatch = {
    p50Ms: percentile(buyerTimes, 0.50), p95Ms: percentile(buyerTimes, 0.95),
    total: buyerResult.total, evaluated: buyerResult.evaluated,
    returned: buyerResult.matches.length, truncated: buyerResult.truncated,
  };
  const stats = await mongoose.connection.db.command({ dbStats: 1, scale: 1 });
  output.database = {
    dataSizeBytes: stats.dataSize, storageSizeBytes: stats.storageSize,
    indexSizeBytes: stats.indexSize, totalSizeBytes: stats.totalSize,
  };
  output.finalMemoryMiB = memory();
  output.status = "completed";
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
} finally {
  await mongoose.disconnect().catch(() => {});
}
