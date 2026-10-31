import test from "node:test";
import assert from "node:assert/strict";
import { MongoMarketStore } from "../src/storage/mongoMarketStore.js";
import { Listing } from "../src/models/listing.js";
import { ListingObservation } from "../src/models/listingObservation.js";
import { CrawlRun, ServiceState } from "../src/models/crawlState.js";
import { toPublicMarketListing } from "../src/collector/publicListing.js";

const logger = { info() {}, warn() {}, error() {}, debug() {} };

function listing(now = "2026-10-26T00:00:00.000Z") {
  return toPublicMarketListing({
    token: "mongo-one", url: "https://divar.ir/v/mongo-one", title: "خانه",
    description: "متن عمومی", category: "real-estate", subcategory: "buy-residential-apartment",
    city: "تهران", neighborhood: "ونک", sourceNeighborhoodSlug: "vanak",
    extractionSource: "posts-v2", attributes: [], property: { area: 80, constructionYear: 1400, rooms: 2 },
    pricing: { price: 8_000_000_000 }, amenities: {},
    advertiser: { type: "personal", isBusiness: false }, images: [],
    coordinates: { latitude: 35.7, longitude: 51.4, source: "posts-v2" }, quality: { score: 100, missingFields: [] },
  }, null, now, { category: "buy-apartment", expectedSubcategory: "buy-residential-apartment", area: null });
}

test("Mongo listing pages apply filters, stable ordering, skip and a 40-item limit in MongoDB", async () => {
  const calls = [];
  const chain = {
    sort(value) { calls.push(["sort", value]); return this; },
    skip(value) { calls.push(["skip", value]); return this; },
    limit(value) { calls.push(["limit", value]); return this; },
    async lean() { return [{ _id: "private-id", token: "listing-41" }]; },
  };
  const listingModel = {
    countDocuments(filter) { calls.push(["count", filter]); return Promise.resolve(81); },
    find(filter) { calls.push(["find", filter]); return chain; },
  };
  const store = new MongoMarketStore({}, logger, { listingModel });
  const result = await store.queryListings({ offset: 40, limit: 100, status: "active", query: "a.b" });
  assert.equal(result.total, 81);
  assert.deepEqual(result.listings, [{ token: "listing-41" }]);
  assert.deepEqual(calls[0][1], calls[1][1]);
  assert.deepEqual(calls[0][1].$and[0], { "lifecycle.status": "active" });
  assert.equal(calls[0][1].$and[1].$or[0].title.$regex, "a\\.b");
  assert.deepEqual(calls.slice(2), [
    ["sort", { lastSeenAt: -1, token: 1 }], ["skip", 40], ["limit", 40],
  ]);
});

test("Mongo store persists the listing before updating its cache and records changes in Mongo", async () => {
  const calls = [];
  const listingModel = { async replaceOne(filter, value) { calls.push(["listing", filter, value]); } };
  const observationModel = { async create(value) { calls.push(["observation", value]); } };
  const store = new MongoMarketStore({}, logger, { mongoUri: "mongodb://example", listingModel, observationModel });
  const value = listing();
  const result = await store.upsertListing(value, "run-one");
  assert.deepEqual(calls.map(([kind]) => kind), ["listing", "observation"]);
  assert.equal(result.listing.lifecycle.lastConfirmedRunId, "run-one");
  assert.equal(store.getListing("mongo-one").token, "mongo-one");
  assert.equal(calls[1][1].snapshot.description, "متن عمومی");
});

test("ListingObservation is strict and validates a complete public snapshot", async () => {
  const value = listing();
  await new ListingObservation({
    token: value.token, observedAt: value.lastSeenAt, runId: "run-one",
    eventType: "created", contentFingerprint: value.contentFingerprint, snapshot: value,
  }).validate();
  assert.throws(() => new ListingObservation({ unexpected: true }), /strict mode/i);
});

test("Listing validates the enriched Neshan nearby and pedestrian route allowlist", async () => {
  const value = listing();
  value.nearbyPlaces = [{
    category: "metro-station", layer: "metro_entrance", title: "ایستگاه مترو",
    address: null, coordinates: { latitude: 35.701, longitude: 51.401 },
    distanceMeters: 420, straightLineDistanceMeters: 300,
    nearbyDistanceMeters: 450, nearbyDurationSeconds: 90,
    routeDistanceMeters: 420, routeDurationSeconds: 310, routeMode: "pedestrian",
    poiHash: "safe_public_poi_hash", source: "neshan-nearby",
    fetchedAt: "2026-10-31T00:00:00.000Z",
  }];
  await new Listing(value).validate();
  const unsafe = new Listing({ ...value, nearbyPlaces: [{ ...value.nearbyPlaces[0], phone: "021000" }] });
  await assert.rejects(() => unsafe.validate(), /StrictModeError|strict mode/i);
});

function operationalState() {
  return {
    schemaVersion: "1.0.0", updatedAt: "2026-10-26T00:00:00.000Z",
    crawl: {
      status: "completed", runId: "run-one", startedAt: "2026-10-25T23:00:00.000Z",
      endedAt: "2026-10-26T00:00:00.000Z", partition: null, area: null,
      areasTotal: 2, areasCompleted: 2, discovered: 10, queued: 10, processed: 10,
      successful: 10, failed: 0, recovered: 0, retries: 0, skippedFresh: 0,
      newListings: 3, refreshedListings: 7, scoringReady: 10, historyOnly: 0,
      lifecycle: {}, requestBudget: { total: 20, lastMinute: 5, byKind: { "api:get": 20 }, maxPerRun: 5000, maxPerMinute: 24 },
      completeness: { status: "complete", areaCoverage: 100, detailCoverage: 100, failedDetails: 0, stopRequested: false },
      cooldownUntil: null, changed: 5, contactEndpointAttempts: 0, httpWarnings: {},
      lastListingToken: "mongo-one", error: null,
    },
    planning: { areaOffset: 2, nextAreaOffset: 2 },
  };
}

test("operational state and crawl-run schemas validate the persisted crawler shape", async () => {
  const state = operationalState();
  await new ServiceState({ key: "crawler", ...state }).validate();
  await new CrawlRun({
    runId: state.crawl.runId, startedAt: state.crawl.startedAt, endedAt: state.crawl.endedAt,
    status: state.crawl.status, updatedAt: state.updatedAt, snapshot: state.crawl,
  }).validate();
});

test("Mongo store writes current service state and crawl history together", async () => {
  const calls = [];
  const model = (kind) => ({ async replaceOne(filter, value) { calls.push({ kind, filter, value }); } });
  const store = new MongoMarketStore({}, logger, {
    mongoUri: "mongodb://example", listingModel: {}, observationModel: {},
    serviceStateModel: model("state"), crawlRunModel: model("run"),
  });
  await store.saveServiceState(operationalState());
  assert.deepEqual(calls.map((item) => item.kind), ["state", "run"]);
  assert.equal(calls[1].value.runId, "run-one");
});
