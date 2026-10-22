# llm-cost-calculator — derived source extract

Source: `agent-org/factory/reports/all-project-progress/CALCULATOR.md` at immutable `105c9f55b7f208b6f1717e522acfcc29f37a93eb`.

Source SHA-256: `294fe7e0b49172fa87936ee3fa138ee58b4763b1cdf3558f1ce3aa6a984a8106`.

This is a derived project-only documentary extract, not a byte-identical source copy, new verification, or current authority. The quoted spans below retain their original wording and chronological claims. Omitted text belongs to shared governance, another owner, or mixed context. Historical pending statements and failures remain historical; use the relocation README for the documented latest outcome. References to local artifacts identify evidence only; their bytes are not included.

Source line 1, characters 0–56:

> # Calculator invalid-input recovery handoff — revision 2

Source line 3, characters 0–24:

> - Target System: project

Source line 4, characters 0–32:

> - Change Classification: project

Source line 5, characters 0–128:

> - Authorized Scope: TASK-000115 six tracked calculator files; task-specific ignored test/browser evidence; this assigned handoff

Source line 6, characters 0–176:

> - Affected Paths or Resources: `/Users/Shared/llm-cost-calculator`; six files named below; `artifacts/recovery-20261022/` and `artifacts/recovery-rework-20261022/`; this report

Source line 7, characters 0–24:

> - Owning Role: Developer

Source line 8, characters 0–34:

> - Related Requirements: REQ-000055

Source line 9, characters 0–41:

> - Related Tasks: TASK-000115, TASK-000109

Source line 10, characters 0–175:

> - Approval Requirements: APP-000035, PLAN.md revision 2; fresh independent project review and owning remote-main delivery; independent organization review/approval for records

Source line 12, characters 0–613:

> TASK-000115 / RUN-000110, native worker `/root/resonance_calculator_plan`, checkpoint 2026-10-22 UTC. **Revision 1 / commit `77e77ee` was rejected by independent review for missing upper-domain recovery. Revision 2 is implemented and locally reverified, ready for fresh independent review; remote delivery remains pending, owned by Coordinator.** Requested model/reasoning gpt-6.1-sol/high; actual model, reasoning, tokens and cost unknown. Approximately 24 elapsed minutes have accumulated across initial implementation and rework within the original 45-active-minute checkpoint; no budget reset or new spending.

Source line 14, characters 0–259:

> The initial result/evidence sections below are preserved history for rejected candidate `77e77ee`, not current acceptance. The revision 2 section at the end identifies the current candidate and fresh evidence. Earlier videos/manifests were retained unchanged.

Source line 16, characters 0–25:

> ## Result and exact scope

Source line 18, characters 0–552:

> Invalid persisted inference inputs now recover before normalization can silently convert them into another configuration or zero fee. The original saved object, malformed JSON text or shared field values are retained through the existing recovery key. Recovery remains usable with all three buy/rent/API estimates; when recovery storage itself fails, the message says retention failed. Valid older partial scenarios still inherit defaults and preserve their overrides. Inference/training storage separation and transactional direct edits remain intact.

Source line 20, characters 0–45:

> Only these six tracked project files changed:

Source line 22, characters 0–17:

> | File | Change |

Source line 23, characters 0–9:

> |---|---|

Source line 24, characters 0–307:

> | `src/scenario.js` | Validate raw persisted structure, numeric fields, catalog IDs and serialized selectors before calling planning/normalization; recover invalid values without mutating the rejected input. Missing older fields remain allowed. Whitespace-only numeric strings cannot silently become zero. |

Source line 25, characters 0–182:

> | `src/sharing.js` | Add raw `readState` parser for application recovery; preserve existing normalized `decodeState` contract for arithmetic callers and supported link round trips. |

Source line 26, characters 0–200:

> | `src/app.js` | Pass raw localStorage/URL inputs into recovery; retain malformed JSON text; use the same preservation path on initial load and popstate; disclose retention-storage failure honestly. |

Source line 27, characters 0–215:

> | `tests/scenario.test.js` | Regression cases for negative/nonfinite/whitespace/mistyped numbers, unavailable IDs, malformed structures/text, valid older partial saves, raw shared recovery and valid compatibility. |

Source line 28, characters 0–130:

> | `tests/engine.test.js` | Preserve normalized low-level URL compatibility independently of the application's raw recovery path. |

Source line 29, characters 0–107:

> | `README.md` | Explain recovery preservation, storage-failure reporting and older partial compatibility. |

Source line 31, characters 0–390:

> No maintained data, dates, prices, inventory, dependency, training-policy, organization policy or deployment configuration changed. Diff is 91 insertions/11 deletions. Baseline was clean canonical main `3f356cf63586922a53ee88db5d414841ed19565a`. Coordinator has since created branch `fix/invalid-saved-scenario-recovery`; worker performed no branch, stage, commit, push or other Git writes.

Source line 33, characters 0–38:

> ## Verification and preserved attempts

Source line 35, characters 0–85:

> Evidence directory: `/Users/Shared/llm-cost-calculator/artifacts/recovery-20261022/`.

Source line 37, characters 0–28:

> | Check | Observed outcome |

Source line 38, characters 0–9:

> |---|---|

Source line 39, characters 0–223:

> | New regressions before implementation | Four targeted failures in `before-regression.log`: invalid fees/IDs silently accepted; malformed structures crashed; raw parser absent. Older partial compatibility already passed. |

Source line 40, characters 0–148:

> | Additional whitespace regression | Exit 1 before the final guard, recorded in `whitespace-before.log`; blank-looking fee previously became zero. |

Source line 41, characters 0–64:

> | Initial targeted unit checks | 48/48 passed; `targeted.log`. |

Source line 42, characters 0–189:

> | Final `npm test` | Exit 0, **120/120 passed**, zero skipped/canceled/todo; `tests-final.log`, `checks-final.json`. Data contract reports 22 datasets/1153 field paths, inventory current. |

Source line 43, characters 0–111:

> | Final `npm run build` | Exit 0; `build-final.log`, `checks-final.json`. Built `dist/` from final candidate. |

Source line 44, characters 0–153:

> | Final isolated built-app browser | Exit 0; **12/12 passed**, zero page errors; `qualified/browser-results.json`, `qualified/trace.zip`, `record.mjs`. |

Source line 45, characters 0–32:

> | `git diff --check` | Exit 0. |

Source line 46, characters 0–216:

> | Source and policy preservation | `source-final.json` and `source-final-after.json` match exactly; organization core/policy before/after hashes unchanged. Baseline and earlier-candidate manifests remain preserved. |

Source line 47, characters 0–179:

> | Recording encode/probe/full decode | All exit 0; H.264/yuv420p, 1440×1000, 25 fps, 2,349 decoded frames, **93.96 seconds**, 5,170,876 bytes. `qualified/media-validation.json`. |

Source line 49, characters 0–674:

> Browser cases cover initial complete defaults, negative saved fee, unknown saved model, exact malformed JSON retention, raw negative shared value, actual back/forward recovery, valid older partial save with Unicode notes and fees, reset/reload persistence, transactional invalid token edit, enabled task/model/hardware/rental transitions, training return/storage separation, and simulated recovery-storage failure. Assertions inspect real DOM cost cards, persisted values and actual calculator results; no result is supplied by the caption overlay. Unit tests cover whitespace and broader raw-value cases that the representative browser recording does not individually show.

Source line 51, characters 0–709:

> The first attempted browser command failed before starting a browser because loopback listen was denied (`EPERM`); `browser-sandbox-failure.log` preserves it. Ordinary reviewed sandbox escalation allowed the owned loopback server and headless Chromium. The first successful 12-case run/video remains in the evidence root. Encoded inspection found an offscreen sidebar notice in its last optional case; a presentation-only rerun under `final/` added smooth sidebar scroll restoration. That probe was superseded when the whitespace guard changed the candidate. Only `qualified/` establishes final browser evidence; no older run is presented as proof of the final source. All attempts remain local and preserved.

Source line 53, characters 0–35:

> ## Playable evidence and provenance

Source line 55, characters 0–337:

> [Watch final recovery recording](/Users/Shared/llm-cost-calculator/artifacts/recovery-20261022/qualified/recovery-demonstration.mp4) · [timestamp index](/Users/Shared/llm-cost-calculator/artifacts/recovery-20261022/qualified/index.md) · [machine index](/Users/Shared/llm-cost-calculator/artifacts/recovery-20261022/qualified/index.json).

Source line 57, characters 0–740:

> This is an uncut silent recording of the actual built local app, isolated headless Chromium and synthetic fixtures. Test-only caption/pointer overlays do not intercept input; deliberate pauses/movement aid reading. Timestamp entries are approximate seconds from page creation; captions, wall intervals and trace identify cases. Context/trace close before media inspection. Encoding used two CPU threads, no hardware encoder. All twelve midpoint frames were extracted; representative final encoded recovery/navigation/storage-denial frames were visually inspected for readable UI and labels. The final retention-failure notice is visible. Full decode verifies playback through all reported frames; fresh Reviewer acceptance remains separate.

Source line 59, characters 0–22:

> | Artifact | SHA-256 |

Source line 60, characters 0–9:

> |---|---|

Source line 61, characters 0–122:

> | Final tracked-source manifest `source-final.json` | `249478922ddfad55af6189840b8ae29a0f66a0998dae861e5cb346c867393118` |

Source line 62, characters 0–117:

> | Final candidate patch `candidate-final.diff` | `5744f72b8435f9bbdb7233751ed0ca4f276c2cced4fd32c4ec1e9d6f3749348b` |

Source line 63, characters 0–88:

> | Final recording | `d8efe3335a22b3dd6827d8dd0353e1d0b11609fd253b7cbb654852cae0136763` |

Source line 64, characters 0–87:

> | Final raw WebM | `791a80a46b1bbd3eab30273666419f8a57829282031b27de1b32e2f5eeb48ff2` |

Source line 65, characters 0–95:

> | Final recording script | `008763bc62f5130d56ecb708d50cf8cc35767dbeb34fd9ba58014fda6eb94c85` |

Source line 67, characters 0–433:

> `environment.json` records ARM64 macOS 27.0.1 (26A434), Node 26.12.0, npm 11.20.0, Playwright 1.62.1 from existing host tooling, explicit cached Chromium-1243 executable, FFmpeg/ffprobe 9.0.2. These are observed tools, not new package pins. Raw, encoded, trace, script and source evidence stay local/ignored and are not proposed as repository commits. Existing `artifacts/demonstration.mp4` and prior demo evidence were not replaced.

Source line 69, characters 0–39:

> ## Effects, limitations and next action

Source line 71, characters 0–124:

> Effects were local project edits, generated `dist/`/evidence, isolated browser profiles and temporary loopback HTTP servers.

Source line 71, characters 124–185:

>  Browser egress was restricted to each owned loopback origin;

Source line 71, characters 185–309:

>  no provider, live price, private-data acquisition, deployment, upload, physical desktop input or external message occurred.

Source line 71, characters 309–347:

>  Browser/context shutdown was awaited.

Source line 71, characters 347–533:

>  Final listener cleanup was independently read back under ordinary reviewed network escalation: `127.0.0.1:56689` returned `ECONNREFUSED` (61), recorded in `qualified/port-cleanup.json`;

Source line 71, characters 533–611:

>  a generic nonzero connect result under the sandbox is not relied on as proof.

Source line 71, characters 705–748:

>  No task-owned process or listener remains.

Source line 73, characters 0–411:

> No hosted/live-site acceptance is claimed; deployment is excluded. The new video is requirement-specific, not exhaustive product qualification. Normalized `decodeState` remains intentionally compatible; application initialization/popstate use raw `readState` instead. The recovery key keeps the latest rejected scenario, as before. Product-owner, private-data or price-source decisions do not block this repair.

Source line 75, characters 0–547:

> Delivery audit: owning repository `https://github.com/tclasen-agent/llm-cost-calculator.git`, branch `fix/invalid-saved-scenario-recovery`, target `origin/main`. Worker has not committed or published; PR/merge commit/fetched-main SHA and remote content verification are **pending**, not complete. Coordinator owns Git serialization, any configured Pages side-effect reconciliation, fresh independent review, required checks, normal PR/main delivery and final claim release. Organization report delivery is separately pending through the parent PR.

Source line 77, characters 0–475:

> Exact next safe action: fresh Reviewer compare the six-file candidate to `source-final.json`/`candidate-final.diff`, rerun proportionate checks and inspect final evidence; Coordinator then deliver the approved candidate through its owning PR and verify remote-main content. RUN-000110 hands implementation ownership back now; do not change source without invalidating affected verification. Rollback is a normal revert PR preserving user recovery entries and prior artifacts.

Source line 79, characters 0–65:

> ## Revision 2 — material review finding and numeric-domain repair

Source line 81, characters 0–486:

> Independent Reviewer found that revision 1 still silently clamped raw `apiExtras=10000000000001` to `1e12` and `purchaseDiscount=100` to `99`, reporting `recovered:false` and usable results. This was a material instance of the same admitted recovery defect. The earlier 120-test/12-case pass did not cover those domains and was insufficient for acceptance; source `77e77ee`, its `source-final.json`, previous videos and all attempted evidence remain preserved as the rejected candidate.

Source line 83, characters 0–813:

> Current rework modifies only `src/scenario.js` and `tests/scenario.test.js` beyond `77e77ee`; the total project change still occupies the same six originally admitted files. After shape/type/negative validation, recovery compares every present numeric raw value to the existing `normalize(raw)` result. A value changed by an existing numeric cap, integer constraint or normalized flag domain triggers explicit recovery. This reuses the authoritative implementation domains without copying bounds into production code, adding maintained facts or changing the low-level normalization API. Missing/null/empty optional values retain compatibility. `autoHardware` follows its actual existing normalizer domain; unlike four other flags, it has no separate binary normalization rule, and this repair does not invent one.

Source line 85, characters 0–981:

> Three added regressions failed before this repair (`before-domain-regressions.log`, observed exit 1): every numeric field beyond the global cap, independently asserted accepted endpoint/one-beyond cases, and invalid fractional/count/flag controls. Endpoint tests cover exact `1e12` money, all three 99-percent caps, user/concurrency bounds and normalized flags, with numeric and serialized values beyond each endpoint. They assert original-value retention, complete fallback defaults and unchanged usable values at the supported endpoint. The first targeted rerun had one fixture failure: forcing a one-GB rental-memory override while enabling automatic rental changed systems and correctly cleared that system-scoped override, causing a semantic non-fit. The fixture now uses the ordinary valid default for flag endpoints and reserves pinned synthetic memory only for high-count tests. That failure is retained in `targeted.log`; no product assertion or domain bound was weakened.

Source line 87, characters 0–91:

> New evidence root: `/Users/Shared/llm-cost-calculator/artifacts/recovery-rework-20261022/`.

Source line 89, characters 0–33:

> | Current verification | Result |

Source line 90, characters 0–9:

> |---|---|

Source line 91, characters 0–100:

> | `npm test` | Exit 0, **123/123 passed**, zero skipped/canceled/todo; `checks.json`, `tests.log`. |

Source line 92, characters 0–104:

> | `npm run build` | Exit 0; 22 datasets/1153 fields and current inventory; `checks.json`, `build.log`. |

Source line 93, characters 0–126:

> | New built-app browser run | Exit 0, **16/16 passed**, zero page errors; `browser-results.json`, `trace.zip`, `record.mjs`. |

Source line 94, characters 0–172:

> | All original recovery scenarios | Repeated on the current candidate, including initial/reset/save/shared/history/selector/transaction/training/storage-failure behavior. |

Source line 95, characters 0–276:

> | New browser cases REC-13–16 | Oversized saved fee retained exactly and defaults shown; shared percentages above their domain retained without silent 99-percent estimates; exact valid maxima remain unchanged and usable; beyond-domain counts/nonbinary flags recover exactly. |

Source line 96, characters 0–178:

> | Encode/probe/full decode | Exit 0 throughout; 118.20 seconds, H.264/yuv420p at 1440×1000/25 fps, **2,955 frames**, 6,033,229 bytes. `media-validation.json`, `validation.log`. |

Source line 97, characters 0–171:

> | Cleanup | Browser/context closure awaited; owned ephemeral loopback origin returned explicit `ECONNREFUSED` (61) under reviewed network capability. No 8766/8767 claim. |

Source line 98, characters 0–152:

> | Integrity | `source-candidate.json` equals `source-after.json`; current policy hashes match the original before snapshot; `git diff --check` passes. |

Source line 100, characters 0–332:

> [Watch revision 2 recording](/Users/Shared/llm-cost-calculator/artifacts/recovery-rework-20261022/recovery-demonstration.mp4) · [current timestamp index](/Users/Shared/llm-cost-calculator/artifacts/recovery-rework-20261022/index.md) · [machine index](/Users/Shared/llm-cost-calculator/artifacts/recovery-rework-20261022/index.json).

Source line 102, characters 0–634:

> The new uncut recording uses the same synthetic/isolated/CPU-only approach and covers all previous twelve cases plus the four review-specific cases. All sixteen encoded midpoint frames were extracted; representative oversized-value, valid-endpoint and count-recovery encoded frames were inspected, as were outcome screenshots showing readable case captions. Nonvisual storage/domain assertions are in the results and trace. The giant accepted fee in the endpoint case is a synthetic boundary value, not a price recommendation. Source remained frozen throughout this final run. No prior evidence was overwritten or promoted as current.

Source line 104, characters 0–30:

> | Current artifact | SHA-256 |

Source line 105, characters 0–9:

> |---|---|

Source line 106, characters 0–112:

> | Source manifest `source-candidate.json` | `122b70b724f056401045fe579696629cacec525e8bb654f1d32c1c0281dbeab5` |

Source line 107, characters 0–133:

> | Full candidate patch from original baseline `candidate.diff` | `adce35876aadc32fa4cd701cdca45039482e4ddb842cf6fdc92882e52fa92284` |

Source line 108, characters 0–86:

> | New recording | `0abc46ee9cb1ca7c2613dbba4dba4e9d962bf0f37b23fb7858fd89946a7ce9ae` |

Source line 109, characters 0–90:

> | New raw recording | `1ebd157f32350e11094ce8fd1b725c99bf18837f94c1b77358d48e63671fddff` |

Source line 110, characters 0–93:

> | New recording script | `c7cbe698147fdb4c0f0048f5fcd065360152883d4cee270d860430c8d8e5a6d6` |

Source line 112, characters 0–673:

> There were no new deployment/data/provider/spending/Git effects during rework. Coordinator retains branch `fix/invalid-saved-scenario-recovery`; worker did not amend, commit or rewrite history. Next safe action superseding the historical handoff above: root pins this exact source candidate in a new ordinary commit, fresh Reviewer rechecks the upper-domain fix plus the original scope and current 123-test/16-case evidence, then Coordinator performs normal PR/check/merge/remote-main verification. No approval of `77e77ee` carries forward automatically. New commit, PR, merge/main SHA and content proof remain pending; implementation is ready for re-review, not delivered.
