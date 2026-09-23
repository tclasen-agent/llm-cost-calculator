/**
 * tariff — published
 * Source: sources.tariff and sources.county
 * Review frequency: Check monthly; update on each tariff/tax effective date.
 * Update: Transcribe GS-1 rates, riders, seasonal boundaries, tax tiers and eligibility threshold. Rates USD/kWh except riders in cents/kWh, county fixed/cap USD. Verify incremental bills at every tier boundary.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "published",
    "reviewed": "2026-09-23",
    "frequency": "Check monthly; update on each tariff/tax effective date.",
    "source": "sources.tariff and sources.county",
    "how": "Transcribe GS-1 rates, riders, seasonal boundaries, tax tiers and eligibility threshold. Rates USD/kWh except riders in cents/kWh, county fixed/cap USD. Verify incremental bills at every tier boundary."
  },
  "values": {
    "ridersCents": {
      "A": 3.7648,
      "C1A": 0.0384,
      "C4A": 0.1116,
      "CCR": 0.1765,
      "CE": 0.4673,
      "CERC": 0.0541,
      "DIST": 0.578,
      "E": 0.0456,
      "GEN": 0.41,
      "OSW": 0.9229,
      "PIPP": 0,
      "RGGI": 0,
      "RPS": 0.552,
      "SMR": 0.0124,
      "SNA": 0.3429,
      "T1": 1.1929,
      "Deferred fuel": 0.2901
    },
    "blockKwh": 1400,
    "summerStart": 6,
    "summerEnd": 9,
    "distributionFirst": 0.025525,
    "distributionRest": 0.018928,
    "generationFirst": 0.030788,
    "generationSummer": 0.04135,
    "generationWinter": 0.019886,
    "transmission": 0.00582,
    "surcharge": 0.000847,
    "consumptionFirstKwh": 2500,
    "consumptionSecondKwh": 50000,
    "consumptionFirst": 0.001565,
    "consumptionSecond": 0.001055,
    "consumptionRest": 0.000845,
    "countyFixed": 0.92,
    "countyPerKwh": 0.005393,
    "countyCap": 72,
    "peakLimitKw": 30
  }
};
