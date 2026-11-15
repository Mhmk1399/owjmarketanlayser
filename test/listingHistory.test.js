import test from "node:test";
import assert from "node:assert/strict";
import { listingActivities, lifecycleActivities, possiblePropertyLink } from "../src/collector/listingHistory.js";
import { ListingPropertyLink } from "../src/models/listingPropertyLink.js";
import { ListingActivity } from "../src/models/listingActivity.js";

const listing = { token: "first", contentFingerprint: "a".repeat(64),
  lastSeenAt: "2026-11-07T00:00:00.000Z", subcategory: "buy-residential-apartment",
  pricing: { price: 10_000 }, property: { area: 90, rooms: 2, constructionYear: 1399 },
  images: [{ url: "https://example.test/a.jpg" }, { url: "https://example.test/b.jpg" }] };

test("history separates new ads, unchanged refreshes, price changes and reappearances", async () => {
  const first = listingActivities(null, listing, "cycle");
  assert.deepEqual(first.map((event) => event.type), ["new-listing"]);
  assert.equal(first[0].propertyIdentity, "unresolved");
  await new ListingActivity(first[0]).validate();
  assert.deepEqual(listingActivities(listing, listing, "cycle-two").map((event) => event.type), ["unchanged"]);
  const changed = { ...listing, contentFingerprint: "b".repeat(64), pricing: { price: 9_000 } };
  const events = listingActivities({ ...listing, lifecycle: { status: "removed" } }, changed, "cycle-three");
  assert.deepEqual(events.map((event) => event.type), ["refreshed", "reappeared", "price-changed"]);
  assert.equal(events.at(-1).previousPrice, 10_000);
  assert.equal(events.at(-1).price, 9_000);
  assert.equal(events[0].eventId, listingActivities(listing, changed, "cycle-three")[0].eventId);
});

test("a matching-image repost remains a candidate and requires verification before confirmation", async () => {
  const old = { ...listing, token: "second", lifecycle: { status: "removed" } };
  const link = possiblePropertyLink(listing, old);
  assert.equal(link.relation, "repost");
  assert.equal(link.status, "candidate");
  await new ListingPropertyLink(link).validate();
  await assert.rejects(new ListingPropertyLink({ ...link, status: "confirmed" }).validate(), /independent verification/);
  assert.equal(possiblePropertyLink(listing, { ...old, images: old.images.slice(0, 1) }), null);
  assert.equal(possiblePropertyLink(listing, { ...old, property: { ...old.property, area: 91 } }), null);
});

test("disappearance is recorded as coverage inference, never a confirmed sale", async () => {
  const event = lifecycleActivities({ ...listing, lifecycle: { status: "active" } },
    { ...listing, lifecycle: { status: "not-seen" } }, "cycle-missing", listing.lastSeenAt)[0];
  assert.equal(event.type, "not-seen");
  assert.equal(event.basis, "coverage-inference");
  await new ListingActivity(event).validate();
  assert.equal(lifecycleActivities({ ...listing, lifecycle: { status: "removed" } },
    { ...listing, lifecycle: { status: "removed" } }, "later", listing.lastSeenAt).length, 0);
});
