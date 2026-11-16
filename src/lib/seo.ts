import { siteConfig } from "@/config/site";
import { expertiseAreas } from "@/data/profile";
import { technologies } from "@/data/skills";

/** Schema.org: Person + WebSite (renderizado como JSON-LD no layout) */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        jobTitle: siteConfig.role,
        description: siteConfig.description,
        url: siteConfig.url,
        image: `${siteConfig.url}/opengraph-image`,
        sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
        knowsAbout: [...expertiseAreas.map((a) => a.title), ...technologies],
        address: { "@type": "PostalAddress", addressCountry: "BR" },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.title,
        inLanguage: "pt-BR",
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };
}

/** Evita quebra do <script> caso algum texto contenha "<" */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
