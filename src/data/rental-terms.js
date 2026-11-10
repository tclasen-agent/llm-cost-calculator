/**
 * rentalTerms — published
 * Source: sources.rentalBilling
 * Review frequency: With rental billing changes.
 * Update: Review taxes, storage, reservation/availability and current-rate access limitations. Record the last public rate snapshot and announced effective date without treating future rates as current quotes.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "published",
    "reviewed": "2026-11-10",
    "frequency": "With rental billing changes.",
    "source": "sources.rentalBilling",
    "how": "Review taxes, storage, reservation/availability and current-rate access limitations. Record the last public rate snapshot and announced effective date without treating future rates as current quotes."
  },
  "values": {
    "billing": "On-demand USD; published rates exclude applicable sales tax/VAT/GST. Billed in one-minute increments after launch and passing health checks until termination, including idle time. Region/stock not guaranteed. Persistent filesystems remain billable while they exist; confirm storage and other extras at checkout. Not a performance-equivalent substitute.",
    "lastPublicSnapshot": "2026-10-24",
    "announcedEffectiveOn": "2026-11-16",
    "rateNotice": "Rental estimates retain the last public rate snapshot; current rates require account login and are unverified. Announced future rates are listed separately in the inventory and are not applied early. Confirm your account quote before renting."
  }
};
