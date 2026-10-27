import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import { Listing } from "../src/models/listing.js";
import { adaptPublicPostDocument, publicPostUrl } from "../src/collector/divarPost.js";
import { _publicListingHelpers } from "../src/collector/publicListing.js";
import { mergeBackfilledPublicDetails, needsPublicDetailBackfill } from "../src/collector/detailBackfill.js";

const serviceRoot = path.resolve(new URL("..", import.meta.url).pathname);
const dataRoot = path.join(serviceRoot, "data");
const stateFile = path.join(dataRoot, "migrations", "public-detail-backfill-state.json");
const integerOption = (name, fallback, minimum = 0) => {
  const prefix = `--${name}=`;
  const raw = process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
  const parsed = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(parsed) ? Math.max(minimum, parsed) : fallback;
};
const limit = integerOption("limit", 100);
const intervalMs = integerOption("interval-ms", 2_000, 250);
const concurrency = Math.min(8, integerOption("concurrency", 3, 1));
const retryTerminal = process.argv.includes("--retry-terminal");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function writeAtomic(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(temporary, file);
}

async function readState() {
  try {
    return JSON.parse(await fs.readFile(stateFile, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return {
      schemaVersion: "1.0.0", job: "public-detail-backfill-v1",
      startedAt: new Date().toISOString(), updatedAt: null, attempted: {}, totals: {},
    };
  }
}

function discoveredFrom(listing) {
  return {
    token: listing.token,
    url: listing.url,
    category: listing.crawlPartition?.category ?? null,
    expectedSubcategory: listing.crawlPartition?.expectedSubcategory ?? listing.subcategory,
    area: listing.crawlPartition?.area ?? null,
  };
}

async function fetchDocument(token) {
  const response = await fetch(publicPostUrl(token), {
    headers: { accept: "application/json-filled", "accept-language": "fa-IR,fa;q=0.9,en;q=0.5" },
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    const error = new Error(`Public detail returned HTTP ${response.status}`);
    error.status = response.status;
    error.retryAfter = response.headers.get("retry-after");
    throw error;
  }
  const document = await response.json();
  if (!document || !Array.isArray(document.sections)) throw new Error("Public detail has no sections array");
  return document;
}

function countResults(attempted) {
  return Object.values(attempted).reduce((counts, item) => {
    counts[item.status] = (counts[item.status] || 0) + 1;
    return counts;
  }, {});
}

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");
await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB_NAME || "owj_market_analytics",
  serverSelectionTimeoutMS: 30_000,
});

try {
  const state = await readState();
  const documents = (await Listing.find({}).sort({ "lifecycle.detailFetchedAt": 1, token: 1 }).lean())
    .map(({ _id, ...listing }) => JSON.parse(JSON.stringify(listing)));
  const candidates = documents.filter((listing) => needsPublicDetailBackfill(listing))
    .filter((listing) => retryTerminal || !["not-found", "gone"].includes(state.attempted[listing.token]?.status));
  const queue = limit > 0 ? candidates.slice(0, limit) : candidates;
  process.stdout.write(`${JSON.stringify({ event: "backfill-start", candidates: candidates.length, queued: queue.length, intervalMs, concurrency })}\n`);
  let cursor = 0;
  let processed = 0;
  let stopRequested = false;
  let lastRequestAt = 0;
  let requestSchedule = Promise.resolve();
  let stateWrites = Promise.resolve();
  const waitForRequestSlot = async () => {
    const scheduled = requestSchedule.then(async () => {
      const waitMs = Math.max(0, intervalMs - (Date.now() - lastRequestAt));
      if (waitMs) await delay(waitMs);
      lastRequestAt = Date.now();
    });
    requestSchedule = scheduled.catch(() => {});
    await scheduled;
  };
  const record = async (token, result) => {
    state.attempted[token] = result;
    state.updatedAt = new Date().toISOString();
    state.totals = countResults(state.attempted);
    processed += 1;
    stateWrites = stateWrites.then(() => writeAtomic(stateFile, state));
    await stateWrites;
    process.stdout.write(`${JSON.stringify({ event: "backfill-progress", processed, queued: queue.length, totals: state.totals })}\n`);
  };
  const worker = async () => {
    while (!stopRequested) {
      const index = cursor;
      cursor += 1;
      if (index >= queue.length) return;
      const existing = queue[index];
      await waitForRequestSlot();
      if (stopRequested) return;
    const attemptedAt = new Date().toISOString();
    try {
      const document = await fetchDocument(existing.token);
      const raw = adaptPublicPostDocument(document, discoveredFrom(existing));
      const extracted = _publicListingHelpers.normalizePublicListing(raw, existing, discoveredFrom(existing));
      const merged = mergeBackfilledPublicDetails(existing, extracted);
      await Listing.replaceOne({ token: merged.token }, merged, { runValidators: true });
      await writeAtomic(path.join(dataRoot, "listings", `${merged.token}.json`), merged);
      const descriptionRecovered = !existing.description && Boolean(merged.description);
      const classificationRecovered = existing.advertiserType === "unknown" && merged.advertiserType !== "unknown";
      await record(existing.token, {
        status: "updated", attemptedAt, descriptionRecovered, classificationRecovered,
      });
    } catch (error) {
      const status = error.status === 404 ? "not-found" : error.status === 410 ? "gone" : "failed";
      const result = { status, attemptedAt, httpStatus: error.status ?? null, error: error.message };
      await record(existing.token, result);
      if ([403, 429].includes(error.status)) {
        stopRequested = true;
        process.stdout.write(`${JSON.stringify({ event: "backfill-paused", token: existing.token, ...result })}\n`);
      }
    }
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, queue.length) }, () => worker()));
  await stateWrites;

  const refreshed = (await Listing.find({}).sort({ token: 1 }).lean())
    .map(({ _id, ...listing }) => JSON.parse(JSON.stringify(listing)));
  await writeAtomic(path.join(dataRoot, "listings.json"), {
    schemaVersion: "1.0.0", updatedAt: new Date().toISOString(), listings: refreshed,
  });
  const missingDescription = refreshed.filter((item) => !String(item.description || "").trim()).length;
  const unknownAdvertiser = refreshed.filter((item) => item.advertiserType === "unknown").length;
  process.stdout.write(`${JSON.stringify({ event: "backfill-complete", total: refreshed.length, missingDescription, unknownAdvertiser, totals: state.totals, stateFile })}\n`);
} finally {
  await mongoose.disconnect();
}
