# Analytics ↔ Web Identity Contract V1

**Date:** 2026-11-22  
**Status:** Analytics side implemented and mock-tested; identical Web implementation/fixtures BLOCKED because the sibling Web repository has no Analytics identity endpoints yet.

## Authority and boundary

Owj Web is the only canonical human identity authority. Analytics stores no human password, role directory, Web JWT, phone, email, agency record, or CRM record. It stores a short-lived local session containing only the canonical Web `User._id`, current Analytics scopes, authorization-check time, expiration, and revocation time.

The proposed exact exchange and status payloads are machine-readable in:

- `fixtures/analytics-v1/identity-exchange.contract.json`
- `fixtures/analytics-v1/identity-status.contract.json`

They must be copied byte-for-byte or reconciled with equivalent Web-owned fixtures before enabling real integration. Analytics does not accept Web's existing browser JWT.

## Directional authentication

- Analytics → Web exchange/status: `ANALYTICS_TO_WEB_SERVICE_TOKEN` and `X-Owj-Service: owj-analytics`.
- Web → Analytics market API: independent `ANALYTICS_WEB_SERVICE_TOKEN`.
- API → crawler: independent `ANALYTICS_CRAWLER_CONTROL_TOKEN`.

All configured credentials are at least 32 characters and distinct. Chat secrets, `JWT_SECRET`, MongoDB passwords, and federation RSA private keys are not accepted substitutes.

## Current authorization

Web returns only the current allowed scopes: `analytics:read`, `analytics:operate`, and `analytics:admin`. Every admitted user includes `analytics:read`; higher privileges are cumulative. Analytics does not infer them from browser JSON or a stale role. Ordinary checks cache Web status for at most 60 seconds. Crawler/refetch/enrichment/scenario writes and model lifecycle mutations force a fresh status call. Web failure fails closed and revokes the local Analytics session.

Legacy scoped human bearer tokens remain available only as a rollout compatibility path controlled by `ANALYTICS_LEGACY_HUMAN_TOKENS_ENABLED`; local integrated configuration disables them. The internal Web-service token remains unchanged.

## Verification status

- **Implemented:** Web client, bounded timeout, response validation, scope enforcement, status refresh, separate credentials, fail-closed behavior.
- **Mock-tested:** exact outbound exchange body/header, session creation, scope denial, sensitive fresh status.
- **Real locally tested:** none; Web endpoints do not exist in the sibling repository.
- **Blocked:** role/permission-to-scope mapping and identical fixture publication by Web.
- **Deferred:** production HTTPS/rotation/revocation-window acceptance.

