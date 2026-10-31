import mongoose from "mongoose";
import { Listing } from "../models/listing.js";
import { ListingObservation } from "../models/listingObservation.js";
import { CrawlRun, ServiceState } from "../models/crawlState.js";
import { ScoringScenario } from "../models/scoringScenario.js";
import { JsonMarketStore, _jsonHelpers } from "./jsonStore.js";
import { nextLifecycleStatus } from "../collector/listingPolicy.js";

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

export class MongoMarketStore extends JsonMarketStore {
  constructor(paths, logger, {
    mongoUri, mongoDbName, snapshotEvery = 25,
    listingModel = Listing, observationModel = ListingObservation,
    serviceStateModel = ServiceState, crawlRunModel = CrawlRun,
    scoringScenarioModel = ScoringScenario,
  } = {}) {
    super(paths, logger, { snapshotEvery });
    this.mongoUri = mongoUri;
    this.mongoDbName = mongoDbName;
    this.listingModel = listingModel;
    this.observationModel = observationModel;
    this.serviceStateModel = serviceStateModel;
    this.crawlRunModel = crawlRunModel;
    this.scoringScenarioModel = scoringScenarioModel;
    this.mongo = null;
  }

  async init() {
    if (!this.mongoUri) throw new Error("MongoMarketStore requires MONGODB_URI");
    this.mongo = await mongoose.connect(this.mongoUri, {
      dbName: this.mongoDbName,
      serverSelectionTimeoutMS: 30_000,
      maxPoolSize: 20,
      minPoolSize: 2,
    });
    await Promise.all([
      this.listingModel.init(), this.observationModel.init(),
      this.serviceStateModel.init(), this.crawlRunModel.init(),
      this.scoringScenarioModel.init(),
    ]);
    const documents = await this.listingModel.find({}).lean();
    this.listings.clear();
    for (const { _id, ...document } of documents) {
      const listing = plain(document);
      this.listings.set(listing.token, listing);
    }
    this.logger.info("store.mongo.ready", "MongoDB is the authoritative listing store", {
      listingCount: this.listings.size,
      database: mongoose.connection.name,
      jsonRole: "derived-compatibility-snapshot",
    });
  }

  async queryListings({ offset = 0, limit = 50, district, area, category, advertiserType, query, readiness, status, minPrice, maxPrice, minPricePerMeter, maxPricePerMeter, minArea, maxArea, minRooms, minYear, amenities = [] } = {}) {
    const filters = [];
    if (district) filters.push({ $or: [
      { district }, { neighborhood: district },
      ...(Number.isFinite(Number(district)) ? [{ "crawlPartition.area.municipalDistricts": Number(district) }] : []),
    ] });
    if (area) filters.push({ $or: [
      { "crawlPartition.area.slug": area }, { "crawlPartition.area.name": area },
      ...(Number.isFinite(Number(area)) ? [{ "crawlPartition.area.id": Number(area) }] : []),
    ] });
    if (category) filters.push({ $or: [{ "crawlPartition.category": category }, { subcategory: category }] });
    if (advertiserType) filters.push({ advertiserType });
    if (readiness) filters.push({ "quality.outcome": readiness });
    if (status) filters.push({ "lifecycle.status": status });
    if (query) {
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filters.push({ $or: ["title", "description", "neighborhood", "token"]
        .map((field) => ({ [field]: { $regex: escaped, $options: "i" } })) });
    }
    const range = (field, min, max) => {
      const value = {};
      if (Number.isFinite(min)) value.$gte = min;
      if (Number.isFinite(max)) value.$lte = max;
      if (Object.keys(value).length) filters.push({ [field]: value });
    };
    range("pricing.price", minPrice, maxPrice);
    range("pricing.pricePerMeter", minPricePerMeter, maxPricePerMeter);
    range("property.area", minArea, maxArea);
    range("property.rooms", minRooms, undefined);
    range("property.constructionYear", minYear, undefined);
    for (const amenity of amenities) filters.push({ [`amenities.${amenity}`]: true });
    const filter = filters.length ? { $and: filters } : {};
    const [total, documents] = await Promise.all([
      this.listingModel.countDocuments(filter),
      this.listingModel.find(filter).sort({ lastSeenAt: -1, token: 1 }).skip(offset).limit(limit).lean(),
    ]);
    return { total, listings: documents.map(({ _id, ...document }) => plain(document)) };
  }

  async listingFacets() {
    const [districts, categories, bounds] = await Promise.all([
      this.listingModel.distinct("neighborhood", { neighborhood: { $nin: [null, ""] } }),
      this.listingModel.distinct("subcategory", { subcategory: { $nin: [null, ""] } }),
      this.listingModel.aggregate([{ $group: { _id: null, minPrice: { $min: "$pricing.price" }, maxPrice: { $max: "$pricing.price" }, minArea: { $min: "$property.area" }, maxArea: { $max: "$property.area" } } }]),
    ]);
    return { districts: districts.sort(), categories: categories.sort(), bounds: bounds[0] || {} };
  }

  async updateNearbyPlaces(token, nearbyPlaces) {
    const existing = this.listings.get(token);
    if (!existing) return null;
    const merged = { ...existing, nearbyPlaces };
    await this.listingModel.replaceOne({ token }, merged, { upsert: false, runValidators: true });
    this.listings.set(token, merged);
    return merged;
  }

  async upsertListing(listing, runId) {
    const existing = this.listings.get(listing.token);
    const changed = !existing || existing.contentFingerprint !== listing.contentFingerprint;
    const merged = {
      ...listing,
      firstSeenAt: existing?.firstSeenAt || listing.firstSeenAt,
      lastSeenAt: listing.lastSeenAt,
      lifecycle: {
        ...listing.lifecycle,
        status: "active",
        lastDiscoveredAt: listing.lastSeenAt,
        lastConfirmedRunId: runId,
        consecutiveMisses: 0,
        removedAt: null,
      },
    };
    const observation = changed ? {
        token: merged.token,
        observedAt: merged.lastSeenAt,
        runId,
        eventType: existing ? "changed" : "created",
        contentFingerprint: merged.contentFingerprint,
        snapshot: merged,
      } : null;
    const persist = async (session = null) => {
      await this.listingModel.replaceOne(
        { token: merged.token }, merged,
        { upsert: true, runValidators: true, ...(session ? { session } : {}) },
      );
      if (observation) {
        if (session) await this.observationModel.create([observation], { session });
        else await this.observationModel.create(observation);
      }
    };
    if (this.mongo?.connection?.transaction) {
      await this.mongo.connection.transaction((session) => persist(session));
    } else {
      await persist();
    }
    this.listings.set(merged.token, plain(merged));
    return { listing: plain(merged), changed, existed: Boolean(existing) };
  }

  async confirmListingSeen(token, runId, observedAt = new Date().toISOString()) {
    const existing = this.listings.get(token);
    if (!existing) return null;
    const merged = {
      ...existing,
      lifecycle: {
        ...existing.lifecycle,
        status: "active",
        lastDiscoveredAt: observedAt,
        lastConfirmedRunId: runId,
        consecutiveMisses: 0,
        removedAt: null,
      },
    };
    await this.listingModel.replaceOne({ token }, merged, { upsert: false, runValidators: true });
    this.listings.set(token, plain(merged));
    return plain(merged);
  }

  async reconcileLifecycle({ runId, observedTokens, completedAreaIds, removalThreshold = 3, now = new Date().toISOString() }) {
    const observed = new Set(observedTokens);
    const completed = new Set([...completedAreaIds].map(Number));
    const summary = { active: 0, notSeen: 0, possiblyRemoved: 0, removed: 0 };
    const changes = [];
    for (const [token, listing] of this.listings) {
      const areaId = Number(listing.crawlPartition?.area?.id);
      if (!completed.has(areaId) || observed.has(token)) continue;
      const misses = (listing.lifecycle?.consecutiveMisses || 0) + 1;
      const status = nextLifecycleStatus(misses, removalThreshold);
      const merged = { ...listing, lifecycle: {
        ...listing.lifecycle, status, consecutiveMisses: misses,
        removedAt: status === "removed" ? listing.lifecycle?.removedAt || now : null,
        lastConfirmedRunId: listing.lifecycle?.lastConfirmedRunId ?? null,
      } };
      changes.push({ token, merged });
      summary[status === "not-seen" ? "notSeen" : status === "possibly-removed" ? "possiblyRemoved" : status] += 1;
    }
    if (changes.length) {
      await this.listingModel.bulkWrite(changes.map(({ token, merged }) => ({
        replaceOne: { filter: { token }, replacement: merged, upsert: false },
      })), { ordered: false });
      for (const { token, merged } of changes) this.listings.set(token, plain(merged));
    }
    return summary;
  }

  async compactHistory({ maxObservationsPerListing = 50 } = {}) {
    const oversized = await this.observationModel.aggregate([
      { $group: { _id: "$token", count: { $sum: 1 } } },
      { $match: { count: { $gt: maxObservationsPerListing } } },
    ]);
    let removedObservations = 0;
    for (const { _id: token } of oversized) {
      const old = await this.observationModel.find({ token }).sort({ observedAt: -1 })
        .skip(maxObservationsPerListing).select("_id").lean();
      if (old.length) await this.observationModel.deleteMany({ _id: { $in: old.map((item) => item._id) } });
      removedObservations += old.length;
    }
    return { compactedFiles: oversized.length, removedObservations, maxObservationsPerListing };
  }

  async readServiceState() {
    const document = await this.serviceStateModel.findOne({ key: "crawler" }).lean();
    if (!document) return null;
    const { _id, key, ...state } = plain(document);
    return state;
  }

  async saveServiceState(value) {
    const serviceState = { key: "crawler", ...value };
    const run = value.crawl?.runId ? {
      runId: value.crawl.runId,
      startedAt: value.crawl.startedAt,
      endedAt: value.crawl.endedAt,
      status: value.crawl.status,
      updatedAt: value.updatedAt,
      snapshot: value.crawl,
    } : null;
    const persist = async (session = null) => {
      const options = { upsert: true, runValidators: true, ...(session ? { session } : {}) };
      await this.serviceStateModel.replaceOne({ key: "crawler" }, serviceState, options);
      if (run) await this.crawlRunModel.replaceOne({ runId: run.runId }, run, options);
    };
    if (this.mongo?.connection?.transaction) {
      await this.mongo.connection.transaction((session) => persist(session));
    } else {
      await persist();
    }
  }

  async queryCrawlRuns({ limit = 20 } = {}) {
    const documents = await this.crawlRunModel.find({}).sort({ startedAt: -1 }).limit(limit).lean();
    return documents.map(({ _id, ...document }) => plain(document));
  }

  async flush() {
    const documents = (await this.listingModel.find({}).sort({ token: 1 }).lean())
      .map(({ _id, ...document }) => plain(document));
    this.listings.clear();
    for (const listing of documents) this.listings.set(listing.token, listing);
    await _jsonHelpers.writeJsonAtomic(this.paths.listings, {
      schemaVersion: "1.0.0",
      derivedFrom: "mongodb",
      updatedAt: new Date().toISOString(),
      listings: documents,
    });
    this.pendingSnapshotChanges = 0;
  }

  async close() {
    await mongoose.disconnect();
  }
}
