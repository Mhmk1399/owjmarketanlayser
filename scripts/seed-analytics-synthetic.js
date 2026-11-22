import mongoose from "mongoose";
import { config } from "../src/config.js";
import { toPublicMarketListing } from "../src/collector/publicListing.js";
import { Listing } from "../src/models/listing.js";
import { validateAnalyticsDatabaseTarget } from "../src/storage/analyticsDatabasePlan.js";

const apply = process.argv.includes("--apply");
const confirmationIndex = process.argv.indexOf("--confirm-database");
const confirmedDatabase = confirmationIndex >= 0 ? process.argv[confirmationIndex + 1] : null;
const database = validateAnalyticsDatabaseTarget(config.mongoDbName, apply ? confirmedDatabase : null);

const fixtures = [
  { token: "synthetic-vanak-buy-001", title: "واحد مصنوعی ونک", neighborhood: "ونک", slug: "vanak", area: 92, rooms: 2, price: 13_800_000_000, latitude: 35.7575, longitude: 51.4090 },
  { token: "synthetic-sa-adat-buy-002", title: "واحد مصنوعی سعادت‌آباد", neighborhood: "سعادت‌آباد", slug: "saadat-abad", area: 118, rooms: 3, price: 21_500_000_000, latitude: 35.7810, longitude: 51.3780 },
  { token: "synthetic-yousef-abad-buy-003", title: "واحد مصنوعی یوسف‌آباد", neighborhood: "یوسف‌آباد", slug: "yousef-abad", area: 76, rooms: 2, price: 10_900_000_000, latitude: 35.7310, longitude: 51.4070 },
].map((item) => toPublicMarketListing({
  token: item.token,
  url: `https://example.invalid/synthetic/${item.token}`,
  title: item.title,
  description: "داده عمومی کاملاً مصنوعی برای آزمون محلی؛ آگهی واقعی نیست.",
  category: "real-estate",
  subcategory: "buy-residential-apartment",
  city: "تهران",
  neighborhood: item.neighborhood,
  sourceNeighborhoodSlug: item.slug,
  extractionSource: "synthetic-local-fixture",
  attributes: [],
  property: { area: item.area, constructionYear: 1400, rooms: item.rooms },
  pricing: { price: item.price },
  amenities: { elevator: true, parking: true, storage: true },
  advertiser: { type: "personal", isBusiness: false },
  images: [],
  coordinates: { latitude: item.latitude, longitude: item.longitude, source: "synthetic-local-fixture" },
  quality: { score: 100, missingFields: [] },
}, null, "2026-11-22T00:00:00.000Z", {
  category: "buy-apartment",
  expectedSubcategory: "buy-residential-apartment",
  area: { id: null, name: item.neighborhood, slug: item.slug, municipalDistricts: [] },
}));

const output = { operation: apply ? "apply" : "dry-run", database, tokens: fixtures.map(({ token }) => token) };
if (!apply) {
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  process.exit(0);
}
if (database !== "owj_analytics") throw new Error("Synthetic seed may only target the local owj_analytics database");
if (!config.mongoUri) throw new Error("MONGODB_URI is required");
const parsed = new URL(config.mongoUri);
if (!["mongo", "localhost", "127.0.0.1", "::1"].includes(parsed.hostname)) {
  throw new Error("Synthetic seed refuses non-local MongoDB hosts");
}

try {
  await mongoose.connect(config.mongoUri, { dbName: database, autoCreate: false, autoIndex: false,
    serverSelectionTimeoutMS: 5_000, maxPoolSize: 2, minPoolSize: 0 });
  const result = await Listing.bulkWrite(fixtures.map((listing) => ({ updateOne: {
    filter: { token: listing.token }, update: { $set: listing }, upsert: true,
  } })), { ordered: true });
  process.stdout.write(`${JSON.stringify({ ...output, matched: result.matchedCount, upserted: result.upsertedCount }, null, 2)}\n`);
} finally {
  await mongoose.disconnect().catch(() => {});
}

