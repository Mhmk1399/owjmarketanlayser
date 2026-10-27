import { runScoringPipeline } from "./pipeline.js";

export class LiveScoringService {
  constructor({ config, store, logger, debounceMs = 30_000 }) {
    this.config = config;
    this.store = store;
    this.logger = logger;
    this.debounceMs = debounceMs;
    this.timer = null;
    this.running = null;
    this.dirty = false;
  }

  requestUpdate(reason = "listing-changed") {
    this.dirty = true;
    if (this.timer || this.running) return;
    this.timer = setTimeout(() => {
      this.timer = null;
      void this.run(reason);
    }, this.debounceMs);
  }

  async run(reason = "live-update") {
    if (this.running) {
      this.dirty = true;
      return this.running;
    }
    this.dirty = false;
    this.running = (async () => {
      await this.store.flush();
      this.logger.info("scoring.live.start", "Refreshing live scoring snapshot", { reason });
      const result = await runScoringPipeline({
        paths: {
          input: this.config.paths.listings,
          scoringReady: this.config.paths.scoringReady,
          scoredListings: this.config.paths.scoredListings,
          model: this.config.paths.scoringModel,
          report: this.config.paths.scoringReport,
        },
      });
      this.logger.info("scoring.live.complete", "Live scoring snapshot refreshed", {
        reason,
        scoredCount: result.report?.scoring?.scoredCount ?? null,
      });
    })().catch((error) => {
      this.logger.error("scoring.live.failure", "Live scoring refresh failed", {
        reason,
        error: error.stack || error.message,
      });
    }).finally(() => {
      this.running = null;
      if (this.dirty) this.requestUpdate("changes-during-scoring");
    });
    return this.running;
  }

  async flush() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.dirty) await this.run("flush");
    if (this.running) await this.running;
  }
}
