# Analytics Sprint 4 Query Optimization Report

**Date:** 2026-11-23  
**Status:** implemented and unit-tested; query plans tested with synthetic data and the explicitly approved restored Atlas test dataset. No shared/production migration was applied.

## Whole-collection consumer inventory

| Consumer | Previous dependency | Volume assumption | Sprint 4 treatment | Remaining limitation |
|---|---|---:|---|---|
| API startup / `LiveMarketEngine` | Full `Listing.find({}).lean()` copied into a `Map` | Unbounded | Recent-listing cache capped at 5,000, newest-first indexed query, LRU eviction | Live online analytics use a bounded recent working set when total exceeds 5,000 |
| Crawler startup / live analytics | Same full map | Unbounded | Cache capped at 10,000; new/changed listings refresh the LRU | Adaptive planning uses this bounded working set rather than a database aggregate |
| Lifecycle reconciliation | Iterated the in-memory map | Assumed complete map | Streams eligible areas from Mongo with a lean cursor and batch size 500 | It still examines every eligible listing in completed areas |
| Dashboard/data quality/location | Synchronous `getListings()` | Full collection | Operate on bounded cache and disclose `workingSet`, `analyzedListings`, total and scope | Several ratios describe the working set, not the full database; a later database aggregation can make them exact |
| Listing search/detail/valuation | Mongo query already available | Bounded page/detail | Preserved direct projections, deadlines and response caps | V1 deep offset remains |
| Buyer matching | Mongo hard filters plus in-process ranking | 500 default candidates | Preserved 500 cap/1,000 hard maximum, deterministic rank/explanations, query deadline and concurrency cap | Matches beyond the candidate cap are explicitly `truncated` |
| Scoring snapshot | Cursor to JSON, then whole pipeline arrays | Dataset-sized | Cursor behavior retained; measured separately | Training/scoring still materialize large documents in memory |

The JSON store remains fully in-memory because it is the compatibility/development store. MongoDB is authoritative in Mongo mode.

## Implemented query changes

- `MongoMarketStore.init()` now counts listings and hydrates only a process-specific recent cache. Defaults are 5,000 for API and 10,000 for crawler through `ANALYTICS_API_LISTING_CACHE_LIMIT` and `ANALYTICS_CRAWLER_LISTING_CACHE_LIMIT`.
- Cache insertions are bounded LRU updates. A cache miss on listing detail/update loads the authoritative Mongo record.
- Lifecycle reconciliation no longer depends on cache completeness; it streams projected lifecycle records from Mongo in batches of 500.
- Added declared indexes:
  - `listing_recent_cache_and_catalog`: `{ lastSeenAt: -1, token: 1 }`
  - `listing_lifecycle_recent_catalog`: `{ "lifecycle.status": 1, lastSeenAt: -1, token: 1 }`
- Dashboard and quality responses disclose whether calculations are complete or based on a bounded recent working set.
- No public listing field, currency (`TOMAN`), area unit (square metres), role boundary, valuation state, response cap, or V1 route was removed or renamed.

## Real Mongo execution plans

Environment: MongoDB 8.2.7, loopback-only disposable container, 14,000 generated public-property records, 65 declared indexes, no credentials, no external providers.

| Shape | Winning index | Keys examined | Docs examined | Returned | Server time |
|---|---|---:|---:|---:|---:|
| Newest listing page, limit 40 | `listing_recent_cache_and_catalog` | 40 | 40 | 40 | 0 ms warm run |
| Active/scoring-ready/category/neighborhood/price page | `buyer_match_location_recent` | 41 | 41 | 40 | 2 ms |
| Listing detail by token | `token_1` | 1 | 1 | 1 | 0 ms warm run |
| Lifecycle stream for two areas | `crawlPartition.area.id_1_subcategory_1_lastSeenAt_-1` | 2,801 | 2,800 | 2,800 | 13 ms |

The filtered query had six rejected candidate plans; the winner remained bounded to 41 keys/documents. Lifecycle work is intentionally proportional to the completed-area population and is cursor-streamed rather than retained in a full map.

## Restored local dataset confirmation

The same read-only shapes were tested against the dedicated local `owj_market_analytics` restore (14,664 listings; 235,061 documents across the database). No listing values were emitted.

| Shape | Winning index | Keys examined | Docs examined | Returned | Warm P95 (30 runs) |
|---|---|---:|---:|---:|---:|
| Newest listing page, limit 40 | `listing_recent_cache_and_catalog` | 40 | 0 | 40 | 0.981 ms |
| Representative active/scoring-ready/location/price page | `buyer_match_location_recent` | 40 | 40 | 40 | 1.203 ms |
| Listing detail by token | `token_1` | 1 | 0 | 1 | 1.179 ms |
| Lifecycle stream shape for one representative area | `crawlPartition.area.id_1_subcategory_1_lastSeenAt_-1` | 175 | 175 | 175 | 4.756 ms |

Fresh-process hydration fell from 4,124.14 ms / 575.67 MiB RSS for all 14,664 listings to 1,474.87 ms / 349.73 MiB RSS for the bounded 5,000 cache. Full methodology is in `ANALYTICS_LOCAL_DATA_IMPORT_REPORT.md`.

## Four integrated APIs

| Route | Bounds retained | Compatibility |
|---|---|---|
| `GET /internal/v1/listings` | 40 rows, first image, selected projection, 2 s default Mongo deadline, 1 MiB response | Existing offset/limit and response fields retained |
| `GET /internal/v1/listings/:token` | Token allowlist, direct projection, 2 s deadline, 1 MiB response | Unchanged public projection and 404 behavior |
| `POST /internal/v1/buyer-matches/search` | 64 KiB body, 30 default/50 maximum results, 500 configured candidates/1,000 hard maximum, four concurrent searches, 2 s query deadline | Existing deterministic scoring, reasons, cursor and privacy rejection retained |
| `GET /internal/v1/listings/:token/valuation` | Direct active-model/listing/score projections, 2 s deadline, 128 KiB response | Existing `missing-listing`, `no-active-model`, `insufficient-market-data`, `unavailable`, `stale`, and `available` behavior retained; no training on request |

Internal routes retain Web-service authentication. Browser sessions continue to use the existing browser routes and Web-backed identity adapter. No authentication protocol changed.

## Deep offset decision

V1 still accepts bounded offsets up to 1,000,000. Mongo `skip` cost grows with the offset. Sprint 4 did not silently change pagination because the Web fixture defines offset fields and listing sorts include several value types. A future additive cursor must bind the complete filter/sort fingerprint and use a stable `(sortValue, token)` seek; until that shared contract is approved, deep offset remains **deferred**.

## Database operation awaiting approval

Schema version `2026-11-23.1` was applied only to the explicitly approved dedicated local restore. Production/shared Mongo still has auto-indexing disabled. Applying it to `owj_analytics` in a shared or production deployment must wait for explicit target, backup, permissions, capacity and change-window approval. Do not run it against Web, Chat, or a restored production clone.

## Reproduction

```bash
docker run -d --rm --name owj-analytics-s4-mongo-1123 \
  --memory 1g --cpus 1.5 -p 127.0.0.1:27028:27017 \
  --tmpfs /data/db:rw,size=768m mongo:8.2.7 --bind_ip_all
npm run benchmark:sprint4 -- --apply --count=14000 --iterations=30
npm run benchmark:sprint4:cache -- --mode=legacy
npm run benchmark:sprint4:cache -- --mode=bounded
docker stop owj-analytics-s4-mongo-1123
```

The benchmark scripts refuse credentials, non-loopback hosts, and database names outside the dedicated synthetic target.

The separate restored-data benchmark is fixed to the credential-free dedicated local Analytics host/database and is read-only. It runs from an ephemeral process on the local Analytics Docker network; the repository is mounted read-only:

```bash
docker run --rm --network owj-market-analytics_default \
  -v "$PWD:/workspace:ro" -w /workspace \
  -e SPRINT4_RESTORED_MONGODB_URI=mongodb://mongodb:27017 \
  --entrypoint node owj-sprint4-synthetic-analytics:latest \
  --expose-gc scripts/benchmark-sprint4-restored.js --iterations=30 --cache-mode=both
```

