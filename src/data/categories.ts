export type ObjectCategory = {
  slug: string;
  title: string;
  description: string;
  image?: string; // filename inside src/assets/images, resolved via import.meta.glob
  alt?: string;
};

/**
 * Primary categories shown on the homepage grid.
 * Each maps to a real supplied photo — see src/components/ObjectGrid.astro
 * for how these filenames resolve to optimized images.
 */
export const homeCategories: ObjectCategory[] = [
  {
    slug: "mobilier",
    title: "Mobilier & meubles anciens",
    description: "Commodes, armoires, sièges et bureaux anciens.",
    image: "category-mobilier.jpg",
    alt: "Meuble ancien examiné dans un intérieur chargé d'histoire",
  },
  {
    slug: "bijoux",
    title: "Bijoux",
    description: "Bijoux anciens, or, argent et pierres.",
    image: "category-bijoux.jpg",
    alt: "Bijoux anciens et montres présentés pour une estimation",
  },
  {
    slug: "montres",
    title: "Montres & horlogerie",
    description: "Montres de collection et pièces d'horlogerie.",
    image: "category-montres.jpg",
    alt: "Mécanisme d'horlogerie ancien examiné avec attention",
  },
  {
    slug: "argenterie",
    title: "Argenterie & orfèvrerie",
    description: "Argenterie, orfèvrerie et pièces en métal précieux.",
    image: "category-argenterie.jpg",
    alt: "Pendule et objets en métal doré présentés sur un guéridon",
  },
  {
    slug: "tableaux",
    title: "Tableaux & œuvres",
    description: "Peintures, gravures et œuvres encadrées.",
    image: "category-tableaux.jpg",
    alt: "Collection de tableaux anciens encadrés sur un mur",
  },
  {
    slug: "decoration",
    title: "Objets anciens & décoration",
    description: "Objets décoratifs anciens à la croisée des styles.",
    image: "category-decoration.jpg",
    alt: "Objet ancien mis en valeur dans un intérieur contemporain",
  },
  {
    slug: "porcelaine",
    title: "Porcelaine & céramique",
    description: "Porcelaines, céramiques et faïences anciennes.",
    image: "category-porcelaine.jpg",
    alt: "Collection de porcelaines et céramiques anciennes",
  },
  {
    slug: "collection",
    title: "Objets de collection",
    description: "Pièces rares et objets de collection variés.",
    image: "category-collection.jpg",
    alt: "Objet de collection en bronze finement ouvragé",
  },
];

/**
 * Extended categories presented on /objets without a dedicated supplied
 * photo. Shown as a simple text/icon list rather than photographed cards,
 * so we never imply photographic expertise we can't back up with a real image.
 */
export const extendedCategories: string[] = [
  "Bronzes",
  "Sculptures",
  "Livres anciens",
  "Verrerie",
  "Cristal",
  "Design du XXe siècle",
  "Tapis",
  "Maroquinerie",
  "Monnaies",
  "Médailles",
];
