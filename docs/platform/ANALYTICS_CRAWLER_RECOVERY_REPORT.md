# Analytics Sprint 4 Crawler Recovery Report

**Date:** 2026-11-23  
**Status:** mock-tested only; no real crawl and no external provider call.

## Coverage

The fake queue/provider tests exercise the durable architecture without HTTP access to Divar or any contact endpoint.

| Required behavior | Evidence/status |
|---|---|
| Empty database / new cycle | Queue fixture starts with no existing listing; durable cycle opens queued area jobs — PASS |
| Area-job creation and ordering | All area discovery precedes new detail work, then routine refresh — PASS |
| Job lease/fencing | Expired owners cannot checkpoint; lease loss is surfaced — PASS |
| Fake discovery | Deterministic in-memory `search` callback only — PASS |
| Observation/listing persistence boundary | Detail callback commits before cursor checkpoint; restart safely retries idempotent work — PASS |
| Lifecycle eligibility | Only source-exhausted, successful areas can authorize lifecycle reconciliation — PASS |
| Checkpoint persistence | Discovery candidates and detail cursor are allowlisted and bounded — PASS |
| Worker interruption/restart | Simulated crash after durable listing commit resumes without losing the next ad — PASS |
| Retry/backoff | Transient detail failure receives three bounded attempts; request-budget interruption stays resumable — PASS |
| Duplicate prevention | Same token across adjacent areas is fetched once; metrics deduplicate it — PASS |
| Private-data rejection | Contact/phone fields returned by the fake provider do not cross the durable checkpoint — PASS |
| Resource bounds | Maximum 100 candidates/job, configured request budgets, lease deadline and bounded detail concurrency — PASS by unit/mock test |
| Final completion | Recovered queue reports no pending work and accurate success/failure counts — PASS |

The Mongo lifecycle implementation was additionally changed from full-map iteration to a lean cursor with batch size 500. The synthetic query plan examined 2,800 documents for two complete areas and held no full collection array.

## Not performed

- No real Divar discovery/detail request.
- No browser launch, cookies, authenticated content, phone/contact endpoint, Neshan, OpenAI or geocoder call.
- No shared replica-set lease/restart test and no persistent process restart.
- No real observation transaction or crawler resource peak measurement in Mongo.

These are **blocked/deferred** until an approved isolated synthetic replica-set harness exists. Automatic public crawling remains disabled.

## Reproduction

```bash
node --test test/durableCrawlQueue.test.js test/publicCrawlerState.test.js \
  test/crawlPlanning.test.js test/retry.test.js
```

The test provider is injected in memory; it has no network URL.

