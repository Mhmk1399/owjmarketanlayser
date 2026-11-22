# Analytics Authorization Contract V1

**Status (updated 2026-11-22):** Web-backed Analytics session adapter implemented and mock-tested; real federation remains disabled/blocked until Web implements the matching proposed exchange/status fixtures. Temporary bearer credentials remain a rollout compatibility path.
**Authority:** Owj Web remains the only canonical human identity authority. Analytics does not register users or store passwords; it may issue only restricted opaque application sessions referring to a verified Web subject.

## Sprint 3 identity path

When `ANALYTICS_WEB_IDENTITY_ENABLED=true`, the dashboard uses the exact flow in `ANALYTICS_SSO_CONTRACT_V1.md`. Session credentials are random, host-only HttpOnly cookies and only HMAC digests are stored. Web status supplies `analytics:read`, `analytics:operate`, or `analytics:admin`; sensitive mutations force a fresh check. The service-to-service `/internal/v1/*` credential remains independent. `ANALYTICS_LEGACY_HUMAN_TOKENS_ENABLED=false` disables temporary human bearer fallback without changing internal service authentication.

## Temporary compatibility implementation

`src/security/authorization.js` classifies every request before route execution. Authorization is enforced inside the Node.js service, so direct container-network access does not bypass it. Nginx Basic Authentication remains an edge control, not the application authorization decision.

Temporary credentials are scoped and distinct:

| Environment variable | Principal | Allowed use |
|---|---|---|
| `ANALYTICS_CONSULTANT_TOKEN` | Temporary consultant client | Buyer matching and AI voice transformations |
| `ANALYTICS_ANALYST_TOKEN` | Temporary analyst client | Consultant access plus operational/scoring/crawl read operations and dashboard pages |
| `ANALYTICS_OPERATOR_TOKEN` | Temporary administrator client | Analyst access plus crawl, refetch, enrichment, model lifecycle, and scenario mutations |
| `ANALYTICS_WEB_SERVICE_TOKEN` | Owj Web service | `/internal/v1/*` market-read contracts only |
| `ANALYTICS_CRAWLER_CONTROL_TOKEN` | API-to-crawler service | Crawler control port only; never valid for Web or main API authorization |

All configured credentials must contain at least 32 characters and must be distinct. Missing human credentials return `503 operator-auth-not-configured`; missing Web service authentication returns `503 service-auth-not-configured`; invalid credentials return `401`; a valid but under-scoped human token returns `403`.

## Endpoint matrix

| Class | Routes | Required access |
|---|---|---|
| Health/readiness | `GET /health`, `GET /ready` | Public; deliberately minimal |
| Public market reads | listing list/detail/facets, score list/detail, public schemas, map/voice capability status, static assets | Public |
| Consultant expensive operations | `POST /buyer-matches/search`, `POST /ai/voice/catalog-filters`, `POST /ai/voice/speech` | Consultant or higher |
| Analyst operations | dashboard/data-quality/scoring analysis data, model/training/drift reads, scenarios and scenario scores, crawl state/history/coverage, listing history/analysis, areas/locations/recommendations/analytics, `/events`, operational SPA routes | Analyst or administrator |
| Operator operations | crawl initiation, area jobs, listing refetch, nearby enrichment, scenario create/update | Legacy administrator token or fresh `analytics:operate` Web scope |
| Administrator operations | model promote/rollback and unknown mutations | Legacy administrator token or fresh `analytics:admin` Web scope |
| Internal service | `GET /internal/v1/listings`, `GET /internal/v1/listings/:token`, `GET /internal/v1/listings/:token/valuation`, `POST /internal/v1/buyer-matches/search` | Web service token only |
| Crawler control | crawler `/health`, `/state`, `/crawl`, area-job and refetch routes on port 4568 | Crawler control token only |

GET is not treated as inherently safe. Operational logs, full dashboard data, model state, scoring analysis, crawl diagnostics, and historical observations are analyst-protected because they are expensive or operationally sensitive.

## Coordinated rollout

1. Reconcile the proposed identity fixtures with Web and publish identical copies.
2. Generate independent Analytics→Web, Web→Analytics, crawler-control, and session-digest secrets; do not reuse Web, Chat, MongoDB, Neshan, OpenAI, or RSA credentials.
3. Test Web role/permission mappings to all three Analytics scopes and current-status revocation.
4. Enable Web identity and the exact Analytics redirect URI in a local/staging HTTPS-like environment. Never inject a human token into the browser bundle.
5. Disable legacy human tokens only after the dashboard and operator workflows pass; the Web-service market token remains separate.

## Awaiting matching Web implementation

The proposed bounded exchange/status contract and browser flow are published in the Sprint 3 identity/SSO documents and fixtures. Web must implement or reconcile them before the feature is enabled. Analytics does not read Web User/CRM collections. The dashboard manages only its opaque Analytics cookie and PKCE callback; it never receives internal service credentials or Web's existing browser JWT.

