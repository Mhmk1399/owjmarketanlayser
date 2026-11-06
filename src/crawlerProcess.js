import { config } from "./config.js";
import { LiveMarketEngine } from "./analytics/marketEngine.js";
import { PublicCrawler } from "./collector/publicCrawler.js";
import { createCrawlerControlServer } from "./crawler/controlServer.js";
import { ResourceMonitor } from "./monitoring/resourceMonitor.js";
import { createLogger } from "./runtime/createLogger.js";
import { createStore } from "./runtime/createStore.js";

process.chdir(config.serviceRoot);
if (!config.mongoUri) throw new Error("The split crawler process requires MONGODB_URI");
const logger = await createLogger("crawler");
const monitor = new ResourceMonitor({ logger, role: "crawler", intervalMs: config.resourceLogIntervalMs });
monitor.start();
const store = await createStore(logger, { reconcileCrawlerState: true });
const analytics = new LiveMarketEngine({
  store, logger,
  minSpatialSample: config.analytics.minSpatialSample,
  minModelSample: config.analytics.minModelSample,
  spatialCellSizeMeters: config.analytics.spatialCellSizeMeters,
});
await analytics.init();
const crawler = new PublicCrawler({ config, store, analytics, logger, liveScoring: null });
const control = createCrawlerControlServer({ crawler, token: config.crawlerControl.token, logger });
let crawlTimer = null;
let stopping = false;

async function scheduleCrawls() {
  if (!config.autoCrawl || stopping) return;
  const result = crawler.start();
  logger.info("service.auto-crawl", "Automatic crawl requested", result);
  const state = await crawler.waitForCompletion();
  if (stopping) return;
  const completed = state.status === "completed" && state.completeness?.status === "complete";
  const cooldownDelay = state.cooldownUntil ? Math.max(0, Date.parse(state.cooldownUntil) - Date.now()) : 0;
  const delayMs = completed ? config.crawlIntervalMs : Math.max(config.crawlFailureRetryMs, cooldownDelay);
  logger.info("service.auto-crawl.scheduled", "Next automatic crawl scheduled", {
    previousStatus: state.status, intervalMs: delayMs,
    nextRunAt: new Date(Date.now() + delayMs).toISOString(),
  });
  crawlTimer = setTimeout(() => void scheduleCrawls(), delayMs);
}

async function shutdown(signal) {
  if (stopping) return;
  stopping = true;
  if (crawlTimer) clearTimeout(crawlTimer);
  logger.warn("service.shutdown", "Crawler shutdown requested", { signal });
  await crawler.stop().catch((error) => logger.error("service.shutdown.crawler", "Crawler shutdown failed", { error: error.message }));
  monitor.stop();
  await new Promise((resolve) => control.close(resolve));
  await store.close();
  await logger.flush();
}
process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));
control.listen(config.crawlerControl.port, config.crawlerControl.host, () => {
  logger.info("service.ready", "Crawler control service is ready", {
    host: config.crawlerControl.host, port: config.crawlerControl.port, autoCrawl: config.autoCrawl,
  });
  void scheduleCrawls();
});
