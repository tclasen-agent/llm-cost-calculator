/**
 * purchase-allowances — assumption
 * Source: Whole-system vendor quotes; hardware source links
 * Review frequency: Monthly and for each purchase decision.
 * Update: Replace budget estimates with current complete-system allowances; published prices belong in hardware. Include host and cluster networking.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "assumption",
    "reviewed": "2026-09-23",
    "frequency": "Monthly and for each purchase decision.",
    "source": "Whole-system vendor quotes; hardware source links",
    "how": "Replace budget estimates with current complete-system allowances; published prices belong in hardware. Include host and cluster networking."
  },
  "values": {
    "strix-framework-64": 2500,
    "strix-framework-128": 3500,
    "strix-hp-128": 4500,
    "m5-256": 8000,
    "m5-512": 12000,
    "hp-2000": 3000,
    "hp-4000": 4000,
    "puget-5080": 4500,
    "puget-5090": 6500,
    "puget-pro-4000-blackwell": 6000,
    "puget-pro-5000-blackwell": 9000,
    "puget-pro-6000-blackwell-ws": 15000,
    "supermicro-h100": 300000,
    "spark-x2": {
      "baseHardwareId": "spark",
      "nodes": 2,
      "extras": 1000
    },
    "spark-x4": {
      "baseHardwareId": "spark",
      "nodes": 4,
      "extras": 2000
    },
    "m5-512-x2": {
      "baseHardwareId": "m5-512",
      "nodes": 2,
      "extras": 500
    },
    "m5-512-x4": {
      "baseHardwareId": "m5-512",
      "nodes": 4,
      "extras": 1500
    }
  }
};
