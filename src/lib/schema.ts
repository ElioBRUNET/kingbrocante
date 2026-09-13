import { business } from "../data/business";

const siteUrl = business.productionDomain.replace(/\/$/, "");

/**
 * LocalBusiness structured data.
 * Only includes fields we actually know to be true. Any field still marked
 * TODO in src/data/business.ts is omitted entirely — publishing a guessed
 * address/phone in schema.org markup would be worse than omitting it.
 */
export function localBusinessSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.businessName,
    description:
      "King Brocante accompagne l'estimation, la valorisation et la seconde vie d'objets à Genève : mobilier, bijoux, montres, argenterie, tableaux et objets anciens.",
    url: siteUrl,
    areaServed: business.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
  };

  if (business.phone) schema.telephone = business.phone;
  if (business.email) schema.email = business.email;
  if (business.streetAddress) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.city,
      postalCode: business.postalCode ?? undefined,
      addressCountry: "CH",
    };
  }
  if (business.openingHours) schema.openingHours = business.openingHours;

  return schema;
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items
      // Skip TODO/unconfirmed answers in structured data — publishing an
      // "answer" that is actually a placeholder would be misleading to search engines.
      .filter((item) => !item.answer.startsWith("TODO"))
      .map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: `${siteUrl}${opts.path}`,
    provider: {
      "@type": "LocalBusiness",
      name: business.businessName,
    },
    areaServed: business.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
  };
}
