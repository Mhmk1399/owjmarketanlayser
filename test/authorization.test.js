import test from "node:test";
import assert from "node:assert/strict";
import { createAnalyticsServer } from "../src/api/server.js";
import {
  authorizeAnalyticsRequest,
  classifyAnalyticsRequest,
  validateCredentialConfiguration,
} from "../src/security/authorization.js";

const TOKENS = Object.freeze({
  consultantToken: "consultant-000000000000000000000000",
  analystToken: "analyst-000000000000000000000000000",
  operatorToken: "operator-00000000000000000000000000",
  webServiceToken: "web-service-00000000000000000000000",
});

function request(method, token = null, headers = {}) {
  return { method, headers: { ...headers, ...(token ? { authorization: `Bearer ${token}` } : {}) } };
}

test("authorization matrix classifies mutations, expensive reads, service calls, and public reads", () => {
  assert.equal(classifyAnalyticsRequest("GET", "/listings").role, "public");
  assert.equal(classifyAnalyticsRequest("POST", "/buyer-matches/search").role, "consultant");
  assert.equal(classifyAnalyticsRequest("GET", "/events").role, "analyst");
  assert.equal(classifyAnalyticsRequest("POST", "/crawl").role, "administrator");
  assert.equal(classifyAnalyticsRequest("GET", "/internal/v1/listings").audience, "service");
  assert.equal(classifyAnalyticsRequest("POST", "/future-route").role, "administrator");
});

test("privileged requests fail closed for missing, wrong, and under-scoped credentials", () => {
  const missing = authorizeAnalyticsRequest(request("POST"), "/crawl", {});
  assert.equal(missing.ok, false);
  assert.equal(missing.status, 503);
  assert.equal(missing.error, "operator-auth-not-configured");
  assert.equal(authorizeAnalyticsRequest(request("POST", "wrong"), "/crawl", TOKENS).status, 401);
  assert.equal(authorizeAnalyticsRequest(request("POST", TOKENS.consultantToken), "/crawl", TOKENS).status, 403);
  assert.equal(authorizeAnalyticsRequest(request("POST", TOKENS.operatorToken), "/crawl", TOKENS).ok, true);
  assert.equal(authorizeAnalyticsRequest(request("GET"), "/listings", {}).ok, true);
});

test("internal service authentication is separate from crawler and operator credentials", () => {
  const path = "/internal/v1/listings";
  assert.equal(authorizeAnalyticsRequest(request("GET", TOKENS.operatorToken), path, TOKENS).status, 401);
  assert.equal(authorizeAnalyticsRequest(request("GET", TOKENS.webServiceToken), path, TOKENS).ok, true);
  assert.equal(authorizeAnalyticsRequest(request("GET"), path, {}).status, 503);
});

test("credential validation rejects short or reused secrets", () => {
  assert.throws(() => validateCredentialConfiguration({ operatorToken: "short" }), /at least 32/);
  assert.throws(() => validateCredentialConfiguration({
    operatorToken: TOKENS.operatorToken,
    analystToken: TOKENS.operatorToken,
  }), /distinct/);
  assert.throws(() => validateCredentialConfiguration(TOKENS, {
    crawlerControlToken: TOKENS.operatorToken,
  }), /distinct/);
  assert.doesNotThrow(() => validateCredentialConfiguration(TOKENS));
});

test("direct HTTP access cannot invoke a mutation without application authorization", async (t) => {
  let starts = 0;
  const server = createAnalyticsServer({
    config: { paths: {}, security: TOKENS },
    store: { getListings: () => [] }, analytics: {},
    crawler: { start() { starts += 1; return { started: true }; } },
    logger: { info() {}, warn() {}, error() {} },
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const url = `http://127.0.0.1:${server.address().port}/crawl`;
  assert.equal((await fetch(url, { method: "POST", headers: { "x-forwarded-for": "127.0.0.1" } })).status, 401);
  assert.equal(starts, 0);
  assert.equal((await fetch(url, {
    method: "POST", headers: { authorization: `Bearer ${TOKENS.operatorToken}` },
  })).status, 202);
  assert.equal(starts, 1);
});

test("internal listing adapter accepts only the Web service credential", async (t) => {
  const server = createAnalyticsServer({
    config: { paths: {}, security: TOKENS },
    store: { async queryListings() { return { total: 0, listings: [] }; } },
    analytics: {}, crawler: {}, logger: { info() {}, warn() {}, error() {} },
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const url = `http://127.0.0.1:${server.address().port}/internal/v1/listings`;
  assert.equal((await fetch(url)).status, 401);
  const response = await fetch(url, {
    headers: { authorization: `Bearer ${TOKENS.webServiceToken}` },
  });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).total, 0);
});

test("internal valuation adapter returns only an existing precomputed valuation", async (t) => {
  let requestedToken = null;
  const server = createAnalyticsServer({
    config: { paths: {}, security: TOKENS },
    store: { async listingValuation(token) {
      requestedToken = token;
      return { token, modelVersion: "v1", estimatedPrice: 10, scoringStatus: "available-experimental" };
    } },
    analytics: {}, crawler: {}, logger: { info() {}, warn() {}, error() {} },
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const response = await fetch(
    `http://127.0.0.1:${server.address().port}/internal/v1/listings/public-token/valuation`,
    { headers: { authorization: `Bearer ${TOKENS.webServiceToken}` } },
  );
  assert.equal(response.status, 200);
  assert.equal(requestedToken, "public-token");
  assert.equal((await response.json()).scoringStatus, "available-experimental");
});
