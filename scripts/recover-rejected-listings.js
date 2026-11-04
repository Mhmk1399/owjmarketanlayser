import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import { Listing } from "../src/models/listing.js";
import { ListingObservation } from "../src/models/listingObservation.js";
import { adaptPublicPostDocument, publicPostUrl } from "../src/collector/divarPost.js";
import { _publicListingHelpers } from "../src/collector/publicListing.js";
import { validateListingPartition } from "../src/collector/publicCrawler.js";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const option = (name, fallback) => process.argv.find((item) => item.startsWith(`--${name}=`))?.slice(name.length + 3) || fallback;
const apply = process.argv.includes("--apply");
const intervalMs = Math.max(250, Number.parseInt(option("interval-ms", "2500"), 10));
const limit = Math.max(0, Number.parseInt(option("limit", "0"), 10));
const logFile = path.join(root, "logs", path.basename(option("log", "fresh-crawl-2026-11-03-v2.jsonl")));
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");

function candidatesFromLog(text) {
  const rows = text.split(/\r?\n/).filter(Boolean).flatMap((line) => {
    try { return [JSON.parse(line)]; } catch { return []; }
  });
  const starts = new Map();
  const failures = new Set();
  const successes = new Set();
  for (const row of rows) {
    if (row.event === "crawl.listing.start" && row.token) starts.set(row.token, row);
    if (row.event === "crawl.listing.failure" && row.token) failures.add(row.token);
    if (row.event === "crawl.listing.success" && row.token) successes.add(row.token);
  }
  return [...failures]
    .filter((token) => !successes.has(token) && starts.has(token))
    .map((token) => {
      const row = starts.get(token);
      return {
        token,
        url: `https://divar.ir/v/${token}`,
        category: row.category || "buy-apartment",
        expectedSubcategory: "buy-residential-apartment",
        area: row.area || null,
      };
    });
}

async function fetchDocument(token) {
  const response = await fetch(publicPostUrl(token), {
    headers: { accept: "application/json-filled", "accept-language": "fa-IR,fa;q=0.9,en;q=0.5" },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw Object.assign(new Error(`HTTP ${response.status}`), { status: response.status });
  const document = await response.json();
  if (!Array.isArray(document?.sections)) throw new Error("Public post response has no sections array");
  return document;
}

await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB_NAME || "owj_market_analytics",
  serverSelectionTimeoutMS: 30_000,
});

try {
  const candidates = candidatesFromLog(await fs.readFile(logFile, "utf8"));
  const queue = limit ? candidates.slice(0, limit) : candidates;
  const results = [];
  for (let index = 0; index < queue.length; index += 1) {
    const discovered = queue[index];
    if (index) await delay(intervalMs);
    try {
      if (await Listing.exists({ token: discovered.token })) {
        results.push({ token: discovered.token, status: "already-stored" });
        continue;
      }
      const raw = adaptPublicPostDocument(await fetchDocument(discovered.token), discovered);
      const listing = _publicListingHelpers.normalizePublicListing(raw, null, discovered);
      const validation = validateListingPartition(listing, discovered);
      if (!validation.matches) {
        results.push({
          token: discovered.token,
          status: "rejected-partition",
          reason: validation.reason,
          requestedArea: discovered.area?.name || null,
          actualArea: listing.neighborhood,
        });
        continue;
      }
      if (apply) {
        const runId = `controlled-recovery-${new Date().toISOString().slice(0, 10)}`;
        await mongoose.connection.transaction(async (session) => {
          await Listing.replaceOne({ token: listing.token }, listing, {
            upsert: true, runValidators: true, session,
          });
          await ListingObservation.updateOne(
            { token: listing.token, observedAt: listing.lastSeenAt, contentFingerprint: listing.contentFingerprint, runId },
            { $setOnInsert: {
              token: listing.token,
              observedAt: listing.lastSeenAt,
              runId,
              eventType: "created",
              contentFingerprint: listing.contentFingerprint,
              snapshot: listing,
            } },
            { upsert: true, runValidators: true, session },
          );
        });
      }
      results.push({ token: discovered.token, status: apply ? "recovered" : "recoverable", reason: validation.reason });
    } catch (error) {
      results.push({ token: discovered.token, status: error.status === 404 ? "not-found" : "failed", error: error.message });
    }
  }
  const totals = Object.fromEntries([...results.reduce((map, item) => (
    map.set(item.status, (map.get(item.status) || 0) + 1), map
  ), new Map())]);
  const report = {
    schemaVersion: "1.0.0",
    job: "controlled-rejected-listing-recovery-v1",
    generatedAt: new Date().toISOString(),
    apply,
    sourceLog: path.relative(root, logFile),
    candidates: candidates.length,
    processed: results.length,
    totals,
    results,
  };
  const reportFile = path.join(root, "data", "migrations", `rejected-recovery-${report.generatedAt.replace(/[:.]/g, "-")}.json`);
  await fs.mkdir(path.dirname(reportFile), { recursive: true });
  await fs.writeFile(reportFile, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify({ ...report, results: undefined, reportFile }, null, 2)}\n`);
} finally {
  await mongoose.disconnect();
}
