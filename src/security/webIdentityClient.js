const ALLOWED_SCOPES = new Set(["analytics:read", "analytics:operate", "analytics:admin"]);

function contractError(code, message, status = 502) {
  return Object.assign(new Error(message), { code, status });
}

function assertIdentityResponse(value) {
  if (!value || value.version !== 1 || !/^[a-f0-9]{24}$/.test(value.subject || "")) {
    throw contractError("identity-provider-invalid-response", "Web returned an invalid Analytics identity response");
  }
  if (value.accountStatus !== "active" || !Array.isArray(value.scopes)
    || value.scopes.some((scope) => !ALLOWED_SCOPES.has(scope))) {
    throw contractError("analytics-access-denied", "Web did not authorize Analytics access", 403);
  }
  if (!value.scopes.includes("analytics:read")) {
    throw contractError("analytics-access-denied", "Web did not grant Analytics read access", 403);
  }
  const expiresAt = new Date(value.sessionExpiresAt);
  const checkedAt = new Date(value.authorizationCheckedAt);
  if (!Number.isFinite(expiresAt.getTime()) || expiresAt <= new Date()
    || !Number.isFinite(checkedAt.getTime())) {
    throw contractError("identity-provider-invalid-response", "Web returned invalid identity timestamps");
  }
  return {
    subject: value.subject,
    scopes: [...new Set(value.scopes)],
    accountStatus: value.accountStatus,
    sessionExpiresAt: expiresAt,
    authorizationCheckedAt: checkedAt,
    authorizationCacheMaxAgeSeconds: Math.min(60, Math.max(0,
      Number(value.authorizationCacheMaxAgeSeconds) || 0)),
  };
}

export class WebIdentityClient {
  constructor({ exchangeUrl, statusUrl, serviceToken, timeoutMs = 2_000, fetchImpl = fetch }) {
    this.exchangeUrl = exchangeUrl;
    this.statusUrl = statusUrl;
    this.serviceToken = serviceToken;
    this.timeoutMs = timeoutMs;
    this.fetchImpl = fetchImpl;
  }

  get configured() {
    return Boolean(this.exchangeUrl && this.statusUrl && this.serviceToken);
  }

  async request(url, body, requestId) {
    if (!this.configured) {
      throw contractError("identity-provider-not-configured", "Web identity integration is not configured", 503);
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const response = await this.fetchImpl(url, {
        method: "POST",
        signal: controller.signal,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${this.serviceToken}`,
          "x-owj-service": "owj-analytics",
          ...(requestId ? { "x-request-id": requestId } : {}),
        },
        body: JSON.stringify(body),
      });
      const value = await response.json().catch(() => null);
      if (!response.ok) {
        const status = response.status === 401 || response.status === 403 ? response.status : 502;
        throw contractError(value?.error || "identity-provider-rejected",
          value?.message || "Web identity provider rejected the request", status);
      }
      return assertIdentityResponse(value);
    } catch (error) {
      if (error.name === "AbortError") {
        throw contractError("identity-provider-timeout", "Web identity provider timed out", 503);
      }
      if (error.status) throw error;
      throw contractError("identity-provider-unavailable", "Web identity provider is unavailable", 503);
    } finally {
      clearTimeout(timer);
    }
  }

  exchange({ code, codeVerifier, redirectUri, state, requestId }) {
    return this.request(this.exchangeUrl, {
      version: 1, code, codeVerifier, redirectUri, state,
    }, requestId);
  }

  status({ subject, authorizationEstablishedAt, requestId }) {
    return this.request(this.statusUrl, {
      version: 1, subject, authorizationEstablishedAt,
    }, requestId);
  }
}

export const WEB_ANALYTICS_SCOPES = ALLOWED_SCOPES;

