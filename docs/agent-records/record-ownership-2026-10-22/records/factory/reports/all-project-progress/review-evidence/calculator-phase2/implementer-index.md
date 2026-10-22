# Calculator recovery verification index

[Watch the annotated recording](recovery-demonstration.mp4)

TASK-000115 / RUN-000110. Actual local built app in isolated headless Chromium; synthetic inputs and automated actions. Caption/pointer overlays do not intercept input. All 16 scenarios passed with no page errors. Unit/DOM/storage/calculation assertions and trace supply nonvisual evidence. Existing recordings remain unchanged.

Times are approximate seconds from page creation; captions identify each case. Exact wall intervals and outcomes are in `browser-results.json`; `trace.zip` and `record.mjs` preserve actions and assertions. The uncut video includes startup and tail holds.

| Approx. time | Case | Expected and observed |
|---|---|---|
| 00:00–00:06 | REC-01: Initial complete default | Buy, rent and API have finite costs — PASS |
| 00:06–00:12 | REC-02: Invalid saved fee | Negative original retained; complete defaults shown — PASS |
| 00:12–00:18 | REC-03: Unavailable saved model | Unknown model retained without reuse; defaults usable — PASS |
| 00:18–00:24 | REC-04: Malformed saved JSON | Exact broken text retained; no page error — PASS |
| 00:24–00:30 | REC-05: Invalid shared controls | Raw negative URL value retained before normalization — PASS |
| 00:30–00:37 | REC-06: Back and forward recovery | Back retains invalid input; forward restores valid link — PASS |
| 00:37–00:44 | REC-07: Valid older partial save | User fees and Unicode notes survive; missing defaults fill — PASS |
| 00:44–00:53 | REC-08: Reset and saved reload | Default reset clears feedback; edited size survives reload — PASS |
| 00:53–01:02 | REC-09: Transactional invalid edit | Oversized token edit retains last usable calculation — PASS |
| 01:02–01:16 | REC-10: Enabled selectors | Task, model, buy and rental transitions keep all three costs — PASS |
| 01:16–01:25 | REC-11: Training remains separate | Training inputs persist; inference stays usable on return — PASS |
| 01:25–01:30 | REC-12: Recovery storage unavailable | Defaults stay usable; retention failure is explicit — PASS |
| 01:30–01:36 | REC-13: Oversized saved fee | Original oversized value retained; no silent cap — PASS |
| 01:36–01:42 | REC-14: Out-of-range shared percentages | 100 percent values retained; no silent 99 percent estimate — PASS |
| 01:42–01:48 | REC-15: Valid upper numeric endpoints | Exact maximum fee and 99 percent settings remain usable — PASS |
| 01:48–01:55 | REC-16: Bounded counts and flags | Beyond-domain counts and nonbinary flag recover exactly — PASS |
