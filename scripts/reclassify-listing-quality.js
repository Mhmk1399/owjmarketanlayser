import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import { Listing } from "../src/models/listing.js";
import { scoringEligibilityReasons } from "../src/scoring/cleanListings.js";
import { _publicListingHelpers } from "../src/collector/publicListing.js";

const serviceRoot = path.resolve(new URL("..", import.meta.url).pathname);
const dataRoot = path.join(serviceRoot, "data");
const reportRoot = path.join(dataRoot, "migrations");

async function writeAtomic(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(temporary, file);
}

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");
await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB_NAME || "owj_market_analytics",
  serverSelectionTimeoutMS: 30_000,
});

try {
  const startedAt = new Date().toISOString();
  const listings = await Listing.find({}).lean();
  const changes = [];
  const reasonCounts = new Map();
  const documents = listings.map(({ _id, ...raw }) => {
    const listing = JSON.parse(JSON.stringify(raw));
    const reasons = scoringEligibilityReasons(listing, { ignoreQualityOutcome: true });
    const outcome = reasons.length ? "history-only" : "scoring-ready";
    reasons.forEach((reason) => reasonCounts.set(reason, (reasonCounts.get(reason) || 0) + 1));
    const previous = { outcome: listing.quality.outcome, outcomeReasons: listing.quality.outcomeReasons || [] };
    listing.quality = { ...listing.quality, outcome, outcomeReasons: reasons };
    listing.contentFingerprint = _publicListingHelpers.fingerprintFor(listing);
    if (previous.outcome !== outcome || JSON.stringify(previous.outcomeReasons) !== JSON.stringify(reasons)) {
      changes.push({ token: listing.token, from: previous, to: { outcome, outcomeReasons: reasons } });
    }
    return listing;
  });

  for (let offset = 0; offset < documents.length; offset += 500) {
    await Listing.bulkWrite(documents.slice(offset, offset + 500).map((listing) => ({
      updateOne: { filter: { token: listing.token }, update: { $set: { quality: listing.quality, contentFingerprint: listing.contentFingerprint } } },
    })), { ordered: false });
  }

  const changedTokens = new Set(changes.map((change) => change.token));
  const changedDocuments = documents.filter((listing) => changedTokens.has(listing.token));
  for (let offset = 0; offset < changedDocuments.length; offset += 100) {
    await Promise.all(changedDocuments.slice(offset, offset + 100).map((listing) => (
      writeAtomic(path.join(dataRoot, "listings", `${listing.token}.json`), listing)
    )));
  }
  const completedAt = new Date().toISOString();
  await writeAtomic(path.join(dataRoot, "listings.json"), { schemaVersion: "1.0.0", updatedAt: completedAt, listings: documents });

  const report = {
    schemaVersion: "1.0.0", migration: "legacy-quality-reevaluation-v1", startedAt, completedAt,
    database: mongoose.connection.name, totalListings: documents.length, changedListings: changes.length,
    scoringReady: documents.filter((item) => item.quality.outcome === "scoring-ready").length,
    historyOnly: documents.filter((item) => item.quality.outcome === "history-only").length,
    remainingReasonCounts: Object.fromEntries([...reasonCounts.entries()].sort((a, b) => b[1] - a[1])),
    changes,
  };
  const reportFile = path.join(reportRoot, `quality-reevaluation-${completedAt.replace(/[:.]/g, "-")}.json`);
  await writeAtomic(reportFile, report);
  process.stdout.write(`${JSON.stringify({ ...report, changes: undefined, reportFile }, null, 2)}\n`);
} finally {
  await mongoose.disconnect();
}
