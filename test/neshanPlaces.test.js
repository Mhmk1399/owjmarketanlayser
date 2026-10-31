import test from "node:test";
import assert from "node:assert/strict";
import {
  distanceMeters,
  fetchNearbyPlaces,
  fetchPedestrianRoute,
} from "../src/services/neshanPlaces.js";

test("distanceMeters returns a stable geodesic distance", () => {
  assert.equal(distanceMeters({ latitude: 35.7, longitude: 51.4 }, { latitude: 35.701, longitude: 51.4 }), 111);
});

test("pedestrian routing follows Neshan v4 and returns only safe route metadata", async () => {
  let request;
  const fetchImpl = async (url, options) => {
    request = { url, options };
    return {
      ok: true, status: 200,
      json: async () => ({
        routes: [{ overview_polyline: { points: "encoded-route" }, legs: [
          { distance: { value: 400 }, duration: { value: 300 }, steps: [{ instruction: "private-noise" }] },
          { distance: { value: 50 }, duration: { value: 40 } },
        ] }],
      }),
    };
  };
  const route = await fetchPedestrianRoute({
    origin: { latitude: 35.7, longitude: 51.4 },
    destination: { latitude: 35.701, longitude: 51.401 },
    apiKey: "service-key", fetchImpl,
  });
  assert.equal(request.url.origin + request.url.pathname, "https://api.neshan.org/v4/direction");
  assert.equal(request.url.searchParams.get("type"), "pedestrian");
  assert.equal(request.options.headers["Api-Key"], "service-key");
  assert.deepEqual(route, {
    mode: "pedestrian", distanceMeters: 450, durationSeconds: 340, overviewPolyline: "encoded-route",
  });
  assert.equal(JSON.stringify(route).includes("private-noise"), false);
});

test("nearby lookup uses typed transport layers, adds walking routes, and keeps an explicit allowlist", async () => {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    if (url.pathname === "/v1/nearby") {
      const layer = url.searchParams.get("layer");
      return {
        ok: true, status: 200,
        json: async () => ({ layerPoints: { nearestPoints: [{
          name: layer === "metro_entrance" ? "  ایستگاه مترو  " : "ایستگاه اتوبوس",
          location: { latitude: 35.701, longitude: 51.4 },
          distance: 180, duration: 40, poiHash: `${layer}_hash`,
          phone: "021000", identity: { name: "secret" },
        }] } }),
      };
    }
    return {
      ok: true, status: 200,
      json: async () => ({ routes: [{ overview_polyline: { points: "not-stored" }, legs: [{
        distance: { value: 210 }, duration: { value: 160 }, steps: [{ instruction: "not-stored" }],
      }] }] }),
    };
  };
  const places = await fetchNearbyPlaces({ latitude: 35.7, longitude: 51.4, apiKey: "test", fetchImpl });
  assert.equal(places.length, 2);
  assert.deepEqual(calls.filter((url) => url.pathname === "/v1/nearby")
    .map((url) => url.searchParams.get("layer")).sort(), ["bus_station", "metro_entrance"]);
  assert.equal(calls.filter((url) => url.pathname === "/v4/direction").length, 2);
  assert.deepEqual(Object.keys(places[0]).sort(), [
    "address", "category", "coordinates", "distanceMeters", "fetchedAt", "layer",
    "nearbyDistanceMeters", "nearbyDurationSeconds", "poiHash", "routeDistanceMeters",
    "routeDurationSeconds", "routeMode", "source", "straightLineDistanceMeters", "title",
  ].sort());
  assert.equal(places[0].routeMode, "pedestrian");
  assert.equal(places[0].routeDistanceMeters, 210);
  assert.equal(places[0].routeDurationSeconds, 160);
  assert.equal(places[0].source, "neshan-nearby");
  assert.equal(JSON.stringify(places).includes("021000"), false);
  assert.equal(JSON.stringify(places).includes("secret"), false);
  assert.equal(JSON.stringify(places).includes("not-stored"), false);
});

test("nearby results survive when pedestrian routing is not activated for the key", async () => {
  const fetchImpl = async (url) => {
    if (url.pathname === "/v1/nearby") return {
      ok: true, status: 200,
      json: async () => ({ layerPoints: { nearestPoints: [{
        name: "ایستگاه", location: { latitude: 35.701, longitude: 51.4 }, distance: 180, duration: 40,
      }] } }),
    };
    return { ok: false, status: 485, json: async () => ({ status: "ApiServiceListError" }) };
  };
  const places = await fetchNearbyPlaces({ latitude: 35.7, longitude: 51.4, apiKey: "test", fetchImpl });
  assert.equal(places.length, 2);
  assert.equal(places[0].routeMode, null);
  assert.equal(places[0].distanceMeters, 180);
});
