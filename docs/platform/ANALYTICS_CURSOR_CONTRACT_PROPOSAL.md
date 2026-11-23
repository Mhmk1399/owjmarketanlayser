# Analytics Listing Search Cursor Contract Proposal

**Version:** proposal 1  
**Status:** independently implemented/tested; not connected to `/internal/v1/listings`; Web approval required.

## Compatibility decision

The frozen V1 offset contract remains unchanged. No response field, request parameter or Web consumer was silently changed. `src/storage/listingCursor.js` is an independent proposal utility only.

## Proposed additive request/response

Web could later opt into cursor mode with `pageSize` (1–40) and `cursor`. Offset and cursor parameters must be mutually exclusive. The response would preserve existing `listings` and `total`, then add:

```json
{
  "pagination": {
    "mode": "cursor",
    "pageSize": 40,
    "nextCursor": "opaque-or-null",
    "hasMore": true
  }
}
```

`total` may remain an exact count for V1 compatibility, but consumers should not require it for every cursor page if later performance evidence supports an additive `totalMode` contract.

## Cursor contents and integrity

The opaque cursor carries:

- `version: 1`;
- allowlisted sort name;
- last sort value;
- last listing token as stable tie-breaker;
- SHA-256 fingerprint of canonical filters plus sort;
- issuance and expiration timestamps.

It is signed with HMAC-SHA-256 using a dedicated server-side secret of at least 32 bytes. The secret and database credentials never appear in the cursor. Verification uses constant-time comparison over canonical base64url signature text. Maximum encoded cursor length is 2,048 characters.

Default TTL is 15 minutes; maximum TTL is 24 hours. Errors use `invalid-search-cursor` (HTTP 400) or `search-cursor-expired` (HTTP 400).

## Stable ordering proposal

| Sort | Ordered key | Seek predicate after `(value, token)` |
|---|---|---|
| `newest` | `lastSeenAt DESC, token ASC` | older date, or same date and greater token |
| `price-asc` | `pricing.price ASC, token ASC` | greater price, or same price and greater token |
| `price-desc` | `pricing.price DESC, token ASC` | lower price, or same price and greater token |
| `area-desc` | `property.area DESC, token ASC` | lower area, or same area and greater token |

Removed-listing behavior must be part of the signed filter set. If the route defaults to excluding removed records, that normalized default must be fingerprinted exactly like an explicit exclusion so a cursor cannot cross lifecycle scopes.

## Validation and tests

Independent tests pass for:

- stable value plus token tie-breaker;
- filter binding;
- sort binding and sort allowlist;
- canonical object-key ordering while preserving array order;
- signature tampering;
- expiry/version/time validation;
- 32-byte secret and 2,048-character cursor limits.

## Work remaining after Web approval

1. Freeze names, error envelope and total-count behavior with Web.
2. Add required compound indexes based on accepted sort/filter combinations.
3. Implement Mongo seek predicates and request mutual exclusion.
4. Add Web consumer fixtures, page-boundary mutation tests and browser E2E.
5. Benchmark deep pages against the restored read-only dataset.
6. Advance the schema plan only if new indexes are approved.

Until those steps complete, V1 offset pagination is the only supported integration contract.

