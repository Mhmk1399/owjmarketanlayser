import test from "node:test";
import assert from "node:assert/strict";
import { mergeBackfilledPublicDetails, needsPublicDetailBackfill } from "../src/collector/detailBackfill.js";
import { toPublicMarketListing } from "../src/collector/publicListing.js";

function listing(description = null, advertiser = {}) {
  return toPublicMarketListing({
    token: "safe-token", url: "https://divar.ir/v/safe-token", title: "خانه",
    description, category: "real-estate", subcategory: "buy-residential-apartment",
    city: "تهران", district: null, neighborhood: "ونک", sourceNeighborhoodSlug: "vanak",
    publishedText: null, extractionSource: "posts-v2", attributes: [],
    property: { area: 80, constructionYear: 1400, rooms: 2 },
    pricing: { price: 8_000_000_000 }, amenities: {}, advertiser,
    images: [], coordinates: { latitude: 35.7, longitude: 51.4, source: "posts-v2" },
    quality: { score: 100, missingFields: [] },
  }, null, "2026-10-20T00:00:00.000Z", { category: "buy-apartment", expectedSubcategory: "buy-residential-apartment", area: null });
}

test("detail backfill targets either missing description or unknown advertiser", () => {
  assert.equal(needsPublicDetailBackfill(listing()), true);
  assert.equal(needsPublicDetailBackfill(listing("متن", { type: "personal", isBusiness: false })), false);
});

test("detail backfill only updates safe public detail fields and preserves history", () => {
  const existing = listing();
  existing.lastSeenAt = "2026-10-20T00:00:00.000Z";
  existing.lifecycle.status = "possibly-removed";
  existing.imageCount = 4;
  existing.images = [];
  const extracted = listing("متن عمومی", { type: "real-estate-business", isBusiness: true, hasBusinessBadge: true });
  extracted.lifecycle.detailFetchedAt = "2026-10-26T00:00:00.000Z";
  const merged = mergeBackfilledPublicDetails(existing, extracted);
  assert.equal(merged.description, "متن عمومی");
  assert.equal(merged.advertiserType, "real-estate-business");
  assert.equal(merged.imageCount, merged.images.length);
  assert.equal(merged.lifecycle.status, "possibly-removed");
  assert.equal(new Date(merged.lastSeenAt).toISOString(), "2026-10-20T00:00:00.000Z");
  assert.equal(new Date(merged.lifecycle.detailFetchedAt).toISOString(), "2026-10-26T00:00:00.000Z");
});
