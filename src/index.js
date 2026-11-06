import { config } from "./config.js";
import { StructuredLogger } from "./logging/logger.js";
import { JsonMarketStore } from "./storage/jsonStore.js";
import { MongoMarketStore } from "./storage/mongoMarketStore.js";
import { LiveMarketEngine } from "./analytics/marketEngine.js";
import { PublicCrawler } from "./collector/publicCrawler.js";
import { createAnalyticsServer } from "./api/server.js";
import { LiveScoringService } from "./scoring/liveScoring.js";

process.chdir(config.serviceRoot);

const logger = new StructuredLogger({
  file: config.paths.logFile,
  level: config.logLevel,
  maxBytes: config.retention.maxLogBytes,
  archives: config.retention.logArchives,
});
await logger.init();

const Store = config.mongoUri ? MongoMarketStore : JsonMarketStore;
const store = new Store(config.paths, logger, {
  snapshotEvery: config.jsonSnapshotEvery,
  mongoUri: config.mongoUri,
  mongoDbName: config.mongoDbName,
  mongoAutoIndex: config.mongoAutoIndex,
  mongoRetry: config.mongoRetry,
});
await store.init();

const analytics = new LiveMarketEngine({
  store,
  logger,
  minSpatialSample: config.analytics.minSpatialSample,
  minModelSample: config.analytics.minModelSample,
  spatialCellSizeMeters: config.analytics.spatialCellSizeMeters,
});
await analytics.init();

const liveScoring = new LiveScoringService({
  config,
  store,
  logger,
  debounceMs: config.scoring.liveDebounceMs,
});
const crawler = new PublicCrawler({ config, store, analytics, logger, liveScoring });
const server = createAnalyticsServer({ config, store, analytics, crawler, logger });

let shuttingDown = false;
let crawlTimer = null;
async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  if (crawlTimer) clearTimeout(crawlTimer);
  logger.warn("service.shutdown", "Analytics service shutdown requested", { signal });
  await crawler.stop().catch((error) => {
    logger.error("service.shutdown.crawler", "Crawler shutdown failed", { error: error.message });
  });
  await liveScoring.flush();
  if (typeof store.close === "function") await store.close();
  else await store.flush();
  await logger.flush();
  await new Promise((resolve) => server.close(resolve));
}

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));

server.listen(config.port, config.host, () => {
  logger.info("service.ready", "Market analytics JSON server is ready", {
    host: config.host,
    port: config.port,
    autoCrawl: config.autoCrawl,
    crawlIntervalMs: config.crawlIntervalMs,
    dataMode: config.mongoUri ? "mongodb-authoritative-json-derived" : "json-only",
    contactMode: "blocked",
  });
  if (config.autoCrawl) {
    const runAutomaticCrawl = async () => {
      if (shuttingDown) return;
      const result = crawler.start();
      logger.info("service.auto-crawl", "Completion-based automatic crawl requested", result);
      if (!result.started && result.reason === "targeted-area-job-running") {
        const delayMs = config.crawlFailureRetryMs;
        logger.info("service.auto-crawl.scheduled", "Full crawl deferred while a targeted area job is running", {
          scheduleReason: "targeted-area-job-running",
          intervalMs: delayMs,
          nextRunAt: new Date(Date.now() + delayMs).toISOString(),
        });
        crawlTimer = setTimeout(() => void runAutomaticCrawl(), delayMs);
        return;
      }
      const state = await crawler.waitForCompletion();
      if (shuttingDown) return;
      const completed = state.status === "completed" && state.completeness?.status === "complete";
      const cooldownDelay = state.cooldownUntil
        ? Math.max(0, Date.parse(state.cooldownUntil) - Date.now())
        : 0;
      const delayMs = completed
        ? config.crawlIntervalMs
        : Math.max(config.crawlFailureRetryMs, cooldownDelay);
      logger.info("service.auto-crawl.scheduled", "Next crawl scheduled after completed run", {
        previousStatus: state.status,
        previousCompleteness: state.completeness?.status ?? null,
        scheduleReason: completed ? "normal-interval" : "recovery-retry",
        intervalMs: delayMs,
        nextRunAt: new Date(Date.now() + delayMs).toISOString(),
      });
      crawlTimer = setTimeout(() => void runAutomaticCrawl(), delayMs);
    };
    void runAutomaticCrawl();
  }
});

server.on("error", async (error) => {
  logger.error("service.server.error", "Analytics server failed", { error: error.stack || error.message });
  await shutdown("SERVER_ERROR");
  process.exitCode = 1;
});
