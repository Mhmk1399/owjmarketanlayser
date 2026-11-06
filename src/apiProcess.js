import { config } from "./config.js";
import { LiveMarketEngine } from "./analytics/marketEngine.js";
import { createAnalyticsServer } from "./api/server.js";
import { RemoteCrawler } from "./crawler/remoteCrawler.js";
import { ResourceMonitor } from "./monitoring/resourceMonitor.js";
import { createLogger } from "./runtime/createLogger.js";
import { createStore } from "./runtime/createStore.js";

process.chdir(config.serviceRoot);
const logger = await createLogger("api");
const monitor = new ResourceMonitor({ logger, role: "api", intervalMs: config.resourceLogIntervalMs });
monitor.start();
const store = await createStore(logger, { reconcileCrawlerState: false });
const analytics = new LiveMarketEngine({
  store, logger,
  minSpatialSample: config.analytics.minSpatialSample,
  minModelSample: config.analytics.minModelSample,
  spatialCellSizeMeters: config.analytics.spatialCellSizeMeters,
});
await analytics.init();
const crawler = new RemoteCrawler({
  baseUrl: config.crawlerControl.url,
  token: config.crawlerControl.token,
  logger,
});
crawler.startPolling();
const server = createAnalyticsServer({ config, store, analytics, crawler, logger, resourceMonitor: monitor });

let stopping = false;
async function shutdown(signal) {
  if (stopping) return;
  stopping = true;
  logger.warn("service.shutdown", "API shutdown requested", { signal });
  crawler.stopPolling();
  monitor.stop();
  await new Promise((resolve) => server.close(resolve));
  if (typeof store.close === "function") await store.close();
  await logger.flush();
}
process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));
server.listen(config.port, config.host, () => logger.info("service.ready", "Analytics API is ready", {
  host: config.host, port: config.port, dataMode: config.mongoUri ? "mongodb" : "json",
}));
server.on("error", (error) => {
  logger.error("service.server.error", "Analytics API failed", { error: error.stack || error.message });
  process.exitCode = 1;
  void shutdown("SERVER_ERROR");
});
