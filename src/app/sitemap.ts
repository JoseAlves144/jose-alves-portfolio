import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { publishedPosts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = publishedPosts[0]?.date ?? "2026-11-10";
  return [
    { url: siteConfig.url, lastModified: latest, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...publishedPosts.map((p) => ({
      url: `${siteConfig.url}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
