import { performance } from "node:perf_hooks";
import mongoose from "mongoose";
import { Listing } from "../src/models/listing.js";
import { ListingScore, ModelVersion } from "../src/models/scoringState.js";
import { buildMarketMetricsPipeline, normalizeMarketMetrics } from "../src/storage/marketMetrics.js";

const DATABASE = "owj_market_analytics";
const uri = process.env.SPRINT5_RESTORED_MONGODB_URI || "mongodb://mongodb:27017";
const parsed = new URL(uri);
const allowedHosts = new Set(["mongodb", "localhost", "127.0.0.1", "::1"]);

if (!allowedHosts.has(parsed.hostname) || parsed.username || parsed.password) {
  throw new Error("Restored-data analysis accepts only the credential-free dedicated local Analytics Mongo host");
}
if (parsed.pathname && parsed.pathname !== "/" && parsed.pathname !== `/${DATABASE}`) {
  throw new Error(`Restored-data analysis is fixed to ${DATABASE}`);
}

const output = {
  safety: {
    readOnly: true,
    localDedicatedDatabaseOnly: true,
    database: DATABASE,
    credentialsAccepted: false,
    rawListingValuesEmitted: false,
    externalProvidersCalled: false,
  },
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

  const now = new Date();
  const started = performance.now();
  const facets = await Listing.aggregate(buildMarketMetricsPipeline(now))
    .option({ maxTimeMS: 30_000, allowDiskUse: true });
  const aggregationElapsedMs = performance.now() - started;
  const activeModel = await ModelVersion.findOne({ kind: "batch-price", status: "active" })
    .select({ _id: 0, modelId: 1, generatedAt: 1 }).maxTimeMS(5_000).lean();
  const activeScoreCount = activeModel
    ? await ListingScore.countDocuments({ modelId: activeModel.modelId }).maxTimeMS(5_000)
    : 0;
  const metrics = normalizeMarketMetrics(facets[0], {
    activeModel,
    activeScoreCount,
    generatedAt: now.toISOString(),
  });

  const [databaseStats, collectionStats, indexes] = await Promise.all([
    mongoose.connection.db.command({ dbStats: 1, scale: 1 }),
    mongoose.connection.db.command({ collStats: Listing.collection.name, scale: 1 }),
    Listing.collection.indexes(),
  ]);

  output.aggregation = {
    elapsedMs: Number(aggregationElapsedMs.toFixed(2)),
    deadlineMs: 30_000,
    scope: metrics.scope,
    listingCount: metrics.summary.total || 0,
    lifecycle: metrics.classifications.lifecycle,
    freshness: {
      latestListingAt: metrics.summary.latestListingAt,
      notObservedWithin7Days: metrics.summary.notObservedWithin7Days || 0,
    },
    missingCharacteristics: metrics.summary.missingPropertyCharacteristics || 0,
    missingPricing: metrics.summary.missingPricing || 0,
    insufficientComparableSignals: metrics.summary.insufficientComparableSignals || 0,
    scoring: metrics.scoring,
    coverage: metrics.coverage,
    neighborhoodCountReported: metrics.neighborhoods.length,
    neighborhoodLimit: metrics.limits.neighborhoods,
    priceDistribution: metrics.priceDistribution,
    rawValuesRedacted: true,
  };
  output.database = {
    collections: databaseStats.collections,
    objects: databaseStats.objects,
    dataSizeBytes: databaseStats.dataSize,
    storageSizeBytes: databaseStats.storageSize,
    indexSizeBytes: databaseStats.indexSize,
    totalSizeBytes: databaseStats.totalSize,
    listingStorageSizeBytes: collectionStats.storageSize,
    listingIndexSizeBytes: collectionStats.totalIndexSize,
    listingIndexCount: indexes.length,
    listingIndexes: indexes.map((index) => index.name).sort(),
  };
  output.status = "completed";
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
} finally {
  await mongoose.disconnect().catch(() => {});
}
