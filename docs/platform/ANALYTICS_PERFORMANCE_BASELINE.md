# Analytics Performance Baseline — Sprint 1

**Target host:** 4 vCPU, approximately 8 GB RAM.  
**Status:** deterministic synthetic checks completed; production resource measurements not performed.

## Implemented improvements

### Comparable candidate index

Batch scoring now builds a latitude/longitude grid once and supplies each listing only the cells that can intersect its existing five-kilometre bounding window. The original exact Haversine, area, room, similarity, sorting, outlier, weighting, and score calculations are unchanged.

Correctness test: indexed and exhaustive scoring outputs are deeply equal on the fixed 160-listing scoring benchmark.

Synthetic city-scale check (400 listings):

| Metric | Exhaustive | Indexed | Change |
|---|---:|---:|---:|
| Comparable candidate checks | 160,000 | 18,161 | 88.65% fewer |

This is candidate-pruning evidence, not an end-to-end production latency claim. Dense data inside one five-kilometre region can approach exhaustive behavior.

### Streamed Mongo scoring snapshot

The scoring worker now reads Mongo through a sorted lean cursor in batches of 500 and writes the compatibility JSON snapshot incrementally to an atomic temporary file. It no longer loads the complete Mongo result array and a second complete serialized JSON string before writing. The downstream deterministic pipeline still reads the finished snapshot into memory, so full-dataset memory pressure is reduced but not eliminated.

### Process independence and resource ceilings

Production Compose no longer makes API startup depend on crawler and scorer health. The API polls an unavailable crawler as unavailable while remaining able to serve independent reads. Current ceilings are:

| Service | CPU | Memory | PIDs |
|---|---:|---:|---:|
| API | 1.0 | 1536 MB | 200 |
| Crawler | 1.5 | 2560 MB | 300 |
| Scorer | 1.5 | 3072 MB | 200 |

The sum leaves host headroom, but these values require operational validation alongside Web, Chat, MongoDB, Nginx, and the OS.

## Existing bounds retained

- Buyer matching: maximum 2,000 configured candidates, 50 returned rows, configurable 250–10,000 ms Mongo query limit, and bounded concurrency.
- Crawler: request/run/minute budgets, bounded detail concurrency, durable leases/checkpoints, cooldowns, and retry ceilings.
- API bodies: bounded JSON/audio sizes and listing page limits.
- Scoring: remains off the user-facing request path and runs in a worker thread/process.

## Remaining high-priority work

- `MongoMarketStore.init()` still loads the complete Listing collection into an in-process Map. Removing it safely requires async query-backed replacements for live analytics, crawler planning/reconciliation, dashboard/location views, and compatibility behavior.
- Scoring still materializes cleaned records, model inputs, and final score documents in memory.
- Offset pagination still permits very deep skip values; cursor pagination should replace it under an approved compatibility version.
- Score-filter catalog queries can still materialize up to 20,000 score tokens.
- No production CPU/RAM/disk/network baseline, p95 latency, event-loop delay under load, or Mongo explain plan was collected.

## Approved future measurement method

Use generated non-production fixtures at representative sizes, record process RSS/heap/event-loop delay and elapsed CPU for API startup, search, crawl planning, snapshot export, and scoring, and compare indexed/exhaustive score hashes. Run on a disposable database and never copy production personal/contact data into a benchmark.

