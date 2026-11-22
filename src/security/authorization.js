import { timingSafeEqual } from "node:crypto";

const ROLE_RANK = Object.freeze({ consultant: 1, analyst: 2, administrator: 3 });

const ADMIN_MUTATIONS = [
  ["POST", /^\/crawl$/],
  ["POST", /^\/area-crawl-jobs$/],
  ["POST", /^\/listings\/[A-Za-z0-9_-]+\/(?:refetch|nearby-places)$/],
  ["POST", /^\/model-versions\/[A-Za-z0-9_-]+\/promote$/],
  ["POST", /^\/model-versions\/rollback$/],
  ["POST", /^\/scoring-scenarios$/],
  ["PUT", /^\/scoring-scenarios\/[A-Za-z0-9_-]+$/],
];

const CONSULTANT_OPERATIONS = [
  ["POST", /^\/buyer-matches\/search$/],
  ["POST", /^\/ai\/voice\/(?:catalog-filters|speech)$/],
];

const ANALYST_OPERATIONS = [
  ["GET", /^\/(?:dashboard|data-quality-data|score-analytics-data|score-workshop-data)$/],
  ["GET", /^\/data-quality$/],
  ["GET", /^\/(?:model-versions|training-runs|model-drift|scoring-scenarios|scoring-report)$/],
  ["GET", /^\/scoring-scenarios\/[A-Za-z0-9_-]+\/scores$/],
  ["GET", /^\/listings\/[A-Za-z0-9_-]+\/(?:score-history|scenario-scores|history|analysis)$/],
  ["GET", /^\/(?:crawl|crawl-runs|crawl-coverage|collection-summary|areas|recommendations|analytics|events)$/],
  ["GET", /^\/area-crawl-jobs\/[A-Za-z0-9-]+$/],
  ["GET", /^\/(?:areas|locations)(?:\/[^/]+)?$/],
  ["GET", /^\/$/],
  ["GET", /^\/(?:score-analytics|score-workshop|catalog|buyer-matching)$/],
  ["GET", /^\/explore(?:\/[a-z0-9-]+)?$/i],
  ["GET", /^\/listing\/[A-Za-z0-9_-]+$/],
];

const PUBLIC_OPERATIONS = [
  ["GET", /^\/health$/],
  ["GET", /^\/(?:map-config|listing-facets)$/],
  ["GET", /^\/ai\/voice\/status$/],
  ["GET", /^\/buyer-matches\/options$/],
  ["GET", /^\/scores$/],
  ["GET", /^\/score-details\/[A-Za-z0-9_-]+$/],
  ["GET", /^\/listings$/],
  ["GET", /^\/listings\/[A-Za-z0-9_-]+$/],
  ["GET", /^\/schemas\/(?:public-listing|scoring-ready|scored-listings|buyer-match-request)$/],
  ["GET", /^\/assets\/[A-Za-z0-9_.-]+$/],
];

function matches(entries, method, pathname) {
  return entries.some(([candidateMethod, pattern]) => candidateMethod === method && pattern.test(pathname));
}

export function classifyAnalyticsRequest(method, pathname, { accept = "" } = {}) {
  if (pathname.startsWith("/internal/v1/")) return { audience: "service", role: "web-market-read" };
  if (matches(ADMIN_MUTATIONS, method, pathname)) return { audience: "human", role: "administrator" };
  if (matches(CONSULTANT_OPERATIONS, method, pathname)) return { audience: "human", role: "consultant" };
  if (pathname === "/data-quality" && method === "GET" && String(accept).includes("text/html")) {
    return { audience: "human", role: "analyst" };
  }
  if (matches(ANALYST_OPERATIONS, method, pathname)) return { audience: "human", role: "analyst" };
  if (matches(PUBLIC_OPERATIONS, method, pathname)) return { audience: "public", role: "public" };
  // New or misspelled routes never become public by omission. Unknown reads
  // require analyst access and unknown non-reads require administrator access;
  // the HTTP router will still return 404 after successful authorization.
  return {
    audience: "human",
    role: method === "GET" || method === "HEAD" ? "analyst" : "administrator",
  };
}

function bearerToken(header) {
  const match = /^Bearer\s+([^\s]+)$/i.exec(String(header || ""));
  return match?.[1] || null;
}

function tokensEqual(left, right) {
  if (!left || !right) return false;
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

function authenticateHuman(token, security = {}) {
  const candidates = [
    ["administrator", security.operatorToken],
    ["analyst", security.analystToken],
    ["consultant", security.consultantToken],
  ];
  return candidates.find(([, configured]) => tokensEqual(token, configured))?.[0] || null;
}

export function authorizeAnalyticsRequest(request, pathname, security = {}) {
  const classification = classifyAnalyticsRequest(request.method, pathname, {
    accept: request.headers.accept,
  });
  if (classification.audience === "public") return { ok: true, classification, principal: "public" };

  const token = bearerToken(request.headers.authorization);
  if (classification.audience === "service") {
    if (!security.webServiceToken) {
      return { ok: false, status: 503, error: "service-auth-not-configured", classification };
    }
    return tokensEqual(token, security.webServiceToken)
      ? { ok: true, classification, principal: "web-service" }
      : { ok: false, status: 401, error: "unauthorized", classification };
  }

  const configured = security.operatorToken || security.analystToken || security.consultantToken;
  if (!configured) return { ok: false, status: 503, error: "operator-auth-not-configured", classification };
  const actualRole = authenticateHuman(token, security);
  if (!actualRole) return { ok: false, status: 401, error: "unauthorized", classification };
  if (ROLE_RANK[actualRole] < ROLE_RANK[classification.role]) {
    return { ok: false, status: 403, error: "forbidden", classification, principal: actualRole };
  }
  return { ok: true, classification, principal: actualRole };
}

export function validateCredentialConfiguration(security = {}, { crawlerControlToken = null } = {}) {
  const entries = [
    ["ANALYTICS_OPERATOR_TOKEN", security.operatorToken],
    ["ANALYTICS_ANALYST_TOKEN", security.analystToken],
    ["ANALYTICS_CONSULTANT_TOKEN", security.consultantToken],
    ["ANALYTICS_WEB_SERVICE_TOKEN", security.webServiceToken],
    ["ANALYTICS_CRAWLER_CONTROL_TOKEN", crawlerControlToken],
  ].filter(([, value]) => value);
  for (const [name, value] of entries) {
    if (String(value).length < 32) throw new Error(`${name} must contain at least 32 characters`);
  }
  const unique = new Set(entries.map(([, value]) => value));
  if (unique.size !== entries.length) throw new Error("Analytics credentials must be distinct by purpose");
}

export const AUTHORIZATION_MATRIX = Object.freeze({
  public: "Public health, bounded listing reads, facets, schemas, static assets, and capability status",
  consultant: "Buyer matching and AI voice transformations",
  analyst: "Operational dashboard data, diagnostics, crawl state, history, and scoring analysis",
  administrator: "Crawler initiation, refetch/enrichment, scenario writes, and model lifecycle mutations",
  service: "Versioned internal Web-to-Analytics market-read contracts",
});
