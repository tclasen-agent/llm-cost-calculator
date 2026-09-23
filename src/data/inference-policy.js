/**
 * inference-policy — assumption
 * Source: Internal planning policy; workload pilot, utility bill and HVAC measurements
 * Review frequency: Each planning cycle; remeasure performance/energy on configuration changes.
 * Update: Review each coefficient independently. Speed/memory/power values are illustrative, lifecycle/declines are scenarios, not forecasts. Fractions use 0–1; declines use percent/year.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "assumption",
    "reviewed": "2026-09-23",
    "frequency": "Each planning cycle; remeasure performance/energy on configuration changes.",
    "source": "Internal planning policy; workload pilot, utility bill and HVAC measurements",
    "how": "Review each coefficient independently. Speed/memory/power values are illustrative, lifecycle/declines are scenarios, not forecasts. Fractions use 0–1; declines use percent/year."
  },
  "values": {
    "localUsable": 0.85,
    "rentalUsable": 0.9,
    "concurrencyMemoryGB": 0.5,
    "unifiedTps": 30,
    "gpuTps": 100,
    "concurrencySpeedCap": 4,
    "prefillMultiplier": 10,
    "setupFraction": 0.08,
    "localExtras": 20,
    "rentalSetup": 0,
    "rentalExtras": 50,
    "apiExtras": 0,
    "unifiedWatts": 200,
    "workstationWatts": 600,
    "hgxWatts": 10000,
    "idleFraction": 0.1,
    "coolingFraction": 0.25,
    "baselineKwh": 1000,
    "peakKw": 5,
    "marginalSampleKwh": 100,
    "purchaseDiscount": 0,
    "rentalDecline": 50,
    "apiDecline": 80,
    "modelRefresh": 3,
    "hardwareRefresh": 6,
    "businessHours": 8,
    "factoryHours": 24,
    "projectionMonths": 120,
    "displayMinMonths": 12,
    "displayMaxMonths": 24,
    "displayWindowMultiplier": 2,
    "runtimeDescription": "Planning assumption: 4-bit runtime; validate quality and deployment support"
  }
};
