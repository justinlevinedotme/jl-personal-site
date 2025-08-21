// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://justinlevine.me";

  // Static/top-level pages (add or remove as needed)
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`,           changeFrequency: "daily",  priority: 1,   lastModified: new Date() },
    { url: `${baseUrl}/blog`,       changeFrequency: "daily",  priority: 0.9, lastModified: new Date() },
    { url: `${baseUrl}/projects`,   changeFrequency: "weekly", priority: 0.6, lastModified: new Date() },
  ];

  // Blog posts
  const posts = getAllPosts(); // newest → oldest
  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticUrls, ...postUrls];
}
