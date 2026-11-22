# Analytics Browser SSO Contract V1

**Status:** Analytics implementation and mock tests complete; real browser SSO BLOCKED on Web.

## Flow

1. The Analytics HTML shell loads at the dedicated Analytics origin without containing identity data.
2. `GET /auth/v1/analytics/session?redirectUri=<exact URI>` checks the host-only session. If absent, Analytics creates a random state and one-time server-side state record, binds it to an HttpOnly state cookie, and returns the Web authorize endpoint.
3. The browser generates a 48-byte PKCE verifier and S256 challenge, stores verifier/state only in `sessionStorage`, and submits a form POST to Web's `/api/v1/analytics/authorize`.
4. Web authenticates the user, maps current permissions to Analytics scopes, creates a random single-use code valid for at most 60 seconds, and redirects to the exact allowlisted Analytics callback with only `code` and `state`.
5. The browser compares state, removes code/state from browser history immediately, and posts code, verifier, state, and redirect URI to `POST /auth/v1/analytics/session`.
6. Analytics validates exact origin, body size, redirect allowlist, and single-use state/cookie binding, then exchanges server-to-server with Web.
7. Analytics creates a 32-byte opaque session. Only its HMAC-SHA-256 digest is stored server-side.
8. `POST /auth/v1/analytics/logout` revokes the server session and expires the cookie.

The exact endpoint/cookie fixture is `fixtures/analytics-v1/browser-session.contract.json`.

## Cookie and browser rules

`owj_analytics_session` is host-only, HttpOnly, `SameSite=Lax`, `Path=/`, and Secure under HTTPS. Maximum configured lifetime is eight hours; default is one hour and cannot exceed Web's returned expiration. The only HTTP exception is `ANALYTICS_ALLOW_INSECURE_LOCAL_COOKIE=true` with a non-production `localhost`, `127.0.0.1`, or `*.localhost` dashboard origin.

No private service token or canonical Web token enters JavaScript, a URL, or local storage. The short-lived PKCE verifier/state are removed after callback processing.

## Dashboard behavior

Implemented states: checking access, redirecting/login required, unauthorized, expired, provider unavailable, and retry. Logout is accessible from the common header. Read-only sessions cannot open the scoring workshop and operational crawl buttons are hidden.

## Verification status

- **Implemented:** Analytics endpoints, state replay protection, PKCE browser generation, exact redirect checks, opaque digest sessions, logout, auth-aware UI.
- **Mock-tested:** happy exchange, replay rejection, scope denial, forced refresh.
- **Real locally tested:** dashboard production build only.
- **Blocked:** Web authorize/code persistence and real separate-origin browser run.
- **Deferred:** production Secure-cookie/HTTPS and multi-instance session revocation tests.

