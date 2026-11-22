# Analytics Sprint 1 Handoff and Exact Work Log

**Date:** 2026-11-20  
**Repository only:** `owj-market-analytics`  
**Base:** `main` at `15b89b260c1fb040477c91aa447abdff0a29a691`  
**No commit, push, deployment, crawl, scoring production run, database connection, migration, or server mutation was performed.**

## Ownership boundary before this sprint

The working tree already contained:

- `src/storage/mongoMarketStore.js`: four user-owned lines setting `autoCreate: false` with explanatory comments.
- `deploy/Dockerfile.offline-overlay`: user-owned untracked file; not modified in this sprint.
- `OWJ_ANALYTICS_AUDIT.md`: created by the immediately preceding audit task. Sprint 1 amended only its business-name policy language.

This sprint subsequently added `listingValuation()` to `mongoMarketStore.js`; that addition is sprint-owned, while the existing `autoCreate` change remains user-owned.

## Exact file log

Created in Sprint 1:

- `docs/platform/ANALYTICS_SPRINT_1_HANDOFF.md`
- `docs/platform/ANALYTICS_AUTH_CONTRACT_V1.md`
- `docs/platform/ANALYTICS_SEARCH_CONTRACT_V1.md`
- `docs/platform/ANALYTICS_LOCAL_MONGO_PLAN.md`
- `docs/platform/ANALYTICS_PERFORMANCE_BASELINE.md`
- `scripts/init-analytics-database.js`
- `src/security/authorization.js`
- `src/storage/analyticsDatabasePlan.js`
- `test/analyticsDatabasePlan.test.js`
- `test/authorization.test.js`
- `test/crawlerControlAuth.test.js`
- `test/emptyDatabase.test.js`
- `test/scoringWorkerSnapshot.test.js`

Modified in Sprint 1:

- `.env.example`
- `compose.production.yaml`
- `deploy/env.deploy.example`
- `deploy/env.production.api.example`
- `deploy/env.production.shared.example`
- `package.json`
- `src/api/server.js`
- `src/apiProcess.js`
- `src/config.js`
- `src/crawler/controlServer.js`
- `src/crawlerProcess.js`
- `src/index.js`
- `src/scoring/pipeline.js`
- `src/scoring/scoringMachine.js`
- `src/scoring/scoringWorker.js`
- `src/storage/mongoMarketStore.js` (only the new valuation method is Sprint-owned; `autoCreate: false` pre-existed)
- `test/areaCrawlApi.test.js`
- `test/buyerMatchApi.test.js`
- `test/navigation.test.js`
- `test/scoringPipeline.test.js`
- `OWJ_ANALYTICS_AUDIT.md` (policy amendment only; the file itself came from the preceding audit task)

Explicitly untouched user file: `deploy/Dockerfile.offline-overlay`.

## Completed task IDs

### ANA-001 — Endpoint classification

Implemented an executable authorization classifier and documented the full grouped matrix: public, consultant, analyst, administrator, internal Web service, crawler control, and health. Expensive GET operations are analyst-protected.

### ANA-002 — Mutations and expensive operations

Added application-layer bearer authorization for crawler initiation, area jobs, refetch, nearby enrichment, model promote/rollback, scenario writes, operational diagnostics, buyer search, and AI voice operations. Missing configuration fails closed. No second human login system was created.

### ANA-003 — Crawler control

Crawler control now refuses to start without a credential of at least 32 characters and uses strict Bearer parsing plus constant-time comparison. Health/state/mutation routes all require it. Main API/Web/crawler credentials are distinct by configuration and validation.

### ANA-004 — Privacy update

Preserved public `businessDisplayName`, retained contact/auth/cookie prohibitions, and amended the audit’s superseded policy finding. Existing extraction, projection, schema, redaction, strict model, and business-name tests remain in place.

### ANA-006 — Authorization regression tests

Added tests for missing configuration, missing/incorrect credentials, under-scoped roles, direct loopback/container-style access, valid access, internal Web credential separation, and crawler-control fail-closed behavior.

## Partially completed task IDs/ranges

### ANA-005 — Dashboard access

Server-side access classes are implemented and operational dashboard routes/data require analyst access. The frontend does not yet consume Web identity or safely attach temporary credentials; administrator UI actions therefore fail closed pending a coordinated proxy/operator-client or approved Web identity adapter.

### DB-001 through DB-008 — Local Mongo readiness

Safe independent portions completed: guarded dry-run/apply initializer, database-name protection, 14-model/58-index plan, exact confirmation, backup prerequisite, idempotent collection/index creation, verification output, empty-scoring behavior, first-deployment plan, and rollback instructions. Not completed: provisioning, replica-set verification, grants, disposable-Mongo integration run, first durable cycle, restart recovery, backup restore, or any production execution.

### ANA-101 through ANA-105 — Web integration range

The repository contains no authoritative per-ID definitions for this range, so individual IDs are not falsely claimed. As a group, implemented versioned authenticated adapters for listing search, listing detail, buyer matching, and existing valuation, plus request/response and data-minimization documentation. Web identity federation and shared contract approval remain pending.

### ANA-106 through ANA-112 — Scalability range

The repository contains no authoritative per-ID definitions for this range. As a group, completed deterministic comparable indexing, streaming Mongo snapshot export, process-independent API startup, and Compose resource ceilings. Full Listing Map removal and production measurements remain incomplete.

### ID-008, CTR-002, CTR-004, MKT-009

Exact definitions were not present in this repository. Analytics-owned groundwork consists of the Web service auth boundary, internal v1 contracts, data-minimized buyer criteria, stable public listing token usage, and explicit prohibition on Analytics writing CRM/User collections. No cross-repository identity, contract deployment, CRM task creation, or event integration was implemented.

## Security changes

- Added `src/security/authorization.js` with role hierarchy, route classification, constant-time credential matching, and configuration validation.
- Reduced public `/health` to service/status/time; removed public file paths, listing count, process snapshot, and crawl diagnostics.
- Separated four main API credentials from crawler control authentication.
- Added required API credential interpolation to production Compose and documented coordinated rollout.

## Database and empty-state changes

- Added `src/storage/analyticsDatabasePlan.js` and `scripts/init-analytics-database.js`.
- Added `npm run db:plan` and `npm run db:init`.
- Scoring with fewer than 120 clean listings now produces `status: not-ready`, writes no model/score artifact, and never invokes model persistence.
- No MongoDB URI was used and no database was contacted.

## Integration changes

- Added service-authenticated `/internal/v1/listings`, `/internal/v1/listings/:token`, `/internal/v1/buyer-matches/search`, and `/internal/v1/listings/:token/valuation`.
- Existing public route names remain unchanged.
- The valuation route reads precomputed active scores only; it never trains in an HTTP request.

## Performance changes and correctness implications

- Comparable grid: 18,161 candidate checks versus 160,000 exhaustive checks on the 400-listing synthetic fixture (88.65% reduction).
- Indexed and exhaustive scored results are deeply equal on the fixed benchmark; scoring version and formulas were not changed.
- Mongo scoring snapshot export is cursor/batch streamed and atomically renamed.
- API Compose startup no longer depends on crawler/scorer health.
- Added CPU/memory ceilings documented in the performance baseline.

## Production topology discrepancy

Static configuration defines three services and no profiles. Because production reportedly shows only `owj-analytics-api`, plausible distinguishable cases are: an older/alternate Compose file was used, only a targeted service was created, crawler/scorer exited, required variables were absent during rendering, or the deployed image/config predates the three-service topology. The exact cause is unverified.

Safe operator checks (read-only):

```bash
docker compose -f compose.production.yaml config --services
docker compose -f compose.production.yaml ps -a
docker ps -a --filter name=owj-analytics --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'
docker inspect --format '{{.Name}} image={{.Config.Image}} status={{.State.Status}} exit={{.State.ExitCode}} error={{.State.Error}}' owj-analytics-api owj-analytics-crawler owj-analytics-scorer
docker compose -f compose.production.yaml config --images
```

If a named container does not exist, inspect the Compose project actually used rather than assuming a crash. Do not dump complete environment variables. Logs should be reviewed only through the repository’s redacted structured logger and a narrow time window.

## Tests added/changed and execution

Added database-plan, authorization, crawler-control auth, scoring cursor snapshot, empty-scoring, comparable-index performance, and indexed-versus-exhaustive correctness coverage. Updated existing API tests to send the required scoped credentials.

Focused run after implementation: 23 tests, 22 passed, 1 failed initially because an existing history-route test had not supplied newly required analyst authorization. That test was corrected. After the final empty-store and valuation tests were added, the full repository suite passed all 149 tests. The Vite production dashboard build also completed. The build retained a warning about chunks larger than 500 kB; no build failure occurred.

## Remaining architectural blockers

- Web-issued human identity/JWKS/introspection and permission claims are not approved.
- Dashboard browser session integration is absent.
- Local Mongo topology, credentials, database, backup, and disposable integration test environment are not provisioned.
- Full Listing collection memory mirror remains in API/crawler.
- Production three-container discrepancy is not runtime-verified.
- No save-to-Web, CRM task, event bus/outbox, or Chat integration exists.
- Production performance, index installation, resource limits, and health remain unverified until an approved deployment/measurement window.

