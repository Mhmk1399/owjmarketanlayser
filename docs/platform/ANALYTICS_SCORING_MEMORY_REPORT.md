# Analytics Sprint 5 Scoring Memory Report

**Date:** 2026-11-23  
**Status:** 1,000 and 10,000 synthetic file-only generations passed; maximum safely tested size remains 10,000.

## Implementation

The compatibility JSON writer no longer builds a second giant `JSON.stringify(..., null, 2)` string for each document. It writes top-level arrays in 100-record batches to temporary files. All generation files are fully staged before any target is renamed.

This preserves model/scoring values and versions while reducing transient heap and removing pretty-print whitespace from large arrays. It also ensures a serialization/open failure during staging leaves the previous complete files untouched and removes staged temporary files.

Important boundary: renames are individually atomic but the four-file generation is not a filesystem transaction. A crash between sequential renames can still expose a mixed compatibility-file generation. In Mongo mode, active-model selection remains authoritative. Existing Mongo publication compensation tests verify that a failure during candidate publication removes partial candidate scores and restores the prior active model; a later compatibility-file failure after successful Mongo publication is a separate remaining limitation.

## Measurements

All runs used generated public-property fixtures, no Mongo callback and no provider traffic.

| Run | Elapsed | CPU user/system | RSS before → after | Peak RSS | Scored JSON |
|---|---:|---:|---:|---:|---:|
| Sprint 4, 1,000 | 839.57 ms | 1,096.36 / 84.70 ms | 49.57 → 120.13 MiB | not recorded | 14,957,616 B |
| Sprint 5, 1,000 final | 777.60 ms | 1,018.70 / 51.32 ms | 49.50 → 115.96 MiB | 115.96 MiB | 9,545,401 B |
| Sprint 4, 10,000 | 19,841.23 ms | 20,374.13 / 708.61 ms | 69.39 → 479.32 MiB | not recorded | 149,814,357 B |
| Sprint 5, 10,000 final | 17,655.59 ms | 18,398.04 / 249.19 ms | 69.18 → 330.57 MiB | 375.34 MiB | 95,654,358 B |

For 10,000 records, final RSS after the run was 31.0% lower and the scored file was 36.2% smaller than the Sprint 4 measurement. The final elapsed time was 11.0% lower, but timing is not treated as a guaranteed improvement: three Sprint 5 repetitions ranged from 17.66 to 30.82 seconds and peak RSS ranged from 326.62 to 383.84 MiB depending on host/cache state.

Both final runs produced `geo-hedonic-ridge-log-ppm-v2`, `similarity-adjusted-value-score-v3`, and the requested number of scores. Complete unit tests still prove the comparable index is deeply equal to exhaustive comparable selection.

## Reliability tests

- Empty/insufficient input publishes only not-ready artifacts and no model.
- A 130-record pipeline publishes four parseable, no-null compatibility documents.
- All files are staged before target replacement; an induced second-file serialization failure preserves the prior first file and leaves no `.tmp` artifact.
- Mongo candidate publication rollback preserves the previous active model and removes partial scores.
- Duplicate identifiers remain protected by unique indexes.
- Snapshot extraction streams from Mongo into an atomic temporary file.

## Capacity conclusion

10,000 remains the maximum safely tested size. No 50,000/100,000 run was attempted. The pipeline still materializes cleaned records, predictions and final scored records, and the compatibility output remains about 95.7 MB at 10,000. A 1.5 GiB scorer ceiling remains reasonable for scheduled 10,000-record work, but it is not evidence for larger generations.

Do not co-schedule crawler and scorer on the intended 8 GB host. Long-term options are a manifest/pointer protocol for compatibility snapshots, cursor/batch training inputs, database-native score publication, or a separate worker host.

## Reproduction

```bash
/usr/bin/time -v node --expose-gc --max-old-space-size=1536 \
  scripts/benchmark-sprint4-scoring.js --count=1000
/usr/bin/time -v node --expose-gc --max-old-space-size=1536 \
  scripts/benchmark-sprint4-scoring.js --count=10000
node --test test/scoringPipeline.test.js test/scoringState.test.js \
  test/scoringWorkerSnapshot.test.js
```

The four benchmark-owned temporary directories created during Sprint 5 (331 MiB total) were deleted after recording results. No database, Docker volume, repository data or user file was removed.

