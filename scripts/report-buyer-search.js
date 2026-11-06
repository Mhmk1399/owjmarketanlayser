import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { config } from "../src/config.js";

const option = (name, fallback) => process.argv.find((value) => value.startsWith(`--${name}=`))?.slice(name.length + 3) || fallback;
const file = path.join(config.paths.logs, path.basename(option("log", path.basename(config.paths.logFile))));
const hours = Math.max(1, Math.min(24 * 30, Number.parseInt(option("hours", "48"), 10)));
const cutoff = Date.now() - hours * 3_600_000;
const text = await fs.readFile(file, "utf8").catch((error) => {
  if (error.code === "ENOENT") return "";
  throw error;
});
const rows = text.split(/\r?\n/).filter(Boolean).flatMap((line) => {
  try {
    const row = JSON.parse(line);
    return Date.parse(row.timestamp) >= cutoff ? [row] : [];
  } catch { return []; }
});
const searches = rows.filter((row) => row.event === "buyer-match.search");
const requests = rows.filter((row) => row.event === "http.request" && row.path === "/buyer-matches/search");
const sorted = searches.map((row) => row.elapsedMs).filter(Number.isFinite).sort((a, b) => a - b);
const percentile = (fraction) => sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * fraction))] : null;
const average = (values) => values.length ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2)) : null;
const countBy = (values, key) => Object.fromEntries([...values.reduce((map, value) => {
  const item = String(value[key] ?? "unknown");
  map.set(item, (map.get(item) || 0) + 1);
  return map;
}, new Map())]);

process.stdout.write(`${JSON.stringify({
  schemaVersion: "1.0.0",
  generatedAt: new Date().toISOString(),
  windowHours: hours,
  logFile: file,
  searches: {
    completed: searches.length,
    requestStatuses: countBy(requests, "status"),
    latencyMs: { p50: percentile(0.5), p95: percentile(0.95), maximum: sorted.at(-1) ?? null },
    averageReturned: average(searches.map((row) => row.returned).filter(Number.isFinite)),
    averageEvaluated: average(searches.map((row) => row.evaluated).filter(Number.isFinite)),
    truncated: searches.filter((row) => row.truncated).length,
    transactionTypes: countBy(searches, "transactionType"),
  },
}, null, 2)}\n`);
