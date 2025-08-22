// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { projectToSlug } from "@/lib/slug";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const posts = getAllPosts();

  const blogEntries = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    changefreq: "monthly" as const,
    priority: 0.7,
  }));

  const projectNames = Array.from(
    new Set(posts.map((p) => (p.project ?? "none").trim() || "none"))
  ).filter((n) => n !== "none");

  const projectEntries = projectNames.map((name) => ({
    url: `${base}/projects/${projectToSlug(name)}`,
    changefreq: "weekly" as const,
    priority: 0.6,
  }));

  return [
    { url: `${base}/`, changefreq: "weekly", priority: 0.8 },
    { url: `${base}/projects`, changefreq: "weekly", priority: 0.6 },
    ...projectEntries,
    ...blogEntries,
  ];
}
