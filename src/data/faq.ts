/**
 * FAQ content. Where the real answer depends on commercial facts that were
 * not confirmed (price, free estimation, response time, home visits, service
 * area beyond Geneva, purchasing), the answer below stays honest about that
 * instead of inventing a commitment — see src/data/business.ts appraisalTerms.
 */
export const faqItems = [
  {
    question: "Quels types d'objets pouvez-vous estimer ?",
    answer:
      "King Brocante s'intéresse au mobilier ancien, aux bijoux, montres, argenterie, tableaux, porcelaines, céramiques, objets décoratifs et pièces de collection. Si vous avez un doute sur votre objet, envoyez-nous simplement quelques photos.",
  },
  {
    question: "Comment faire estimer un objet ?",
    answer:
      "Le plus simple est d'envoyer quelques photos de votre objet ainsi que les informations que vous connaissez via notre formulaire. Nous examinons votre demande et revenons vers vous avec un premier avis.",
  },
  {
    question: "Puis-je envoyer des photos depuis mon téléphone ?",
    answer:
      "Oui. Notre formulaire est conçu pour que vous puissiez prendre des photos directement avec votre téléphone ou en sélectionner depuis votre galerie, sans aucune installation nécessaire.",
  },
  {
    question: "L'estimation est-elle gratuite ?",
    answer:
      "TODO: information à confirmer par King Brocante avant publication — les conditions exactes de l'estimation seront précisées ici.",
  },
  {
    question: "Intervenez-vous à domicile ?",
    answer:
      "TODO: information à confirmer par King Brocante avant publication — la possibilité d'une visite à domicile sera précisée ici.",
  },
  {
    question: "Pouvez-vous intervenir lors d'une succession ?",
    answer:
      "Nous pouvons accompagner l'identification et la valorisation d'objets dans le cadre d'une succession ou d'un débarras. Contactez-nous pour nous décrire votre situation.",
  },
  {
    question: "Que faire si je ne connais rien sur l'objet ?",
    answer:
      "Ce n'est pas un problème : décrivez simplement ce que vous savez (provenance, ancienneté approximative, état) et joignez des photos nettes. Notre regard fait le reste pour la première analyse.",
  },
  {
    question: "Intervenez-vous en dehors de Genève ?",
    answer:
      "TODO: information à confirmer par King Brocante avant publication — la zone d'intervention exacte au-delà de Genève sera précisée ici.",
  },
] as const;

/**
 * faqItems with unconfirmed (TODO) answers stripped out — use this wherever
 * FAQ content is rendered for visitors. The raw list above is kept for
 * reference/filtering by question text; never render a "TODO" answer on-page.
 */
export const publishedFaqItems = faqItems.filter((item) => !item.answer.startsWith("TODO"));
