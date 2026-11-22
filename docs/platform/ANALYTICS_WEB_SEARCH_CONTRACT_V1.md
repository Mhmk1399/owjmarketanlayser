# Web ↔ Analytics Market API Contract V1

**Status:** implemented and locally tested against mocked stores; real Web client test BLOCKED.

The normative machine-readable fixture is `fixtures/analytics-v1/market-api.contract.json`. Web must implement against that fixture rather than examples in prose.

## Stable endpoints

- `GET /internal/v1/listings`
- `GET /internal/v1/listings/:token`
- `POST /internal/v1/buyer-matches/search`
- `GET /internal/v1/listings/:token/valuation`

All require the independent Web → Analytics bearer token. Browser sessions are never valid for `/internal/v1/*` and the service token must never reach the dashboard bundle.

Search supports bounded offset/limit, city, district/neighborhood, ingestion area/category, buy/rent representation, advertiser type, public text, lifecycle/readiness, price/area/room/year ranges, amenities, freshness, geographic bounds, score filters, and four allowlisted sort orders. Mongo projections omit `_id`, internal extraction/checkpoint state, and unbounded image arrays; coordinates are rounded externally. Default query maximum is 2 seconds, listing pages are at most 40, and internal responses are capped at 1 MiB.

Buyer matching accepts normalized public-market criteria only. Explicit CRM identity/contact/note/session keys are rejected at any depth with `buyer-identity-fields-forbidden`; other unknown keys are discarded by normalization. Pages are at most 50 and the default candidate cap is 500.

Valuation never trains in the request. Its status is one of `available`, `insufficient-market-data`, `no-active-model`, `missing-listing`, `stale`, or `unavailable`. A missing listing is 404; other not-ready states are 200 with null estimates. Numeric estimates are never invented.

## Verification status

- **Implemented:** all four routes, authentication, filters, projections, bounds, privacy rejection, explicit valuation states.
- **Mock-tested:** empty search, service authentication, existing valuation, query construction, buyer ranking/privacy.
- **Real locally tested:** none with Web/Mongo.
- **Blocked:** Web client and shared synthetic Mongo harness.
- **Deferred:** cursor pagination for listing search (bounded offset remains V1), capacity testing.

