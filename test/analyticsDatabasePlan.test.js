import test from "node:test";
import assert from "node:assert/strict";
import { databasePlan, validateAnalyticsDatabaseTarget } from "../src/storage/analyticsDatabasePlan.js";

test("database plan covers every Analytics model and its declared indexes", () => {
  const plan = databasePlan();
  assert.equal(plan.models.length, 14);
  assert.equal(new Set(plan.models.map(({ collection }) => collection)).size, 14);
  assert.ok(plan.models.every(({ indexes }) => indexes.length > 0));
});

test("database target guard protects system, Web, and Chat databases", () => {
  for (const name of ["admin", "local", "owj_web", "owj-chat", "chat"]) {
    assert.throws(() => validateAnalyticsDatabaseTarget(name), /protected/);
  }
  assert.equal(
    validateAnalyticsDatabaseTarget("owj_market_analytics", "owj_market_analytics"),
    "owj_market_analytics",
  );
  assert.throws(
    () => validateAnalyticsDatabaseTarget("owj_market_analytics", "other"),
    /exactly match/,
  );
});
