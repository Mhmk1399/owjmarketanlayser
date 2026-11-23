# Analytics Sprint 5 Aggregation Accuracy Report

**Date:** 2026-11-23  
**Status:** exact MongoDB-side metrics implemented and verified against deterministic fixtures and the read-only restored local dataset.

## What changed

`MongoMarketStore.marketMetrics()` now executes one full-listing `$facet` plus bounded companion queries for active-model score population and the preceding 24 hours of activity. It has:

- a 5-second default MongoDB deadline;
- `allowDiskUse` for bounded server-side spill behavior;
- a 30-second promise cache so concurrent dashboard/data-quality requests share work;
- no listing-document materialization in Node;
- a fallback to the prior bounded working-set calculation, with a warning, if the exact query times out or fails.

The aggregation calculates exact collection-wide inventory, lifecycle, freshness, field coverage, scoring eligibility/blockers, location-quality totals, classifications and price distribution. Neighborhood results are exact per returned neighborhood but capped at the top 200 and explicitly carry that limit.

## Endpoint scope matrix

| Endpoint/output | Scope after Sprint 5 |
|---|---|
| `/dashboard` overview and location quality | Full database when Mongo metrics succeed; explicit bounded fallback otherwise |
| `/dashboard` market distribution | Full database; neighborhoods are top 200 by count |
| `/dashboard` recommendations | Bounded recent in-process working set |
| `/data-quality-data` and JSON `/data-quality` inventory/freshness/coverage/classifications/blockers | Full database when Mongo metrics succeed |
| Data-quality example records | At most 20 per group from the bounded recent working set |
| `/locations/*`, `/areas*`, `/recommendations` | Existing bounded working-set behavior, now disclosed with additive `workingSet` and `metricsScope` |
| `/internal/v1/listings*`, valuation and buyer match | Unchanged authoritative Mongo queries; not served from the analytics cache |

Existing fields were preserved. New scope/completeness fields are additive; the frozen internal V1 Web contract did not change.

## Deterministic verification

The unit fixtures assert:

- a single deadline-compatible `$facet` with a top-200 neighborhood bound;
- full-database scope normalization and no listing token leakage;
- exact database totals replace bounded dashboard totals;
- recommendations and samples remain labeled as bounded;
- full-database data-quality inventory, score population and coverage replace working-set estimates.

The complete Analytics suite passed **167/167** after the final staging-failure test was added (see the handoff for the final rerun). Earlier full acceptance before that last test passed 166/166.

## Read-only restored-data result

Target: dedicated standalone `owj-market-mongodb` / `owj_market_analytics`; no credentials; no writes; no raw listing output.

| Measurement | Result |
|---|---:|
| Exact aggregation elapsed | 1,508.41 ms first run; 581.73 ms final warm revalidation |
| API deadline | 5,000 ms |
| Listings counted | 14,664 |
| Lifecycle active | 14,664 |
| Not observed in preceding 7 days | 14,664 |
| Missing property characteristics | 24 |
| Missing all pricing fields | 0 |
| Coordinates available | 14,587 / 99.5% |
| Nearby-place signals available | 5 |
| Insufficient comparable signals | 14,659 |
| Scoring eligible | 14,417 |
| Active-model scores | 6,009 / 41.0% of listings |
| Neighborhood groups returned | 156 of limit 200 |

Latest listing observation was 2026-11-15T08:38:35.197Z. The active batch model was generated 2026-11-04T23:08:31.180Z. These values show that the restored snapshot is stale for live-market claims and that valuation coverage is incomplete; the dashboard must not imply current or universal valuation reliability.

Database allocation at measurement time: 16 collections, 235,061 total objects, 437,204,214 data bytes, 119,312,384 storage bytes, 27,549,696 index bytes and 146,862,080 total allocated bytes. The listing collection had 16 indexes.

## Current query evidence

The 30-iteration bounded restored-data benchmark produced:

| Query | P50 | P95 | Plan evidence |
|---|---:|---:|---|
| Newest 40 | 1.453 ms | 1.905 ms | 40 keys, 0 documents; `listing_recent_cache_and_catalog` |
| Filtered 40 | 2.008 ms | 2.411 ms | 40 keys/documents; `buyer_match_location_recent` |
| Detail | 1.172 ms | 1.651 ms | one key, 0 documents; `token_1` |
| Lifecycle area stream | 6.020 ms | 6.798 ms | 175 keys/documents; area index |
| Buyer match, 175 evaluated | 118.202 ms | 324.725 ms | 30 returned, not truncated |

The exact dashboard facet is intentionally collection-wide and therefore not represented as an index-only query. Its measured 0.58–1.51-second runtime and 30-second cache prevent it from running on every request. Production-scale behavior remains unproven.

## Safe reproduction

```bash
docker run --rm --network owj-market-analytics_default \
  -v "$PWD:/app" -v /app/node_modules -w /app \
  owj-sprint4-synthetic-analytics:latest \
  node scripts/analyze-sprint5-restored.js

docker run --rm --network owj-market-analytics_default \
  -v "$PWD:/app" -v /app/node_modules -w /app \
  owj-sprint4-synthetic-analytics:latest \
  node --expose-gc scripts/benchmark-sprint4-restored.js \
  --iterations=30 --cache-mode=bounded
```

Both scripts reject remote hosts, credentials and any database other than `owj_market_analytics`.

