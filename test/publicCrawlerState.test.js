import test from "node:test";
import assert from "node:assert/strict";
import { PublicCrawler } from "../src/collector/publicCrawler.js";

const logger = { info() {}, warn() {}, error() {}, debug() {} };
const config = {
  crawl: {
    maxRequestsPerRun: 100,
    maxRequestsPerMinute: 20,
  },
};

test("crawler snapshots expose live request and completeness progress", () => {
  const crawler = new PublicCrawler({ config, store: {}, analytics: {}, logger });
  crawler.state = {
    ...crawler.state,
    status: "discovering",
    areasTotal: 10,
    areasCompleted: 4,
    queued: 100,
    successful: 75,
    failed: 2,
  };
  crawler.requestBudget = { snapshot: () => ({ total: 91, maxPerRun: 100 }) };
  const state = crawler.snapshot();
  assert.equal(state.requestBudget.total, 91);
  assert.equal(state.completeness.areaCoverage, 40);
  assert.equal(state.completeness.detailCoverage, 75);
  assert.equal(state.completeness.failedDetails, 2);
});

test("an early MongoDB failure produces a truthful failed crawler state", async () => {
  const saved = [];
  const store = {
    async readServiceState() { throw new Error("Mongo buffering timed out after 10000ms"); },
    async saveServiceState(value) { saved.push(value); },
  };
  const crawler = new PublicCrawler({ config, store, analytics: {}, logger });
  assert.equal(crawler.start().started, true);
  const state = await crawler.waitForCompletion();
  assert.equal(state.status, "failed");
  assert.equal(state.completeness.status, "failed");
  assert.match(state.error, /buffering timed out/);
  assert.equal(saved.at(-1).crawl.status, "failed");
});
