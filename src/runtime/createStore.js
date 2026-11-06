import { config } from "../config.js";
import { JsonMarketStore } from "../storage/jsonStore.js";
import { MongoMarketStore } from "../storage/mongoMarketStore.js";

export async function createStore(logger, { reconcileCrawlerState = false } = {}) {
  const Store = config.mongoUri ? MongoMarketStore : JsonMarketStore;
  const store = new Store(config.paths, logger, {
    snapshotEvery: config.jsonSnapshotEvery,
    mongoUri: config.mongoUri,
    mongoDbName: config.mongoDbName,
    mongoAutoIndex: config.mongoAutoIndex,
    mongoRetry: config.mongoRetry,
    reconcileCrawlerState,
  });
  await store.init();
  return store;
}
