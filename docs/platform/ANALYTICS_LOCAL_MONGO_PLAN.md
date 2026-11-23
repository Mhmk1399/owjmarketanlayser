# Analytics Local MongoDB Initialization Plan

**Status (updated 2026-11-23):** tooling and synthetic seed implemented. After explicit user approval, the complete Atlas test dataset was also restored and initialized in the dedicated standalone local Analytics MongoDB. The Web-owned restored clone, shared replica set, and production databases were not accessed or changed.

## Target and isolation

The completed local test target is the separate `owj-market-mongodb` container, persistent volume `owj-market-analytics_mongodb_data`, and logical database `owj_market_analytics`. It is not the Web restored clone and is not joined to the Web network/database. The future shared deployment target remains `owj_analytics` with a dedicated least-privilege Analytics user; existing production naming remains unchanged until a separately approved rollout. Do not reuse Web, Chat, Atlas, or administrator credentials.

Transactions used by listing/observation, lifecycle, model promotion, and durable queue flows require a replica set or sharded topology that supports transactions. Before provisioning, the infrastructure operator must verify topology, storage capacity, backup/restore, authentication mode, and network reachability. Do not paste complete connection strings or environment dumps into logs or review notes.

## Implemented initializer

`scripts/init-analytics-database.js` covers all 16 Mongoose models and 65 declared indexes, including TTL-backed Analytics session and authorization-state collections. Sprint 4 adds `listing_recent_cache_and_catalog` and `listing_lifecycle_recent_catalog`; production auto-indexing remains disabled.

- Default execution is a read-only dry run: it rejects remote hosts before DNS/network access, then connects to an explicitly local target, validates the database name, lists existing collections, and prints the plan. A separately approved remote plan must also pass `--allow-remote-target`.
- Apply requires both `--apply --confirm-database <exact-name>` and `--backup-confirmed`.
- System, generic Web, and Chat database names are refused.
- Collection/index creation uses idempotent MongoDB operations and verifies resulting index names.
- Mongoose automatic index and collection creation remain disabled in production.

Commands for a later approved disposable/local environment:

```bash
MONGODB_URI='mongodb://dedicated-analytics-user:REDACTED@mongo:27017/?replicaSet=REDACTED' \
MONGODB_DB_NAME='owj_analytics' \
npm run db:plan

MONGODB_URI='mongodb://dedicated-analytics-user:REDACTED@mongo:27017/?replicaSet=REDACTED' \
MONGODB_DB_NAME='owj_analytics' \
npm run db:init -- --confirm-database owj_analytics --backup-confirmed
```

Do not run these commands against the VPS until the URI target, database name, credential scope, backup, and change window are independently reviewed.

## First-deployment procedure

1. Infrastructure verifies the local MongoDB replica-set topology and backup/restore procedure.
2. Create the empty logical database and dedicated least-privilege Analytics user without modifying Web/Chat grants.
3. Run `db:plan`; review the resolved database name, existing collections, 16-model plan, and 65 indexes.
4. Confirm the target is empty or contains only an earlier approved Analytics schema.
5. Run the explicit apply command once during the approved change window.
6. Run the dry-run command again and compare collections/index names.
7. Start API only; verify `/health`, empty public listing search, facets, and authenticated internal search.
8. Start crawler and scorer separately after their credentials and resource limits are verified.
9. Verify the first durable cycle can be initialized. Do not start a public crawl without separate approval.

## Empty database behavior

- Listing search and facets return empty results.
- Buyer matching returns no candidates when the store is available.
- Dashboard/data-quality builders handle empty arrays.
- The scoring pipeline writes a `not-ready` report when fewer than 120 clean listings exist and does not publish model/score artifacts or an active trained model.
- Durable queue schemas and indexes are initialized by the versioned tool; first-cycle runtime verification still requires a disposable replica-set integration environment.

## Rollback

No destructive rollback is automated. Before apply, retain a verified backup. If initialization fails on a brand-new empty Analytics database, stop Analytics services and have the database administrator inspect partial collections/indexes. Dropping that dedicated database is permissible only after independently proving it contains no pre-existing Analytics data and after explicit approval. Never drop or rename Web, Chat, Atlas, `admin`, `config`, or `local` databases.

## Sprint 4 isolated-container verification

The dedicated `owj_analytics_s4_synthetic` database was created in a uniquely named loopback-only MongoDB 8.2.7 container with tmpfs storage, a 1 GiB memory ceiling, and no credentials or shared Docker network. All 65 declared indexes were created there; index construction over 14,000 generated listings took 902.97 ms. This validates the schema/query plan only, not shared replica-set transactions, authentication, production migration time, or Atlas behavior.

## Approved local Atlas-test-data restore

The later user-approved restore copied all 14 Atlas test collections (235,061 documents, including 14,664 listings and 220,006 scores) into the dedicated persistent local target. Source/target counts and 61 source indexes matched, all collections validated, and all restored listings passed the current strict schema. Applying schema plan `2026-11-23.1` locally produced 16 collections and 81 actual indexes with no document-count change. Full commands, checksum, counts, version warning, and real-data results are in `ANALYTICS_LOCAL_DATA_IMPORT_REPORT.md`.

## Awaiting verification

Replica-set capability, least-privilege production grants, shared-stack disk capacity, first durable cycle, production backup restoration, authentication, and production connectivity remain unverified. The standalone local restore does not satisfy those checks. Collection/index initialization for any shared or production database still waits for explicit approval, target review, backup confirmation, and a change window.

