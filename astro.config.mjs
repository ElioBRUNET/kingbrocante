// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// TODO: confirm the final production domain and update this before launch
// (also update src/data/business.ts -> productionDomain to match).
const SITE_URL = "https://kingbrocante.ch";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: "never",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/404") &&
        !page.includes("/politique-de-confidentialite") &&
        !page.includes("/mentions-legales"),
    }),
  ],
});
