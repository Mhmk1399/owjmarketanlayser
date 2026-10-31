import "dotenv/config";
import mongoose from "mongoose";
import { Listing } from "../src/models/listing.js";
import { fetchNearbyPlaces } from "../src/services/neshanPlaces.js";

const integerOption = (name, fallback, minimum = 0, maximum = Number.MAX_SAFE_INTEGER) => {
  const prefix = `--${name}=`;
  const raw = process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
  const parsed = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(parsed) ? Math.min(maximum, Math.max(minimum, parsed)) : fallback;
};
const limit = integerOption("limit", 100);
const intervalMs = integerOption("interval-ms", 2_000, 250, 60_000);
const staleHours = integerOption("stale-hours", 168, 1, 8_760);
const radiusMeters = integerOption("radius-meters", Number(process.env.NESHAN_NEARBY_RADIUS_METERS) || 1_500, 100, 10_000);
const resultsPerLayer = integerOption("results-per-layer", Number(process.env.NESHAN_NEARBY_RESULTS_PER_LAYER) || 8, 1, 20);
const refreshAll = process.argv.includes("--all");
const includePedestrianRoutes = !process.argv.includes("--skip-routes");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mongoUri = process.env.MONGODB_URI;
const apiKey = process.env.NESHAN_SERVICE_KEY || process.env.NESHAN_API_KEY;
if (!mongoUri) throw new Error("MONGODB_URI is required");
if (!apiKey) throw new Error("NESHAN_SERVICE_KEY is required; a public web-map key cannot call Neshan services");

await mongoose.connect(mongoUri, {
  dbName: process.env.MONGODB_DB_NAME || "owj_market_analytics",
  serverSelectionTimeoutMS: 30_000,
});

try {
  const staleBefore = new Date(Date.now() - staleHours * 3_600_000);
  const query = {
    "coordinates.latitude": { $type: "number" },
    "coordinates.longitude": { $type: "number" },
    ...(refreshAll ? {} : { $or: [
      { nearbyPlaces: { $size: 0 } },
      { nearbyPlaces: { $exists: false } },
      { "nearbyPlaces.fetchedAt": { $lt: staleBefore } },
    ] }),
  };
  const cursor = Listing.find(query).sort({ "nearbyPlaces.fetchedAt": 1, lastSeenAt: -1 }).cursor();
  const totals = { attempted: 0, updated: 0, empty: 0, failed: 0 };
  process.stdout.write(`${JSON.stringify({
    event: "neshan-enrichment-start", limit, intervalMs, staleHours, radiusMeters,
    resultsPerLayer, includePedestrianRoutes, refreshAll,
  })}\n`);
  for await (const document of cursor) {
    if (limit > 0 && totals.attempted >= limit) break;
    totals.attempted += 1;
    try {
      const nearbyPlaces = await fetchNearbyPlaces({
        latitude: document.coordinates.latitude,
        longitude: document.coordinates.longitude,
        apiKey,
        radiusMeters,
        resultsPerLayer,
        includePedestrianRoutes,
      });
      await Listing.updateOne(
        { token: document.token },
        { $set: { nearbyPlaces } },
        { runValidators: true },
      );
      const status = nearbyPlaces.length ? "updated" : "empty";
      totals[status] += 1;
      process.stdout.write(`${JSON.stringify({
        event: "neshan-enrichment-progress", token: document.token,
        places: nearbyPlaces.length,
        pedestrianRoutes: nearbyPlaces.filter((place) => place.routeMode === "pedestrian").length,
        totals,
      })}\n`);
    } catch (error) {
      totals.failed += 1;
      process.stdout.write(`${JSON.stringify({
        event: "neshan-enrichment-failed", token: document.token,
        status: error.status ?? null, code: error.code ?? null, message: error.message, totals,
      })}\n`);
      if ([480, 481, 482, 483, 484, 485].includes(error.status)) break;
    }
    if (limit === 0 || totals.attempted < limit) await delay(intervalMs);
  }
  process.stdout.write(`${JSON.stringify({ event: "neshan-enrichment-complete", totals })}\n`);
} finally {
  await mongoose.disconnect();
}
