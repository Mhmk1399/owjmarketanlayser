import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import { Listing } from "../src/models/listing.js";
import { CrawlRun, ServiceState } from "../src/models/crawlState.js";

const serviceRoot = path.resolve(new URL("..", import.meta.url).pathname);
const logsRoot = path.join(serviceRoot, "logs");
const requestedLog = process.argv.find((argument) => argument.startsWith("--log="))?.slice(6)
  || process.env.ANALYTICS_LOG_FILE
  || "fresh-crawl.jsonl";
const logFile = path.join(logsRoot, path.basename(requestedLog));
if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");

function summarizeLog(text) {
  const records = [];
  let invalidLines = 0;
  for (const line of text.split(/\r?\n/).filter(Boolean)) {
    try { records.push(JSON.parse(line)); } catch { invalidLines += 1; }
  }
  const count = (field) => records.reduce((counts, record) => {
    const key = String(record[field] || "unknown");
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
  return {
    file: logFile,
    records: records.length,
    invalidLines,
    firstTimestamp: records[0]?.timestamp ?? null,
    lastTimestamp: records.at(-1)?.timestamp ?? null,
    levels: count("level"),
    events: count("event"),
    latestWarningsAndErrors: records
      .filter((record) => record.level === "warn" || record.level === "error")
      .slice(-20),
  };
}

await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB_NAME || "owj_market_analytics",
  serverSelectionTimeoutMS: 30_000,
});

try {
  const [total, descriptionMissing, businessNameMissing, imageMetadataMissing, coordinateMissing, advertiserTypes, qualityOutcomes, schemaVersions, serviceState, latestRun] = await Promise.all([
    Listing.countDocuments({}),
    Listing.countDocuments({ $or: [{ description: null }, { description: "" }] }),
    Listing.countDocuments({ advertiserType: "real-estate-business", $or: [
      { "advertiserSignals.businessDisplayName": null },
      { "advertiserSignals.businessDisplayName": "" },
    ] }),
    Listing.countDocuments({ images: { $elemMatch: { $or: [
      { thumbnailUrl: { $exists: false } },
      { aspectRatio: { $exists: false } },
    ] } } }),
    Listing.countDocuments({ $or: [
      { "coordinates.latitude": null }, { "coordinates.longitude": null },
    ] }),
    Listing.aggregate([{ $group: { _id: "$advertiserType", count: { $sum: 1 } } }]),
    Listing.aggregate([{ $group: { _id: "$quality.outcome", count: { $sum: 1 } } }]),
    Listing.aggregate([{ $group: { _id: "$schemaVersion", count: { $sum: 1 } } }]),
    ServiceState.findOne({ key: "crawler" }).lean(),
    CrawlRun.findOne({}).sort({ startedAt: -1 }).lean(),
  ]);
  const logText = await fs.readFile(logFile, "utf8").catch((error) => {
    if (error.code === "ENOENT") return "";
    throw error;
  });
  const pairs = (rows) => Object.fromEntries(rows.map((row) => [row._id ?? "unknown", row.count]));
  process.stdout.write(`${JSON.stringify({
    checkedAt: new Date().toISOString(),
    database: mongoose.connection.name,
    quality: {
      total,
      descriptionMissing,
      descriptionMissingPercent: total ? Number((descriptionMissing / total * 100).toFixed(2)) : 0,
      businessNameMissing,
      imageMetadataMissing,
      coordinateMissing,
      advertiserTypes: pairs(advertiserTypes),
      qualityOutcomes: pairs(qualityOutcomes),
      schemaVersions: pairs(schemaVersions),
    },
    crawl: serviceState?.crawl ?? null,
    latestRun: latestRun ? {
      runId: latestRun.runId,
      status: latestRun.status,
      startedAt: latestRun.startedAt,
      endedAt: latestRun.endedAt,
    } : null,
    log: summarizeLog(logText),
  }, null, 2)}\n`);
} finally {
  await mongoose.disconnect();
}
