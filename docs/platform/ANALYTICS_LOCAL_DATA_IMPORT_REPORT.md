# Analytics Local Data Import Report

**Date:** 2026-11-23  
**Status:** completed and verified in the dedicated local Analytics MongoDB only.  
**Authorization:** the user explicitly approved copying the complete Atlas test dataset into the local Analytics database. No production, Web, Chat, or restored Web-clone database was targeted.

## Source, target, and isolation

| Item | Exact value |
|---|---|
| Source | Atlas logical database `owj_market_analytics` (MongoDB 8.0.39) |
| Target container | `owj-market-mongodb` |
| Target database | `owj_market_analytics` |
| Target MongoDB | 8.2.12, standalone |
| Persistent target volume | `owj-market-analytics_mongodb_data` mounted at `/data/db` |
| Docker network | `owj-market-analytics_default` |
| Compressed archive | `/tmp/owj-atlas-import-20261123/owj_market_analytics.archive.gz` |
| Archive size | 62 MiB |
| Archive SHA-256 | `ad692dc03148302d80299405add725d7d31084e907fca80477e66ddaa9e5742c` |

Credentials are intentionally omitted. The Web-owned `owj-sprint2-integration-mongo-1`, synthetic Sprint 4 container/database, production services, and public providers were not used.

## Exact operation log

1. Confirmed the dedicated target contained only `admin`, `config`, and `local`; there was no pre-existing Analytics database to overwrite.
2. Performed a read-only Atlas inventory and a sampled recursive field-name safety scan. No phone, mobile, email, cookie, password, CRM, session, or private-customer field was identified. `contactEndpointAttempts` was a numeric safety counter, not contact data.
3. Streamed all 14 Atlas collections with `mongodump --archive --gzip`. The dump completed without collection failures.
4. Restored the archive with `mongorestore --stopOnError --maintainInsertionOrder` into the dedicated local target. Result: **235,061 restored documents, 0 failures**.
5. Compared every source/target collection count and all 61 source indexes. Counts and source index inventory matched.
6. Ran full Mongo validation. All collections were valid; a second idle validation of the four initially active collections (`areacrawljobs`, `listings`, `listingscores`, `modelversions`) reported `valid: true`, zero errors, and zero warnings.
7. Validated all 14,664 restored listings against the current strict Mongoose `Listing` schema in 250-document cursor batches: **14,664 valid, 0 invalid**.
8. Applied schema plan `2026-11-23.1` only to this explicitly approved local target. This added the empty Analytics identity collections and missing declared indexes without changing restored document counts.
9. Verified the final schema: **16 collections, 235,061 documents, 81 actual indexes** (65 declared indexes plus 16 implicit `_id` indexes).
10. Ran only read-only Sprint 4 query/cache benchmarks. No crawler, scoring publication, training, migration, external provider, or production process was started.

The dump emitted a cross-version warning because the source was MongoDB 8.0.39 and the target is 8.2.12. Validation, strict listing-schema validation, counts, and index reconciliation all passed. Atlas denied the optional `dbHash` command to the supplied user, so a source/target hash comparison was unavailable; this is the only verification step not completed.

## Source and restored counts

| Collection | Documents |
|---|---:|
| `areacrawljobs` | 168 |
| `buyerrequirements` | 0 |
| `crawlcycles` | 1 |
| `crawlruns` | 41 |
| `driftmetrics` | 50 |
| `listingactivities` | 12 |
| `listingobservations` | 11 |
| `listingpropertylinks` | 0 |
| `listings` | 14,664 |
| `listingscores` | 220,006 |
| `modelversions` | 54 |
| `scoringscenarios` | 0 |
| `servicestates` | 1 |
| `trainingruns` | 53 |
| **Total** | **235,061** |

Schema initialization added empty `analyticsauthstates` and `analyticssessions` collections; therefore the final total remains 235,061.

## Read-only real-data verification

The guarded benchmark in `scripts/benchmark-sprint4-restored.js` is fixed to the dedicated local database, rejects credentials and non-local hosts, emits no listing values, and makes no external calls.

| Query shape | Winning index | Keys examined | Documents examined | Returned | Warm P95 |
|---|---|---:|---:|---:|---:|
| Newest, limit 40 | `listing_recent_cache_and_catalog` | 40 | 0 | 40 | 0.981 ms |
| Active/scoring-ready/location/price, limit 40 | `buyer_match_location_recent` | 40 | 40 | 40 | 1.203 ms |
| Detail by token | `token_1` | 1 | 0 | 1 | 1.179 ms |
| Lifecycle stream shape for one area | `crawlPartition.area.id_1_subcategory_1_lastSeenAt_-1` | 175 | 175 | 175 | 4.756 ms |

Buyer matching evaluated 175 bounded candidates and returned 30. Across the 30-iteration run it measured P50 106.55 ms and P95 509.029 ms; fresh five-iteration confirmation measured P50 104.354 ms and P95 117.285 ms. The wider 30-run tail should be retained for capacity planning.

Fresh-process cache comparison:

| Metric | Legacy 14,664 cache | Bounded 5,000 cache | Change |
|---|---:|---:|---:|
| Hydration | 4,124.14 ms | 1,474.87 ms | 64.2% lower |
| RSS after hydration | 575.67 MiB | 349.73 MiB | 225.94 MiB / 39.2% lower |
| Heap used after hydration | 326.41 MiB | 145.15 MiB | 181.26 MiB / 55.5% lower |

## Boundaries and next action

- The local target is standalone, so it does not prove replica-set transaction behavior.
- Imported active model and score documents were read only. No training, promotion, rollback, or score publication ran.
- Existing crawl state was not resumed; auto-crawl remained off and no Analytics API/crawler/scorer service was started.
- The archive remains in `/tmp` as a verification artifact and is not a durable backup. Rotate/delete the temporary Atlas credential after testing.
- Production/shared schema initialization, deployment, commit, push, and later sprint work remain unapproved.

