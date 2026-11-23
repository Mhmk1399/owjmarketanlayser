# Analytics Sprint 5 Handoff and Exact Work Log

**Date:** 2026-11-23  
**Repository:** `/home/mhmk/Documents/git/owj-market-analytics`  
**Base revision:** `3cc2e7f9606069e1cc81959b67d73f12a287d54a` (`starting sprint 5`)  
**Result:** Analytics implementation and Analytics-owned acceptance complete; shared platform remains blocked by three declared Chat consumer items. No commit, push, deployment, production infrastructure change, real crawl, paid-provider call or restored-database mutation occurred.

## Exact implementation log

1. Tested the Web-owned synthetic platform first. The first latest-source run passed all Analytics checks but failed in a concurrently added Chat browser cookie assertion. Web then revised that gate to record the known blocker and continue.
2. Added exact MongoDB-side market metrics in `src/storage/marketMetrics.js` and a 30-second cached, 5-second-deadline store method in `src/storage/mongoMarketStore.js`.
3. Replaced bounded dashboard/data-quality totals with exact database values where available. Added explicit scope metadata and retained safe bounded fallback behavior.
4. Labeled location, area and recommendation routes as bounded when the process cache is incomplete. Search/detail/valuation remained authoritative Mongo reads.
5. Replaced giant compatibility-output serialization with a 100-record batched writer that stages the entire file set before target replacement.
6. Added an induced serialization-failure test proving an existing snapshot is preserved when a later file cannot be staged.
7. Added the independent signed listing cursor proposal and tests. It is intentionally not wired to the Web-facing V1 route.
8. Added guarded restored-data analysis and co-location benchmark scripts plus package commands.
9. Ran exact restored-data aggregation and current query benchmarks read-only.
10. Validated the shared replica-set application role, cross-database denial, transaction read/abort, schema/index count and restart persistence.
11. Rebuilt only the synthetic Analytics image from the current working tree, ran controlled load, then reran the full shared verifier.
12. Removed four benchmark-owned temporary directories totaling about 331 MiB. No user/repository/database/volume data was deleted.

## Files created

- `src/storage/marketMetrics.js`
- `src/storage/listingCursor.js`
- `scripts/analyze-sprint5-restored.js`
- `scripts/benchmark-sprint5-colocation.js`
- `test/marketMetrics.test.js`
- `test/listingCursor.test.js`
- `docs/platform/ANALYTICS_SPRINT_5_HANDOFF.md`
- `docs/platform/ANALYTICS_SHARED_PLATFORM_ACCEPTANCE.md`
- `docs/platform/ANALYTICS_AGGREGATION_ACCURACY_REPORT.md`
- `docs/platform/ANALYTICS_SCORING_MEMORY_REPORT.md`
- `docs/platform/ANALYTICS_CURSOR_CONTRACT_PROPOSAL.md`
- `docs/platform/ANALYTICS_COLOCATION_BENCHMARK.md`

## Files modified

- `src/storage/mongoMarketStore.js`: exact metrics, cache/deadline, bounded distinct activity aggregation.
- `src/api/dashboard.js`, `src/api/dataQuality.js`, `src/api/locationViews.js`, `src/api/server.js`: exact totals and explicit scope/fallback metadata.
- `src/scoring/pipeline.js`: batched staged compatibility output.
- `test/dashboard.test.js`, `test/dataQuality.test.js`, `test/scoringPipeline.test.js`: exact-scope and failure-preservation tests.
- `package.json`: two Sprint 5 measurement commands.

No dashboard source or generated asset changed; the production build reproduced the existing hashes.

## Test and measurement log

| Command/check | Result |
|---|---|
| Focused aggregation/dashboard/data-quality/location/store/scoring/cursor tests | PASS |
| `npm test` before final staging test | 166/166 PASS, 0 fail/skip |
| Final `npm test` | 167/167 PASS, 0 fail/skip |
| `npm run dashboard:build` | PASS in 1.52 s; entry 198.92 kB, map SDK 1,638.24 kB warning remains |
| Restored exact aggregation | PASS; 14,664 listings in 581.73 ms final warm run / 1,508.41 ms first run, no writes |
| Restored 30-iteration query benchmark | PASS; intended indexes used; P95 1.905–6.798 ms for listing/lifecycle shapes |
| Shared Mongo auth/transaction check | PASS; `rs0`, 16 collections, 81 indexes, cross-DB denied |
| Controlled co-location load | PASS; 200/200, 54.2 req/s, P95 145.33 ms |
| Synthetic scoring 1,000 | PASS; 777.60 ms, 115.96 MiB peak |
| Synthetic scoring 10,000 | PASS; 17.66 s final, 375.34 MiB peak, 95.65 MB scored file |
| Current-source Analytics Docker build | PASS; production-only prune reported 0 vulnerabilities |
| Full shared verifier | Analytics PASS; overall exit 1 only for declared Chat blockers |
| `git diff --check` | PASS |

During image construction the temporary full dependency install reported two high-severity development-tree findings; after `npm prune --omit=dev`, the final production dependency audit reported zero vulnerabilities. No automatic audit fix or dependency upgrade was performed.

## Contract compatibility

- All four `/internal/v1` routes and their static Web service bearer authentication are unchanged.
- Web-issued human identity remains limited to browser/dashboard routes; no new authentication protocol was implemented.
- Search/detail/valuation/buyer-match request and response schemas remain frozen V1.
- Dashboard/data-quality/location additions are additive scope metadata.
- Cursor pagination is a proposal only. Offset behavior remains unchanged pending explicit Web approval.
- Schema/index plan remains `2026-11-23.1`; no new migration is required for this Sprint 5 implementation.

## Crawler/scorer recovery

The full unit suite passed mock scheduling, leasing/fencing, checkpoint recovery, interruption, retries, duplicate suppression, lifecycle reconciliation outside the cache, scoring snapshot streaming and failed Mongo publication rollback. No real Divar request, browser crawl, geocoding, Neshan/OpenAI call, crawler process E2E or simultaneous crawler/scorer run occurred.

The new bounded API cache does not affect lifecycle correctness: Mongo lifecycle reconciliation continues to stream authoritative records independently of the cache. Planning/recommendation views that still use the cache are now explicitly labeled.

## Database operations

Synthetic mutations performed by the Web-owned harness were restricted to `owj_analytics_e2e` and its sibling `*_e2e` databases under marker `owj-sprint4-synthetic-only-v1`. The harness idempotently applied schema plan `2026-11-23.1` and seeded its three approved listings.

The standalone restored database `owj-market-mongodb` / `owj_market_analytics` was read only. No restore, index apply, migration, seed, scoring publication or crawler initialization was run against it.

Still requires explicit approval:

- any new restore or data copy;
- any schema/index apply outside the protected synthetic database;
- any production/Atlas/shared non-synthetic migration;
- any scoring publication or crawler initialization against restored data;
- any sanitized representative-data transfer into the shared platform.

## Remaining blockers and risks

- Shared completion is blocked by Chat CRM task-type compatibility, Chat auth-transaction cookie cleanup and the guest-link transfer extension.
- Full-database aggregation is measured at 14,664 listings, not production scale; the 5-second deadline can trigger the labeled bounded fallback.
- Exact neighborhood output is top 200, and recommendations/location analytics remain bounded working-set views.
- Restored data is stale, active-model coverage is 41%, and nearby-place evidence exists for only 5/14,664 listings.
- Compatibility files still lack a cross-file transactional manifest.
- Scoring still materializes core arrays; maximum tested size is 10,000.
- The Neshan SDK remains a lazy 1.638 MB chunk.
- Cursor pagination needs Web contract approval, route integration, indexes and E2E.
- Production readiness and 8 GB host capacity are not established by short synthetic tests.

## Safe reproduction

```bash
npm test
npm run dashboard:build
npm run analyze:sprint5:restored
npm run benchmark:sprint4:restored -- --iterations=30 --cache-mode=bounded
npm run benchmark:sprint4:scoring -- --count=1000
npm run benchmark:sprint4:scoring -- --count=10000

cd /home/mhmk/Documents/git/owjamlak
OWJ_VERIFY_SKIP_BUILD=1 ./integration/scripts/verify-platform-local.sh
```

The restored commands must run inside the guarded local Docker/network setup described in the aggregation report. Stop here: do not commit, push, deploy, modify production Compose, start Sprint 6, or apply any database operation without explicit approval.
