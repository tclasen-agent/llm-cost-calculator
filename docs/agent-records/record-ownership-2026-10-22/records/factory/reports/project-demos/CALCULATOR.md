# Inference Ledger — current-build demo

[Watch the demo](/Users/Shared/llm-cost-calculator/artifacts/demonstration.mp4). Silent actual built app in isolated headless Chromium, 1440×1000; test-only nonintercepting caption/pointer overlays and automated interactions. No deployment or data refresh. Source `3f356cf63586922a53ee88db5d414841ed19565a`, tree `26d1fca6e2fa502db12e85ea968d99fb01771890`. Test/build and recordings run on 2026-10-22T02:21:10.301512+00:00.

`npm ci --ignore-scripts` succeeded; `npm test` passes114/114 with no skips, and `npm run build` passes including22 datasets/1153 maintained field paths and current inventory. Browser walkthrough10/10 scenarios passes with zero page exceptions. Planning estimates and dated catalog data are not independent compatibility or current-price certification. This representative demo is not an exhaustive product milestone qualification.

Movie: 77.120000 seconds; H.264/yuv420p; full FFmpeg decode, ffprobe/frame-count check and representative encoded contact-frame inspection passed. SHA256 `71e4a5ea60496b4a71680d47665f2d90bc55c7188a6daaa6d74d5e416d0a7294`. Original raw recording remains at `/private/tmp/project-demos-calculator/raw/page@eab4f3e23018ca834e7542719e9a592e.webm`. Recording script and logs are in [verification evidence](/Users/Shared/llm-cost-calculator/artifacts/verification-20261022/browser-results.json).

Approximate chapter timestamps below account for the leading browser-load interval; embedded chapters provide navigation. Wall-clock-paced footage is retained without speedup or hidden cuts.

| Time | Scenario | Expected / observed |
| --- | --- | --- |
| 00:02–00:07 | CALC-01 Default inference comparison | buy, rent and API estimates are present — PASS |
| 00:07–00:14 | CALC-02 Change team size | comparison recomputes and preserves usable results — PASS |
| 00:14–00:26 | CALC-03 Change workload and model | compatible options update results transactionally — PASS |
| 00:26–00:34 | CALC-04 Reset and reload saved inputs | defaults restore; edited scenario survives reload — PASS |
| 00:34–00:40 | CALC-05 Export assumptions | download identifies inputs and calculated evidence — PASS |
| 00:40–00:48 | CALC-06 Fine-tuning estimates | training mode shows labeled memory, cost and duration estimates — PASS |
| 00:48–00:54 | CALC-07 Change training recipe | alternative recipe updates assumptions without verification claim — PASS |
| 00:54–01:05 | CALC-08 Training reset and return | reset restores defaults; inference remains usable — PASS |
| 01:05–01:10 | CALC-09 Malformed shared scenario recovery | invalid link recovers to complete defaults — PASS |
| 01:10–01:17 | CALC-10 Data provenance and source dates | dated maintained data remains labeled — PASS |

Preserved instrumentation issue: the first test/build attempt returned success for all three commands, but the build recreates dist/ and removed logs stored there. The evidence wrapper then failed writing its summary. Tests/build were rerun successfully with logs outside dist; no assertions or source were changed. No historical results are counted as fresh.

Maintained project files unchanged; generated artifacts intentionally local and excluded via .git/info/exclude, not staged. Coordinator owns final independent review.
