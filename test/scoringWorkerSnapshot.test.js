import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { writeListingSnapshotFromCursor } from "../src/scoring/scoringWorker.js";

test("Mongo scoring snapshot is streamed from a cursor into valid JSON", async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "owj-score-cursor-"));
  const output = path.join(directory, "listings.json");
  async function* documents() {
    yield { _id: "one", token: "one", title: "First" };
    yield { _id: "two", token: "two", title: "Second" };
  }
  const result = await writeListingSnapshotFromCursor(output, documents());
  const snapshot = JSON.parse(await fs.readFile(output, "utf8"));
  assert.equal(result.count, 2);
  assert.equal(snapshot.derivedFrom, "mongodb");
  assert.deepEqual(snapshot.listings, [
    { token: "one", title: "First" },
    { token: "two", title: "Second" },
  ]);
});
