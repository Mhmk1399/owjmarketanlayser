import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { toPublicMarketListing, validatePublicMarketListing } from "../src/collector/publicListing.js";
import { Listing } from "../src/models/listing.js";
import {
  isForbiddenContactUrl,
  listingMatchesPartition,
  validateListingPartition,
} from "../src/collector/publicCrawler.js";

function normalizedFixture(overrides = {}) {
  return {
    token: "fixture-token",
    url: "https://divar.ir/v/example/fixture-token",
    title: "خانه مناسب تماس ۰۹۱۲۱۲۳۴۵۶۷",
    description: "توضیحات عمومی؛ تماس ۰۹۱۲۱۲۳۴۵۶۷",
    category: "real-estate",
    subcategory: "buy-residential-apartment",
    city: "تهران",
    district: "منطقه ۱",
    neighborhood: "تجریش",
    publishedText: "یک ساعت پیش",
    property: { area: 100, constructionYear: 1400, rooms: 2, floor: 3, totalFloors: 5, unitsPerFloor: 2 },
    pricing: { price: 10_000_000_000, pricePerMeter: 1, deposit: null, rent: null, isFullMortgage: null, isNegotiable: false },
    amenities: { elevator: true, parking: true, storage: true, balcony: false },
    advertiser: { name: "Private Person", type: "شخصی", agencyName: null },
    contact: { authenticatedPhone: "09121234567", publicPhones: ["09121234567"] },
    images: ["https://example.com/a.jpg"],
    coordinates: {
      latitude: 35.8,
      longitude: 51.4,
      accuracy: "nearby",
      radiusMeters: null,
      source: "dom",
    },
    quality: { score: 90, missingFields: [] },
    ...overrides,
  };
}

test("public projection removes contact and identity fields and derives price per metre", () => {
  const listing = toPublicMarketListing(normalizedFixture(), null, "2026-01-01T00:00:00.000Z");
  assert.equal(Object.hasOwn(listing, "contact"), false);
  assert.equal(Object.hasOwn(listing, "description"), true);
  assert.match(listing.description, /\[redacted-phone\]/);
  assert.equal(Object.hasOwn(listing, "advertiser"), false);
  assert.equal(listing.advertiserType, "personal");
  assert.equal(listing.advertiserSignals.isBusiness, null);
  assert.deepEqual(listing.crawlPartition, {
    category: null,
    expectedSubcategory: null,
    area: null,
  });
  assert.equal(listing.pricing.pricePerMeter, 100_000_000);
  assert.equal(listing.images.length, 1);
  assert.equal(listing.images[0].isPrimary, true);
  assert.equal(listing.extraction.coveragePercent > 0, true);
  assert.deepEqual(listing.resolvedLocation, {
    provinceId: 904, cityId: 1, neighborhoodId: 61,
    slug: "tajrish", name: "تجریش", matchConfidence: "exact-name",
  });
  assert.match(listing.title, /\[redacted-phone\]/);
  assert.doesNotMatch(JSON.stringify(listing), /09121234567|Private Person/);
  assert.equal(listing.quality.outcome, "scoring-ready");
  assert.equal(listing.lifecycle.status, "active");
});

test("content fingerprint records publication, image, advertiser and quality changes", () => {
  const base = toPublicMarketListing(normalizedFixture(), null, "2026-01-01T00:00:00.000Z");
  const changed = toPublicMarketListing(normalizedFixture({ images: ["a", "b"], publishedText: "لحظاتی پیش",
    advertiser: { type: "املاک" }, quality: { score: 80, missingFields: ["floor"] } }), null, "2026-01-01T00:00:00.000Z");
  assert.notEqual(base.contentFingerprint, changed.contentFingerprint);
});

test("advertiser classification separates personal files from real-estate businesses", () => {
  const personal = toPublicMarketListing(normalizedFixture({ advertiser: { type: "شخصی", isBusiness: false } }));
  const business = toPublicMarketListing(normalizedFixture({ advertiser: { type: "مشاور املاک", isBusiness: true } }));
  const unknown = toPublicMarketListing(normalizedFixture({ advertiser: {} }));
  assert.equal(personal.advertiserType, "personal");
  assert.equal(business.advertiserType, "real-estate-business");
  assert.equal(unknown.advertiserType, "unknown");
  assert.doesNotMatch(JSON.stringify(business), /advertiserName|agencyName|09121234567/i);
});

test("contact endpoint guard recognizes forbidden URLs", () => {
  assert.equal(isForbiddenContactUrl("https://api.divar.ir/v8/postcontact/web/contact_info_v2/x"), true);
  assert.equal(isForbiddenContactUrl("https://divar.ir/s/tehran/buy-residential"), false);
});

test("partition guard accepts only the requested apartment area", () => {
  const discovered = {
    expectedSubcategory: "buy-residential-apartment",
    area: { name: "جنت‌آباد جنوبی" },
  };
  assert.equal(listingMatchesPartition({
    subcategory: "buy-residential-apartment",
    neighborhood: "جنت‌آباد جنوبی",
  }, discovered), true);
  assert.equal(listingMatchesPartition({
    subcategory: "buy-residential-villa",
    neighborhood: "جنت‌آباد جنوبی",
  }, discovered), false);
  assert.equal(listingMatchesPartition({
    subcategory: "buy-residential-apartment",
    neighborhood: "جنت‌آباد شمالی",
  }, discovered), false);
});

test("partition guard accepts a source slug alias and returns typed mismatch reasons", () => {
  const discovered = { expectedSubcategory: "buy-residential-apartment", area: {
    name: "اختیاریه", slug: "ekhtiyariyeh", secondSlugs: ["ekhtiarieh"],
  } };
  assert.equal(validateListingPartition({ subcategory: "buy-residential-apartment", neighborhood: "alternate label",
    sourceNeighborhoodSlug: "ekhtiarieh" }, discovered).matches, true);
  assert.equal(validateListingPartition({ subcategory: "buy-residential-villa", neighborhood: "اختیاریه" }, discovered).reason,
    "subcategory-mismatch");
  assert.equal(validateListingPartition({ subcategory: "buy-residential-apartment", neighborhood: "دروس" }, discovered).reason,
    "neighborhood-mismatch");
});

test("runtime schema guard rejects contact-bearing records", () => {
  const listing = toPublicMarketListing(normalizedFixture());
  assert.throws(
    () => validatePublicMarketListing({ ...listing, contact: { authenticatedPhone: "redacted" } }),
    /forbidden field contact/,
  );
});

test("contact redaction covers formatted mobile and landline numbers", () => {
  const listing = toPublicMarketListing(normalizedFixture({
    title: "تماس ۰۹۱۲ ۱۲۳ ۴۵۶۷ یا ۰۲۱ ۱۲۳۴ ۵۶۷۸",
  }));
  assert.equal((listing.title.match(/\[redacted-phone\]/g) || []).length, 2);
  assert.doesNotMatch(listing.title, /0912|021/);
});

test("public description keeps property prose but drops embedded identity channels", () => {
  const listing = toPublicMarketListing(normalizedFixture({
    description: "دو خواب و بازسازی‌شده\nآدرس دفتر: خیابان نمونه\nتلگرام @agent_name\nهستم__AGENT.NAME__",
  }));
  assert.equal(listing.description, "دو خواب و بازسازی‌شده");
  assert.doesNotMatch(JSON.stringify(listing), /agent_name|AGENT\.NAME|خیابان نمونه/);
});

test("public listing JSON schema is valid JSON and requires no contact field", async () => {
  const schema = JSON.parse(await fs.readFile(new URL("../schemas/public-listing.schema.json", import.meta.url), "utf8"));
  assert.equal(schema.additionalProperties, false);
  assert.equal(Object.hasOwn(schema.properties, "contact"), false);
  assert.equal(schema.properties.pricing.properties.currency.const, "TOMAN");
});

test("public extractor has no static contact or token-client dependency", async () => {
  const publicModule = await fs.readFile(new URL("../src/collector/publicListing.js", import.meta.url), "utf8");
  assert.doesNotMatch(publicModule, /from\s+["'].*(?:contact|tokenClient)/);
  assert.doesNotMatch(publicModule, /\.\.\/\.\.\/\.\.\//);
});

test("Mongoose Listing is strict, indexed, and validates the public projection", async () => {
  const listing = toPublicMarketListing(normalizedFixture());
  await new Listing(listing).validate();
  assert.throws(() => new Listing({ ...listing, contact: { phone: "09121234567" } }), /strict mode/i);
  const indexes = Listing.schema.indexes();
  assert.equal(indexes.some(([fields, options]) => fields.token === 1 && options.unique), true);
  assert.equal(indexes.some(([fields]) => fields["resolvedLocation.neighborhoodId"] === 1), true);
});
