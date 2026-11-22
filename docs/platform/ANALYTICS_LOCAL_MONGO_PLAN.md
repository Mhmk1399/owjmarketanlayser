# Analytics Local MongoDB Initialization Plan

**Status:** tooling implemented but not executed; provisioning and topology verification awaiting infrastructure approval.

## Target and isolation

Use a separate logical database, initially `owj_market_analytics`, inside the approved local MongoDB deployment. Create a dedicated Analytics database user with only the actions required by this database. Do not reuse Web, Chat, Atlas, or administrator credentials. Atlas remains untouched.

Transactions used by listing/observation, lifecycle, model promotion, and durable queue flows require a replica set or sharded topology that supports transactions. Before provisioning, the infrastructure operator must verify topology, storage capacity, backup/restore, authentication mode, and network reachability. Do not paste complete connection strings or environment dumps into logs or review notes.

## Implemented initializer

`scripts/init-analytics-database.js` covers all 14 Mongoose models and 58 declared indexes.

- Default execution is a read-only dry run: connects, validates the explicit database name, lists existing collections, and prints the planned schema/indexes.
- Apply requires both `--apply --confirm-database <exact-name>` and `--backup-confirmed`.
- System, generic Web, and Chat database names are refused.
- Collection/index creation uses idempotent MongoDB operations and verifies resulting index names.
- Mongoose automatic index and collection creation remain disabled in production.

Commands for a later approved disposable/local environment:

```bash
MONGODB_URI='mongodb://dedicated-analytics-user:REDACTED@mongo:27017/?replicaSet=REDACTED' \
MONGODB_DB_NAME='owj_market_analytics' \
npm run db:plan

MONGODB_URI='mongodb://dedicated-analytics-user:REDACTED@mongo:27017/?replicaSet=REDACTED' \
MONGODB_DB_NAME='owj_market_analytics' \
npm run db:init -- --confirm-database owj_market_analytics --backup-confirmed
```

Do not run these commands against the VPS until the URI target, database name, credential scope, backup, and change window are independently reviewed.

## First-deployment procedure

1. Infrastructure verifies the local MongoDB replica-set topology and backup/restore procedure.
2. Create the empty logical database and dedicated least-privilege Analytics user without modifying Web/Chat grants.
3. Run `db:plan`; review the resolved database name, existing collections, 14-model plan, and 58 indexes.
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

## Awaiting verification

No database was contacted in this sprint. Replica-set capability, actual grants, disk capacity, index build time, first durable cycle, restart recovery, backup restoration, and production connectivity remain unverified.

