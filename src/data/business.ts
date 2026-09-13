/**
 * Central business configuration for King Brocante.
 *
 * IMPORTANT — single source of truth:
 * Every component/page should import values from here instead of hardcoding
 * business facts. Anything marked TODO is NOT a real confirmed fact — it is a
 * placeholder that must be replaced before launch. Do not invent values.
 */

export const business = {
  businessName: "King Brocante",
  tagline: "Estimation & valorisation d'objets à Genève",

  // TODO: confirm exact legal entity name (e.g. "King Brocante Sàrl") before publishing
  // any legal/contractual page. Falls back to the trade name — never render
  // a raw "TODO" string on the page; pages should check legalNameConfirmed.
  legalName: "King Brocante",
  legalNameConfirmed: false,

  // TODO: no phone number was supplied. Replace before launch. Pages must
  // treat this as absent (hide the phone row) rather than display a
  // placeholder string — never fall back to a "TODO" label on-page.
  phone: null as string | null,

  // TODO: no email address was supplied. Replace before launch. Same rule
  // as phone: absent means hidden, not a "TODO" placeholder on-page.
  email: null as string | null,

  city: "Genève",
  region: "Suisse romande",

  streetAddress: "1, Rue Ermenonville" as string | null,
  postalCode: "1203" as string | null,

  // Areas the business may serve. Not all are confirmed — treat as an
  // editorial/SEO list, not a guarantee, until confirmed by the business.
  // TODO: confirm which of these communes are actually served.
  serviceAreas: [
    "Genève",
    "Carouge",
    "Champel",
    "Eaux-Vives",
    "Plainpalais",
    "Cologny",
    "Veyrier",
    "Chêne-Bougeries",
    "Meyrin",
    "Lancy",
  ],

  // TODO: confirm final production domain and update this + astro.config.mjs "site".
  productionDomain: "https://kingbrocante.ch",

  kingCleaningUrl: "https://kingcleaning.ch/",

  // Access key from https://web3forms.com — estimation requests + photos
  // are emailed to whatever address was used to create this key.
  web3formsAccessKey: "115e7dff-667d-4dc0-aaef-f207450d9884" as string | null,

  socialLinks: {
    // TODO: add real social profiles if/when they exist.
    facebook: null as string | null,
    instagram: null as string | null,
  },

  openingHours: ["Mo-Fr 08:00-18:00"] as string[] | null,
  openingHoursDisplay: "Lun - Ven : 8h00 – 18h00",

  // Commercial/appraisal terms that were NOT confirmed by the business.
  // Do not state these as fact anywhere on the site until confirmed.
  appraisalTerms: {
    isFree: null as boolean | null, // TODO: confirm if the first estimation is free
    responseTime: null as string | null, // TODO: confirm typical response time
    homeVisits: null as boolean | null, // TODO: confirm if home visits are offered
    outsideGeneva: null as boolean | null, // TODO: confirm if service extends beyond Geneva
  },

  primaryCta: "Faire estimer un objet",
  secondaryCta: "Découvrir nos services",
} as const;

export type Business = typeof business;
