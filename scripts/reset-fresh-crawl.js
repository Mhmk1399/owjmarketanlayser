import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import { Listing } from "../src/models/listing.js";
import { ListingObservation } from "../src/models/listingObservation.js";
import { CrawlRun, ServiceState } from "../src/models/crawlState.js";

const CONFIRMATION = "DELETE-ALL-LISTING-DATA";
const confirmation = process.argv.find((argument) => argument.startsWith("--confirm="))?.slice(10);
if (confirmation !== CONFIRMATION) {
  throw new Error(`Refusing destructive reset. Pass --confirm=${CONFIRMATION}`);
}
if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");

const serviceRoot = path.resolve(new URL("..", import.meta.url).pathname);
const dataRoot = path.join(serviceRoot, "data");
const recordDirectories = [path.join(dataRoot, "listings"), path.join(dataRoot, "observations")];
const derivedFiles = [
  "listings.json",
  "analytics.json",
  "online-models.json",
  "scoring-ready.json",
  "scored-listings.json",
  "scoring-model.json",
  "scoring-report.json",
  "service-state.json",
  path.join("migrations", "public-detail-backfill-state.json"),
].map((name) => path.join(dataRoot, name));

async function removeJsonRecords(directory) {
  const names = await fs.readdir(directory).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  let removed = 0;
  for (const name of names) {
    if (!/^[A-Za-z0-9_-]+\.json$/.test(name)) continue;
    await fs.rm(path.join(directory, name), { force: true });
    removed += 1;
  }
  await fs.mkdir(directory, { recursive: true });
  return removed;
}

await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB_NAME || "owj_market_analytics",
  serverSelectionTimeoutMS: 30_000,
});

try {
  const startedAt = new Date().toISOString();
  const before = {
    listings: await Listing.countDocuments({}),
    observations: await ListingObservation.countDocuments({}),
    crawlRuns: await CrawlRun.countDocuments({}),
    serviceStates: await ServiceState.countDocuments({}),
  };
  const [listings, observations, crawlRuns, serviceStates] = await Promise.all([
    Listing.deleteMany({}),
    ListingObservation.deleteMany({}),
    CrawlRun.deleteMany({}),
    ServiceState.deleteMany({ key: "crawler" }),
  ]);
  const removedRecordFiles = {};
  for (const directory of recordDirectories) {
    removedRecordFiles[path.basename(directory)] = await removeJsonRecords(directory);
  }
  const removedDerivedFiles = [];
  for (const file of derivedFiles) {
    const existed = await fs.stat(file).then(() => true).catch((error) => {
      if (error.code === "ENOENT") return false;
      throw error;
    });
    if (!existed) continue;
    await fs.rm(file, { force: true });
    removedDerivedFiles.push(path.relative(serviceRoot, file));
  }
  const emptySnapshot = {
    schemaVersion: "1.0.0",
    derivedFrom: "fresh-reset",
    updatedAt: new Date().toISOString(),
    listings: [],
  };
  await fs.writeFile(path.join(dataRoot, "listings.json"), `${JSON.stringify(emptySnapshot, null, 2)}\n`, "utf8");
  const after = {
    listings: await Listing.countDocuments({}),
    observations: await ListingObservation.countDocuments({}),
    crawlRuns: await CrawlRun.countDocuments({}),
    serviceStates: await ServiceState.countDocuments({}),
  };
  const completedAt = new Date().toISOString();
  const report = {
    schemaVersion: "1.0.0",
    operation: "fresh-crawl-reset-v1",
    startedAt,
    completedAt,
    database: mongoose.connection.name,
    before,
    deletedFromMongo: {
      listings: listings.deletedCount,
      observations: observations.deletedCount,
      crawlRuns: crawlRuns.deletedCount,
      serviceStates: serviceStates.deletedCount,
    },
    removedRecordFiles,
    removedDerivedFiles,
    preserved: ["scoring scenarios", "location definitions", "configuration", "migration reports", "application logs"],
    after,
  };
  const reportFile = path.join(dataRoot, "migrations", `fresh-crawl-reset-${completedAt.replace(/[:.]/g, "-")}.json`);
  await fs.mkdir(path.dirname(reportFile), { recursive: true });
  await fs.writeFile(reportFile, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify({ ...report, reportFile }, null, 2)}\n`);
} finally {
  await mongoose.disconnect();
}
