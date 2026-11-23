# Analytics Sprint 5 Co-location Benchmark

**Date:** 2026-11-23  
**Environment:** Web-owned `owj-sprint4-synthetic`, loopback port 28088, authenticated `rs0`, synthetic databases only.

## Controlled Analytics load

The rebuilt Analytics container ran 200 authenticated read-only listing searches at concurrency 4 while Web, Chat, Chat UI, MongoDB and the proxy were active.

| Metric | Result |
|---|---:|
| Successful responses | 200 / 200 |
| Throughput | 54.20 requests/s |
| P50 | 69.65 ms |
| P95 | 145.33 ms |
| P99 | 306.40 ms |
| Maximum | 332.97 ms |
| Load-generator event-loop mean / P95 / max | 15.465 / 58.753 / 85.524 ms |
| Analytics memory before / after | 105.7 / 127.9 MiB |

The load generator ran inside the Analytics container and called loopback, so its event-loop figure includes generator work and is not a pure measurement of the API process event loop. The HTTP latency and container memory observations are real; this remains a short synthetic test, not a production capacity claim.

## Co-located one-shot container observations

Before → after the load:

| Service | Memory before | Memory after | Configured limit |
|---|---:|---:|---:|
| Web | 241.8 MiB | 245.3 MiB | 1.562 GiB |
| Chat | 136.1 MiB | 151.8 MiB | 768 MiB |
| Chat UI | 16.53 MiB | 16.56 MiB | 128 MiB |
| Analytics | 105.7 MiB | 127.9 MiB | 1.074 GiB |
| MongoDB | 300.2 MiB | 142.0 MiB | 1.367 GiB |

CPU snapshots are instantaneous and noisy: Web 10.28% → 7.89%, Chat 0.20% → 0.80%, Analytics 0.50% → 0.26%, MongoDB 50.15% → 40.21%. They should not be interpreted as sustained utilization. A later post-verifier idle snapshot showed Analytics 82.85 MiB, Web 264.6 MiB, Chat 135.5 MiB and MongoDB 142.7 MiB.

The platform harness also passed Chat WebSocket/SSE lifecycle activity, a Chat-only restart and an Analytics-only restart while other services remained available.

## 8 GB / 4-vCPU recommendation

The always-on synthetic service ceilings total roughly 5.1 GiB before Docker overhead and the host OS. Adding the current 1.4 GiB crawler and 1.5 GiB scorer ceilings would exceed 8 GiB before accounting for Nginx, filesystem cache and process spikes.

- Keep Analytics API at approximately 0.75 CPU and 768 MiB–1.1 GiB; measured API use is comfortably lower, but full-database aggregation and larger documents need headroom.
- Keep MongoDB near 1.4 GiB initially and measure WiredTiger cache/working set with representative concurrent traffic.
- Keep crawler and scorer profile-disabled by default.
- Never run crawler and scorer together on the 8 GB host.
- Schedule the scorer alone during low traffic and cap supported input at the measured 10,000 until further tests.
- A browser crawler needs a dedicated peak-memory test before co-location. Separate the worker host if crawling is frequent or scoring grows beyond 10,000.
- Preserve at least 1.5–2 GiB for the OS, Docker, Nginx and transient spikes rather than allocating every byte through container limits.

No production Compose/resource setting was changed.

## Safe reproduction

Inside the protected synthetic Analytics container:

```bash
docker exec owj-sprint4-synthetic-analytics-1 \
  node scripts/benchmark-sprint5-colocation.js --requests=200 --concurrency=4
```

The script refuses any database other than `owj_analytics_e2e`, requires an authenticated `replicaSet=rs0` URI and strong service token, permits only loopback Analytics targets, performs no writes and calls no external provider.

