# Analytics Authorization Contract V1

**Status:** implemented temporary application boundary; Web identity federation awaiting approval.  
**Authority:** Owj Web remains the only canonical human identity authority. Analytics does not register users, store passwords, or issue human sessions.

## Current implementation

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
| Health | `GET /health` | Public; deliberately minimal |
| Public market reads | listing list/detail/facets, score list/detail, public schemas, map/voice capability status, static assets | Public |
| Consultant expensive operations | `POST /buyer-matches/search`, `POST /ai/voice/catalog-filters`, `POST /ai/voice/speech` | Consultant or higher |
| Analyst operations | dashboard/data-quality/scoring analysis data, model/training/drift reads, scenarios and scenario scores, crawl state/history/coverage, listing history/analysis, areas/locations/recommendations/analytics, `/events`, operational SPA routes | Analyst or administrator |
| Administrator operations | crawl initiation, area jobs, listing refetch, nearby enrichment, model promote/rollback, scenario create/update | Administrator |
| Internal service | `GET /internal/v1/listings`, `GET /internal/v1/listings/:token`, `GET /internal/v1/listings/:token/valuation`, `POST /internal/v1/buyer-matches/search` | Web service token only |
| Crawler control | crawler `/health`, `/state`, `/crawl`, area-job and refetch routes on port 4568 | Crawler control token only |

GET is not treated as inherently safe. Operational logs, full dashboard data, model state, scoring analysis, crawl diagnostics, and historical observations are analyst-protected because they are expensive or operationally sensitive.

## Coordinated rollout

1. Generate five distinct random credentials; do not reuse existing Web, Chat, MongoDB, Neshan, OpenAI, or crawler credentials.
2. Place crawler control in the shared Analytics environment and API-only credentials in the API secret environment. Compose interpolation also requires the four main API credentials in the deployment environment used to render Compose.
3. Update operator/API clients to send `Authorization: Bearer <scoped-token>`.
4. If the existing browser dashboard must remain usable during the transition, configure the reverse proxy to inject only an analyst token for approved dashboard read paths. Do not expose the token to JavaScript and do not inject the administrator token.
5. Deploy the application and verify unauthorized/under-scoped/authorized requests before exposing the route.
6. After Web identity claims are approved, replace temporary human tokens with a verification adapter for Web-issued short-lived identity tokens. Preserve the role matrix and remove the temporary human secrets after a coordinated deprecation window.

## Awaiting Web identity contract

Web must specify issuer, audience, signature/JWKS verification, token lifetime, clock skew, role/permission claims, revocation behavior, service-to-service identity, and correlation/audit fields. Analytics must validate these claims locally or through an approved Web introspection contract. It must not read Web User/CRM collections directly.

The current dashboard frontend does not manage Web sessions or attach bearer tokens. Administrator buttons will fail closed until a safe operator client or approved Web identity adapter is connected.

