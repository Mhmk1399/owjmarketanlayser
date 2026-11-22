# Analytics Local Docker Integration

**Status:** configuration implemented and Compose-render verification pending; unified runtime BLOCKED on Web identity and shared Mongo provisioning.

`compose.local.yaml` provides independent API and dashboard services. Crawler and scorer exist only under the `workers` profile and both set `ANALYTICS_AUTO_CRAWL=false`. The file publishes no host ports and joins the Web-owned external network named by `OWJ_PLATFORM_NETWORK`.

Copy `deploy/env.analytics.local.example` to `.env.analytics.local`, generate every placeholder independently, keep it ignored, and set `ANALYTICS_LOCAL_ENV_FILE=.env.analytics.local` when rendering/running Compose. The target is the existing MongoDB 8 replica-set engine with database/user `owj_analytics`; Analytics must have no grants on `owj_web` or `owj_chat`.

Proposed commands after Web publishes matching endpoints, proxy routes, Mongo user, and network:

```bash
ANALYTICS_LOCAL_ENV_FILE=.env.analytics.local docker compose -f compose.local.yaml config --quiet
ANALYTICS_LOCAL_ENV_FILE=.env.analytics.local docker compose -f compose.local.yaml up -d --build analytics-api analytics-dashboard
```

Workers require an explicit opt-in and must use mock providers for local tests:

```bash
docker compose -f compose.local.yaml --profile workers up -d analytics-crawler analytics-scorer
```

Do not run the workers command with real provider credentials. The shared proxy must route the Analytics host to dashboard content, API/auth paths to `analytics-api:4567`, and return 404 for `/internal/*` publicly.

## Database workflow

The initializer now covers 16 collections/models and 63 declared indexes, including TTL-backed session/state collections. It remains dry-run first. Synthetic seeding is also dry-run first:

```bash
MONGODB_DB_NAME=owj_analytics npm run db:plan
MONGODB_DB_NAME=owj_analytics npm run db:init -- --confirm-database owj_analytics --backup-confirmed
MONGODB_DB_NAME=owj_analytics npm run db:seed:synthetic
MONGODB_DB_NAME=owj_analytics npm run db:seed:synthetic -- --apply --confirm-database owj_analytics
```

The seed apply refuses any database except `owj_analytics` and any host except `mongo`, localhost, or loopback. It creates only three fixed synthetic public listings and invokes no crawler.

## Status

- **Implemented:** non-root main image, separate unprivileged dashboard image, optional worker profiles, no published internal route, readiness, local env template, dry-run seed.
- **Mock-tested:** empty database contracts and seed dry run.
- **Real locally tested:** dashboard build and Compose config rendering; no containers or database started.
- **Blocked:** Web-owned Nginx host routing, shared Mongo user/grants, real identity endpoints.
- **Deferred:** replica/user isolation proof, index apply, restart/browser suite, resource measurements in containers.

