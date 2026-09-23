/**
 * training-policy — assumption
 * Source: sources.training; training method documentation and pilots
 * Review frequency: On training stack, optimizer or memory-layout changes.
 * Update: Recalibrate memory/activation coefficients and monthly capacity allowance and high-confidence memory ceiling (fraction of installed VRAM). Constants model a recipe, not a compatibility guarantee.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "assumption",
    "reviewed": "2026-09-23",
    "frequency": "On training stack, optimizer or memory-layout changes.",
    "source": "sources.training; training method documentation and pilots",
    "how": "Recalibrate memory/activation coefficients and monthly capacity allowance and high-confidence memory ceiling (fraction of installed VRAM). Constants model a recipe, not a compatibility guarantee."
  },
  "values": {
    "usableMemory": 0.95,
    "highConfidenceMemory": 0.8,
    "quantizedBytes": 0.625,
    "frozenBytes": 2,
    "trainableBytes": 16,
    "activationGB": 8,
    "activationSequence": 4096,
    "monthlyHours": 730
  }
};
