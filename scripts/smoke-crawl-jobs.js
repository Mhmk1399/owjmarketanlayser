import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import mongoose from "mongoose";
import { config } from "../src/config.js";
import { AreaCrawlJob, CrawlCycle } from "../src/models/crawlJob.js";
import { Listing } from "../src/models/listing.js";
import { ListingObservation } from "../src/models/listingObservation.js";
import { ListingActivity } from "../src/models/listingActivity.js";
import { DurableCrawlQueue } from "../src/collector/durableCrawlQueue.js";
import { runDurableCycle } from "../src/collector/runDurableCycle.js";
import { MongoMarketStore } from "../src/storage/mongoMarketStore.js";
import { toPublicMarketListing } from "../src/collector/publicListing.js";

if (!config.mongoUri) throw new Error("MONGODB_URI is required");
const prefix = `__owj_collection_smoke_${randomUUID().replaceAll("-", "")}`;
const temporary = [];
const started = Date.now();
const createTemporaryModel = (source, suffix) => {
  const name = `${prefix}_${suffix}`;
  const model = mongoose.model(name, source.schema.clone(), name);
  temporary.push(model);
  return model;
};
const area = (id) => ({ id, name: `Test area ${id}`, slug: `test-area-${id}` });
await mongoose.connect(config.mongoUri, {
  dbName: config.mongoDbName, autoIndex: false, maxPoolSize: 2, serverSelectionTimeoutMS: 15_000,
});
try {
  const jobs = createTemporaryModel(AreaCrawlJob, "jobs");
  const cycles = createTemporaryModel(CrawlCycle, "cycles");
  const listings = createTemporaryModel(Listing, "listings");
  const observations = createTemporaryModel(ListingObservation, "observations");
  const activities = createTemporaryModel(ListingActivity, "activities");
  for (const model of temporary) await model.createIndexes();
  const queue = new DurableCrawlQueue({ jobModel: jobs, cycleModel: cycles });
  await queue.init();
  const cycle = await queue.open({ partitions: [1, 2].map((id) => ({ area: area(id), limit: 2 })), owner: "old-worker" });
  await assert.rejects(queue.open({ partitions: [], owner: "other-worker" }), /leased/);
  const first = await queue.claim(cycle.cycleId, "old-worker");
  await queue.checkpoint(first, "old-worker", {
    stage: "details", stagePriority: 200, discoveryComplete: true, stopReason: "source-exhausted",
    candidates: [{ token: "already-discovered", work: "new-detail", outcome: "pending" }],
    status: "queued", leaseOwner: null, leaseUntil: null, attempts: 0,
  });
  const interrupted = await queue.claim(cycle.cycleId, "old-worker");
  await cycles.updateOne({ cycleId: cycle.cycleId }, { $set: { leaseUntil: new Date(0) } });
  await jobs.updateOne({ jobId: interrupted.jobId }, { $set: { leaseUntil: new Date(0) } });
  await assert.rejects(queue.checkpoint(interrupted, "old-worker", { cursor: 9 }), /lease was lost/);
  const resumed = await queue.open({ partitions: [], owner: "new-worker" });
  assert.equal(resumed.cycleId, cycle.cycleId);
  const searched = [];
  const result = await runDurableCycle({
    queue, cycle: resumed, owner: "new-worker", existing: async () => null,
    search: async (item) => { searched.push(item.id); return {
      listings: [{ token: "second-ad" }], stopReason: "source-exhausted",
    }; },
    detail: async () => ({ success: true, changed: true }), confirm: async () => {},
  });
  assert.deepEqual(searched, [interrupted.area.id]);
  assert.equal(result.progress.newListings, 2);
  assert.equal(result.pending, false);
  await queue.complete(cycle.cycleId, "new-worker");
  assert.equal((await cycles.findOne({ cycleId: cycle.cycleId }).lean()).status, "completed");

  const store = new MongoMarketStore({}, { warn() {}, info() {}, error() {} }, {
    listingModel: listings, observationModel: observations, activityModel: activities,
  });
  store.mongo = { connection: mongoose.connection };
  const record = toPublicMarketListing({
    token: "smoke-ad", url: "https://divar.ir/v/smoke-ad", title: "Smoke fixture",
    subcategory: "buy-residential-apartment", city: "تهران", neighborhood: "اتابک",
    sourceNeighborhoodSlug: "atabak", property: { area: 80, rooms: 2, constructionYear: 1399 },
    pricing: { price: 8_000_000_000 }, amenities: {}, images: [],
    advertiser: { type: "personal" }, coordinates: { latitude: 35.7, longitude: 51.4 },
    quality: { score: 100, missingFields: [] },
  }, null, new Date().toISOString(), {
    category: "buy-apartment", expectedSubcategory: "buy-residential-apartment",
    area: { id: 1019, name: "اتابک", slug: "atabak", municipalDistricts: [14] },
  });
  await store.upsertListing(record, "smoke-cycle");
  await store.upsertListing(record, "smoke-cycle");
  await store.upsertListing(record, "smoke-cycle");
  assert.equal(await activities.countDocuments({ type: "new-listing" }), 1);
  assert.equal(await activities.countDocuments({ type: "unchanged" }), 1);
  assert.equal(await observations.countDocuments({}), 1);
  await store.confirmListingSeen(record.token, "smoke-cycle", "2026-11-07T01:00:00.000Z");
  assert.equal((await listings.findOne({ token: record.token }).lean()).lastSeenAt.toISOString(), "2026-11-07T01:00:00.000Z");
  for (let index = 1; index <= 3; index += 1) {
    const settings = { runId: `missing-${index}`, observedTokens: [], completedAreaIds: [1019], removalThreshold: 3 };
    await store.reconcileLifecycle(settings);
    await store.reconcileLifecycle(settings);
    assert.equal((await listings.findOne({ token: record.token }).lean()).lifecycle.consecutiveMisses, index);
  }
  assert.equal(await activities.countDocuments({ type: "removed", basis: "coverage-inference" }), 1);
  await store.confirmListingSeen(record.token, "smoke-return");
  assert.equal(await activities.countDocuments({ type: "reappeared" }), 1);
  console.log(JSON.stringify({
    status: "passed", checks: ["exclusive-cycle-lease", "expired-worker-fence", "restart-checkpoint", "stage-priority", "transactional-history", "event-idempotence", "lifecycle-idempotence"],
    elapsedMs: Date.now() - started, rssMiB: Math.round(process.memoryUsage().rss / 1048576),
    listingDataTouched: false,
  }));
} finally {
  // Only uniquely named collections created by this invocation are removed.
  for (const model of temporary) {
    if (!model.collection.name.startsWith(`${prefix}_`)) throw new Error("Unsafe smoke cleanup target");
    await model.collection.drop().catch((error) => { if (error.code !== 26) throw error; });
  }
  await mongoose.disconnect();
}
