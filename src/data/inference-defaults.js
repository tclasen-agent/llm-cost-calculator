/**
 * inferenceDefaults — scenario
 * Source: Product planning policy; user evidence for overrides
 * Review frequency: Each planning cycle; start month each month.
 * Update: Update initial scenario only. Null fields are populated by planning. Saved overrides remain user-owned and must be reviewed when reopened.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "scenario",
    "reviewed": "2026-09-23",
    "frequency": "Each planning cycle; start month each month.",
    "source": "Product planning policy; user evidence for overrides",
    "how": "Update initial scenario only. Null fields are populated by planning. Saved overrides remain user-owned and must be reviewed when reopened."
  },
  "values": {
    "frontierBasis": "benchmark",
    "localPrefill": null,
    "localDecode": null,
    "rentalPrefill": null,
    "rentalDecode": null,
    "autoHardware": 1,
    "overrides": "",
    "workload": "swe",
    "users": 1,
    "model": "qwen80",
    "hardware": "spark",
    "rental": "a6000-x4",
    "autoRental": 1,
    "autoModel": 1,
    "start": "2026-09",
    "calls": null,
    "input": null,
    "output": null,
    "concurrency": null,
    "usageSource": "",
    "localRph": null,
    "rentalRph": null,
    "localMemory": null,
    "rentalMemory": null,
    "localAvailable": null,
    "rentalAvailable": null,
    "localEvidence": "",
    "rentalEvidence": "",
    "localRuntime": "",
    "rentalRuntime": "",
    "quote": null,
    "quoteSource": "",
    "buildDetails": "",
    "localSetup": null,
    "rentalSetup": null,
    "localExtras": null,
    "rentalExtras": null,
    "apiExtras": null,
    "costSource": "",
    "itKwh": null,
    "coolingKwh": null,
    "energySource": "",
    "tariff": "gs1",
    "baselineKwh": null,
    "peakKw": null,
    "tariffConfirmed": 0,
    "localTax": 1,
    "billRate": null,
    "billSource": "",
    "purchaseDiscount": 0,
    "rentalDecline": 0,
    "apiDecline": 0,
    "priceEvidence": "",
    "modelRefresh": null,
    "hardwareRefresh": null,
    "lifecycleSource": ""
  }
};
