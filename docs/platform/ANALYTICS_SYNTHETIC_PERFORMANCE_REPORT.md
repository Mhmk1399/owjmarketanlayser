# Analytics Sprint 4 Synthetic Performance Report

**Date:** 2026-11-23  
**Status:** real local synthetic measurements; not a production capacity claim.

These synthetic figures remain unchanged. A later, explicitly approved Atlas-test-data restore was measured separately; see `ANALYTICS_LOCAL_DATA_IMPORT_REPORT.md` and the restored-data section of `ANALYTICS_QUERY_OPTIMIZATION_REPORT.md`.

## Safety and machine

- Ubuntu Linux 7.0.0-43, x86_64; Node v24.22.2.
- Intel Core i7-10710U, 6 cores/12 threads, 15 GiB RAM, 4 GiB swap.
- The filesystem was already 93% used and swap was essentially full. This influenced the stop decision.
- MongoDB 8.2.7 ran alone in a loopback-only container capped at 1 GiB RAM and 1.5 CPUs with tmpfs storage. It did not join the Web network.
- Records were generated public-property fixtures with `example.invalid` URLs and no names, phones, contacts, cookies, CRM records, or private data.
- During these synthetic measurements, no Atlas, restored Web database, Divar, Neshan, OpenAI, geocoder, or paid provider was contacted.

## Listing/cache benchmark — 14,000 records

Separate cold Node processes were used for the authoritative before/after comparison.

| Metric | Legacy full hydration | Bounded 5,000 cache | Change |
|---|---:|---:|---:|
| Hydration elapsed | 2,570.11 ms | 970.58 ms | 62.2% lower |
| RSS after hydration | 429.36 MiB | 240.95 MiB | 188.41 MiB / 43.9% lower |
| Heap used after hydration | 143.73 MiB | 64.53 MiB | 79.20 MiB / 55.1% lower |
| Cached listings | 14,000 | 5,000 | Hard bounded |

The bounded process reports `totalListings: 14000`, `cachedListings: 5000`, and `complete: false`; Mongo remains authoritative.

Seeding 14,000 fully validated Mongoose documents took 92.23 s. Building all 65 indexes took 902.97 ms. Mongo database statistics after the run were 37,440,380 data bytes, 7,020,544 storage bytes, 2,904,064 index bytes, and 9,924,608 total allocated bytes (compression applies).

Warm 30-iteration listing search results:

| Search | P50 | P95 | Limit |
|---|---:|---:|---:|
| Newest | 1.332 ms | 1.944 ms | 40 |
| Filtered neighborhood/price | 1.664 ms | 2.130 ms | 40 |

Buyer matching (10 iterations, 1,003 hard-filter matches): P50 107.669 ms, P95 147.568 ms; 500 evaluated, 30 returned, `truncated: true`. This includes deterministic in-process ranking and an active-model lookup with no active synthetic model.

## Scoring checkpoints

Both runs used isolated files under `/tmp`, no `onPersist` callback, no Mongo connection, and no active-model mutation.

| Records | Elapsed | CPU user/system | RSS before → after | Scored output |
|---:|---:|---:|---:|---:|
| 1,000 | 839.57 ms | 1,096.36 / 84.70 ms | 49.57 → 120.13 MiB | 14,957,616 bytes |
| 10,000 | 19,841.23 ms | 20,374.13 / 708.61 ms | 69.39 → 479.32 MiB | 149,814,357 bytes |

At 10,000, the full output set was about 167.5 MB and RSS increased about 410 MiB. A 50,000 run would plausibly exceed the 1.5 GiB scorer ceiling and create roughly 750 MB of scored JSON before accounting for other artifacts. Because the host had only about 4.1 GiB available and no swap headroom, 50,000 and 100,000 were **not run**. This is an explicit safety stop, not a passing benchmark.

## Frontend build

| Asset | Sprint 3 | Sprint 4 |
|---|---:|---:|
| Eager application entry JS | 559.82 kB | 198.92 kB |
| Eager entry gzip | not recorded | 63.22 kB |
| Neshan SDK vendor chunk | 1,638.24 kB | 1,638.24 kB |

All page components are route-lazy. AuthGate, typography and base CSS remain eager. The map SDK is still large but is isolated from non-map route entry; Vite still correctly warns about that chunk.

## 8 GB / 4-vCPU recommendation

Evidence supports retaining process isolation and optional workers. It does not support increasing current limits or running every component at its ceiling simultaneously.

- API: start with 768 MiB–1 GiB and 0.75 CPU; the synthetic bounded process peaked at 241 MiB before HTTP/runtime overhead.
- Crawler: keep optional, auto-crawl off, 1.25–1.5 GiB and at most 1 CPU pending browser/fake-provider peak measurement.
- Scorer: keep optional and explicitly scheduled; 1.5 GiB and 1 CPU is defensible only up to the measured 10,000 scale. Do not schedule with crawler.
- Mongo/Web/Chat/proxy/OS need the remaining headroom. No production Compose limit was changed.

Uncertainty remains for real document size, replica-set cache, concurrent Web/Chat traffic, browser memory, filesystem pressure, and production CPU generation. Measure those in an approved staging environment before changing deployment ceilings.

## Reproduction

```bash
npm run benchmark:sprint4 -- --apply --count=14000 --iterations=30
npm run benchmark:sprint4:cache -- --mode=legacy
npm run benchmark:sprint4:cache -- --mode=bounded
npm run benchmark:sprint4:scoring -- --count=1000
npm run benchmark:sprint4:scoring -- --count=10000
npm run dashboard:build
```

