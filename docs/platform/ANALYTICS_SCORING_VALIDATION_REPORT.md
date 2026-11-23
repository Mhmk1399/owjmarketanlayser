# Analytics Sprint 4 Scoring Validation Report

**Date:** 2026-11-23  
**Status:** deterministic fixture and isolated synthetic file tests passed; active production/shared models untouched.

## Reliability matrix

| Case | Result |
|---|---|
| Empty input | `not-ready`, accepted 0, no model/scored artifact publication — PASS |
| Insufficient clean listings | Same `<120` gate; scoring-ready/report only, no trained model publication — PASS |
| Initial model creation | 130-record callback pipeline creates model/scored/report documents with no nulls — PASS |
| Existing model reuse/freshness | Scorer process skips a completed crawl when the active model is at least as new; source-inspected, not process-E2E tested |
| Stable-model scoring/selection | Valuation and buyer reads select only the active model; existing API fixtures pass |
| Invalid/incomplete data | Cleaner records all blockers/imputations and rejects invalid coordinates/area/price/duplicates — PASS |
| Interrupted publication | Synthetic drift-write failure marks candidate/training failed, deletes partial candidate scores and restores prior active model — PASS |
| Worker restart | Mongo snapshot cursor writes through a temporary file and atomic rename — PASS at helper level |
| Duplicate work | Unique model/run/score indexes reject duplicate identifiers; durable scorer poll tracks completed crawl timestamp — schema/source verified |
| Model version integrity | Candidate is promoted only from `candidate`; zero matched rows cause a publication conflict; partial failure cannot leave the previous model archived in the fallback path — PASS |
| Partial file output | Every JSON file is temp-write/rename atomic; the four-file set is not a single transaction — remaining limitation |
| Bounded memory | 1,000 and 10,000 measured; 50,000 stopped on safety grounds — see performance report |

The new compensation path supplements replica-set transactions. On a failed publication it marks the candidate failed, restores an archived baseline if needed, removes the candidate model's partial scores, and records the failed training run. It never promotes a not-ready generation.

## Synthetic measurements

- 1,000 listings: 1,000 scored in 839.57 ms; RSS 49.57 → 120.13 MiB.
- 10,000 listings: 10,000 scored in 19.84 s; RSS 69.39 → 479.32 MiB.
- Model version: `geo-hedonic-ridge-log-ppm-v2`.
- Scoring version: `similarity-adjusted-value-score-v3`.
- The comparable-index correctness fixture remains deeply equal to exhaustive scoring.
- No `onPersist` callback was installed in performance runs, so no Mongo model was created, archived, promoted or overwritten.

## Remaining risks

- The pipeline reads the compatibility JSON and materializes cleaned/scored arrays. The 10,000 run produced a 149.8 MB scored JSON file; this is the principal scorer memory/disk bottleneck.
- Atomic per-file rename does not make the four compatibility files a transactional generation. Mongo active-model selection is authoritative in Mongo mode; a future manifest/pointer protocol is needed for cross-file crash consistency.
- Real replica-set transaction interruption, scorer SIGKILL/restart, and duplicate worker competition remain deferred to an approved synthetic integration environment.

## Reproduction

```bash
node --test test/scoringPipeline.test.js test/scoringState.test.js \
  test/scoringWorkerSnapshot.test.js test/mongoMarketStore.test.js
npm run benchmark:sprint4:scoring -- --count=1000
npm run benchmark:sprint4:scoring -- --count=10000
```

