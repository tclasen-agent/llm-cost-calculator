# Independent preservation review

- Task/Run: TASK-000274 / RUN-000267
- Native Reviewer: /root/review_calculator_retirement; no implementation authorship or Git/deletion mutation
- Observed: 2026-10-26T20:47:34.414208+00:00
- Subject baseline HEAD: 5df91ae23f90b76d7c47b155f135c01b8dfe9a25; tree f8b754b00746acf41243e0645413965a08be984d
- Subject TASK SHA256: c6b2bff8fbaa730ffae60e5fb87286bd44bf58e414506e5b0c205068c9771109
- Subject PRESERVATION SHA256: d7bb794879b3d22a9099a4ccb6daa126235f52ce0e30eca005df155e95bf8582

Decision: preservation/documentation qualified, conditional on normal owning-main delivery and final deletion rechecks. Future delivery and deletion remain unverified.

| Criterion | Independent observation | Outcome |
| --- | --- | --- |
| Actual remote main | Fresh escalated read-only ls-remote of existing https://github.com/tclasen-agent/llm-cost-calculator.git advertises baseline 5df91ae23f90b76d7c47b155f135c01b8dfe9a25 | verified |
| Every original local branch tip | Fifteen current branch tips checked with merge-base --is-ancestor against freshly advertised actual remote heads; all reachable | verified |
| Two archived tips | archive/retirement-20261026-glm-prepublication = 6abe25859bec61f9e272c326d43ca3d3ae60f9fc; archive/retirement-20261026-october-prepublication = 5ce445ee38122fd167eb30b1f1c65cabb4e1189d | verified |
| Unique ignored evidence | Independently SHA256-hashed entire external archive and read every member; 980 regular files match manifest size/hash and current original bytes, one symlink matches manifest target and original link; exact current unique-ignored set matches all 981 entries | verified |
| Archive identity | /Users/Shared/retired-project-evidence/llm-cost-calculator-20261026/ignored-evidence.tar; 1476894720 bytes; SHA256 d2c8d581445496d351ac5939ba30bede21e298bd25735ddff34ff022e1d4bf0b. manifest.json SHA256 9ceba7595070f40129085fb1757a6466179f30ad7c78e8fe1de4f11e9156bc15 | verified |
| Product/source boundary | Tracked diff from source baseline empty; only assigned retirement documents untracked. No product mutation. One primary checkout, no submodules or nested .git found | verified |
| Product tests/build | Implementer reports 263 tests and build passing; not independently rerun, appropriate to administrative-only scope | unverified independently |
| Active use and final cleanliness | Coordinator reported process inspection; Reviewer does not independently certify future active-user state | unverified; fresh root recheck required |
| Owning-main retirement delivery and checkout absence | Not yet performed | unverified; completion gate remains |

The symlink points to the retiring checkout's disposable node_modules cache. Its target text is preserved; recovery can rebuild that excluded cache. Archive excludes node_modules/, dist/ and .DS_Store; archive remains outside checkout and local-only. No artifact contents were exposed. Root must recheck exact path, refs, worktrees, tracked/untracked/ignored inventory, archive identity, users and delivery immediately before deletion. No remote deletion or history rewrite is approved. User explicitly authorized exact primary checkout removal; routine worktree cleanup prohibition is not the source of that authority.

Verifier correction retained: initial read-only archive verifier assumed every manifest row had sha256 and exited1 on the symlink row (KeyError). Corrected verifier explicitly compared symlink targets without following them; rerun exited0. No archive or subject mutation. All other meaningful independent Git/static/hash checks exited0; no-match rg uses expected exit1.
