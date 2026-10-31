const NEARBY_ENDPOINT = "https://api.neshan.org/v1/nearby";
const PEDESTRIAN_ROUTE_ENDPOINT = "https://api.neshan.org/v4/direction";
const DEFAULT_RADIUS_METERS = 1_500;
const DEFAULT_RESULTS_PER_LAYER = 8;

export const PUBLIC_TRANSPORT_LAYERS = Object.freeze([
  { category: "metro-station", layer: "metro_entrance" },
  { category: "bus-station", layer: "bus_station" },
]);

export class NeshanServiceError extends Error {
  constructor(message, { status = null, code = null, service = null } = {}) {
    super(message);
    this.name = "NeshanServiceError";
    this.status = status;
    this.code = code;
    this.service = service;
  }
}

function radians(value) { return value * Math.PI / 180; }

export function distanceMeters(origin, destination) {
  const dLat = radians(destination.latitude - origin.latitude);
  const dLng = radians(destination.longitude - origin.longitude);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(radians(origin.latitude))
    * Math.cos(radians(destination.latitude)) * Math.sin(dLng / 2) ** 2;
  return Math.round(6_371_000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function cleanText(value, maximum = 300) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, maximum) : null;
}

function finiteNonNegative(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? Math.round(number) : null;
}

function validatePoint(point, label) {
  const latitude = Number(point?.latitude);
  const longitude = Number(point?.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)
    || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    throw new NeshanServiceError(`${label} coordinates are unavailable or invalid`, {
      code: "invalid-coordinates",
    });
  }
  return { latitude, longitude };
}

async function responsePayload(response) {
  try { return await response.json(); } catch { return null; }
}

async function neshanJson(url, { apiKey, fetchImpl, service }) {
  const response = await fetchImpl(url, {
    headers: { "Api-Key": apiKey, Accept: "application/json" },
    signal: AbortSignal.timeout(15_000),
  });
  const payload = await responsePayload(response);
  if (!response.ok) {
    const code = cleanText(payload?.status || payload?.code || payload?.error, 80);
    throw new NeshanServiceError(
      `Neshan ${service} failed with HTTP ${response.status}${code ? ` (${code})` : ""}`,
      { status: response.status, code, service },
    );
  }
  return payload || {};
}

export async function fetchPedestrianRoute({ origin, destination, apiKey, fetchImpl = fetch }) {
  if (!apiKey) throw new NeshanServiceError("Neshan services key is not configured", { code: "missing-api-key", service: "pedestrian-routing" });
  const safeOrigin = validatePoint(origin, "Origin");
  const safeDestination = validatePoint(destination, "Destination");
  const url = new URL(PEDESTRIAN_ROUTE_ENDPOINT);
  url.searchParams.set("type", "pedestrian");
  url.searchParams.set("origin", `${safeOrigin.latitude},${safeOrigin.longitude}`);
  url.searchParams.set("destination", `${safeDestination.latitude},${safeDestination.longitude}`);
  url.searchParams.set("alternative", "false");
  const payload = await neshanJson(url, { apiKey, fetchImpl, service: "pedestrian routing" });
  const route = payload.routes?.[0];
  if (!route?.legs?.length) {
    throw new NeshanServiceError("Neshan returned no pedestrian route", {
      status: 404, code: "route-not-found", service: "pedestrian-routing",
    });
  }
  const totals = route.legs.reduce((result, leg) => ({
    distanceMeters: result.distanceMeters + (finiteNonNegative(leg.distance?.value) || 0),
    durationSeconds: result.durationSeconds + (finiteNonNegative(leg.duration?.value) || 0),
  }), { distanceMeters: 0, durationSeconds: 0 });
  return {
    mode: "pedestrian",
    distanceMeters: totals.distanceMeters,
    durationSeconds: totals.durationSeconds,
    overviewPolyline: cleanText(route.overview_polyline?.points, 20_000),
  };
}

async function fetchNearbyLayer({ origin, category, layer, radiusMeters, limit, apiKey, fetchImpl }) {
  const url = new URL(NEARBY_ENDPOINT);
  url.searchParams.set("location", `${origin.latitude},${origin.longitude}`);
  url.searchParams.set("layer", layer);
  url.searchParams.set("searchRadius", String(radiusMeters));
  const payload = await neshanJson(url, { apiKey, fetchImpl, service: `nearby ${layer}` });
  return (payload.layerPoints?.nearestPoints || []).slice(0, limit).flatMap((item) => {
    let coordinates;
    try { coordinates = validatePoint(item.location, "Nearby place"); } catch { return []; }
    const title = cleanText(item.name, 160);
    if (!title) return [];
    return [{
      category,
      layer,
      title,
      address: null,
      coordinates,
      distanceMeters: finiteNonNegative(item.distance) ?? distanceMeters(origin, coordinates),
      straightLineDistanceMeters: distanceMeters(origin, coordinates),
      nearbyDistanceMeters: finiteNonNegative(item.distance),
      nearbyDurationSeconds: finiteNonNegative(item.duration),
      routeDistanceMeters: null,
      routeDurationSeconds: null,
      routeMode: null,
      poiHash: cleanText(item.poiHash, 500),
      source: "neshan-nearby",
    }];
  });
}

function routingUnavailable(error) {
  return error instanceof NeshanServiceError
    && ([480, 481, 482, 483, 484, 485].includes(error.status) || error.code === "missing-api-key");
}

async function addPedestrianRoutes(places, { origin, apiKey, fetchImpl, concurrency }) {
  let cursor = 0;
  let disabled = false;
  const output = [...places];
  const worker = async () => {
    while (!disabled) {
      const index = cursor;
      cursor += 1;
      if (index >= output.length) return;
      try {
        const route = await fetchPedestrianRoute({ origin, destination: output[index].coordinates, apiKey, fetchImpl });
        output[index] = {
          ...output[index],
          distanceMeters: route.distanceMeters,
          routeDistanceMeters: route.distanceMeters,
          routeDurationSeconds: route.durationSeconds,
          routeMode: route.mode,
        };
      } catch (error) {
        if (routingUnavailable(error)) disabled = true;
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, output.length) }, () => worker()));
  return output;
}

export async function fetchNearbyPlaces({
  latitude,
  longitude,
  apiKey,
  fetchImpl = fetch,
  radiusMeters = DEFAULT_RADIUS_METERS,
  resultsPerLayer = DEFAULT_RESULTS_PER_LAYER,
  includePedestrianRoutes = true,
  routeConcurrency = 3,
} = {}) {
  if (!apiKey) throw new NeshanServiceError("Neshan services key is not configured", { code: "missing-api-key", service: "nearby" });
  const origin = validatePoint({ latitude, longitude }, "Listing");
  const safeRadius = Math.min(10_000, Math.max(100, Math.round(Number(radiusMeters) || DEFAULT_RADIUS_METERS)));
  const safeLimit = Math.min(20, Math.max(1, Math.round(Number(resultsPerLayer) || DEFAULT_RESULTS_PER_LAYER)));
  const fetchedAt = new Date().toISOString();
  const results = await Promise.allSettled(PUBLIC_TRANSPORT_LAYERS.map(({ category, layer }) => fetchNearbyLayer({
    origin, category, layer, radiusMeters: safeRadius, limit: safeLimit, apiKey, fetchImpl,
  })));
  const places = results.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  if (!places.length) {
    const failure = results.find((result) => result.status === "rejected");
    if (failure) throw failure.reason;
  }
  const routed = includePedestrianRoutes
    ? await addPedestrianRoutes(places, {
      origin, apiKey, fetchImpl, concurrency: Math.min(6, Math.max(1, routeConcurrency)),
    })
    : places;
  return routed
    .map((place) => ({ ...place, fetchedAt }))
    .sort((left, right) => left.distanceMeters - right.distanceMeters);
}
