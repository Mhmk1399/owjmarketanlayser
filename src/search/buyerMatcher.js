import { createHash } from "node:crypto";

export const BUYER_MATCH_AMENITIES = Object.freeze([
  "elevator", "parking", "storage", "balcony", "rooftop", "lobby",
  "doorman", "security", "pool", "sauna", "gym", "centralAntenna",
  "airConditioning", "heating",
]);

const urgencyValues = new Set(["low", "normal", "high", "immediate"]);
const financingValues = new Set(["unknown", "ready", "needs_financing", "not_ready"]);
const amenitySet = new Set(BUYER_MATCH_AMENITIES);

function optionalNumber(value, name) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) throw Object.assign(new Error(`${name} must be a non-negative number`), { status: 400 });
  return number;
}

function stringList(value, name, maximum = 30) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) throw Object.assign(new Error(`${name} must be an array`), { status: 400 });
  const result = [...new Set(value.map((item) => String(item).trim()).filter(Boolean))];
  if (result.length > maximum) throw Object.assign(new Error(`${name} may contain at most ${maximum} values`), { status: 400 });
  return result;
}

function assertRange(minimum, maximum, name) {
  if (minimum !== null && maximum !== null && minimum > maximum) {
    throw Object.assign(new Error(`${name} minimum cannot exceed maximum`), { status: 400 });
  }
}

function currentPersianYear() {
  const value = new Intl.DateTimeFormat("en-US-u-ca-persian", { year: "numeric" }).format(new Date());
  return Number.parseInt(value, 10);
}

export function normalizeBuyerMatchRequest(input = {}) {
  const transactionType = input.transactionType || "buy";
  if (!["buy", "rent"].includes(transactionType)) {
    throw Object.assign(new Error("transactionType must be buy or rent"), { status: 400 });
  }
  const requirement = {
    transactionType,
    propertyTypes: stringList(input.propertyTypes, "propertyTypes"),
    locations: stringList(input.locations, "locations"),
    minPrice: optionalNumber(input.minPrice, "minPrice"),
    maxPrice: optionalNumber(input.maxPrice, "maxPrice"),
    minDeposit: optionalNumber(input.minDeposit, "minDeposit"),
    maxDeposit: optionalNumber(input.maxDeposit, "maxDeposit"),
    minRent: optionalNumber(input.minRent, "minRent"),
    maxRent: optionalNumber(input.maxRent, "maxRent"),
    minArea: optionalNumber(input.minArea, "minArea"),
    maxArea: optionalNumber(input.maxArea, "maxArea"),
    minRooms: optionalNumber(input.minRooms, "minRooms"),
    maxBuildingAge: optionalNumber(input.maxBuildingAge, "maxBuildingAge"),
    requiredAmenities: stringList(input.requiredAmenities, "requiredAmenities", 14),
    optionalAmenities: stringList(input.optionalAmenities, "optionalAmenities", 14),
    urgency: urgencyValues.has(input.urgency) ? input.urgency : "normal",
    financingStatus: financingValues.has(input.financingStatus) ? input.financingStatus : "unknown",
  };
  const invalidAmenities = [...requirement.requiredAmenities, ...requirement.optionalAmenities]
    .filter((item) => !amenitySet.has(item));
  if (invalidAmenities.length) throw Object.assign(new Error(`Unsupported amenities: ${invalidAmenities.join(", ")}`), { status: 400 });
  requirement.optionalAmenities = requirement.optionalAmenities
    .filter((item) => !requirement.requiredAmenities.includes(item));
  assertRange(requirement.minPrice, requirement.maxPrice, "price");
  assertRange(requirement.minDeposit, requirement.maxDeposit, "deposit");
  assertRange(requirement.minRent, requirement.maxRent, "rent");
  assertRange(requirement.minArea, requirement.maxArea, "area");
  return requirement;
}

function range(minimum, maximum) {
  const value = {};
  if (minimum !== null) value.$gte = minimum;
  if (maximum !== null) value.$lte = maximum;
  return Object.keys(value).length ? value : null;
}

export function buildBuyerMongoFilter(requirement) {
  const filters = [
    { "lifecycle.status": "active" },
    { "quality.outcome": "scoring-ready" },
  ];
  if (requirement.propertyTypes.length) filters.push({ subcategory: { $in: requirement.propertyTypes } });
  if (requirement.locations.length) filters.push({ $or: [
    { neighborhood: { $in: requirement.locations } },
    { district: { $in: requirement.locations } },
    { "resolvedLocation.slug": { $in: requirement.locations } },
    { "resolvedLocation.name": { $in: requirement.locations } },
    { "crawlPartition.area.slug": { $in: requirement.locations } },
  ] });
  if (requirement.transactionType === "buy") {
    filters.push({ "pricing.price": { $ne: null } });
    const price = range(requirement.minPrice, requirement.maxPrice);
    if (price) filters.push({ "pricing.price": price });
  } else {
    const deposit = range(requirement.minDeposit, requirement.maxDeposit);
    const rent = range(requirement.minRent, requirement.maxRent);
    if (deposit) filters.push({ "pricing.deposit": deposit });
    if (rent) filters.push({ "pricing.rent": rent });
  }
  const area = range(requirement.minArea, requirement.maxArea);
  if (area) filters.push({ "property.area": area });
  if (requirement.minRooms !== null) filters.push({ "property.rooms": { $gte: requirement.minRooms } });
  if (requirement.maxBuildingAge !== null) {
    filters.push({ "property.constructionYear": { $gte: currentPersianYear() - requirement.maxBuildingAge } });
  }
  for (const amenity of requirement.requiredAmenities) filters.push({ [`amenities.${amenity}`]: true });
  return { $and: filters };
}

function closeness(value, minimum, maximum) {
  if (!Number.isFinite(value)) return 0;
  if (minimum === null && maximum === null) return 1;
  const target = minimum !== null && maximum !== null ? (minimum + maximum) / 2 : minimum ?? maximum;
  if (!target) return 1;
  return Math.max(0, 1 - Math.abs(value - target) / Math.max(target, 1));
}

function freshness(lastSeenAt, urgency) {
  const ageDays = Math.max(0, (Date.now() - Date.parse(lastSeenAt)) / 86_400_000);
  const windowDays = { low: 60, normal: 30, high: 14, immediate: 7 }[urgency] || 30;
  return Math.max(0, 1 - ageDays / windowDays);
}

export function rankBuyerCandidates(requirement, listings, scoreByToken = new Map()) {
  return listings.map((listing) => {
    const market = scoreByToken.get(listing.token) || null;
    const price = requirement.transactionType === "buy" ? listing.pricing?.price : listing.pricing?.deposit;
    const priceFit = closeness(price,
      requirement.transactionType === "buy" ? requirement.minPrice : requirement.minDeposit,
      requirement.transactionType === "buy" ? requirement.maxPrice : requirement.maxDeposit);
    const areaFit = closeness(listing.property?.area, requirement.minArea, requirement.maxArea);
    const optionalMatches = requirement.optionalAmenities.filter((key) => listing.amenities?.[key] === true);
    const amenityFit = requirement.optionalAmenities.length
      ? optionalMatches.length / requirement.optionalAmenities.length : 1;
    const marketFit = Number.isFinite(market?.recommendation) ? market.recommendation / 100 : 0.5;
    const confidenceFit = Number.isFinite(market?.confidence) ? market.confidence / 100 : 0.5;
    const riskFit = Number.isFinite(market?.risk) ? 1 - market.risk / 100 : 0.5;
    const needsFinancing = requirement.financingStatus === "needs_financing";
    const components = {
      price: priceFit * (needsFinancing ? 25 : 30),
      area: areaFit * 20,
      amenities: amenityFit * 15,
      marketValue: marketFit * 20,
      confidenceAndRisk: ((confidenceFit + riskFit) / 2) * 10,
      freshness: freshness(listing.lastSeenAt, requirement.urgency) * 5,
      ...(needsFinancing ? { financing: listing.pricing?.isNegotiable || listing.pricing?.isFullMortgage ? 5 : 0 } : {}),
    };
    const matchScore = Math.round(Object.values(components).reduce((sum, value) => sum + value, 0));
    const reasons = [];
    if (priceFit >= 0.9) reasons.push("price-close-to-demand");
    if (areaFit >= 0.9) reasons.push("area-close-to-demand");
    if (optionalMatches.length) reasons.push(`optional-amenities:${optionalMatches.join(",")}`);
    if (needsFinancing && components.financing === 5) reasons.push("financing-friendly-terms");
    if (market?.recommendation >= 65) reasons.push("promising-market-score");
    return { listing, market, matchScore, components, reasons };
  }).sort((left, right) => right.matchScore - left.matchScore || left.listing.token.localeCompare(right.listing.token));
}

export function criteriaFingerprint(requirement) {
  return createHash("sha256").update(JSON.stringify(requirement)).digest("hex").slice(0, 16);
}

export function encodeMatchCursor(row, fingerprint) {
  return Buffer.from(JSON.stringify({ score: row.matchScore, token: row.listing.token, fingerprint })).toString("base64url");
}

export function decodeMatchCursor(cursor, fingerprint) {
  if (!cursor) return null;
  try {
    const value = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
    if (value.fingerprint !== fingerprint || !Number.isFinite(value.score) || !/^[A-Za-z0-9_-]+$/.test(value.token)) throw new Error();
    return value;
  } catch {
    throw Object.assign(new Error("Invalid or expired match cursor"), { status: 400 });
  }
}
