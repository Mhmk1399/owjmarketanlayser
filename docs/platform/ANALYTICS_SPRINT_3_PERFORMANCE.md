# Analytics Sprint 3 Performance Record

**Status:** bounded-query improvements implemented; no production or container capacity claims.

## Implemented bounds

- Listing search: maximum 40 rows, selected public projection, first image only, allowlisted sorts, 2-second default Mongo deadline, 1 MiB response cap.
- Listing detail: direct Mongo projection instead of relying on the full in-memory map when Mongo is available; 2-second deadline and 1 MiB cap.
- Score-filter token set reduced from 20,000 to 2,000 with a query deadline.
- Buyer match: default 500/maximum 1,000 candidates, maximum 50 results, 2-second database deadlines, four concurrent searches by default, 64 KB request and 1 MiB response.
- Valuation: direct projected reads, 2-second deadlines, 128 KiB response cap, no training.
- Identity: 2-second Web calls, at most 60-second cache, bounded sessions/state with TTL indexes.

Local Compose ceilings are API 1 GiB/0.75 CPU, dashboard 96 MiB/0.20 CPU, optional crawler 1.4 GiB/1 CPU, and optional scorer 1.5 GiB/1 CPU. Default startup therefore reserves only API+dashboard. These are development safety ceilings, not measured production requirements.

## Remaining bottlenecks

`MongoMarketStore` still loads and maintains a full Listing map for crawler/analytics compatibility. Several dashboard analytics views still call `store.getListings()` and perform in-process aggregation. Active score snapshots are cached for 15 seconds and may still be large. Score-filter pagination uses a bounded `$in` set and can truncate beyond 2,000 matching scores. Offset pagination becomes inefficient at large offsets. Scoring and crawler workloads remain CPU/memory heavy and must stay separate/opt-in.

## Measurements

- Dashboard production build: PASS on 2026-11-22; main JS 559.82 kB and Neshan chunk 1,638.24 kB before gzip. Vite emitted the existing >500 kB warning.
- Node repository suite: 155/155 tests passed in 4.65 seconds in the final run. Container RSS was not measured.
- Production throughput, 8 GB/4-vCPU coexistence, P95 latency, index build time, and restart pressure: not tested and not claimed.

The existing production Compose limits were not changed in this sprint. Its simultaneous 7 GiB/4 CPU Analytics ceilings remain unsuitable as proof of safe co-location with Web, Chat, Mongo, proxy, and the OS on an 8 GB/4-vCPU host; an approved measurement/deployment decision is still required.

