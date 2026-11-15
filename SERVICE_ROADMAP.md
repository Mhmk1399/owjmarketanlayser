# Apartment analytics service roadmap

Approved scope: apartment listings first. Land valuation, construction feasibility
and residual land value are excluded. Services are logical responsibilities;
they do not imply sixteen containers or sixteen separate AI calls.

| Part | Service | Current delivery status | Next acceptance target |
| --- | --- | --- | --- |
| 1 | Collection and listing history | Durable MongoDB jobs/history implemented; indexes applied; recovery/transaction smoke passed | Observe the first real cycle after restart; see COLLECTION_HISTORY.md |
| 2 | Structured apartment data | Existing explicit public-field allowlist | Extend typed features with evidence, source and missingness; preserve compatibility |
| 3 | Description understanding | New work | One cached extraction per description/model version; Persian labeled evaluation before full backfill |
| 4 | Duplicate/same-property resolution | Token deduplication and conservative candidate links only | Evaluate broader matching, independently confirm links, preserve uncertainty; never equate tokens to unique apartments |
| 5 | Advertiser classification | Public signals and Persian rules exist | Labeled accuracy audit and calibrated uncertainty; personal account does not establish ownership |
| 6 | Location/accessibility | Coordinates, hierarchy and Neshan adapters exist | Background enrichment, expiry, coverage and approximate-coordinate handling |
| 7 | Image analysis | Safe image metadata only | Duplicate-image evaluation, then evidence-backed visible features |
| 8 | Comparables | Existing spatial/attribute comparisons | Property-level deduplication, temporal relevance and explained similarity |
| 9 | Apartment valuation | Experimental learned asking-price model | Time/spatial holdouts, calibrated ranges and distinct asking/transaction evidence |
| 10 | Market history/radar | Observations, event history and aggregates exist | Daily indexed read models and honest observed-supply/time-on-market statistics |
| 11 | GOLD and consultant opportunities | Existing component/scenario scores | Uncertainty-aware opportunity definitions and independently evaluated ranking |
| 12 | Risk/evidence completeness | Data-quality/risk components and limited deed fields | Distinguish missing, declared and verified information; no legal certification |
| 13 | Explainable reports/education | Detail formulas and comparables exist | Standard report with source/version/freshness; grounded answers |
| 14 | Negotiation/advertisement assistance | New work | On-demand drafts using known evidence and valuation uncertainty |
| 15 | Buyer matching/scenarios | Existing search, filters and saved scenarios | Complete pagination, precomputed scenario results and Web-owned identity integration |
| 16 | Storage/jobs/operations | Split processes, resource logs, deployment and durable collection jobs exist | Fresh DB-backed API reads, incremental scoring/outbox, authentication, backup/restore and production soak |

Local description-model evaluation is still pending hardware selection and a
representative labeled dataset. No local model was installed by part 1, and no
paid model was invoked. Parts proceed one at a time after review.

Known remaining foundations from the repository audit: the API still has a
startup-loaded listing cache; scoring still uses full-batch JSON intermediates;
model approval gates and full production authorization remain incomplete. Part 1
does not imply these issues are resolved.
