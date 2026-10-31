import fs from "node:fs/promises";
import path from "node:path";
import { resolveListingLocation } from "../locations/hierarchy.js";
import { nextLifecycleStatus } from "../collector/listingPolicy.js";

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

async function writeJsonAtomic(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  const payload = JSON.stringify(value, null, 2);
  const retryableCodes = new Set(["EBUSY", "EACCES", "EPERM"]);
  const maxAttempts = 6;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await fs.writeFile(temporary, payload, "utf8");
      await fs.rename(temporary, file);
      return;
    } catch (error) {
      if (!retryableCodes.has(error.code) || attempt === maxAttempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, 25 * attempt));
    }
  }
}

function safeToken(token) {
  const value = String(token || "");
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error(`Unsafe listing token: ${value}`);
  return value;
}

function migrateAdvertiserType(value, isBusiness) {
  const text = String(value || "").toLowerCase();
  if (isBusiness === true || /business|agency|dealer|املاک|مشاور|بنگاه/.test(text)) return "real-estate-business";
  if (isBusiness === false || /personal|private|individual|شخصی|مالک/.test(text)) return "personal";
  return "unknown";
}

function migrateListing(listing) {
  if (!listing || typeof listing !== "object") return listing;
  const migrated = listing.crawlPartition ? listing : {
    ...listing, crawlPartition: {
      category: null,
      expectedSubcategory: listing.subcategory ?? null,
      area: null,
    },
  };
  const advertiserType = migrateAdvertiserType(migrated.advertiserType, migrated.advertiserSignals?.isBusiness);
  const { reasons: _legacyReasons, ...quality } = migrated.quality || {};
  return {
    ...migrated,
    advertiserType,
    description: migrated.description ?? null,
    images: Array.isArray(migrated.images) ? migrated.images : [],
    nearbyPlaces: Array.isArray(migrated.nearbyPlaces) ? migrated.nearbyPlaces : [],
    attributes: Array.isArray(migrated.attributes) ? migrated.attributes : [],
    amenities: {
      elevator: null, parking: null, storage: null, balcony: null, rooftop: null, lobby: null,
      doorman: null, security: null, pool: null, sauna: null, gym: null, centralAntenna: null,
      airConditioning: null, heating: null, ...migrated.amenities,
    },
    propertyDetails: {
      deedType: null, buildingDirection: null, unitPosition: null, landWidth: null,
      buildingDensity: null, propertyType: null, buildingCondition: null, heating: null,
      cooling: null, ...migrated.propertyDetails,
    },
    advertiserSignals: {
      type: advertiserType,
      isBusiness: migrated.advertiserSignals?.isBusiness ?? null,
      hasBusinessBadge: migrated.advertiserSignals?.hasBusinessBadge ?? null,
      panelType: migrated.advertiserSignals?.panelType ?? null,
      hasBusinessReference: migrated.advertiserSignals?.hasBusinessReference ?? null,
      classificationSource: migrated.advertiserSignals?.classificationSource ?? [],
      confidence: migrated.advertiserSignals?.confidence ?? "low",
      businessDisplayName: migrated.advertiserSignals?.businessDisplayName ?? null,
    },
    media: migrated.media ?? { samePropertyImageClaim: null, claimSource: null },
    publication: migrated.publication ?? { text: migrated.publishedText ?? null, source: null },
    locationProvenance: migrated.locationProvenance ?? {
      source: migrated.coordinates?.source ?? null,
      sourceNeighborhoodSlug: migrated.sourceNeighborhoodSlug ?? null,
      crawlAreaId: migrated.crawlPartition?.area?.id ?? null,
    },
    extraction: migrated.extraction ?? {
      source: migrated.coordinates?.source ?? null, presentFields: [], missingFields: [], coveragePercent: 0,
    },
    resolvedLocation: resolveListingLocation(migrated),
    quality: {
      ...quality,
      outcome: migrated.quality?.outcome ?? "history-only",
      outcomeReasons: migrated.quality?.outcomeReasons ?? ["legacy-unclassified"],
    },
    lifecycle: migrated.lifecycle ?? {
      status: "active",
      detailFetchedAt: migrated.lastSeenAt ?? null,
      lastDiscoveredAt: migrated.lastSeenAt ?? null,
      lastConfirmedRunId: null,
      lastContentChangedAt: migrated.lastSeenAt ?? null,
      consecutiveMisses: 0,
      removedAt: null,
    },
  };
}

export class JsonMarketStore {
  constructor(paths, logger, { snapshotEvery = 25 } = {}) {
    this.paths = paths;
    this.logger = logger;
    this.listings = new Map();
    this.writeQueue = Promise.resolve();
    this.snapshotEvery = snapshotEvery;
    this.pendingSnapshotChanges = 0;
  }

  async init() {
    await fs.mkdir(this.paths.data, { recursive: true });
    await fs.mkdir(this.paths.observations, { recursive: true });
    await fs.mkdir(this.paths.listingRecords, { recursive: true });
    const document = await readJson(this.paths.listings, {
      schemaVersion: "1.0.0",
      updatedAt: null,
      listings: [],
    });
    for (const listing of document.listings || []) {
      if (listing?.token) this.listings.set(listing.token, migrateListing(listing));
    }
    for (const listing of this.listings.values()) {
      const recordFile = path.join(this.paths.listingRecords, `${safeToken(listing.token)}.json`);
      try {
        await fs.access(recordFile);
      } catch {
        await writeJsonAtomic(recordFile, listing);
      }
    }
    const recordNames = await fs.readdir(this.paths.listingRecords).catch((error) => {
      if (error.code === "ENOENT") return [];
      throw error;
    });
    for (const name of recordNames.filter((item) => item.endsWith(".json"))) {
      try {
        const listing = migrateListing(
          await readJson(path.join(this.paths.listingRecords, name), null),
        );
        if (listing?.token) this.listings.set(listing.token, listing);
      } catch (error) {
        this.logger.warn("store.record.invalid", "Ignoring invalid per-listing JSON record", {
          file: name,
          error: error.message,
        });
      }
    }
    this.logger.info("store.ready", "JSON market store loaded", {
      listingCount: this.listings.size,
      path: this.paths.listings,
    });
  }

  getListing(token) {
    return this.listings.get(token) || null;
  }

  getListings({ activeOnly = false, scoringReadyOnly = false } = {}) {
    return [...this.listings.values()].filter((listing) => (
      (!activeOnly || listing.lifecycle?.status !== "removed") &&
      (!scoringReadyOnly || listing.quality?.outcome === "scoring-ready")
    ));
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
    this.listings.set(listing.token, merged);

    this.writeQueue = this.writeQueue.then(async () => {
      const token = safeToken(listing.token);
      await writeJsonAtomic(path.join(this.paths.listingRecords, `${token}.json`), merged);
      if (changed) {
        const observationFile = path.join(this.paths.observations, `${token}.json`);
        const history = await readJson(observationFile, {
          schemaVersion: "1.0.0",
          token,
          observations: [],
        });
        history.observations.push({
          observedAt: listing.lastSeenAt,
          runId,
          listing: merged,
        });
        await writeJsonAtomic(observationFile, history);
      }
      this.pendingSnapshotChanges += 1;
      if (this.pendingSnapshotChanges >= this.snapshotEvery) {
        await this.writeListingsSnapshot();
      }
    });
    await this.writeQueue;
    return { listing: merged, changed, existed: Boolean(existing) };
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
    this.listings.set(token, merged);
    this.writeQueue = this.writeQueue.then(() => writeJsonAtomic(
      path.join(this.paths.listingRecords, `${safeToken(token)}.json`), merged,
    ));
    await this.writeQueue;
    return merged;
  }

  async updateNearbyPlaces(token, nearbyPlaces) {
    const existing = this.listings.get(token);
    if (!existing) return null;
    const merged = { ...existing, nearbyPlaces };
    this.listings.set(token, merged);
    this.writeQueue = this.writeQueue.then(() => writeJsonAtomic(
      path.join(this.paths.listingRecords, `${safeToken(token)}.json`), merged,
    ));
    await this.writeQueue;
    return merged;
  }

  async reconcileLifecycle({ runId, observedTokens, completedAreaIds, removalThreshold = 3, now = new Date().toISOString() }) {
    const observed = new Set(observedTokens);
    const completed = new Set([...completedAreaIds].map(Number));
    const summary = { active: 0, notSeen: 0, possiblyRemoved: 0, removed: 0 };
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
      this.listings.set(token, merged);
      summary[status === "not-seen" ? "notSeen" : status === "possibly-removed" ? "possiblyRemoved" : status] += 1;
      this.writeQueue = this.writeQueue.then(() => writeJsonAtomic(
        path.join(this.paths.listingRecords, `${safeToken(token)}.json`), merged,
      ));
    }
    await this.writeQueue;
    return summary;
  }

  async readModelState() {
    return readJson(this.paths.model, null);
  }

  async saveModelState(value) {
    this.writeQueue = this.writeQueue.then(() => writeJsonAtomic(this.paths.model, value));
    await this.writeQueue;
  }

  async saveAnalytics(value) {
    this.writeQueue = this.writeQueue.then(() => writeJsonAtomic(this.paths.analytics, value));
    await this.writeQueue;
  }

  async readServiceState() {
    return readJson(this.paths.serviceState, null);
  }

  async saveServiceState(value) {
    this.writeQueue = this.writeQueue.then(() => writeJsonAtomic(this.paths.serviceState, value));
    await this.writeQueue;
  }

  async flush() {
    await this.writeQueue;
    await this.writeListingsSnapshot();
  }

  async compactHistory({ maxObservationsPerListing = 50 } = {}) {
    const names = await fs.readdir(this.paths.observations).catch((error) => {
      if (error.code === "ENOENT") return [];
      throw error;
    });
    let compactedFiles = 0;
    let removedObservations = 0;
    for (const name of names.filter((item) => item.endsWith(".json"))) {
      const file = path.join(this.paths.observations, name);
      const history = await readJson(file, null);
      if (!Array.isArray(history?.observations) || history.observations.length <= maxObservationsPerListing) continue;
      removedObservations += history.observations.length - maxObservationsPerListing;
      history.observations = history.observations.slice(-maxObservationsPerListing);
      await writeJsonAtomic(file, history);
      compactedFiles += 1;
    }
    return { compactedFiles, removedObservations, maxObservationsPerListing };
  }

  async writeListingsSnapshot() {
    await writeJsonAtomic(this.paths.listings, {
      schemaVersion: "1.0.0",
      updatedAt: new Date().toISOString(),
      listings: this.getListings(),
    });
    this.pendingSnapshotChanges = 0;
  }
}

export const _jsonHelpers = { readJson, writeJsonAtomic, safeToken, migrateListing };
