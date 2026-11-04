import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import { Listing } from "../src/models/listing.js";
import { classifyAdvertiser } from "../src/collector/advertiserClassifier.js";
import { _publicListingHelpers } from "../src/collector/publicListing.js";

const serviceRoot = path.resolve(new URL("..", import.meta.url).pathname);
const dataRoot = path.join(serviceRoot, "data");
const dryRun = process.argv.includes("--dry-run");

async function writeAtomic(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(temporary, file);
}

function countByType(listings) {
  return listings.reduce((counts, listing) => {
    counts[listing.advertiserType] = (counts[listing.advertiserType] || 0) + 1;
    return counts;
  }, {});
}

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");
await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB_NAME || "owj_market_analytics",
  serverSelectionTimeoutMS: 30_000,
});

try {
  const startedAt = new Date().toISOString();
  const query = Listing.find({}).sort({ token: 1 });
  if (dryRun) query.select("token description advertiserType advertiserSignals");
  const original = (await query.lean())
    .map(({ _id, ...listing }) => JSON.parse(JSON.stringify(listing)));
  const before = countByType(original);
  const changes = [];
  const documents = original.map((listing) => {
    const classified = classifyAdvertiser({
      ...(listing.advertiserSignals || {}),
      type: listing.advertiserSignals?.type || listing.advertiserType,
    }, listing.description);
    const advertiserSignals = {
      ...(listing.advertiserSignals || {}),
      type: classified.type,
      isBusiness: classified.isBusiness,
      confidence: classified.confidence,
      classificationSource: classified.classificationSource,
      businessDisplayName: classified.type === "real-estate-business"
        ? listing.advertiserSignals?.businessDisplayName ?? null : null,
    };
    const previous = {
      type: listing.advertiserType,
      confidence: listing.advertiserSignals?.confidence ?? "low",
      classificationSource: listing.advertiserSignals?.classificationSource || [],
    };
    listing.advertiserType = classified.type;
    listing.advertiserSignals = advertiserSignals;
    if (!dryRun) listing.contentFingerprint = _publicListingHelpers.fingerprintFor(listing);
    const next = {
      type: listing.advertiserType,
      confidence: advertiserSignals.confidence,
      classificationSource: advertiserSignals.classificationSource,
    };
    if (JSON.stringify(previous) !== JSON.stringify(next)) {
      changes.push({ token: listing.token, from: previous, to: next });
    }
    return listing;
  });
  const after = countByType(documents);
  const transitions = changes.reduce((counts, change) => {
    const key = `${change.from.type}->${change.to.type}`;
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
  const sourceCounts = documents.reduce((counts, listing) => {
    for (const source of listing.advertiserSignals?.classificationSource || []) {
      counts[source] = (counts[source] || 0) + 1;
    }
    return counts;
  }, {});
  const samples = changes
    .filter((change) => change.from.type !== change.to.type)
    .slice(0, 20)
    .map((change) => ({ token: change.token, from: change.from.type, to: change.to.type,
      sources: change.to.classificationSource }));

  if (!dryRun && changes.length) {
    const changedTokens = new Set(changes.map((change) => change.token));
    const changedDocuments = documents.filter((listing) => changedTokens.has(listing.token));
    for (let offset = 0; offset < changedDocuments.length; offset += 500) {
      await Listing.bulkWrite(changedDocuments.slice(offset, offset + 500).map((listing) => ({
        updateOne: {
          filter: { token: listing.token },
          update: { $set: {
            advertiserType: listing.advertiserType,
            advertiserSignals: listing.advertiserSignals,
            contentFingerprint: listing.contentFingerprint,
          } },
        },
      })), { ordered: false });
    }
    for (let offset = 0; offset < changedDocuments.length; offset += 100) {
      await Promise.all(changedDocuments.slice(offset, offset + 100).map((listing) => (
        writeAtomic(path.join(dataRoot, "listings", `${listing.token}.json`), listing)
      )));
    }
    await writeAtomic(path.join(dataRoot, "listings.json"), {
      schemaVersion: "1.0.0", updatedAt: new Date().toISOString(), listings: documents,
    });
  }

  const completedAt = new Date().toISOString();
  const report = {
    schemaVersion: "1.0.0",
    migration: "advertiser-classification-v2",
    dryRun,
    startedAt,
    completedAt,
    totalListings: documents.length,
    changedListings: changes.length,
    before,
    after,
    transitions,
    sourceCounts,
    samples,
    changes,
  };
  if (!dryRun) {
    const reportFile = path.join(dataRoot, "migrations", `advertiser-classification-${completedAt.replace(/[:.]/g, "-")}.json`);
    await writeAtomic(reportFile, report);
    report.reportFile = reportFile;
  }
  process.stdout.write(`${JSON.stringify({ ...report, changes: undefined }, null, 2)}\n`);
} finally {
  await mongoose.disconnect();
}
