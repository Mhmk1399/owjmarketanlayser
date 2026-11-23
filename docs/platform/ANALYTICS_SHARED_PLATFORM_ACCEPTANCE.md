# Analytics Sprint 5 Shared-Platform Acceptance

**Executed:** 2026-11-23 (Asia/Tehran)  
**Analytics base revision:** `3cc2e7f9606069e1cc81959b67d73f12a287d54a` plus the uncommitted Sprint 5 changes documented in `ANALYTICS_SPRINT_5_HANDOFF.md`  
**Web base revision:** `825deb1dec989e390ac8048310db790c5f111e8f` plus its concurrently developed Sprint 5 working tree  
**Chat base revision:** `0397bd32da4d653bc237d47f33f3223e393683f4` plus its concurrently developed Sprint 5 working tree

## Safety and exact target

- Web-owned project: `owj-sprint4-synthetic`.
- Proxy: loopback `127.0.0.1:28088` only.
- Analytics database: authenticated replica-set database `owj_analytics_e2e` on `rs0`.
- Required marker: `owj-sprint4-synthetic-only-v1`.
- Schema plan applied by the guarded harness: `2026-11-23.1`.
- Dataset: three synthetic Analytics listings. No restored data was copied into the shared replica set.
- Final Analytics image rebuilt from the current working tree; inspected image ID `sha256:e6bc4e4275544cbaf83b75dcd0307ffc1e5c1d5e280af8e39704c0b23a179707`.
- Workers remained disabled. `ANALYTICS_AUTO_CRAWL=false`; Neshan and OpenAI credentials were blank. No public crawler/provider traffic occurred.

## Acceptance matrix

| Requirement | Result | Evidence |
|---|---|---|
| API readiness | PASS | Mongo, Web, Chat, Analytics and proxy healthy before tests |
| Web-backed SSO | PASS | Real browser authorization, PKCE failure, expiry, replay, disabled-user, demotion, logout and cookie-scope checks |
| User/role restrictions | PASS | Unauthorized customer denied; consultant/admin policy and current-status checks passed |
| Internal service credential | PASS | Public proxy hides `/internal/v1`; direct unauthenticated request returned `401`; Web service path passed |
| Listing search / empty result | PASS | Synthetic search and empty-filter response passed |
| Listing detail | PASS | Synthetic detail response passed |
| Available valuation | PASS | Existing active synthetic model/score returned the frozen response |
| Valuation not ready | PASS | Unscored listing returned the required not-ready state without fabrication |
| Buyer matching | PASS | Bounded, privacy-filtered match passed |
| Saved-listing refresh | PASS | Idempotency and account isolation passed |
| Analytics match to CRM | PASS | Explicit follow-up, privacy and idempotency checks passed through Web |
| Empty database behavior | PASS at contract/unit level | Full Analytics suite includes stable empty-store search/facet/match contracts; shared harness tested an empty result, not a separately provisioned empty database |
| Worker-disabled operation | PASS | API stayed available with no crawler/scorer services started |
| Analytics-only restart | PASS | Analytics restarted; Web and Chat stayed available; persisted synthetic data remained available |
| No customer PII in Analytics request | PASS | CRM privacy rejection and bounded Analytics request contract passed |
| No provider traffic | PASS | Auto-crawl off; paid-provider variables blank; no crawler containers active |

## Shared MongoDB compatibility

A separate authenticated check used the Analytics application user without printing credentials:

- replica-set name: `rs0`;
- role: `readWrite` on `owj_analytics_e2e` only;
- 16 collections and 81 indexes;
- three synthetic listings;
- snapshot transaction read succeeded and was explicitly aborted;
- an attempted read of `owj_web_e2e` failed with MongoDB authorization code 13;
- restart persistence and service startup passed in the platform verifier.

The restored standalone target remains separate: `owj-market-mongodb` / `owj_market_analytics`, schema plan `2026-11-23.1`, 16 collections, 81 indexes. It was only read during Sprint 5.

## Final verifier result

Command:

```bash
cd /home/mhmk/Documents/git/owjamlak
OWJ_VERIFY_SKIP_BUILD=1 ./integration/scripts/verify-platform-local.sh
```

All Analytics-owned checks passed against the rebuilt image. The script intentionally exited 1 at the final shared gate because the current Chat consumer still has three declared blockers:

1. Chat sends CRM task type `follow_up` while the frozen Web contract expects `call`.
2. Reliable removal of the `owj_chat_auth_tx` authorization transaction cookie is not complete.
3. The versioned guest-link transfer extension is not complete.

The browser verifier recorded these as `blocked_chat_consumer` / consumer-contract evidence and continued through the Analytics-only restart. No Analytics source change is appropriate for these blockers.

After the final aggregation hardening, the image was rebuilt once more and the focused Web-owned `verify-analytics-platform.mjs` browser/API suite passed every authorization and market check against that exact final image.

## Reproduction notes

The Web and Chat repositories were dirty because their Codex sessions were concurrently implementing Sprint 5. Their working trees were not edited, reset, committed or pushed by Analytics work. Re-run the full Web-owned harness after those owners finish and freeze their revisions before claiming shared-platform completion.

