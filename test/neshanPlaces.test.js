import test from "node:test";
import assert from "node:assert/strict";
import { distanceMeters, fetchNearbyPlaces } from "../src/services/neshanPlaces.js";

test("distanceMeters returns a stable geodesic distance", () => {
  assert.equal(distanceMeters({ latitude: 35.7, longitude: 51.4 }, { latitude: 35.701, longitude: 51.4 }), 111);
});

test("nearby place lookup keeps only the explicit public allowlist", async () => {
  const fetchImpl = async () => ({ ok: true, json: async () => ({ items: [{ title: "  ایستگاه  ", address: " تهران ", phone: "021000", location: { x: 51.4, y: 35.701 }, identity: { name: "secret" } }] }) });
  const places = await fetchNearbyPlaces({ latitude: 35.7, longitude: 51.4, apiKey: "test", fetchImpl });
  assert.equal(places.length, 2);
  assert.deepEqual(Object.keys(places[0]).sort(), ["address", "category", "coordinates", "distanceMeters", "fetchedAt", "source", "title"].sort());
  assert.equal(places[0].title, "ایستگاه");
  assert.equal(JSON.stringify(places).includes("021000"), false);
  assert.equal(JSON.stringify(places).includes("secret"), false);
});
