# Collection and listing history — phase 1

## Ownership and scope

Analytics owns sanitized public apartment advertisements, observations and crawl
jobs. No identity/contact data, authenticated Divar responses or raw search
payloads enter the new collections. This phase does not train or call an LLM,
extend collection to land, or enable a second simultaneous crawler.

The MongoDB path uses durable jobs by default. The legacy JSON-only path remains
compatible but does not provide distributed leases or durable area scheduling.

## Durable scheduling

`CrawlCycle` stores the approved neighborhood manifest before area jobs are
seeded. An interrupted seed is repaired with idempotent upserts. A unique partial
index permits one active Tehran apartment cycle. A 120-second lease, renewed
every 30 seconds, is acquired before Chromium launches. `AreaCrawlJob` records a
separate lease, stage, retry count, minimal token candidates and detail cursor.
Expired leases may be reclaimed; checkpoint writes from expired owners fail.

Scheduling order is discovery, new-ad detail fetching, then existing-ad
refresh/confirmation. User requests raise priority within the stage. A slow
detail cannot hold the remaining neighborhoods behind it. Retries use bounded
exponential backoff in addition to the existing network retry policy. Platform
403/429 signals pause work and persist cooldown. Request-budget interruptions
leave work queued for the next execution.

Each area holds at most 100 source listing tokens, and a cycle holds at most
168 neighborhoods. The manifest is also bounded by the configured listing
ceiling. One durable detail is processed at a time using the existing browser,
request limiter and request budget. This prioritizes predictable resource use;
it does not claim that the existing whole-listing runtime cache is eliminated.

Discovery is checkpointed at area boundaries. An interrupted multi-page search
restarts that one bounded area, deliberately without persisting opaque pagination
payloads. Every successful detail commits its listing/history before advancing
the area cursor. A crash in between can replay an idempotent write; it does not
lose the remainder of the area. Complete cycles rotate their starting position;
limited and interrupted cycles retain their original manifest until finished.

Completed job checkpoints expire after 30 days and completed cycle manifests
after 35 days, using TTL indexes set only at cycle completion. Pending cycles
and their jobs do not expire. Listing, observation, price-event and property-link
history is not deleted by this queue retention policy.

## Lifecycle safety

Only exhausted public API searches with completed, successful details can
authorize missed-listing reconciliation. Target-limited, HTML fallback, failed
or incomplete areas cannot. `lifecycle.lastReconciledCycleId` makes misses
idempotent when a cycle is resumed after reconciliation. Disappearance never
means a confirmed sale. Fresh confirmations update last-seen without claiming a
new detail fetch.

## Advertisement events and apartment identity

`ListingActivity` records new advertisements, changed refreshes, unchanged detail
refreshes, fresh sightings, price changes, inferred lifecycle transitions and
reappearances. Lifecycle events explicitly identify their basis as coverage
inference, never transaction/sale confirmation. Events are
idempotent per cycle/token/type/fingerprint. Listing, changed observation and
activity writes share a short MongoDB transaction. Existing observation snapshots
remain readable; the new event ledger starts at rollout and does not invent
historical sightings.

A new token means a new advertisement, not a verified new apartment. A same-token
reappearance is recorded separately. `ListingPropertyLink` stores conservative
candidate links when at least two image URLs and area, rooms and construction
year agree; previously removed candidates are labeled possible reposts. These
are leads, not proof: copied photos and identical apartments are possible.
Candidate matching is bounded to ten database candidates and twenty image URLs.
Failed lookups are logged and leave identity unresolved. There is no automatic
merge, probability or verified unique-apartment count. Independent verification
is required before confirming a link; no public confirmation mutation is added.
Broader same-property resolution remains phase 4 of the approved service plan.

## API

- `GET /crawl`: current cycle progress, including new, refreshed, unchanged,
  confirmed and pending-enrichment counts.
- Existing `POST /area-crawl-jobs` and `GET /area-crawl-jobs/:jobId`: durable
  prioritization/status. A neighborhood already completed in the active cycle
  is not silently reset; an out-of-manifest area waits for a subsequent cycle.
- `GET /crawl-coverage`: recent per-neighborhood attempts, completion and source
  stop reason. Empty neighborhoods are distinct from unattempted ones.
- `GET /listings/:token/history?limit=50&before=<ISO-date>`: bounded activity and
  observation timelines plus possible/verified property links.
- `GET /collection-summary?since=<ISO-date>`: distinct advertisement counts per
  event type and candidate/confirmed link counts. Types may overlap: one ad can
  be newly discovered and later repriced in the same period. No unique-apartment
  count is inferred. Default window is the previous 24 hours.

These endpoints preserve the existing deployment authorization boundary. They
do not implement Web identity or CRM integration. Frontend district job status
remains compatible; a complete history/coverage management UI is later work.

## Migration, verification and rollback

Before starting the new API/crawler code, run:

```bash
npm run migrate:crawl-jobs
npm run migrate:crawl-jobs -- --apply
npm run migrate:crawl-jobs -- --explain
npm test
npm run smoke:crawl-jobs
npm run dashboard:build
```

The migration is additive and never drops indexes, collections or listing data.
It creates `crawlcycles`, `areacrawljobs`, `listingactivities`,
`listingpropertylinks`, their indexes, and a bounded property-link candidate index
on listings. Startup rejects a missing active-cycle unique index.

The opt-in smoke script uses uniquely named temporary collections on the
configured database, verifies real MongoDB leases/checkpoints/transactions, and
removes only those temporary collections. It makes no Divar requests and never
rewrites real listings. Its RSS is a small smoke-process measurement, not a
production crawler capacity benchmark. Do not run a full crawl merely as a test
while another worker is active.

Rollback: stop the new crawler, deploy the previous image and retain the
additive collections. Do not delete active jobs or history. The prior worker
does not consume the durable queue; returning to the new version resumes it.
Use a current backup before deployment and keep old/new crawler versions from
running together. Observe resource samples and API latency during the first real
cycle. The existing API startup cache, batch scoring pipeline and general
production authentication remain separate follow-up tasks.
