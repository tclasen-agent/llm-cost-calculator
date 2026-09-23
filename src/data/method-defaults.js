/**
 * methodDefaults — assumption
 * Source: Dataset/recipe pilot and teacher/reward service invoices
 * Review frequency: Every training recipe or experiment change.
 * Update: Update auxiliary generation/forward throughput in tokens/sec, teacher/reward costs, model sizes, rollout counts and trainable percentages.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "assumption",
    "reviewed": "2026-09-23",
    "frequency": "Every training recipe or experiment change.",
    "source": "Dataset/recipe pilot and teacher/reward service invoices",
    "how": "Update auxiliary generation/forward throughput in tokens/sec, teacher/reward costs, model sizes, rollout counts and trainable percentages."
  },
  "values": {
    "updateMethod": "lora",
    "trainablePercent": 10,
    "corpusTokens": 100000000,
    "referenceModel": 1,
    "referenceMode": "resident",
    "teacherMode": "local",
    "teacherParameters": 70,
    "teacherCost": 0,
    "completionTokens": 1000,
    "generations": 4,
    "policyUpdates": 1,
    "rewardParameters": 0,
    "rolloutCopy": 1,
    "auxiliaryGB": 16,
    "buyForward": 2000,
    "rentForward": 4000,
    "buyGeneration": 50,
    "rentGeneration": 100,
    "rewardSeconds": 0,
    "rewardCost": 0
  }
};
