/**
 * audit — editorial
 * Source: Registered dataset source references and the candidate sources below.
 * Review frequency: With each full external-data audit; revisit deferred options on publication or availability changes.
 * Update: Review every registered dataset. Record scope, unresolved evidence and candidate disposition without copying canonical prices or specifications. A source check is not a pilot, quote or compatibility certification.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "editorial",
    "reviewed": "2026-10-24",
    "frequency": "With each full external-data audit; revisit deferred options on publication or availability changes.",
    "source": "Registered dataset source references and the candidate sources below.",
    "how": "Review every registered dataset. Record scope, unresolved evidence and candidate disposition without copying canonical prices or specifications. A source check is not a pilot, quote or compatibility certification."
  },
  "values": {
    "coverage": {
      "sources": "Reviewed every shared publisher link and all method links on October 24. Direct retrieval required web fallback for AMD, HP, Framework and NVIDIA investor pages. Framework now leads with PRO 495; the specs tab still includes the maintained 395 systems, so its source now links there. Source receipts retain URL, content hash or web retrieval reference, reviewed fields and limitations.",
      "models": "Reviewed all 19 model cards and all selected endpoint tuples. Updated GLM-5.3 Inceptron and Kimi K3 Relace prices. Qwen Coder 30B Novita is absent; replaced its entire tuple with the current non-discounted SiliconFlow FP8 endpoint. Other selected endpoints still match. Vendor evaluation wording matches the original cards. Stable model IDs remain unchanged; API precision does not change the independent self-hosted recipe.",
      "hardware": "Reviewed every maintained system and derived cluster: installed memory, CPU/GPU, storage, OS, allocation limits, quoted scope and runtime source. HP now publishes complete-system G1a and RTX 4000 Ada sale prices; replaced their unknown prices and removed superseded allowances. RTX 2000 Ada still shows a placeholder zero, retained as unknown. Other published prices/specifications match. Framework and AMD now advertise PRO 495/192 GB; candidate disposition below no longer claims coming soon.",
      "rentals": "Compared all 22 Lambda instance records field by field with all four GPU-count tables: GPU, count, VRAM, CPU, RAM, storage and per-GPU hourly price. All match; taxes and stock remain separate.",
      "rentalTerms": "Reviewed Lambda billing and price-table footnotes. Clarified that one-minute billing starts after launch and passing health checks, ends on termination, includes idle time, and published rates exclude applicable taxes. Filesystem charges survive instance termination.",
      "purchaseAllowances": "Reviewed all complete-system and cluster budgets against maintained vendor configurations and current Puget component costs. Removed the two allowances superseded by published HP system prices. Remaining amounts are illustrative whole-system budgets, not current quotes; network extras remain explicit assumptions.",
      "inferenceMemory": "Reviewed every four-bit aggregate memory budget against all 19 model-card checkpoint totals, retaining headroom above raw four-bit storage. Context/cache/batch/runtime overhead and fit remain assumptions rather than measured or certified compatibility.",
      "workloads": "Reviewed every usage/template field, model shortlist and task rationale against all maintained model cards. Retained illustrative calls, token mix, concurrency and ordering; no usage pilot supports replacing them. New releases are candidate reviews below, not automatic rewrites of saved models.",
      "inferenceDefaults": "Reviewed every initial/reset field, selected ID, October planning month and empty user-evidence value. October remains the current month; no month/date bump was needed. Preserve current saved/shared overrides and all configuration-specific measurements on catalog refresh.",
      "inferencePolicy": "Reviewed each memory, concurrency, prefill/decode, power/idle/cooling, fee/setup, schedule, baseline/peak, price-decline, lifecycle and projection coefficient. Retained all as labeled planning assumptions. Historical Stanford cost trends and NVIDIA generation cadence do not establish scenario forecasts or measurements.",
      "tariff": "Reviewed GS-1 applicability, both distribution blocks, seasonal generation blocks, transmission, all 17 riders including deferred fuel, surcharge, every consumption-tax threshold/rate and Loudoun fixed/rate/cap. All match the current filed tariff and county page. Conservative demand exclusion and special-contract/data-center exclusions remain.",
      "frontier": "Reviewed every maintained benchmark score, cost and reasoning variant under Index v4.3.2, including historical pages. DeepSeek original V4.1 Flash measured task cost changed; MiniMax M2.7 now lacks measured task cost and is excluded. Added current GPT-6.1 Sol from the evaluator and official API documentation; rechecked all other reference prices, context/output limits, long-input policy and promotion. Every retained selected benchmark now links its exact variant page.",
      "trainingModels": "Checked all 19 total checkpoint sizes against HF tensor summaries and all four Unsloth supervised adapter memory figures. All match. Recipes support only the documented supervised stack/objective; no arbitrary method or end-to-end compatibility is inferred.",
      "trainingEligibility": "Reviewed license labels across all 19 model cards and stack instructions. Kept license/stack qualification: open weights do not establish license permission for every use or working adaptation.",
      "trainingSystems": "Reviewed every shared hardware/rental reference and custom-system field. Prices/resources still derive from canonical owners; custom GPU counts/VRAM, zero quote defaults and power remain explicit user-scenario assumptions. No pilot power evidence was supplied.",
      "trainingDefaults": "Reviewed every model/method/task/system selection, dataset/token/sequence/microbatch/cadence field, throughput range, quote/evidence flag, energy/cooling/support/setup/overhead/campaign default. Retained illustrative values and empty evidence; no user dataset, bill, complete quote or pilot justifies recalibration.",
      "methodDefaults": "Reviewed each update method, trainable fraction, corpus, reference/teacher mode, auxiliary model size/memory, generation length/count, policy update, forward/generation speed and reward/teacher cost/time default against current method descriptions. Retained assumptions without inventing experiment/invoice evidence.",
      "trainingPolicy": "Rechecked weight/master-weight/gradient/Adam byte arithmetic against Transformers GPU-memory documentation and the quantized supervised recipes. Retained memory headroom, activation scaling/reference sequence and monthly capacity as planning assumptions.",
      "trainingMethods": "Reviewed all nine method IDs, labels, use cases and limitations against current training documentation. DPO reference work, experimental PPO critic/rollouts, GRPO optional reference/KL and offline sequence-distillation descriptions remain applicable. Pin stack versions for real runs.",
      "methodSources": "Reviewed all five method-document/paper URLs and their substantive content. Current Transformers memory anatomy, TRL DPO/experimental PPO/GRPO and the original sequence-distillation paper still support the explanations.",
      "reviewedConfigurations": "Reviewed the empty registry and exact model/runtime/system/workload evidence requirements. No exact independently reviewed run was supplied or established. Keep the registry empty and preserve the distinction between labeled feasibility estimates and verified configurations."
    },
    "candidates": [
      {
        "id": "framework-next-memory",
        "sourceRef": "frameworkDesktop",
        "status": "further-review",
        "reason": "The vendor now publishes PRO 495 / 192 GB configurations. Retained 395 IDs keep their original specifications. A new catalog entry needs a complete configuration/price and runtime allocation review; published installed memory alone does not establish usable model memory."
      },
      {
        "id": "new-open-weight-releases",
        "sourceRef": "api",
        "status": "further-review",
        "reason": "Current catalog includes DeepSeek V4.1 Flash 1017, MiniMax M3.1 Flash, Kimi K3.1 Pro and other newer releases. Keep distinct revisions separate from saved model IDs. Full checkpoint, selected-endpoint and deployment-memory review is required before adding a usable buy/rent/API comparison."
      },
      {
        "id": "new-api-only-releases",
        "sourceRef": "api",
        "status": "deferred",
        "reason": "Anonymous, proprietary, batch and tiered offerings cannot be inserted as interchangeable self-hosted models. A separate API-only comparison design would be needed."
      },
      {
        "id": "additional-workstation-gpus",
        "sourceRef": "pugetWorkstation",
        "status": "further-review",
        "reason": "Additional AMD, Intel and NVIDIA workstation variants are listed. Exact host builds and backend-specific performance remain unverified; avoid assigning measured-equivalence claims."
      },
      {
        "id": "new-data-center-tax",
        "sourceRef": "tariff",
        "status": "out-of-scope",
        "reason": "The filed consumption-tax section includes a separate data-center operator charge. The app explicitly excludes data-center classifications; affected users need an all-in bill rate rather than the standard small-business estimate."
      },
      {
        "id": "measured-inference-performance",
        "sourceRefs": [
          "frameworkDesktop",
          "amdHalo",
          "exoRuntime"
        ],
        "status": "further-review",
        "reason": "Published inference examples could support configuration-specific presets, but workload, precision, context and software versions must be modeled before replacing the generic throughput proxy."
      },
      {
        "id": "amd-next-memory",
        "sourceRef": "amdHalo",
        "status": "further-review",
        "reason": "The vendor now publishes PRO 495 / 192 GB configurations. Retained 395 IDs keep their original specifications. A new catalog entry needs a complete configuration/price and runtime allocation review; published installed memory alone does not establish usable model memory."
      }
    ],
    "migration": "Existing IDs and browser-storage/URL formats remain unchanged. No saved measurement is rewritten by this data refresh. Scenarios that no longer fit are preserved as rejected input by recovery and fall back to the usable default; explicit configuration changes continue to clear only scoped measurements and system quotes."
  }
};
