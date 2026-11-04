import { runScoringPipeline } from "./pipeline.js";

export class LiveScoringService {
  constructor({ config, store, logger, debounceMs = 30_000 }) {
    this.config = config;
    this.store = store;
    this.logger = logger;
    this.debounceMs = debounceMs;
    this.minimumIntervalMs = config.scoring?.minimumIntervalMs || 900_000;
    this.lastCompletedAt = 0;
    this.timer = null;
    this.running = null;
    this.dirty = false;
  }

  requestUpdate(reason = "listing-changed") {
    this.dirty = true;
    if (this.timer || this.running) return;
    const elapsed = Date.now() - this.lastCompletedAt;
    const delay = Math.max(this.debounceMs, this.minimumIntervalMs - elapsed);
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
      }, {
        onPersist: (documents) => this.store.persistScoringGeneration?.(documents),
      });
      this.logger.info("scoring.live.complete", "Live scoring snapshot refreshed", {
        reason,
        scoredCount: result.report?.scoring?.scoredCount ?? null,
      });
      this.lastCompletedAt = Date.now();
    })().catch((error) => {
      const insufficientSample = /At least \d+ cleaned listings are required/.test(error.message);
      this.logger[insufficientSample ? "warn" : "error"](
        insufficientSample ? "scoring.live.waiting" : "scoring.live.failure",
        insufficientSample ? "Live scoring is waiting for its minimum sample" : "Live scoring refresh failed",
        {
        reason,
        error: error.stack || error.message,
        },
      );
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
