# OWJ Analytics Sprint 5 Closure

**Closed:** 2026-11-23 (Asia/Tehran)  
**Repository:** `owj-market-analytics`  
**Status:** Analytics Sprint 5 closed for its approved scope. No production-readiness claim is made for the unified platform.

## Exact source and image

- Analytics Git base: `3cc2e7f9606069e1cc81959b67d73f12a287d54a` (`starting sprint 5`).
- Sprint 5 changes remain uncommitted in the Analytics working tree, as required.
- Docker build-input fingerprint: `fb886b030ab764dbdd607c9011690752d11a0704f5171944456665ebd3f9a736`.
- Fingerprint input: `Dockerfile`, package manifests, dashboard, Sahel font, public build, schemas, scripts and `src`, with each file SHA-256 hashed in sorted path order and the manifest hashed again.
- Final unified-build Analytics image: `sha256:cb184c64d5b6f9bd7fe21ba91699c0ee692be19f09955a33da2b27b1948dc907`.
- Running service after the final restart: healthy and using that exact digest.
- Web base: `825deb1dec989e390ac8048310db790c5f111e8f`, with its uncommitted Sprint 5 working tree.
- Chat base: `0397bd32da4d653bc237d47f33f3223e393683f4`, with its uncommitted Sprint 5 working tree.

The Web-owned harness printed the Analytics dirty-tree inventory before building, used `OWJ_ANALYTICS_CONTEXT=/home/mhmk/Documents/git/owj-market-analytics`, rebuilt Analytics from that tree, and reported the image digest above. This is the coordination evidence that the final unified build included the latest Analytics source; no Web or Chat file was changed by this closure work.

## Exact-image regression result

The complete Analytics regression suite was run inside the final unified image with the test directory mounted read-only and Docker networking disabled:

```bash
docker run --rm --network none \
  -v /home/mhmk/Documents/git/owj-market-analytics/test:/app/test:ro \
  sha256:cb184c64d5b6f9bd7fe21ba91699c0ee692be19f09955a33da2b27b1948dc907 \
  sh -lc 'node --test test/*.test.js'
```

Result: **167/167 passed**, 0 failed, 0 cancelled, 0 skipped, in 5.161 seconds. The known Mongoose 10 deprecation warning for `validateSync()` remains non-fatal. This preserves the current V1 service-auth, authorization, search/detail, valuation-not-ready, buyer-match privacy and response-contract tests.

## Unified integration result

Command:

```bash
cd /home/mhmk/Documents/git/owjamlak
./integration/scripts/verify-platform-local.sh
```

Protected target:

- Compose project `owj-sprint4-synthetic`;
- loopback proxy `127.0.0.1:28088`;
- marker `owj-sprint4-synthetic-only-v1`;
- databases `owj_web_e2e`, `owj_chat_e2e`, and `owj_analytics_e2e`;
- authenticated MongoDB replica set `rs0`.

Analytics compatibility evidence:

| Check | Result |
|---|---|
| API readiness | PASS; Mongo, Web, Chat, Analytics and proxy healthy |
| Internal service authorization | PASS; routes hidden at proxy and missing bearer rejected |
| Web-backed SSO | PASS |
| Wrong PKCE / expired code / replay | PASS |
| Disabled user / demotion / logout | PASS |
| Analytics session cookie scope | PASS |
| Listing search and empty result | PASS |
| Listing detail | PASS |
| Available valuation | PASS |
| Valuation-not-ready | PASS without fabricated valuation |
| Buyer matching | PASS |
| CRM privacy boundary | PASS |
| Analytics match-to-CRM follow-up | PASS |
| Follow-up idempotency | PASS |
| Saved-listing idempotency/isolation | PASS |
| Analytics-only restart | PASS; Web and Chat remained available |

The Web-owned script exited 1 only at its declared unified Chat closure gate: current Chat still sends CRM task type `follow_up` instead of frozen Web type `call`, does not reliably clear `owj_chat_auth_tx`, and has not completed the versioned guest-link transfer extension. These are not Analytics failures and Analytics did not weaken its contract to bypass them.

## Schema, database isolation and persistence

- Applied synthetic schema plan: `2026-11-23.1`.
- Final synthetic database: 16 collections, 81 indexes and three approved listings.
- Analytics application role: `readWrite` on `owj_analytics_e2e` only.
- Attempted access to `owj_web_e2e` was denied with MongoDB authorization code 13.
- Snapshot transaction read succeeded and the transaction was explicitly aborted.
- The harness passed separate database-credential scoping and Analytics-only restart persistence checks.
- Initializer and fixture operations were idempotent and restricted to the marked `*_e2e` databases.

No new schema version or production migration is required by Analytics Sprint 5.

## Full-database metrics and bounded fallback

Exact metrics remain implemented as a MongoDB-side full-listing `$facet`, with a 5-second query deadline, `allowDiskUse`, and a 30-second promise cache. The dashboard and data-quality endpoints use the exact result when available.

Coverage labeling is fail-safe:

- exact dashboard/data-quality outputs identify full-database scope;
- neighborhood output discloses its top-200 limit;
- recommendations and samples remain labeled as bounded recent working-set results;
- location, area and recommendation routes include `workingSet` and `metricsScope`;
- an aggregation timeout/error logs a warning, supplies no database-metrics object, and selects the bounded-working-set labels rather than claiming complete coverage.

The exact-image suite passed the assertions `dashboard replaces bounded totals with exact database metrics and labels mixed scope` and `data quality uses exact database aggregates while keeping samples explicitly bounded`. V1 internal listing/detail/valuation/buyer-match payloads remain unchanged.

## Default worker/provider state

The final integration service list contained MongoDB, Web, Chat, Chat UI, Analytics, the one-shot initializers and proxy. It contained no `analytics-crawler` or `analytics-scorer` container.

- `ANALYTICS_AUTO_CRAWL=false`;
- OpenAI credential configured: false;
- Neshan credential configured: false;
- no real Divar, Atlas, production service, geocoder or paid provider was contacted.

## Final-run resource snapshot

No new scoring, crawler or sustained-load benchmark was started. The unified verifier's normal one-shot snapshot after restart reported:

| Container | CPU snapshot | Memory / limit |
|---|---:|---:|
| Analytics | 0.32% | 83.02 MiB / 1.074 GiB |
| Web | 19.34% | 256.9 MiB / 1.562 GiB |
| Chat | 0.23% | 135.4 MiB / 768 MiB |
| MongoDB | 34.86% | 135.2 MiB / 1.367 GiB |
| Proxy | 0.00% | 5.309 MiB / 128 MiB |

These are instantaneous local synthetic observations, not sustained CPU measurements or production capacity evidence.

## Restored-market-data warning

The dedicated standalone database `owj-market-mongodb` / `owj_market_analytics` was not accessed, copied, migrated, modified or deleted during closure.

Previously approved read-only Sprint 5 measurements remain the evidence:

- 14,664 listings;
- latest listing observation `2026-11-15T08:38:35.197Z`;
- all 14,664 listings were already outside the seven-day freshness window at measurement time;
- 6,009 active-model scores, or approximately **41.0%** population coverage;
- 14,417 scoring-eligible listings;
- active model generated `2026-11-04T23:08:31.180Z`;
- only 5 listings had nearby-place signals.

The restored snapshot is stale and valuation coverage is incomplete. It must not be presented as a current, comprehensive market valuation dataset.

## Explicitly deferred work

### Cursor pagination

The signed, filter/sort-bound cursor utility and independent tests are a proposal only. It is not wired into `/internal/v1/listings`; V1 offset pagination remains the only supported Web contract. Production work still requires Web approval, seek-query implementation, compound-index review, mutation/page-boundary tests and integrated E2E.

### Compatibility-file generation atomicity

The scorer writes large arrays in bounded batches and stages all compatibility files before promotion. A staging/serialization failure preserves the previous files. Promotion still performs individual atomic renames, not one cross-file transaction; a crash between renames can expose a mixed compatibility generation. Mongo active-model state remains authoritative, but a manifest/pointer generation protocol is deferred.

## Remaining production risks

- Unified platform closure remains blocked by the three Chat-owned consumer/session/guest-transfer items above.
- Full-database aggregation was measured at 14,664 listings, not future production scale; bounded fallback can activate at the 5-second deadline.
- Restored market evidence is stale, nearby-place coverage is effectively absent, and active valuation coverage is about 41%.
- Scoring still materializes core arrays; 10,000 is the maximum safely tested generation.
- Compatibility JSON files lack cross-file transactional publication.
- Deep offset pagination remains inefficient until the cursor proposal is approved and integrated.
- The Neshan SDK remains a lazy 1.638 MB chunk.
- Crawler and scorer must remain optional and must not be co-scheduled on the intended 8 GB host without new approved resource evidence.
- Production deployment, Atlas behavior and production-scale co-location remain unverified.

## Closure safety record

- No restored standalone database access or mutation.
- No Atlas, production VPS, real Divar or paid-provider access.
- No commit, push or deployment.
- No production Compose/resource modification.
- No unrelated feature work.

Stop at Sprint 5 closure and wait for the shared platform owners to resolve the remaining unified integration gate.
