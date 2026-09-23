/**
 * trainingMethods — editorial
 * Source: methodSources
 * Review frequency: Quarterly; on method implementation/documentation changes.
 * Update: Update use cases and limitations; keep stable method IDs and match supported arithmetic.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "editorial",
    "reviewed": "2026-09-23",
    "frequency": "Quarterly; on method implementation/documentation changes.",
    "source": "methodSources",
    "how": "Update use cases and limitations; keep stable method IDs and match supported arithmetic."
  },
  "values": [
    {
      "id": "qlora",
      "name": "QLoRA · supervised adapters",
      "use": "Best suited to supervised adaptation when GPU memory is limited. Choose over LoRA when a quantized frozen base is needed to fit.",
      "constraint": "Requires compatible quantization and training kernels. Quantization can affect quality and speed; only adapter weights are learned."
    },
    {
      "id": "lora",
      "name": "LoRA · supervised adapters",
      "use": "A good starting point for task, style and tool-use demonstrations when BF16 base weights fit. Small adapters are easy to store and switch.",
      "constraint": "Uses more base-weight memory than QLoRA. Adapter capacity and target layers can limit adaptation."
    },
    {
      "id": "full",
      "name": "Full supervised fine-tuning",
      "use": "Useful when broad changes across the model are needed and you have enough high-quality demonstrations and compute.",
      "constraint": "Updates all weights. Much larger gradient and optimizer memory; greater risk of overfitting and forgetting. Not automatically better than adapters."
    },
    {
      "id": "partial",
      "name": "Partial supervised fine-tuning",
      "use": "Useful when selected layers need adaptation while the rest of the model remains frozen. A compromise between full tuning and adapters.",
      "constraint": "Choosing the right layers requires experiments. A smaller trainable fraction reduces optimizer memory, but does not imply proportional speedup."
    },
    {
      "id": "cpt",
      "name": "Continued pretraining",
      "use": "Useful for adapting to domain language, code or a new text distribution using an unlabeled corpus, often before supervised tuning.",
      "constraint": "Can require substantial corpus data and compute. Does not directly teach instruction-following; monitor forgetting and downstream task quality."
    },
    {
      "id": "dpo",
      "name": "DPO · preference optimization",
      "use": "Useful when you have preferred/rejected answer pairs and want to improve behavior or style without online RL rollouts.",
      "constraint": "Requires reliable preference pairs and a reference policy. Both answers are processed; reference work and memory depend on the recipe."
    },
    {
      "id": "distill",
      "name": "Knowledge distillation",
      "use": "Useful for transferring a teacher’s behavior to a smaller or specialized student. This estimate covers offline teacher-generated text followed by student training.",
      "constraint": "Teacher generation adds cost. Student capacity limits transfer. Online or logits-based distillation needs a different measured pipeline."
    },
    {
      "id": "ppo",
      "name": "PPO · reinforcement learning",
      "use": "Useful when task quality can be scored and online exploration is valuable, including learned human/AI preference rewards.",
      "constraint": "Requires rollouts, reward evaluation and a trained value/critic model. Expensive and sensitive to reward design; guard against reward exploitation."
    },
    {
      "id": "grpo",
      "name": "GRPO · reinforcement learning",
      "use": "Useful for reasoning, coding and other tasks with verifiable rewards, comparing multiple sampled responses per prompt.",
      "constraint": "Avoids PPO’s critic, but multiple rollouts can dominate cost. Rewards must distinguish responses; reward quality remains critical."
    }
  ]
};
