import { scoringEligibilityReasons } from "../scoring/cleanListings.js";

function percent(count, total) {
  return total ? Number((count / total * 100).toFixed(1)) : 0;
}

function coverageMetric(listings, key, predicate) {
  const count = listings.filter(predicate).length;
  return { key, count, missing: listings.length - count, percent: percent(count, listings.length) };
}

function countBy(listings, selector) {
  const counts = new Map();
  for (const listing of listings) {
    const key = selector(listing) || "unknown";
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return [...counts.entries()].map(([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count);
}

export function buildDataQualityBaseline({ listings = [], scoredDocument = null, scoringReport = null, now = new Date().toISOString() } = {}) {
  const scoredListings = scoredDocument?.listings || [];
  const scoredTokens = new Set(scoredListings.map((item) => item.token));
  const scoringGeneratedAt = scoredDocument?.generatedAt || null;
  const blockers = new Map();
  const eligibleTokens = [];
  const rejected = [];

  for (const listing of listings) {
    const reasons = scoringEligibilityReasons(listing);
    if (!reasons.length) eligibleTokens.push(listing.token);
    else {
      rejected.push({ token: listing.token, reasons });
      for (const reason of reasons) blockers.set(reason, (blockers.get(reason) || 0) + 1);
    }
  }

  const eligibleScored = eligibleTokens.filter((token) => scoredTokens.has(token)).length;
  const eligibleUnscored = eligibleTokens.filter((token) => !scoredTokens.has(token));
  const eligibleTokenSet = new Set(eligibleTokens);
  const staleSinceScore = scoringGeneratedAt ? listings.filter((listing) => Date.parse(listing.lastSeenAt) > Date.parse(scoringGeneratedAt)).length : listings.length;
  const coverage = [
    coverageMetric(listings, "description", (item) => typeof item.description === "string" && item.description.trim().length > 0),
    coverageMetric(listings, "coordinates", (item) => Number.isFinite(item.coordinates?.latitude) && Number.isFinite(item.coordinates?.longitude)),
    coverageMetric(listings, "images", (item) => Number(item.imageCount) > 0),
    coverageMetric(listings, "advertiser-classified", (item) => ["personal", "real-estate-business"].includes(item.advertiserType)),
    coverageMetric(listings, "nearby-places", (item) => Array.isArray(item.nearbyPlaces) && item.nearbyPlaces.length > 0),
  ];

  return {
    schemaVersion: "1.0.0",
    generatedAt: now,
    inventory: {
      total: listings.length,
      active: listings.filter((item) => item.lifecycle?.status === "active").length,
      latestListingAt: listings.reduce((latest, item) => !latest || String(item.lastSeenAt) > latest ? String(item.lastSeenAt) : latest, null),
    },
    coverage,
    classifications: {
      advertiser: countBy(listings, (item) => item.advertiserType),
      property: countBy(listings, (item) => item.subcategory),
      quality: countBy(listings, (item) => item.quality?.outcome),
      lifecycle: countBy(listings, (item) => item.lifecycle?.status),
    },
    scoring: {
      generatedAt: scoringGeneratedAt,
      totalScored: scoredListings.length,
      unscoredTotal: Math.max(0, listings.length - scoredListings.length),
      populationCoveragePercent: percent(scoredListings.length, listings.length),
      eligible: eligibleTokens.length,
      eligibleScored,
      eligibleUnscored: eligibleUnscored.length,
      coveragePercent: percent(eligibleScored, eligibleTokens.length),
      staleListingsSinceScore: staleSinceScore,
      scoredButCurrentlyIneligible: scoredListings.filter((item) => !eligibleTokenSet.has(item.token)).length,
      pipelineStatus: scoringReport?.status || "not-run",
    },
    blockers: [...blockers.entries()].map(([reason, count]) => ({ reason, count, percent: percent(count, listings.length) })).sort((a, b) => b.count - a.count),
    samples: {
      eligibleUnscored: eligibleUnscored.slice(0, 20),
      rejected: rejected.slice(0, 20),
    },
  };
}
