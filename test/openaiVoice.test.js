import test from "node:test";
import assert from "node:assert/strict";
import { CATALOG_FILTER_SCHEMA, normalizeCatalogVoiceFilters } from "../src/services/openaiVoice.js";

const context = {
  districts: ["ونک", "میرداماد"],
  categories: ["buy-residential-apartment"],
  scenarios: [{ scenarioId: "careful-buyer", name: "خریدار محتاط" }],
};

test("voice filters retain only catalog allowlisted values", () => {
  const filters = normalizeCatalogVoiceFilters({
    query: "  نورگیر  ",
    districts: ["ونک", "ساختگی", "ونک"],
    category: "buy-residential-apartment",
    status: "active",
    advertiserType: "personal",
    readiness: "scoring-ready",
    scenarioId: "careful-buyer",
    minPrice: 5_000_000_000,
    maxPrice: null,
    minScore: 72,
    maxScore: 140,
    minConfidence: -4,
    maxRisk: 25,
    scoreBand: "promising",
    amenities: ["parking", "private-phone", "parking"],
  }, context);
  assert.deepEqual(filters.districts, ["ونک"]);
  assert.equal(filters.query, "نورگیر");
  assert.equal(filters.scenarioId, "careful-buyer");
  assert.equal(filters.maxPrice, null);
  assert.equal(filters.maxScore, 100);
  assert.equal(filters.minConfidence, 0);
  assert.deepEqual(filters.amenities, ["parking"]);
  assert.equal(Object.hasOwn(filters, "private-phone"), false);
});

test("voice filters reject invented catalog identifiers", () => {
  const filters = normalizeCatalogVoiceFilters({
    districts: ["تهران ناشناس"], category: "secret-category", scenarioId: "other",
    status: "admin", advertiserType: "identity", readiness: "private",
    scoreBand: "perfect", amenities: ["telephone"],
  }, context);
  assert.deepEqual(filters.districts, []);
  assert.equal(filters.category, null);
  assert.equal(filters.scenarioId, null);
  assert.equal(filters.status, null);
  assert.equal(filters.advertiserType, null);
  assert.equal(filters.readiness, null);
  assert.equal(filters.scoreBand, null);
  assert.deepEqual(filters.amenities, []);
});

test("OpenAI catalog filter schema is strict and has no contact fields", () => {
  assert.equal(CATALOG_FILTER_SCHEMA.additionalProperties, false);
  assert.equal(Object.hasOwn(CATALOG_FILTER_SCHEMA.properties.amenities, "uniqueItems"), false);
  assert.equal(Object.hasOwn(CATALOG_FILTER_SCHEMA.properties, "phone"), false);
  assert.equal(Object.hasOwn(CATALOG_FILTER_SCHEMA.properties, "contact"), false);
  assert.equal(Object.hasOwn(CATALOG_FILTER_SCHEMA.properties, "advertiserIdentity"), false);
});
