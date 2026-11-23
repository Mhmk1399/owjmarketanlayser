const DAY_MS = 86_400_000;

const isNumber = (field) => ({ $isNumber: field });
const outside = (field, minimum, maximum) => ({
  $or: [
    { $not: [isNumber(field)] },
    { $lt: [field, minimum] },
    { $gt: [field, maximum] },
  ],
});

const inScope = {
  $and: [
    { $eq: ["$subcategory", "buy-residential-apartment"] },
    { $ne: ["$lifecycle.status", "removed"] },
  ],
};

const invalidArea = outside("$property.area", 20, 1_000);
const invalidPrice = outside("$pricing.price", 300_000_000, 3_000_000_000_000);
const invalidPricePerMeter = {
  $let: {
    vars: {
      ppm: {
        $cond: [
          { $and: [isNumber("$pricing.price"), isNumber("$property.area"), { $ne: ["$property.area", 0] }] },
          { $divide: ["$pricing.price", "$property.area"] },
          null,
        ],
      },
    },
    in: { $or: [
      invalidArea,
      invalidPrice,
      { $not: [isNumber("$$ppm")] },
      { $lt: ["$$ppm", 5_000_000] },
      { $gt: ["$$ppm", 3_000_000_000] },
    ] },
  },
};
const invalidCoordinates = {
  $or: [
    outside("$coordinates.latitude", 35.4, 35.95),
    outside("$coordinates.longitude", 50.8, 51.85),
  ],
};
const scoringEligible = {
  $and: [
    { $ne: ["$lifecycle.status", "removed"] },
    { $eq: ["$quality.outcome", "scoring-ready"] },
    { $eq: ["$subcategory", "buy-residential-apartment"] },
    { $not: [invalidArea] },
    { $not: [invalidPrice] },
    { $not: [invalidPricePerMeter] },
    { $not: [invalidCoordinates] },
  ],
};

const conditionalCount = (condition) => ({ $sum: { $cond: [condition, 1, 0] } });

export function buildMarketMetricsPipeline(now = new Date()) {
  const nowDate = now instanceof Date ? now : new Date(now);
  if (!Number.isFinite(nowDate.getTime())) throw new Error("market metrics now must be a valid date");
  const staleCutoff = new Date(nowDate.getTime() - 7 * DAY_MS);
  return [{ $facet: {
    summary: [{ $group: {
      _id: null,
      total: { $sum: 1 },
      active: conditionalCount({ $eq: ["$lifecycle.status", "active"] }),
      notSeen: conditionalCount({ $eq: ["$lifecycle.status", "not-seen"] }),
      possiblyRemoved: conditionalCount({ $eq: ["$lifecycle.status", "possibly-removed"] }),
      removed: conditionalCount({ $eq: ["$lifecycle.status", "removed"] }),
      latestListingAt: { $max: "$lastSeenAt" },
      notObservedWithin7Days: conditionalCount({ $or: [
        { $eq: ["$lastSeenAt", null] }, { $lt: ["$lastSeenAt", staleCutoff] },
      ] }),
      descriptionAvailable: conditionalCount({ $gt: [{ $strLenCP: { $ifNull: ["$description", ""] } }, 0] }),
      coordinatesAvailable: conditionalCount({ $and: [isNumber("$coordinates.latitude"), isNumber("$coordinates.longitude")] }),
      imagesAvailable: conditionalCount({ $gt: ["$imageCount", 0] }),
      advertiserClassified: conditionalCount({ $in: ["$advertiserType", ["personal", "real-estate-business"]] }),
      nearbyPlacesAvailable: conditionalCount({ $gt: [{ $size: { $ifNull: ["$nearbyPlaces", []] } }, 0] }),
      missingPropertyCharacteristics: conditionalCount({ $or: [
        { $not: [isNumber("$property.area")] }, { $not: [isNumber("$property.rooms")] },
      ] }),
      missingPricing: conditionalCount({ $and: [
        { $not: [isNumber("$pricing.price")] },
        { $not: [isNumber("$pricing.deposit")] },
        { $not: [isNumber("$pricing.rent")] },
      ] }),
      insufficientComparableSignals: conditionalCount({ $or: [
        { $not: [isNumber("$coordinates.latitude")] },
        { $not: [isNumber("$coordinates.longitude")] },
        { $lt: [{ $size: { $ifNull: ["$nearbyPlaces", []] } }, 5] },
      ] }),
      scoringEligible: conditionalCount(scoringEligible),
      inScopeListings: conditionalCount(inScope),
      completeListings: conditionalCount({ $and: [
        inScope,
        { $eq: ["$quality.score", 100] },
        { $eq: [{ $size: { $ifNull: ["$quality.missingFields", []] } }, 0] },
      ] }),
      inScopeCoordinatesAvailable: conditionalCount({ $and: [
        inScope, isNumber("$coordinates.latitude"), isNumber("$coordinates.longitude"),
      ] }),
      inScopeExactCoordinates: conditionalCount({ $and: [inScope, { $eq: ["$coordinates.accuracy", "exact"] }] }),
      inScopeApproximateCoordinates: conditionalCount({ $and: [inScope, { $eq: ["$coordinates.accuracy", "approximate"] }] }),
      inScopeAreaChecks: conditionalCount({ $and: [
        inScope, { $ne: ["$crawlPartition.area.name", null] }, { $ne: ["$neighborhood", null] },
      ] }),
      inScopeAreaMatches: conditionalCount({ $and: [
        inScope, { $ne: ["$crawlPartition.area.name", null] }, { $eq: ["$crawlPartition.area.name", "$neighborhood"] },
      ] }),
      inScopeQualityTotal: { $sum: { $cond: [inScope, { $ifNull: ["$quality.score", 0] }, 0] } },
    } }],
    advertiser: [
      { $group: { _id: { $ifNull: ["$advertiserType", "unknown"] }, count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ],
    property: [
      { $group: { _id: { $ifNull: ["$subcategory", "unknown"] }, count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ],
    quality: [
      { $group: { _id: { $ifNull: ["$quality.outcome", "unknown"] }, count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ],
    lifecycle: [
      { $group: { _id: { $ifNull: ["$lifecycle.status", "unknown"] }, count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ],
    blockers: [{ $group: {
      _id: null,
      listingRemoved: conditionalCount({ $eq: ["$lifecycle.status", "removed"] }),
      notScoringReady: conditionalCount({ $ne: ["$quality.outcome", "scoring-ready"] }),
      subcategoryOutOfScope: conditionalCount({ $ne: ["$subcategory", "buy-residential-apartment"] }),
      invalidArea: conditionalCount(invalidArea),
      invalidPrice: conditionalCount(invalidPrice),
      invalidPricePerMeter: conditionalCount(invalidPricePerMeter),
      invalidCoordinates: conditionalCount(invalidCoordinates),
    } }],
    neighborhoods: [
      { $match: { neighborhood: { $type: "string", $ne: "" } } },
      { $group: {
        _id: "$neighborhood",
        count: { $sum: 1 },
        active: conditionalCount({ $eq: ["$lifecycle.status", "active"] }),
        removed: conditionalCount({ $eq: ["$lifecycle.status", "removed"] }),
        priced: conditionalCount(isNumber("$pricing.price")),
        averagePrice: { $avg: "$pricing.price" },
        averagePricePerMeter: { $avg: "$pricing.pricePerMeter" },
        latestListingAt: { $max: "$lastSeenAt" },
      } },
      { $sort: { count: -1, _id: 1 } },
      { $limit: 200 },
    ],
    priceDistribution: [
      { $match: { "pricing.price": { $type: "number" } } },
      { $bucket: {
        groupBy: "$pricing.price",
        boundaries: [0, 5_000_000_000, 10_000_000_000, 20_000_000_000, 40_000_000_000, 80_000_000_000, 160_000_000_000, 3_000_000_000_001],
        default: "outside-supported-range",
        output: { count: { $sum: 1 } },
      } },
    ],
  } }];
}

const classification = (rows = []) => rows.map((row) => ({ key: String(row._id ?? "unknown"), count: row.count || 0 }));
const percent = (count, total) => total ? Number((count / total * 100).toFixed(1)) : 0;

export function normalizeMarketMetrics(facet = {}, {
  activeModel = null,
  activeScoreCount = 0,
  recentActivity = [],
  generatedAt = new Date().toISOString(),
} = {}) {
  const summary = facet.summary?.[0] || {};
  const total = summary.total || 0;
  const coverage = [
    ["description", summary.descriptionAvailable || 0],
    ["coordinates", summary.coordinatesAvailable || 0],
    ["images", summary.imagesAvailable || 0],
    ["advertiser-classified", summary.advertiserClassified || 0],
    ["nearby-places", summary.nearbyPlacesAvailable || 0],
  ].map(([key, count]) => ({ key, count, missing: total - count, percent: percent(count, total) }));
  const blockerCounts = facet.blockers?.[0] || {};
  const blockers = [
    ["listing-removed", blockerCounts.listingRemoved],
    ["not-scoring-ready", blockerCounts.notScoringReady],
    ["subcategory-out-of-scope", blockerCounts.subcategoryOutOfScope],
    ["invalid-or-implausible-area", blockerCounts.invalidArea],
    ["invalid-or-implausible-price", blockerCounts.invalidPrice],
    ["invalid-or-implausible-price-per-meter", blockerCounts.invalidPricePerMeter],
    ["missing-or-out-of-bounds-coordinates", blockerCounts.invalidCoordinates],
  ].filter(([, count]) => count > 0).map(([reason, count]) => ({ reason, count, percent: percent(count, total) }));
  return {
    schemaVersion: "1.0.0",
    generatedAt,
    scope: { kind: "full-database", completeness: "complete", sampled: false, filtered: false },
    summary: {
      ...summary,
      latestListingAt: summary.latestListingAt ? new Date(summary.latestListingAt).toISOString() : null,
      averageInScopeQualityScore: summary.inScopeListings
        ? Number(((summary.inScopeQualityTotal || 0) / summary.inScopeListings).toFixed(2)) : null,
    },
    coverage,
    classifications: {
      advertiser: classification(facet.advertiser),
      property: classification(facet.property),
      quality: classification(facet.quality),
      lifecycle: classification(facet.lifecycle),
    },
    blockers,
    neighborhoods: (facet.neighborhoods || []).map((row) => ({
      name: row._id,
      count: row.count || 0,
      active: row.active || 0,
      removed: row.removed || 0,
      priced: row.priced || 0,
      averagePrice: Number.isFinite(row.averagePrice) ? Math.round(row.averagePrice) : null,
      averagePricePerMeter: Number.isFinite(row.averagePricePerMeter) ? Math.round(row.averagePricePerMeter) : null,
      latestListingAt: row.latestListingAt ? new Date(row.latestListingAt).toISOString() : null,
    })),
    priceDistribution: (facet.priceDistribution || []).map((row) => ({ bucketStart: row._id, count: row.count || 0 })),
    scoring: {
      activeModelId: activeModel?.modelId || null,
      generatedAt: activeModel?.generatedAt ? new Date(activeModel.generatedAt).toISOString() : null,
      activeScoreCount,
      populationCoveragePercent: percent(activeScoreCount, total),
      eligibleListings: summary.scoringEligible || 0,
    },
    recentActivity,
    limits: { neighborhoods: 200, aggregationDeadlineMs: null },
  };
}

