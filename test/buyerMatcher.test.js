import test from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { BuyerRequirement } from "../src/models/buyerRequirement.js";
import {
  buildBuyerMongoFilter,
  criteriaFingerprint,
  decodeMatchCursor,
  encodeMatchCursor,
  normalizeBuyerMatchRequest,
  rankBuyerCandidates,
} from "../src/search/buyerMatcher.js";

test("BuyerRequirement preserves the provided CRM shape and is strict", async () => {
  const id = new mongoose.Types.ObjectId();
  await new BuyerRequirement({
    buyerCase: id, transactionType: "buy", propertyTypes: ["buy-residential-apartment"],
    locations: ["ونک"], maxPrice: 20_000_000_000, minArea: 80, minRooms: 2,
    requiredAmenities: ["parking"], optionalAmenities: ["elevator"],
    createdBy: id, updatedBy: id,
  }).validate();
  assert.throws(() => new BuyerRequirement({ unexpected: true }), /strict mode/i);
});

test("buyer matcher normalizes an allowlisted request and creates indexed hard filters", () => {
  const requirement = normalizeBuyerMatchRequest({
    transactionType: "buy", propertyTypes: ["buy-residential-apartment"], locations: ["ونک"],
    minPrice: "10000000000", maxPrice: "20000000000", minArea: 80,
    requiredAmenities: ["parking"], optionalAmenities: ["parking", "elevator"],
  });
  assert.deepEqual(requirement.optionalAmenities, ["elevator"]);
  const filter = buildBuyerMongoFilter(requirement);
  assert.ok(filter.$and.some((item) => item.subcategory?.$in?.includes("buy-residential-apartment")));
  assert.ok(filter.$and.some((item) => item["pricing.price"]?.$gte === 10_000_000_000));
  assert.ok(filter.$and.some((item) => item["amenities.parking"] === true));
  assert.throws(() => normalizeBuyerMatchRequest({ minPrice: 20, maxPrice: 10 }), /minimum cannot exceed/);
  assert.throws(() => normalizeBuyerMatchRequest({ requiredAmenities: ["jacuzzi"] }), /Unsupported amenities/);
});

test("buyer matcher ranks bounded candidates and protects cursors with the criteria fingerprint", () => {
  const requirement = normalizeBuyerMatchRequest({
    minPrice: 9_000_000_000, maxPrice: 11_000_000_000,
    minArea: 90, maxArea: 110, optionalAmenities: ["elevator"],
  });
  const listing = (token, price, area, elevator) => ({
    token, lastSeenAt: new Date().toISOString(), pricing: { price },
    property: { area }, amenities: { elevator },
  });
  const scores = new Map([
    ["best", { recommendation: 80, confidence: 80, risk: 10 }],
    ["weak", { recommendation: 30, confidence: 50, risk: 50 }],
  ]);
  const ranked = rankBuyerCandidates(requirement, [
    listing("weak", 11_000_000_000, 110, false),
    listing("best", 10_000_000_000, 100, true),
  ], scores);
  assert.equal(ranked[0].listing.token, "best");
  const fingerprint = criteriaFingerprint(requirement);
  const cursor = encodeMatchCursor(ranked[0], fingerprint);
  assert.deepEqual(decodeMatchCursor(cursor, fingerprint), {
    score: ranked[0].matchScore, token: "best", fingerprint,
  });
  assert.throws(() => decodeMatchCursor(cursor, "different"), /Invalid or expired/);
});
