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
    "reviewed": "2026-09-27",
    "frequency": "With each full external-data audit; revisit deferred options on publication or availability changes.",
    "source": "Registered dataset source references and the candidate sources below.",
    "how": "Review every registered dataset. Record scope, unresolved evidence and candidate disposition without copying canonical prices or specifications. A source check is not a pilot, quote or compatibility certification."
  },
  "values": {
    "coverage": {
      "sources": "Retrieved all shared source links. AMD, Framework, HP and NVIDIA investor pages required web retrieval after direct requests failed. The same source scopes remain available; no link replacements were needed.",
      "models": "Reviewed every model card and selected endpoint response. Refreshed changed prices. The previous DeepSeek Relace and GLM InferenceNet tags disappeared: DeepSeek now uses the current Relace tag with unknown precision; GLM uses the non-discounted Inceptron FP4 endpoint because InferenceNet now reports a temporary discount. Price pairs, precision and limits come from each selected record together.",
      "hardware": "Rechecked all vendor configurations, memory, host specifications, MSRP evidence and EXO documentation. Existing specifications and published prices match. HP listings do not establish a usable purchase price; configurable systems still require complete quotes. Coming-soon memory variants are not treated as orderable configurations.",
      "rentals": "Compared every maintained instance with the complete Lambda table, including per-GPU price and whole-instance CPU, RAM and storage. All stored values match. Stock and region availability still require a checkout check.",
      "rentalTerms": "Reviewed minute billing from launch and health checks through termination, including idle time, taxes and persistent filesystem billing. Existing terms remain applicable.",
      "purchaseAllowances": "Reviewed every whole-system budget and cluster networking allowance against the hardware sources, including current GPU add-on costs. Retained the illustrative budgets; component prices do not establish complete-system quotes.",
      "inferenceMemory": "Compared every planning budget with the model-card total checkpoint size at the assumed four-bit precision. Existing budgets remain above raw weight storage. Context, cache, batching and runtime overhead are still assumptions requiring a pilot.",
      "workloads": "Reviewed every task template, shortlist and rationale against current model-card capabilities. Kept usage assumptions and task ordering; published general benchmarks do not establish performance on the user’s workload.",
      "inferenceDefaults": "Reviewed all initial values, selected IDs, planning month and empty evidence fields. Kept the usable default and user-owned overrides. Initial/reset, saved/shared recovery and enabled selector transitions are regression checked.",
      "inferencePolicy": "Reviewed all memory, performance, power, fee, schedule, lifecycle and price-decline coefficients. Retained them as illustrative planning assumptions; vendor examples and historical cost trends do not provide a replacement measurement for these scenarios.",
      "tariff": "Rechecked the filed GS-1 distribution and seasonal generation blocks, transmission, every maintained rider, deferred fuel, sales/use surcharge, consumption-tax tiers and Loudoun commercial utility tax. All stored values match. The conservative demand gate and exclusion of data-center classifications and special minimum charges remain.",
      "frontier": "Rechecked the benchmark version, every maintained score/cost pair, missing-result pages and official reference-model prices, context/output limits, long-input policy and promotion. Updated Nemotron Ultra task cost and added the now-measured Granite result. Missing task costs remain excluded; deprecated benchmark pages are historical evaluations, not new runs.",
      "trainingModels": "Compared all total checkpoint sizes with model-card tensor summaries and both supervised adapter memory recipes with Unsloth. Existing values match. Recipe memory is not evidence of arbitrary training methods or exact end-to-end compatibility.",
      "trainingEligibility": "Reviewed model-card licenses and training documentation. Kept the requirement to qualify adaptation by the actual license and stack; open weights alone do not establish exact support.",
      "trainingSystems": "Reviewed every shared hardware/rental reference, custom scenario and power assumption. Prices and resources still derive from their canonical owners; no measured power evidence was supplied.",
      "trainingDefaults": "Reviewed every dataset, sequence, cadence, throughput, cost and energy default. Retained illustrative values and empty evidence fields because no user dataset, bill, quote or pilot was supplied.",
      "methodDefaults": "Reviewed auxiliary models, rollout counts, trainable fractions, forward/generation rates and teacher/reward cost assumptions against the method descriptions. No experiment or invoice evidence was supplied to recalibrate the examples.",
      "trainingPolicy": "Checked memory arithmetic against Transformers memory documentation and Unsloth recipes: base weights plus additional master weights, gradients and optimizer state remain consistent. Activation, headroom and monthly capacity are planning assumptions.",
      "trainingMethods": "Reviewed the memory, DPO, experimental PPO, GRPO and sequence-distillation documentation. Existing descriptions remain applicable, including recipe-dependent reference-policy memory and the need to pin implementation versions.",
      "methodSources": "Retrieved every method documentation link and the original distillation paper. Each still supports its maintained explanation.",
      "reviewedConfigurations": "Reviewed the empty evidence registry. No independently reviewed exact end-to-end run was established; kept it empty. Both calculator modes permit labeled estimates without implying certified compatibility."
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
      },
      {
        "id": "amd-next-memory",
        "sourceRef": "amdHalo",
        "status": "deferred",
        "reason": "The vendor labels its next processor and larger-memory Halo configuration as coming soon. Wait for orderable complete systems and allocation evidence."
      }
    ],
    "migration": "Existing IDs and browser-storage/URL formats remain unchanged. No saved measurement is rewritten by this data refresh. Scenarios that no longer fit are preserved as rejected input by recovery and fall back to the usable default; explicit configuration changes continue to clear only scoped measurements and system quotes."
  }
};
