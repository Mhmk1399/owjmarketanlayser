import { monitorEventLoopDelay, performance } from "node:perf_hooks";

const database = process.env.MONGODB_DB_NAME || "";
const mongoUri = process.env.MONGODB_URI || "";
const serviceToken = process.env.ANALYTICS_WEB_SERVICE_TOKEN || "";
const baseUrl = process.env.SPRINT5_ANALYTICS_BASE_URL || "http://127.0.0.1:4567";
const requests = Math.max(20, Math.min(1_000, Number.parseInt(process.argv.find((item) => item.startsWith("--requests="))?.split("=")[1] || "200", 10)));
const concurrency = Math.max(1, Math.min(16, Number.parseInt(process.argv.find((item) => item.startsWith("--concurrency="))?.split("=")[1] || "4", 10)));

if (
  database !== "owj_analytics_e2e" ||
  !mongoUri.includes("replicaSet=rs0") ||
  !mongoUri.includes("owj_analytics_e2e") ||
  serviceToken.length < 32 ||
  !new Set(["http://127.0.0.1:4567", "http://localhost:4567"]).has(baseUrl)
) {
  throw new Error("Refusing to load-test anything except the authenticated local Sprint 5 synthetic Analytics target");
}
if (!Number.isInteger(requests) || !Number.isInteger(concurrency)) throw new Error("Load parameters must be integers");

const samples = [];
const statusCounts = new Map();
let next = 0;
const eventLoop = monitorEventLoopDelay({ resolution: 10 });
eventLoop.enable();
const started = performance.now();

async function worker() {
  while (next < requests) {
    const sequence = next;
    next += 1;
    const query = sequence % 2 === 0
      ? "/internal/v1/listings?limit=40&offset=0&sort=newest"
      : "/internal/v1/listings?limit=20&offset=0&sort=price-asc&transactionType=buy";
    const requestStarted = performance.now();
    const response = await fetch(`${baseUrl}${query}`, {
      headers: { accept: "application/json", authorization: `Bearer ${serviceToken}` },
      signal: AbortSignal.timeout(5_000),
    });
    await response.arrayBuffer();
    samples.push(performance.now() - requestStarted);
    statusCounts.set(response.status, (statusCounts.get(response.status) || 0) + 1);
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
const elapsedMs = performance.now() - started;
eventLoop.disable();
const sorted = [...samples].sort((left, right) => left - right);
const percentile = (fraction) => Number(sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * fraction))].toFixed(2));
const nanosecondsToMs = (value) => Number((value / 1_000_000).toFixed(3));

process.stdout.write(`${JSON.stringify({
  status: [...statusCounts.keys()].every((status) => status === 200) ? "completed" : "failed",
  safety: {
    syntheticDatabaseOnly: true,
    database,
    authenticatedReplicaSet: true,
    writesPerformed: false,
    externalProvidersCalled: false,
  },
  parameters: { requests, concurrency, target: baseUrl },
  result: {
    elapsedMs: Number(elapsedMs.toFixed(2)),
    requestsPerSecond: Number((requests / (elapsedMs / 1_000)).toFixed(2)),
    latencyMs: { p50: percentile(0.5), p95: percentile(0.95), p99: percentile(0.99), max: Number(sorted.at(-1).toFixed(2)) },
    statuses: Object.fromEntries([...statusCounts.entries()].sort(([left], [right]) => left - right)),
    generatorEventLoopDelayMs: {
      mean: nanosecondsToMs(eventLoop.mean),
      p95: nanosecondsToMs(eventLoop.percentile(95)),
      max: nanosecondsToMs(eventLoop.max),
    },
  },
}, null, 2)}\n`);
