import test from "node:test";
import assert from "node:assert/strict";
import { isTransientMongoError, withMongoRetry } from "../src/storage/mongoRetry.js";

test("Mongo retry recognizes DNS and server-selection outages", () => {
  assert.equal(isTransientMongoError(Object.assign(new Error("getaddrinfo EAI_AGAIN shard"), { name: "MongoServerSelectionError" })), true);
  assert.equal(isTransientMongoError(new Error("validation failed")), false);
});

test("Mongo retry recovers after a transient outage", async () => {
  let calls = 0;
  const retries = [];
  const value = await withMongoRetry(async () => {
    calls += 1;
    if (calls < 3) throw Object.assign(new Error("getaddrinfo EAI_AGAIN shard"), { name: "MongoServerSelectionError" });
    return "connected";
  }, {
    attempts: 3,
    baseDelayMs: 1,
    sleep: async () => {},
    onRetry: (event) => retries.push(event),
  });
  assert.equal(value, "connected");
  assert.equal(calls, 3);
  assert.equal(retries.length, 2);
});
