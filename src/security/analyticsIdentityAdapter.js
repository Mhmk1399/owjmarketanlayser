import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { AnalyticsAuthState, AnalyticsSession } from "../models/analyticsSession.js";
import { WebIdentityClient } from "./webIdentityClient.js";

const SESSION_COOKIE = "owj_analytics_session";
const STATE_COOKIE = "owj_analytics_auth_state";
const MAX_CODE_LENGTH = 512;
const MAX_VERIFIER_LENGTH = 128;

function cookieValue(header, name) {
  for (const part of String(header || "").split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return null;
}

function safeEqual(left, right) {
  const a = Buffer.from(String(left || ""));
  const b = Buffer.from(String(right || ""));
  return a.length === b.length && timingSafeEqual(a, b);
}

function validRedirectUri(value, allowed) {
  try {
    const url = new URL(value);
    return allowed.has(url.href) ? url.href : null;
  } catch {
    return null;
  }
}

function cookie(name, value, { secure, maxAge = null }) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`
    + (maxAge === null ? "" : `; Max-Age=${Math.max(0, Math.floor(maxAge))}`);
}

class MemoryIdentityRepository {
  constructor() {
    this.sessions = new Map();
    this.states = new Map();
  }
  async createState(value) { this.states.set(value.digest, value); }
  async consumeState(digest, now) {
    const value = this.states.get(digest);
    if (!value || value.consumedAt || value.expiresAt <= now) return null;
    value.consumedAt = now;
    return value;
  }
  async createSession(value) { this.sessions.set(value.digest, value); }
  async getSession(digest) { return this.sessions.get(digest) || null; }
  async updateSession(digest, value) {
    const current = this.sessions.get(digest);
    if (current) Object.assign(current, value);
  }
  async revokeSession(digest, now) { return this.updateSession(digest, { revokedAt: now }); }
}

class MongoIdentityRepository {
  async createState(value) { await AnalyticsAuthState.create(value); }
  async consumeState(digest, now) {
    return AnalyticsAuthState.findOneAndUpdate({ digest, consumedAt: null, expiresAt: { $gt: now } },
      { $set: { consumedAt: now } }, { new: true }).lean();
  }
  async createSession(value) { await AnalyticsSession.create(value); }
  async getSession(digest) { return AnalyticsSession.findOne({ digest }).lean(); }
  async updateSession(digest, value) { await AnalyticsSession.updateOne({ digest }, { $set: value }); }
  async revokeSession(digest, now) { await AnalyticsSession.updateOne({ digest }, { $set: { revokedAt: now } }); }
}

function identityError(code, message, status) {
  return Object.assign(new Error(message), { code, status });
}

export class AnalyticsIdentityAdapter {
  constructor(options = {}) {
    this.enabled = Boolean(options.enabled);
    this.dashboardOrigin = options.dashboardOrigin;
    this.webAuthorizeUrl = options.webAuthorizeUrl;
    this.allowedRedirectUris = new Set(options.allowedRedirectUris || []);
    this.sessionSecret = options.sessionSecret;
    this.sessionLifetimeSeconds = Math.min(28_800, Math.max(300, options.sessionLifetimeSeconds || 3_600));
    this.stateLifetimeSeconds = Math.min(300, Math.max(30, options.stateLifetimeSeconds || 120));
    const dashboardUrl = options.dashboardOrigin ? new URL(options.dashboardOrigin) : null;
    const localHostname = dashboardUrl && (dashboardUrl.hostname === "localhost"
      || dashboardUrl.hostname === "127.0.0.1" || dashboardUrl.hostname.endsWith(".localhost"));
    if (options.allowInsecureLocalCookie && (options.environment === "production" || !localHostname)) {
      throw new Error("ANALYTICS_ALLOW_INSECURE_LOCAL_COOKIE is restricted to non-production localhost origins");
    }
    if (this.enabled && dashboardUrl?.protocol !== "https:" && !options.allowInsecureLocalCookie) {
      throw new Error("Web identity requires HTTPS unless the explicit localhost cookie exception is enabled");
    }
    this.secureCookies = !options.allowInsecureLocalCookie;
    this.repository = options.repository || (options.mongo ? new MongoIdentityRepository() : new MemoryIdentityRepository());
    this.client = options.client || new WebIdentityClient(options.web || {});
    if (this.enabled && (!this.sessionSecret || this.sessionSecret.length < 32)) {
      throw new Error("ANALYTICS_SESSION_SECRET must contain at least 32 characters when Web identity is enabled");
    }
  }

  digest(value) {
    return createHmac("sha256", this.sessionSecret || "disabled-analytics-identity")
      .update(value).digest("hex");
  }

  validateOrigin(request) {
    if (!this.dashboardOrigin || request.headers.origin !== this.dashboardOrigin) {
      throw identityError("invalid-origin", "The browser origin is not approved", 403);
    }
  }

  async begin(response, redirectUri, reason = "login-required") {
    if (!this.enabled || !this.client.configured) {
      throw identityError("identity-provider-not-configured", "Web identity integration is not configured", 503);
    }
    const approvedRedirect = validRedirectUri(redirectUri, this.allowedRedirectUris);
    if (!approvedRedirect) throw identityError("invalid-redirect-uri", "Redirect URI is not allowlisted", 400);
    const state = randomBytes(32).toString("base64url");
    const binding = randomBytes(32).toString("base64url");
    const expiresAt = new Date(Date.now() + this.stateLifetimeSeconds * 1_000);
    await this.repository.createState({ digest: this.digest(`${state}:${binding}`), redirectUri: approvedRedirect, expiresAt, consumedAt: null, createdAt: new Date() });
    response.setHeader("Set-Cookie", cookie(STATE_COOKIE, binding, { secure: this.secureCookies, maxAge: this.stateLifetimeSeconds }));
    return { authenticated: false, reason, state, redirectUri: approvedRedirect,
      authorizeUrl: this.webAuthorizeUrl, expiresAt: expiresAt.toISOString() };
  }

  async exchange(request, response, body, requestId) {
    this.validateOrigin(request);
    const { code, codeVerifier, state } = body || {};
    const redirectUri = validRedirectUri(body?.redirectUri, this.allowedRedirectUris);
    if (typeof code !== "string" || !code || code.length > MAX_CODE_LENGTH
      || typeof codeVerifier !== "string" || !/^[A-Za-z0-9._~-]{43,128}$/.test(codeVerifier)
      || typeof state !== "string" || !/^[A-Za-z0-9_-]{32,128}$/.test(state)
      || !redirectUri) {
      throw identityError("invalid-authentication-request", "Code, PKCE verifier, state, or redirect URI is invalid", 400);
    }
    const binding = cookieValue(request.headers.cookie, STATE_COOKIE);
    if (!binding) throw identityError("invalid-authentication-state", "Authentication state binding is missing", 400);
    const transaction = await this.repository.consumeState(this.digest(`${state}:${binding}`), new Date());
    if (!transaction || !safeEqual(transaction.redirectUri, redirectUri)) {
      throw identityError("invalid-authentication-state", "Authentication state is expired, replayed, or mismatched", 400);
    }
    const verified = await this.client.exchange({ code, codeVerifier, redirectUri, state, requestId });
    const rawSession = randomBytes(32).toString("base64url");
    const now = new Date();
    const expiresAt = new Date(Math.min(verified.sessionExpiresAt.getTime(), now.getTime() + this.sessionLifetimeSeconds * 1_000));
    await this.repository.createSession({
      digest: this.digest(rawSession), subject: verified.subject, scopes: verified.scopes,
      accountStatus: "active", authorizationCheckedAt: verified.authorizationCheckedAt,
      authorizationCacheMaxAgeSeconds: verified.authorizationCacheMaxAgeSeconds,
      expiresAt, revokedAt: null, createdAt: now,
    });
    response.setHeader("Set-Cookie", [
      cookie(SESSION_COOKIE, rawSession, { secure: this.secureCookies, maxAge: (expiresAt - now) / 1_000 }),
      cookie(STATE_COOKIE, "", { secure: this.secureCookies, maxAge: 0 }),
    ]);
    return this.publicSession({ ...verified, expiresAt });
  }

  publicSession(session) {
    return { authenticated: true, subject: session.subject, scopes: session.scopes,
      expiresAt: new Date(session.expiresAt || session.sessionExpiresAt).toISOString() };
  }

  async authenticate(request, { requiredScope = "analytics:read", forceFresh = false, requestId } = {}) {
    if (!this.enabled) return { ok: false, status: 503, error: "identity-provider-not-configured" };
    const raw = cookieValue(request.headers.cookie, SESSION_COOKIE);
    if (!raw) return { ok: false, status: 401, error: "session-required" };
    const digest = this.digest(raw);
    const session = await this.repository.getSession(digest);
    const now = new Date();
    if (!session || session.revokedAt || new Date(session.expiresAt) <= now) {
      return { ok: false, status: 401, error: "session-expired" };
    }
    const ageMs = now - new Date(session.authorizationCheckedAt);
    const cacheMs = Math.min(60, session.authorizationCacheMaxAgeSeconds || 0) * 1_000;
    if (forceFresh || ageMs > cacheMs) {
      try {
        const verified = await this.client.status({ subject: session.subject,
          authorizationEstablishedAt: new Date(session.authorizationCheckedAt).toISOString(), requestId });
        Object.assign(session, { scopes: verified.scopes, accountStatus: verified.accountStatus,
          authorizationCheckedAt: verified.authorizationCheckedAt,
          authorizationCacheMaxAgeSeconds: verified.authorizationCacheMaxAgeSeconds,
          expiresAt: new Date(Math.min(new Date(session.expiresAt).getTime(), verified.sessionExpiresAt.getTime())) });
        await this.repository.updateSession(digest, session);
      } catch (error) {
        await this.repository.revokeSession(digest, now);
        return { ok: false, status: error.status === 403 ? 403 : 503, error: error.code || "identity-provider-unavailable" };
      }
    }
    if (!session.scopes.includes(requiredScope)) return { ok: false, status: 403, error: "forbidden" };
    return { ok: true, principal: session.subject, scopes: session.scopes, session: this.publicSession(session) };
  }

  async current(request, response, { redirectUri, requestId }) {
    const authenticated = await this.authenticate(request, { requiredScope: "analytics:read", requestId });
    if (authenticated.ok) return authenticated.session;
    if (authenticated.status === 403) {
      throw identityError("analytics-access-denied", "The current Web account is not authorized for Analytics", 403);
    }
    if (authenticated.status === 503 && authenticated.error !== "identity-provider-not-configured") throw identityError(authenticated.error, "Current Web authorization is unavailable", 503);
    return this.begin(response, redirectUri, authenticated.error === "session-expired" ? "session-expired" : "login-required");
  }

  async logout(request, response) {
    this.validateOrigin(request);
    const raw = cookieValue(request.headers.cookie, SESSION_COOKIE);
    if (raw) await this.repository.revokeSession(this.digest(raw), new Date());
    response.setHeader("Set-Cookie", cookie(SESSION_COOKIE, "", { secure: this.secureCookies, maxAge: 0 }));
    return { authenticated: false };
  }
}

export function createAnalyticsIdentityAdapter(config) {
  return new AnalyticsIdentityAdapter({
    ...config.identity,
    mongo: Boolean(config.mongoUri),
    allowedRedirectUris: config.identity?.allowedRedirectUris,
    web: {
      exchangeUrl: config.identity?.webExchangeUrl,
      statusUrl: config.identity?.webStatusUrl,
      serviceToken: config.identity?.serviceToken,
      timeoutMs: config.identity?.timeoutMs,
    },
  });
}

export const ANALYTICS_SESSION_COOKIE = SESSION_COOKIE;

