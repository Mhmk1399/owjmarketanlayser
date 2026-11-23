# Analytics Sprint 4 Handoff and Exact Work Log

**Date:** 2026-11-23  
**Repository:** `owj-market-analytics` only  
**Base:** `9a283ac076cd`  
**Result:** Sprint 4 implementation complete for bounded Mongo cache, streamed lifecycle reconciliation, query indexes, scoring publication recovery, freshness reporting, safe frontend code splitting, synthetic and restored-local benchmark tooling, and documentation. The complete Atlas test dataset was restored only after explicit user approval into the dedicated local Analytics MongoDB. No commit, push or deployment was performed.

## Implemented

- Replaced unbounded Mongo API/crawler startup hydration with explicit API 5,000 and crawler 10,000 recent-listing caches plus LRU eviction.
- Kept Mongo authoritative for search/detail/valuation; cache misses load by token.
- Streamed lifecycle reconciliation with a projected 500-record cursor so cache truncation cannot hide completed-area lifecycle candidates.
- Added two recent-listing indexes and advanced the database plan to `2026-11-23.1` / 65 indexes.
- Preserved all four `/internal/v1` routes, authorization, projections, units, deadlines, response limits and valuation-not-ready states.
- Kept buyer matching semantics and privacy rules; real-container fixture returned 30 deterministic matches from a bounded 500 of 1,003 candidates and disclosed truncation.
- Added scoring publication compensation for failed candidates/partial scores while retaining the previous active model.
- Added freshness/data-quality reporting for stale observations, possibly removed/removed records, missing characteristics/pricing, insufficient comparable signals and model age. Working-set scope is explicit.
- Route-lazy loaded all dashboard pages behind the existing eager `AuthGate`; Persian RTL and route behavior remain unchanged.
- Added hard-guarded local benchmark scripts for Mongo/cache/scoring. They reject remote hosts and credentials.

## Exact created files

- `scripts/benchmark-sprint4.js`
- `scripts/benchmark-sprint4-cache.js`
- `scripts/benchmark-sprint4-scoring.js`
- `scripts/benchmark-sprint4-restored.js`
- `docs/platform/ANALYTICS_SPRINT_4_HANDOFF.md`
- `docs/platform/ANALYTICS_QUERY_OPTIMIZATION_REPORT.md`
- `docs/platform/ANALYTICS_SYNTHETIC_PERFORMANCE_REPORT.md`
- `docs/platform/ANALYTICS_CRAWLER_RECOVERY_REPORT.md`
- `docs/platform/ANALYTICS_SCORING_VALIDATION_REPORT.md`
- `docs/platform/ANALYTICS_LOCAL_DATA_IMPORT_REPORT.md`
- `public/assets/AnalyticsDashboard-DSOjAii6.js`
- `public/assets/BuyerMatchingPage-BbgPOBGE.js`
- `public/assets/DataQualityPage-df4Cv6HJ.js`
- `public/assets/ListingsPage-DdNLFItj.js`
- `public/assets/LocationExplorer-D-tWkCp8.js`
- `public/assets/SavedListingDetailPage-BNq5ME2K.js`
- `public/assets/SavedListingDetailPage-DVjK9wHZ.css`
- `public/assets/ScoringAnalyticsPage-C2Ax1KZd.js`
- `public/assets/ScoringWorkshopPage-CJjjaM8h.js`
- `public/assets/index-CWwU0uhc.js`
- `public/assets/index-DFLpbPmE.css`
- `public/assets/shared-fIOWw8eQ.js`
- `public/assets/tableTools-DLfOmmgB.js`

## Exact modified areas

- `src/storage/mongoMarketStore.js`, `src/runtime/createStore.js`, `src/config.js`, `src/apiProcess.js`, `src/crawlerProcess.js`: bounded process caches, cache metadata, authoritative misses, lifecycle cursor.
- `src/models/listing.js`, `src/storage/analyticsDatabasePlan.js`, `docs/platform/ANALYTICS_LOCAL_MONGO_PLAN.md`: two indexes and schema-plan reconciliation.
- `src/scoring/modelRegistry.js`: failed-publication compensation and promotion conflict guard.
- `src/api/dataQuality.js`, `src/api/server.js`, `src/analytics/marketEngine.js`: freshness and bounded-working-set disclosure.
- `dashboard/src/main.jsx`, `public/index.html`, `public/assets/*`: route-level lazy loading/build output.
- `package.json`: repeatable benchmark commands.
- `.env.example`, `deploy/env.analytics.local.example`: documented cache ceilings.
- `test/mongoMarketStore.test.js`, `test/dataQuality.test.js`, `test/scoringState.test.js`: cache/freshness/publication recovery coverage.

The previous eager build artifacts `public/assets/index-DoOl_APp.js` and `public/assets/index-BlBgaRGI.css` were replaced by the exact generated files above.

## Verification summary

- Node suite: **159/159 passed**, 0 failed/skipped, 4.22 s with loopback listener permission after the restore/documentation work.
- Initial sandbox-only full run: 34 files passed and six listener files could not bind; those six then passed 17/17 outside the network-restricted sandbox. This was an environment restriction, not a code regression.
- Dashboard build: PASS. Eager JS 559.82 → 198.92 kB; map vendor chunk remains 1,638.24 kB.
- Mongo 8.2.7 synthetic container: PASS at 14,000 listings; newest/detail/filtered queries used intended indexes.
- Cache cold-process comparison: RSS 429.36 → 240.95 MiB; hydration 2.57 → 0.97 s.
- Buyer match: P50 107.669 ms, P95 147.568 ms, 500 candidates evaluated, 30 returned.
- Scoring: 1,000 and 10,000 completed; 50,000/100,000 intentionally not run due measured growth and local memory/swap/disk state.
- Crawler recovery: mock-only PASS; no public provider traffic.
- Approved local restore: 14 collections / 235,061 documents restored with 0 failures; all counts and 61 source indexes matched; all collections valid; 14,664/14,664 listings passed strict schema validation.
- Local schema apply: 16 collections / 235,061 documents / 81 actual indexes; identity collections empty; required listing indexes present.
- Restored-data query plans: newest/detail/filtered/lifecycle shapes used intended indexes and examined 40/1/40/175 keys respectively.
- Restored-data cold cache: 14,664 full hydration 4.12 s / 575.67 MiB RSS versus bounded 5,000 hydration 1.47 s / 349.73 MiB RSS.

## Compatibility and regressions

No test or fixture regression was found. Internal V1 response fields remain compatible. Dashboard/data-quality responses gain additive `workingSet`, `analyzedListings`, `metricsScope` and freshness fields. When a collection exceeds the cache, analytical ratios are explicitly scoped to a bounded recent set; listing search/detail/valuation remain authoritative Mongo reads.

V1 deep offset pagination remains compatible and inefficient at extreme offsets. Cursor listing pagination is deferred until the shared Web contract approves an additive filter/sort-bound cursor.

## Local database operation completed by explicit approval

- Source: Atlas test database `owj_market_analytics`; target: dedicated standalone `owj-market-mongodb` / `owj_market_analytics` only.
- Archive: `/tmp/owj-atlas-import-20261123/owj_market_analytics.archive.gz`, 62 MiB, SHA-256 `ad692dc03148302d80299405add725d7d31084e907fca80477e66ddaa9e5742c`.
- Restore: 235,061 documents, 0 failures. Schema plan `2026-11-23.1` was then applied to this local target only.
- Validation and real-data read-only benchmark results are recorded in `ANALYTICS_LOCAL_DATA_IMPORT_REPORT.md`.

## Database operations still waiting for approval

- Do not apply schema/index version `2026-11-23.1` to any shared/production database.
- Do not run migrations, seeds, score publication, or crawler initialization against Web's restored clone, Atlas, the VPS, Web, or Chat.
- A later approved change must verify target name, least-privilege user, replica-set transactions, backup/restore, disk headroom and index build impact.

The database mutations were limited to the disposable synthetic database and the later explicitly approved dedicated local Analytics restore. Imported model/score/crawl records were not modified by training, publication, migration, or crawler execution. The temporary Atlas credential should be rotated/deleted after testing.

After measurements, the benchmark-owned `/tmp/owj-s4-scoring-1000-Qwoe2m` and `/tmp/owj-s4-scoring-10000-B4ZYxF` directories (about 184 MB combined) were removed, and the `--rm` tmpfs container `owj-analytics-s4-mongo-1123` was stopped. No Docker volume, shared database, repository file, or user data was deleted by that cleanup.

The restored database remains on `owj-market-analytics_mongodb_data`. The 62 MiB archive remains under `/tmp/owj-atlas-import-20261123`; `/tmp` is not a durable backup location.

## Remaining bottlenecks / deferred

- Dashboard/location/online analytics still compute over a bounded recent cache rather than database-side exact aggregates.
- Crawler adaptive planning uses the bounded crawler cache; lifecycle correctness no longer does.
- Scoring still materializes large arrays/documents and writes very large compatibility JSON.
- Neshan map SDK remains a 1.638 MB lazy vendor chunk.
- Shared replica-set auth/transaction/restart, browser SSO E2E, Web fixture coordination, persistent process restart and real co-location capacity remain blocked by the absence of an approved replica-set integration environment. The approved restored target is standalone.
- No production Compose/resource limit was changed.

## Exact reproduction

```bash
node --test test/*.test.js
npm run dashboard:build
npm run benchmark:sprint4 -- --apply --count=14000 --iterations=30
npm run benchmark:sprint4:cache -- --mode=legacy
npm run benchmark:sprint4:cache -- --mode=bounded
npm run benchmark:sprint4:scoring -- --count=1000
npm run benchmark:sprint4:scoring -- --count=10000
docker run --rm --network owj-market-analytics_default \
  -v "$PWD:/workspace:ro" -w /workspace \
  -e SPRINT4_RESTORED_MONGODB_URI=mongodb://mongodb:27017 \
  --entrypoint node owj-sprint4-synthetic-analytics:latest \
  --expose-gc scripts/benchmark-sprint4-restored.js --iterations=30 --cache-mode=both
```

Stop here. Do not deploy, commit, push, start real crawling, initialize another shared/production database, or begin another sprint without explicit approval.
