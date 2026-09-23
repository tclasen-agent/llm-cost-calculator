/**
 * inferenceMemory — assumption
 * Source: Editorial 4-bit planning budgets checked against total checkpoint parameters in trainingModels and model cards; no archived pilot measurements
 * Review frequency: Every model/runtime/precision/context change.
 * Update: Update aggregate memory GB for the assumed recipe. This never certifies hardware compatibility.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "assumption",
    "reviewed": "2026-09-23",
    "frequency": "Every model/runtime/precision/context change.",
    "source": "Editorial 4-bit planning budgets checked against total checkpoint parameters in trainingModels and model cards; no archived pilot measurements",
    "how": "Update aggregate memory GB for the assumed recipe. This never certifies hardware compatibility."
  },
  "values": {
    "ds41": 450,
    "glm53": 480,
    "glm53flash": 200,
    "qwen38large": 1500,
    "qwen38small": 22,
    "minimax27": 160,
    "nemotron-lightning": 24,
    "kimi3": 1750,
    "nemotron-ultra": 360,
    "nemotron-super": 90,
    "minimax": 160,
    "qwen80": 60,
    "kimi25": 625,
    "nemotron-nano": 24,
    "deepseek": 440,
    "oss120": 85,
    "qwen30": 24,
    "oss20": 16,
    "granite42": 8
  }
};
