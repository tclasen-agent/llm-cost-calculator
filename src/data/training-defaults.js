/**
 * trainingDefaults — scenario
 * Source: Dataset statistics, pilot throughput, utility bills, complete-system quotes
 * Review frequency: Each dataset version, experiment campaign or bill change.
 * Update: Review dataset counts/tokens, epochs, sequence, microbatch, cadence, speed ranges, costs and evidence. Cost/power/rate initial values derive from selected systems. User overrides are not certification.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "scenario",
    "reviewed": "2026-09-23",
    "frequency": "Each dataset version, experiment campaign or bill change.",
    "source": "Dataset statistics, pilot throughput, utility bills, complete-system quotes",
    "how": "Review dataset counts/tokens, epochs, sequence, microbatch, cadence, speed ranges, costs and evidence. Cost/power/rate initial values derive from selected systems. User overrides are not certification."
  },
  "values": {
    "autoBuy": 1,
    "autoRent": 1,
    "model": "oss120",
    "method": "qlora",
    "task": "security",
    "recipeConfirmed": 0,
    "adapterPercent": 0.1,
    "customBuyGPUs": 8,
    "customBuyVRAM": 80,
    "customRentGPUs": 8,
    "customRentVRAM": 80,
    "rentQuoteEvidence": "",
    "examples": 10000,
    "tokens": 4000,
    "epochs": 2,
    "sequence": 4096,
    "microbatch": 1,
    "runs": 3,
    "runsPerMonth": 1,
    "buy": "workstation96",
    "rent": "h100",
    "buyLow": 125,
    "buyHigh": 500,
    "rentLow": 250,
    "rentHigh": 1000,
    "buyEvidence": "",
    "rentEvidence": "",
    "buyPeak": 0,
    "rentPeak": 0,
    "buySharding": 0,
    "rentSharding": 0,
    "quoteEvidence": "",
    "electricity": 0.15,
    "cooling": 25,
    "support": 20,
    "rentExtras": 10,
    "overhead": 20,
    "setupHours": 1,
    "allocationMonths": 12
  }
};
