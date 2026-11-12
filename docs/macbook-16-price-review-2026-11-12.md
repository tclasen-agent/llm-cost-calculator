# Independent review of the 16-inch price correction

Task M5-16-PRICE-REVIEW-2026-11-12. Mode: inspect. Owner: `/root/review_16inch_price`, a fresh session separate from implementation. Operating instructions: DARK-FACTORY-2026-10-31. Authority and acceptance: the current user request and requirement revision M5-16-20261112-1 in [the task record](macbook-16-price-2026-11-12.md). Scope: review and verification only, plus this report; no product edits, commit, push or deployment. Historical paused work remains paused.

Decision: approved for integration; no findings.

Candidate binding: baseline `f017e13fc5f9726084ca02bba1b60a06fbd28970`; all eleven files matched `/tmp/m5-16-price/candidate-sha256.json`, whose SHA256 is `7d023f3c2de4961439b126237354684b50c249f6c75961d880d24eec4a48d85e`. The candidate remains uncommitted. This review report is the only reviewer addition and is outside that frozen manifest.

The reviewer read the actual diff, maintained-data instructions, source snapshot and extraction harness. Independently retrieved the canonical configured Apple URL and parsed its Product JSON-LD separately from the supplied harness. The exact configuration name, URL and Offer SKU agree with the canonical hardware and audit records, including the published USD offer. Generic stock-card starting prices were not used. Also reproduced the harness against both the checksummed historical snapshot and the live primary response. Current editable facts remain in `src/data/`; the compressed receipt is immutable historical evidence.

M5-16-001 passes: the stable hardware entry now identifies the selected screen and complete configuration, owns its published equipment price and dated source, and has no duplicate purchase allowance. Existing UI paths expose the published price link and scoped review wording. Generated build details do not describe the published equipment price as an allowance; separate setup assumptions remain labeled separately. No performance certification was introduced.

M5-16-002 passes: the regression covers saved/shared quote and measurement preservation, complete buy/rent/API estimates, and unchanged whole-catalog freshness after this partial source review. Existing full-suite selector, reset and recovery coverage also passes. No migration or broader catalog refresh was introduced.

Independently executed checks, all passed:

- Manifest SHA256 and all eleven candidate file hashes.
- `npm test`: 140 tests passed, none failed or skipped; data validation reports 22 datasets, 1,538 field paths and current generated inventory.
- `npm run build`: production static build and inventory validation passed.
- Historical and `--live` source extraction harness invocations.
- Separate fresh HTTP retrieval and independent Product/Offer extraction.
- `git diff --check`.

No implementation changes were made by the reviewer. Integration, remote checks, deployment identity and live acceptance remain the next owner's responsibility. Approval binds to this candidate; subsequent substantive changes require appropriate review.
