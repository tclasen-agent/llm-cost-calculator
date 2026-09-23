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
    "reviewed": "2026-09-23",
    "frequency": "With each full external-data audit; revisit deferred options on publication or availability changes.",
    "source": "Registered dataset source references and the candidate sources below.",
    "how": "Review every registered dataset. Record scope, unresolved evidence and candidate disposition without copying canonical prices or specifications. A source check is not a pilot, quote or compatibility certification."
  },
  "values": {
    "coverage": {
      "sources": "Checked all shared links. Replaced the Lambda billing redirect and the moved HP product URL. Vendor pages that rejected direct requests were inspected through web retrieval; the HP sibling listing confirms the smaller Ada SKU.",
      "models": "Compared every existing selected provider/tag against its endpoint response, including paired prices, precision and limits. Checked model cards and retained vendor attribution. Refreshed changed endpoint fields; added smaller open-weight alternatives.",
      "hardware": "Reviewed vendor specifications, configured GPU options, published system-price evidence and EXO documentation. Added listed configurations; retained null prices where no exact complete-system quote is available. HP placeholder zero prices are not prices.",
      "rentals": "Compared every existing instance against the full provider table; added omitted configurations. Host resources and per-GPU prices were transcribed together. Region availability remains unverified.",
      "rentalTerms": "Reviewed the current billing page, including idle-instance and persistent-filesystem billing; replaced the redirect and clarified terms.",
      "purchaseAllowances": "Retained estimates as estimates. Raised selected workstation budgets where current GPU add-on prices left insufficient or no host-system allowance. New hardware budgets are editorial, not quotes.",
      "inferenceMemory": "Checked every budget against total checkpoint size at the stated planning precision. Corrected undersized Kimi budgets and added small-model budgets. Context, KV cache, batching and runtime overhead still require measurement.",
      "workloads": "Reviewed task shortlists against model-card capabilities. Added compact chat/support candidates without promoting them as benchmark leaders. Usage templates remain illustrative.",
      "inferenceDefaults": "Reviewed selected IDs and current planning month; kept the default scenario and empty evidence fields. Validate initial load, reset and saved/shared recovery with the refreshed catalog.",
      "inferencePolicy": "Reviewed all coefficients as illustrative planning policy. Vendor performance claims and historical cost trends do not justify replacing unmeasured throughput, energy or future decline assumptions.",
      "tariff": "Compared GS-1 blocks, seasonal rates, transmission, every maintained rider, deferred fuel, surcharge and consumption tiers against the filed tariff, and commercial utility tax against the county page. Existing values match. Data-center classifications, demand/minimum charges and exemptions remain outside this small-business calculation.",
      "frontier": "Rechecked benchmark version, evaluated variants, scores and task costs; checked all official reference-model prices, limits, long-input policy and promotional qualification. Added a measured small-model result; unavailable comparisons remain explicitly missing.",
      "trainingModels": "Checked total checkpoint sizes against model-card tensor summaries and supervised recipe memory against Unsloth. Existing parameter and recipe values match. Shared model identity now owns the promoted inference model; the new small-model size follows the tensor summary rather than the rounded marketing name.",
      "trainingEligibility": "Retained license and stack-support qualification. Open weights and a documented recipe do not establish exact end-to-end compatibility.",
      "trainingSystems": "Reviewed references and power assumptions. Added rental references without copying provider prices or resources; power values remain assumptions.",
      "trainingDefaults": "Reviewed dataset, cadence, sequence, cost and throughput defaults as scenario inputs. No new user dataset, utility bill, quote or pilot was supplied; empty evidence fields remain empty.",
      "methodDefaults": "Reviewed auxiliary model, rollout, throughput and teacher/reward assumptions. No measured experiment or invoice evidence is available to recalibrate these defaults.",
      "trainingPolicy": "Reviewed memory arithmetic against the memory and recipe documentation. Coefficients remain recipe assumptions; no exact training compatibility is inferred.",
      "trainingMethods": "Reviewed memory, DPO, PPO, GRPO and sequence-distillation documentation. Clarified experimental PPO support and optional GRPO reference-policy memory.",
      "methodSources": "Retrieved every linked method document and confirmed scope. Links still resolve; version pinning remains necessary for reproduction.",
      "reviewedConfigurations": "No exact, current, independently reviewed end-to-end run was established. Kept the registry empty and fine-tuning hardware gates closed."
    },
    "candidates": [
      {
        "id": "framework-next-memory",
        "sourceRef": "frameworkDesktop",
        "status": "deferred",
        "reason": "Vendor advertises a higher-memory configuration as coming soon. Wait for an orderable complete-system configuration and verified allocation limits before catalog inclusion."
      },
      {
        "id": "new-open-weight-releases",
        "sourceRef": "api",
        "status": "further-review",
        "reason": "The provider catalog also lists MiMo, Qwen Flash, Nex and task-specialist releases. Each needs checkpoint-size, runtime-memory and selected-endpoint review before becoming a usable buy/rent/API comparison."
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
      }
    ],
    "migration": "Existing IDs and browser-storage/URL formats remain unchanged. No saved measurement is rewritten by this data refresh. Scenarios that no longer fit are preserved as rejected input by recovery and fall back to the usable default; explicit configuration changes continue to clear only scoped measurements and system quotes."
  }
};
