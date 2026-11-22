# Analytics Sprint 3 Handoff and Exact Work Log

**Date:** 2026-11-22  
**Repository:** `owj-market-analytics` only  
**Base:** `main` at `87423fa` (`start connecting to web`)  
**Result:** independent Analytics work implemented and mock-tested; real Web/Analytics SSO and shared-Mongo E2E are BLOCKED. Sprint 3 final acceptance is therefore not claimed.

No commit, push, deployment, VPS access, production infrastructure change, crawl, scorer run, paid API call, Docker image push, DNS change, production Nginx change, or successful database connection was performed.

## Exact created files

- `compose.local.yaml`
- `dashboard/src/AuthGate.jsx`
- `deploy/Dockerfile.dashboard`
- `deploy/env.analytics.local.example`
- `deploy/nginx.dashboard.conf`
- `docs/platform/ANALYTICS_LOCAL_DOCKER.md`
- `docs/platform/ANALYTICS_SPRINT_3_HANDOFF.md`
- `docs/platform/ANALYTICS_SPRINT_3_PERFORMANCE.md`
- `docs/platform/ANALYTICS_SSO_CONTRACT_V1.md`
- `docs/platform/ANALYTICS_WEB_IDENTITY_CONTRACT_V1.md`
- `docs/platform/ANALYTICS_WEB_SEARCH_CONTRACT_V1.md`
- `docs/platform/fixtures/analytics-v1/browser-session.contract.json`
- `docs/platform/fixtures/analytics-v1/identity-exchange.contract.json`
- `docs/platform/fixtures/analytics-v1/identity-status.contract.json`
- `docs/platform/fixtures/analytics-v1/market-api.contract.json`
- `scripts/seed-analytics-synthetic.js`
- `src/models/analyticsSession.js`
- `src/security/analyticsIdentityAdapter.js`
- `src/security/webIdentityClient.js`
- `test/webIdentity.test.js`
- generated dashboard assets `public/assets/index-DoOl_APp.js` and `public/assets/index-BlBgaRGI.css`

## Exact modified/replaced files

- `.env.example`
- `Dockerfile`
- `dashboard/src/main.jsx`
- `dashboard/src/shared.jsx`
- `dashboard/src/styles.css`
- `docs/platform/ANALYTICS_AUTH_CONTRACT_V1.md`
- `docs/platform/ANALYTICS_LOCAL_MONGO_PLAN.md`
- `docs/platform/ANALYTICS_SEARCH_CONTRACT_V1.md`
- `docs/platform/ANALYTICS_SPRINT_1_HANDOFF.md` (historical-snapshot notice only)
- `package.json`
- `public/index.html`
- `scripts/init-analytics-database.js`
- `src/api/server.js`
- `src/apiProcess.js`
- `src/config.js`
- `src/index.js`
- `src/search/buyerMatcher.js`
- `src/security/authorization.js`
- `src/storage/analyticsDatabasePlan.js`
- `src/storage/mongoMarketStore.js` (preserved earlier user-owned `autoCreate: false`; Sprint 3 changed only search/detail/valuation methods)
- `test/analyticsDatabasePlan.test.js`
- `test/buyerMatchApi.test.js`
- `test/buyerMatcher.test.js`
- `test/mongoMarketStore.test.js`
- generated assets `public/assets/index-6vVGczWH.js` and `public/assets/index-CWG4q7fF.css` were replaced by the current build hashes.

`deploy/Dockerfile.offline-overlay` was not modified.

## Implemented

- Web identity client for the proposed exchange/status endpoints with independent directional service authentication, 2-second default timeout, strict response validation, and fail-closed behavior.
- Random one-time state bound to an HttpOnly host cookie and server-side record; replay is rejected.
- Browser PKCE S256 generation, exact redirect allowlist, callback state comparison, immediate URL cleanup, and form POST to Web authorize.
- Opaque 32-byte Analytics session cookie; only HMAC-SHA-256 digest and minimal subject/scopes/timestamps are stored. Mongo TTL indexes support expiry.
- Current Web status cache no longer than 60 seconds. Crawler/refetch/enrichment/scenario/model mutations force a fresh check.
- Scope boundary for `analytics:read`, `analytics:operate`, `analytics:admin`; higher permissions are cumulative and all admitted identities require read.
- Authentication-aware dashboard states and logout. Read-only sessions cannot open the scoring workshop and do not see crawl buttons.
- Existing four `/internal/v1` routes preserved with the existing Web-service bearer boundary.
- Expanded bounded listing search: city, location, buy/rent, price/area/room, amenities, freshness, bounds, scoring filters, sorting, selected Mongo projection, deadlines, response cap.
- Buyer criteria privacy rejection for CRM identity/contact/message/note/session fields at any depth; unknown non-private fields are discarded.
- Valuation states distinguish available, insufficient data, no model, missing listing, stale, and unavailable without fabricated estimates.
- Direct projected listing detail in Mongo mode and score-filter token cap reduced from 20,000 to 2,000. Full Listing map remains for other views/workers.
- Separate local API/dashboard services; crawler/scorer are explicit `workers` profile services with auto-crawl disabled. Main image runs non-root and defaults auto-crawl off.
- Local database plan expanded to 16 models/63 indexes. Safe, deterministic three-listing synthetic seed is dry-run first and refuses remote/database targets.
- Public `/ready` endpoint; it returns 503 when identity is enabled but its Web client is incomplete.

## Mock-tested

- Exchange request fields and directional headers.
- State/cookie binding, opaque session creation, replay rejection, scope denial, forced fresh authorization.
- Static service-token separation and all existing API authorization behavior.
- Buyer normalization/privacy, bounded matching, empty database responses, search query construction/projections.
- Missing-model and missing-listing valuation states with null estimates.

## Real locally tested

- Full Node repository suite: final count recorded below.
- Vite production dashboard build.
- Docker Compose config rendering for default `analytics-api` and `analytics-dashboard` services.
- Machine-readable fixture JSON parsing.
- Synthetic seed no-connect dry-run.

No local container or MongoDB service was started.

## Database safety event and operations

The synthetic seed ran once without `--apply`; it printed only the three fixed tokens and did not connect. No initialization, collection creation, index creation, seed apply, migration, mutation, or destructive operation ran.

During verification, `npm run db:plan` inherited a pre-existing workspace `mongodb+srv` setting and attempted SRV DNS resolution. DNS returned `ECONNREFUSED` before server selection or connection, so no database was contacted or changed. The initializer was immediately hardened to reject every non-local host before DNS/network access unless the operator explicitly supplies `--allow-remote-target`. A second invocation confirmed the pre-network refusal.

All real local database work still requires explicit approval plus the Web-owned `owj_analytics` user/grants and shared replica-set harness.

## BLOCKED

- Sibling Web currently contains none of `/api/v1/analytics/authorize`, `/api/internal/v1/analytics/exchange`, `/api/internal/v1/analytics/identity/status`, Analytics scope mapping, or matching fixtures. Its current identity document says Analytics federation is outside Sprint 2.5.
- Web-owned proxy has no `analytics.owj.localhost` host routing and no public-internal-route isolation test for Analytics.
- Shared Mongo has no verified `owj_analytics` user/database/grants. Replica-set topology and database isolation were not tested.
- Therefore authorization-code validity/expiry/replay/PKCE/role demotion/disabled-account tests, separate-origin Chrome tests, real Web search/valuation calls, Web/Chat coexistence, restart persistence, and browser credential inspection remain genuinely untested.

## Deferred

- Listing-search cursor pagination (V1 retains bounded offset pagination).
- Removal of the full Listing memory map from analytics/dashboard/crawler paths.
- Route-level dashboard code splitting; the existing large-chunk warning remains.
- Production/staging HTTPS cookie verification, multi-instance sessions, load/capacity testing, container RSS, index timing, backup/restore, and 8 GB/4-vCPU coexistence.
- Production Compose resource changes. Existing simultaneous Analytics limits remain too large to claim safe co-location; no production file was changed.

## Test results

- `npm test`: PASS — **155/155 tests**, 0 failed, 0 skipped (4.65 seconds in the final run).
- `npm run dashboard:build`: PASS; existing >500 kB chunk warning remains.
- `docker compose -f compose.local.yaml config --quiet`: PASS.
- Fixture JSON parse: PASS.
- `node scripts/seed-analytics-synthetic.js`: PASS dry run; no connection.
- `npm run db:plan`: expected pre-network refusal for configured remote target after hardening.

Development stops here pending the shared Web/Analytics integration-contract decision and Web implementation.

