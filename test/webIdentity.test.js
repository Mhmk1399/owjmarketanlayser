import test from "node:test";
import assert from "node:assert/strict";
import { AnalyticsIdentityAdapter } from "../src/security/analyticsIdentityAdapter.js";
import { WebIdentityClient } from "../src/security/webIdentityClient.js";
import { authorizeAnalyticsRequestWithIdentity } from "../src/security/authorization.js";

const origin = "http://analytics.owj.localhost:18088";
const redirectUri = `${origin}/auth/callback`;
const identity = () => ({
  subject: "507f1f77bcf86cd799439011",
  scopes: ["analytics:read", "analytics:operate"],
  accountStatus: "active",
  sessionExpiresAt: new Date(Date.now() + 3_600_000),
  authorizationCheckedAt: new Date(),
  authorizationCacheMaxAgeSeconds: 60,
});

function responseHeaders() {
  const headers = new Map();
  return { headers, setHeader(name, value) { headers.set(name.toLowerCase(), value); } };
}

function cookieFrom(value, name) {
  const rows = Array.isArray(value) ? value : [value];
  return rows.find((row) => row.startsWith(`${name}=`))?.split(";")[0];
}

test("Analytics identity state is bound, single-use, and exchanged into an opaque session", async () => {
  let exchanges = 0;
  const adapter = new AnalyticsIdentityAdapter({
    enabled: true, dashboardOrigin: origin, webAuthorizeUrl: "http://owj.localhost:18088/api/v1/analytics/authorize",
    allowedRedirectUris: [redirectUri], sessionSecret: "session-secret-000000000000000000000",
    allowInsecureLocalCookie: true,
    client: {
      configured: true,
      async exchange(value) {
        exchanges += 1;
        assert.equal(value.redirectUri, redirectUri);
        assert.equal(value.codeVerifier.length, 43);
        return identity();
      },
      async status() { return identity(); },
    },
  });
  const beginResponse = responseHeaders();
  const pending = await adapter.begin(beginResponse, redirectUri);
  assert.equal(pending.authenticated, false);
  const stateCookie = cookieFrom(beginResponse.headers.get("set-cookie"), "owj_analytics_auth_state");
  const exchangeResponse = responseHeaders();
  const request = { headers: { origin, cookie: stateCookie } };
  const body = { code: "one-time-code", codeVerifier: "v".repeat(43), state: pending.state, redirectUri };
  const session = await adapter.exchange(request, exchangeResponse, body, "request-one");
  assert.equal(session.authenticated, true);
  assert.deepEqual(session.scopes, ["analytics:read", "analytics:operate"]);
  assert.equal(exchanges, 1);
  const sessionCookie = cookieFrom(exchangeResponse.headers.get("set-cookie"), "owj_analytics_session");
  assert.ok(sessionCookie);
  assert.doesNotMatch(sessionCookie, /507f1f77/);
  await assert.rejects(() => adapter.exchange(request, responseHeaders(), body, "request-two"),
    (error) => error.code === "invalid-authentication-state");

  const authenticated = await adapter.authenticate({ headers: { cookie: sessionCookie } }, { requiredScope: "analytics:read" });
  assert.equal(authenticated.ok, true);
  const forbidden = await adapter.authenticate({ headers: { cookie: sessionCookie } }, { requiredScope: "analytics:admin" });
  assert.equal(forbidden.status, 403);
});

test("sensitive authorization forces current Web status and fails closed", async () => {
  let statusChecks = 0;
  const adapter = new AnalyticsIdentityAdapter({
    enabled: true, dashboardOrigin: origin, webAuthorizeUrl: "http://web/authorize",
    allowedRedirectUris: [redirectUri], sessionSecret: "another-session-secret-000000000000000",
    allowInsecureLocalCookie: true,
    client: { configured: true, async exchange() { return identity(); }, async status() { statusChecks += 1; return identity(); } },
  });
  const beginResponse = responseHeaders();
  const pending = await adapter.begin(beginResponse, redirectUri);
  const exchangeResponse = responseHeaders();
  await adapter.exchange({ headers: { origin, cookie: cookieFrom(beginResponse.headers.get("set-cookie"), "owj_analytics_auth_state") } },
    exchangeResponse, { code: "code", codeVerifier: "x".repeat(43), state: pending.state, redirectUri }, "request");
  const request = { method: "POST", headers: { cookie: cookieFrom(exchangeResponse.headers.get("set-cookie"), "owj_analytics_session") } };
  const result = await authorizeAnalyticsRequestWithIdentity(request, "/crawl", { legacyHumanTokensEnabled: false }, adapter, "fresh");
  assert.equal(result.ok, true);
  assert.equal(statusChecks, 1);
});

test("Web identity client sends only the bounded service contract", async () => {
  let captured;
  const client = new WebIdentityClient({
    exchangeUrl: "http://web/exchange", statusUrl: "http://web/status", serviceToken: "secret",
    fetchImpl: async (url, options) => {
      captured = { url, options, body: JSON.parse(options.body) };
      return { ok: true, async json() { return { version: 1, ...identity(),
        sessionExpiresAt: identity().sessionExpiresAt.toISOString(), authorizationCheckedAt: new Date().toISOString() }; } };
    },
  });
  await client.exchange({ code: "code", codeVerifier: "v".repeat(43), redirectUri, state: "state", requestId: "request" });
  assert.equal(captured.url, "http://web/exchange");
  assert.equal(captured.options.headers["x-owj-service"], "owj-analytics");
  assert.deepEqual(Object.keys(captured.body).sort(), ["code", "codeVerifier", "redirectUri", "state", "version"]);
});

