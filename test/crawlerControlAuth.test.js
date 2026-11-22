import test from "node:test";
import assert from "node:assert/strict";
import { createCrawlerControlServer } from "../src/crawler/controlServer.js";

const token = "crawler-control-0000000000000000000";

test("crawler control refuses to start without a strong dedicated credential", () => {
  const options = { crawler: {}, logger: { error() {} } };
  assert.throws(() => createCrawlerControlServer(options), /must contain at least 32/);
  assert.throws(() => createCrawlerControlServer({ ...options, token: "short" }), /must contain at least 32/);
});

test("crawler control authenticates health, state, and mutation routes", async (t) => {
  let starts = 0;
  const server = createCrawlerControlServer({
    token,
    crawler: {
      snapshot: () => ({ status: "idle" }),
      start: () => { starts += 1; return { started: true }; },
    },
    logger: { error() {} },
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  assert.equal((await fetch(`${origin}/health`)).status, 401);
  assert.equal((await fetch(`${origin}/crawl`, { method: "POST" })).status, 401);
  assert.equal(starts, 0);
  const response = await fetch(`${origin}/crawl`, {
    method: "POST", headers: { authorization: `Bearer ${token}` },
  });
  assert.equal(response.status, 202);
  assert.equal(starts, 1);
});
