import { monitorEventLoopDelay, performance } from "node:perf_hooks";

function mib(bytes) {
  return Number((bytes / 1024 / 1024).toFixed(2));
}

export class ResourceMonitor {
  constructor({ logger, role, intervalMs = 60_000 }) {
    this.logger = logger;
    this.role = role;
    this.intervalMs = intervalMs;
    this.histogram = monitorEventLoopDelay({ resolution: 20 });
    this.previousElu = performance.eventLoopUtilization();
    this.timer = null;
  }

  snapshot() {
    const memory = process.memoryUsage();
    const elu = performance.eventLoopUtilization(this.previousElu);
    this.previousElu = performance.eventLoopUtilization();
    const result = {
      role: this.role,
      pid: process.pid,
      uptimeSeconds: Math.round(process.uptime()),
      rssMiB: mib(memory.rss),
      heapUsedMiB: mib(memory.heapUsed),
      heapTotalMiB: mib(memory.heapTotal),
      externalMiB: mib(memory.external),
      arrayBuffersMiB: mib(memory.arrayBuffers),
      eventLoopUtilization: Number(elu.utilization.toFixed(4)),
      eventLoopDelayMeanMs: Number((this.histogram.mean / 1e6 || 0).toFixed(2)),
      eventLoopDelayP99Ms: Number((this.histogram.percentile(99) / 1e6 || 0).toFixed(2)),
    };
    this.histogram.reset();
    return result;
  }

  start() {
    this.histogram.enable();
    this.timer = setInterval(() => {
      this.logger.info("resource.sample", "Process resource sample", this.snapshot());
    }, this.intervalMs);
    this.timer.unref?.();
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.histogram.disable();
  }
}
