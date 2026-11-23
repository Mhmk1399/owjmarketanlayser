import test from "node:test";
import assert from "node:assert/strict";
import {
  createListingCursor,
  listingSearchFingerprint,
  parseListingCursor,
} from "../src/storage/listingCursor.js";

const secret = "synthetic-cursor-secret-that-is-long-enough-v1";
const filters = { status: "active", districts: ["a", "b"], price: { min: 1, max: 10 } };

test("listing cursor binds filters, sort, stable value and token tie-breaker", () => {
  const cursor = createListingCursor({
    filters, sort: "newest", secret, now: 1_000,
    position: { value: "2026-11-23T00:00:00.000Z", token: "listing-one" },
  });
  const parsed = parseListingCursor(cursor, { filters, sort: "newest", secret, now: 2_000 });
  assert.deepEqual(parsed.position, { value: "2026-11-23T00:00:00.000Z", token: "listing-one" });
  assert.equal(parsed.version, 1);
});

test("listing cursor rejects tampering, filter changes, sort changes and expiry", () => {
  const cursor = createListingCursor({
    filters, sort: "price-asc", secret, now: 1_000, ttlMs: 1_000,
    position: { value: 9_000_000_000, token: "listing-one" },
  });
  assert.throws(() => parseListingCursor(`${cursor.slice(0, -1)}x`, { filters, sort: "price-asc", secret, now: 1_500 }), /integrity/i);
  assert.throws(() => parseListingCursor(cursor, { filters: { ...filters, status: "removed" }, sort: "price-asc", secret, now: 1_500 }), /filters/i);
  assert.throws(() => parseListingCursor(cursor, { filters, sort: "price-desc", secret, now: 1_500 }), /sort/i);
  assert.throws(() => parseListingCursor(cursor, { filters, sort: "price-asc", secret, now: 2_001 }), (error) => error.code === "search-cursor-expired");
});

test("listing filter fingerprint is canonical across object key order but preserves array order", () => {
  assert.equal(
    listingSearchFingerprint({ b: 2, a: 1 }, "newest"),
    listingSearchFingerprint({ a: 1, b: 2 }, "newest"),
  );
  assert.notEqual(
    listingSearchFingerprint({ district: ["a", "b"] }, "newest"),
    listingSearchFingerprint({ district: ["b", "a"] }, "newest"),
  );
});

