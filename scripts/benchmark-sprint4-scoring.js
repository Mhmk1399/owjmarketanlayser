import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { runScoringPipeline } from "../src/scoring/pipeline.js";

const rawCount = process.argv.find((item) => item.startsWith("--count="))?.split("=")[1] || "1000";
const count = Number.parseInt(rawCount, 10);
if (!Number.isInteger(count) || count < 120 || count > 10_000) {
  throw new Error("--count must be between 120 and 10000");
}

function listing(index) {
  const latitude = 35.55 + (index % 40) * 0.007;
  const longitude = 51.10 + (Math.floor(index / 40) % 70) * 0.009;
  const area = 45 + index % 155;
  const rooms = Math.max(1, Math.round(area / 45));
  const logPpm = 18.5 + (latitude - 35.65) * 2.5 + (longitude - 51.28) * 1.8
    - Math.log(area) * 0.06 + rooms * 0.025;
  const pricePerMeter = Math.round(Math.exp(logPpm));
  const token = `s4_score_${String(index).padStart(6, "0")}`;
  return {
    schemaVersion: "1.0.0", token, url: `https://example.invalid/sprint4-score/${token}`,
    title: `Synthetic apartment ${index}`, subcategory: "buy-residential-apartment",
    neighborhood: `Synthetic Area ${index % 20}`,
    property: { area, rooms, constructionYear: 1_375 + index % 30, floor: index % 10, totalFloors: 10 },
    amenities: { elevator: true, parking: index % 3 !== 0, storage: true, balcony: index % 4 === 0 },
    coordinates: { latitude, longitude, accuracy: "exact", radiusMeters: 0 },
    pricing: { price: pricePerMeter * area, pricePerMeter },
    quality: { score: 100, missingFields: [], outcome: "scoring-ready", outcomeReasons: [] },
    lifecycle: { status: "active" },
    firstSeenAt: "2026-11-20T00:00:00.000Z", lastSeenAt: "2026-11-23T00:00:00.000Z",
  };
}

function memory() {
  const value = process.memoryUsage();
  return Object.fromEntries(["rss", "heapUsed", "heapTotal", "external"]
    .map((key) => [key, Number((value[key] / 1_048_576).toFixed(2))]));
}

const directory = await fs.mkdtemp(path.join(os.tmpdir(), `owj-s4-scoring-${count}-`));
const paths = Object.fromEntries(Object.entries({
  input: "listings.json", scoringReady: "scoring-ready.json",
  scoredListings: "scored-listings.json", model: "scoring-model.json", report: "scoring-report.json",
}).map(([key, file]) => [key, path.join(directory, file)]));
await fs.writeFile(paths.input, JSON.stringify({
  schemaVersion: "1.0.0", syntheticOnly: true,
  updatedAt: "2026-11-23T00:00:00.000Z",
  listings: Array.from({ length: count }, (_, index) => listing(index)),
}));
global.gc?.();
const before = memory();
const cpuBefore = process.cpuUsage();
const started = performance.now();
const result = await runScoringPipeline({ paths, folds: 5, lambda: 10 });
const elapsedMs = performance.now() - started;
const cpu = process.cpuUsage(cpuBefore);
const sizes = Object.fromEntries(await Promise.all(Object.entries(paths).map(async ([key, file]) => [
  key, (await fs.stat(file)).size,
])));
process.stdout.write(`${JSON.stringify({
  status: result.report.status, syntheticOnly: true, count,
  modelVersion: result.documents.modelDocument?.model?.modelVersion || null,
  scoringVersion: result.documents.scoredDocument?.scoringVersion || null,
  scoredCount: result.report.scoring?.scoredCount || 0,
  elapsedMs: Number(elapsedMs.toFixed(2)),
  cpuMs: { user: Number((cpu.user / 1_000).toFixed(2)), system: Number((cpu.system / 1_000).toFixed(2)) },
  memoryBeforeMiB: before, memoryAfterMiB: memory(), outputBytes: sizes,
  temporaryDirectory: directory,
  activeMongoModelTouched: false, externalProvidersCalled: false,
}, null, 2)}\n`);
