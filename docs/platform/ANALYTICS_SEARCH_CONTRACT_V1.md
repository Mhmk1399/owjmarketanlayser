# Analytics Search Contract V1

**Status (updated 2026-11-22):** authenticated adapters and machine-readable fixture implemented; real Web client remains blocked.
**Base path:** `/internal/v1`  
**Authentication:** server-to-server bearer credential from `ANALYTICS_WEB_SERVICE_TOKEN`. The browser must never receive this credential.

## Data boundary

Analytics accepts normalized property criteria only. Web keeps CRM ownership and must not send customer name, phone, email, Web session secrets, free-form CRM notes, or unnecessary case identifiers. Unknown buyer-match fields are removed by normalization; the published JSON schema is strict.

Responses contain public listing data, rounded coordinates, model metadata, data freshness, and experimental valuation indicators. Public `businessDisplayName` may be present. Private contact/authenticated Divar data is prohibited.

## A. Property search

`GET /internal/v1/listings`

Supported bounded query fields are defined normatively in `fixtures/analytics-v1/market-api.contract.json`: `offset`, `limit` (maximum 40), repeated `district`, `city`, `area`, `category`, `transactionType`, `advertiserType`, `q`, `readiness`, `status`, price/area/room/year ranges, amenities, freshness, coordinate bounds, score/risk/confidence filters, and allowlisted sorting. Mongo mode uses a selected public projection, a default 2-second query deadline, first-image-only list results, and a 1 MiB response cap.

Response:

```json
{
  "schemaVersion": "1.0.0",
  "generatedAt": "2026-11-20T00:00:00.000Z",
  "total": 0,
  "offset": 0,
  "limit": 40,
  "hasMore": false,
  "listings": []
}
```

The endpoint is a versioned authenticated adapter over the existing production search implementation; the existing `/listings` route is not renamed.

## B. Property details

`GET /internal/v1/listings/:token`

`token` must match `[A-Za-z0-9_-]+`. Mongo mode uses a direct bounded public projection rather than the full in-memory Listing map. Missing records return `404 listing-not-found`.

## C. Buyer matching

`POST /internal/v1/buyer-matches/search`

Request:

```json
{
  "requirement": {
    "transactionType": "buy",
    "propertyTypes": ["buy-residential-apartment"],
    "locations": ["ونک"],
    "maxPrice": 20000000000,
    "minArea": 80,
    "minRooms": 2,
    "requiredAmenities": ["parking"]
  },
  "page": { "limit": 30, "cursor": null }
}
```

The response includes the normalized requirement, total/evaluated/truncated counts, a bounded page of ranked matches, matching reasons/components, optional precomputed market score, and an opaque next cursor. Candidate count, query time, result limit, concurrent searches, request bytes, and response bytes are bounded. CRM identity/contact/message/note/session fields are rejected at any depth; other unknown fields are discarded.

## D. Existing valuation

`GET /internal/v1/listings/:token/valuation`

The endpoint reads an existing active score; it does not train a model in the request path. `valuationStatus` distinguishes `available`, `insufficient-market-data`, `no-active-model`, `missing-listing`, `stale`, and `unavailable`. Only `missing-listing` returns 404. Other not-ready states return 200 with null estimates, so no price is fabricated. Outside Mongo mode the route returns `503 mongodb-required`.

## Errors and compatibility

| Status | Meaning |
|---:|---|
| 400 | Invalid normalized criteria, cursor, token, or query value |
| 401 | Missing/incorrect Web service credential |
| 404 | Listing or valuation not found |
| 503 | Service auth missing, Mongo-required operation unavailable, or bounded search capacity busy |

No save-to-CRM endpoint exists in Analytics. Web saves listing tokens and CRM relations in Web-owned storage. Analytics must not write Web User, BuyerCase, CRM, or task collections.

