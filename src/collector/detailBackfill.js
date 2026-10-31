import { _publicListingHelpers, validatePublicMarketListing } from "./publicListing.js";

export function needsPublicDetailBackfill(listing) {
  return !String(listing?.description || "").trim()
    || !["personal", "real-estate-business"].includes(listing?.advertiserType);
}

export function mergeBackfilledPublicDetails(existing, extracted) {
  const now = extracted.lifecycle.detailFetchedAt;
  const images = extracted.images.length ? extracted.images : (existing.images || []);
  const merged = {
    ...existing,
    schemaVersion: extracted.schemaVersion,
    description: extracted.description ?? existing.description ?? null,
    images,
    imageCount: images.length,
    attributes: extracted.attributes.length ? extracted.attributes : existing.attributes,
    property: { ...existing.property, ...Object.fromEntries(Object.entries(extracted.property)
      .filter(([, value]) => value !== null && value !== undefined)) },
    propertyDetails: { ...existing.propertyDetails, ...Object.fromEntries(Object.entries(extracted.propertyDetails)
      .filter(([, value]) => value !== null && value !== undefined)) },
    pricing: { ...existing.pricing, ...Object.fromEntries(Object.entries(extracted.pricing)
      .filter(([, value]) => value !== null && value !== undefined)) },
    amenities: { ...existing.amenities, ...Object.fromEntries(Object.entries(extracted.amenities)
      .filter(([, value]) => value !== null && value !== undefined)) },
    advertiserType: extracted.advertiserType,
    advertiserSignals: extracted.advertiserSignals,
    media: extracted.media,
    publication: extracted.publication?.text ? extracted.publication : existing.publication,
    publishedText: extracted.publishedText ?? existing.publishedText ?? null,
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
