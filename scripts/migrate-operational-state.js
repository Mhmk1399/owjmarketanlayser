import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import { CrawlRun, ServiceState } from "../src/models/crawlState.js";

const serviceRoot = path.resolve(new URL("..", import.meta.url).pathname);
const sourceFile = path.join(serviceRoot, "data", "service-state.json");
const reportRoot = path.join(serviceRoot, "data", "migrations");

async function writeAtomic(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(temporary, file);
}

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");
const source = JSON.parse(await fs.readFile(sourceFile, "utf8"));
const serviceState = { key: "crawler", ...source };
const run = source.crawl?.runId ? {
  runId: source.crawl.runId,
  startedAt: source.crawl.startedAt,
  endedAt: source.crawl.endedAt,
  status: source.crawl.status,
  updatedAt: source.updatedAt,
  snapshot: source.crawl,
} : null;

await new ServiceState(serviceState).validate();
if (run) await new CrawlRun(run).validate();
await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB_NAME || "owj_market_analytics",
  serverSelectionTimeoutMS: 30_000,
});

try {
  await Promise.all([ServiceState.init(), CrawlRun.init()]);
  const session = await mongoose.connection.startSession();
  try {
    await session.withTransaction(async () => {
      await ServiceState.replaceOne({ key: "crawler" }, serviceState, {
        upsert: true, runValidators: true, session,
      });
      if (run) await CrawlRun.replaceOne({ runId: run.runId }, run, {
        upsert: true, runValidators: true, session,
      });
    });
  } finally {
    await session.endSession();
  }
  const completedAt = new Date().toISOString();
  const report = {
    schemaVersion: "1.0.0", migration: "operational-state-json-to-mongodb-v1",
    completedAt, serviceStates: await ServiceState.countDocuments({}),
    crawlRuns: await CrawlRun.countDocuments({}), importedRunId: run?.runId ?? null,
  };
  const reportFile = path.join(reportRoot, `operational-state-migration-${completedAt.replace(/[:.]/g, "-")}.json`);
  await writeAtomic(reportFile, report);
  process.stdout.write(`${JSON.stringify({ ...report, reportFile }, null, 2)}\n`);
} finally {
  await mongoose.disconnect();
}
