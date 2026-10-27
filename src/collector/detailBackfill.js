import { _publicListingHelpers, validatePublicMarketListing } from "./publicListing.js";

export function needsPublicDetailBackfill(listing) {
  return !String(listing?.description || "").trim()
    || !["personal", "real-estate-business"].includes(listing?.advertiserType);
}

export function mergeBackfilledPublicDetails(existing, extracted) {
  const now = extracted.lifecycle.detailFetchedAt;
  const merged = {
    ...existing,
    description: extracted.description ?? existing.description ?? null,
    images: extracted.images,
    imageCount: extracted.imageCount,
    advertiserType: extracted.advertiserType,
    advertiserSignals: extracted.advertiserSignals,
    extraction: {
      ...existing.extraction,
      source: extracted.extraction.source,
    },
    lifecycle: {
      ...existing.lifecycle,
      detailFetchedAt: now,
    },
  };

  const coverageFields = [
    "description", "property.area", "property.constructionYear", "property.rooms",
    "pricing.price", "coordinates.latitude", "coordinates.longitude", "images",
  ];
  const presentFields = coverageFields.filter((field) => {
    const value = field.split(".").reduce((item, key) => item?.[key], merged);
    return Array.isArray(value) ? value.length > 0 : value !== null && value !== undefined;
  });
  merged.extraction = {
    source: extracted.extraction.source,
    presentFields,
    missingFields: coverageFields.filter((field) => !presentFields.includes(field)),
    coveragePercent: Math.round((presentFields.length / coverageFields.length) * 100),
  };
  merged.contentFingerprint = _publicListingHelpers.fingerprintFor(merged);
  if (merged.contentFingerprint !== existing.contentFingerprint) {
    merged.lifecycle.lastContentChangedAt = now;
  }
  return validatePublicMarketListing(merged);
}
