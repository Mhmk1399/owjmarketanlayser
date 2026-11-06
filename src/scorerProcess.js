import mongoose from "mongoose";
import http from "node:http";
import { config } from "./config.js";
import { ServiceState } from "./models/crawlState.js";
import { ModelVersion } from "./models/scoringState.js";
import { ResourceMonitor } from "./monitoring/resourceMonitor.js";
import { createLogger } from "./runtime/createLogger.js";
import { LiveScoringService } from "./scoring/liveScoring.js";

process.chdir(config.serviceRoot);
if (!config.mongoUri) throw new Error("The split scorer process requires MONGODB_URI");
const logger = await createLogger("scorer");
const monitor = new ResourceMonitor({ logger, role: "scorer", intervalMs: config.resourceLogIntervalMs });
monitor.start();
await mongoose.connect(config.mongoUri, {
  dbName: config.mongoDbName, autoIndex: false, serverSelectionTimeoutMS: 30_000,
  maxPoolSize: 5, minPoolSize: 1,
});
const scoring = new LiveScoringService({ config, store: null, logger, debounceMs: config.scoring.liveDebounceMs });
let lastObservedCrawlEnd = null;
let timer = null;
let stopping = false;
const healthServer = http.createServer((request, response) => {
  const body = JSON.stringify({ status: "ok", role: "scorer", running: Boolean(scoring.running) });
  response.writeHead(request.url === "/health" ? 200 : 404, {
    "content-type": "application/json", "content-length": Buffer.byteLength(body),
  });
  response.end(body);
});

async function checkForCompletedCrawl() {
  const [state, activeModel] = await Promise.all([
    ServiceState.findOne({ key: "crawler" }).select({ crawl: 1 }).lean(),
    ModelVersion.findOne({ kind: "batch-price", status: "active" }).select({ generatedAt: 1 }).lean(),
  ]);
  const crawl = state?.crawl;
  const endedAt = crawl?.endedAt ? new Date(crawl.endedAt).toISOString() : null;
  if (crawl?.status !== "completed" || !endedAt || endedAt === lastObservedCrawlEnd) return;
  lastObservedCrawlEnd = endedAt;
  if (!activeModel?.generatedAt || new Date(activeModel.generatedAt) < new Date(endedAt)) {
    await scoring.run(`completed-crawl:${crawl.runId || endedAt}`);
  }
}

async function poll() {
  if (stopping) return;
  try { await checkForCompletedCrawl(); }
  catch (error) { logger.error("scoring.poll.failure", "Could not check scoring freshness", { error: error.stack || error.message }); }
  timer = setTimeout(() => void poll(), 30_000);
}

async function shutdown(signal) {
  if (stopping) return;
  stopping = true;
  if (timer) clearTimeout(timer);
  logger.warn("service.shutdown", "Scorer shutdown requested", { signal });
  await scoring.flush();
  await new Promise((resolve) => healthServer.close(resolve));
  monitor.stop();
  await mongoose.disconnect();
  await logger.flush();
}
process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));
logger.info("service.ready", "Scoring worker is ready", { pollIntervalMs: 30_000 });
healthServer.listen(config.scorerHealth.port, config.scorerHealth.host);
void poll();
