// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { projectToSlug } from "@/lib/slug";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const posts = getAllPosts();

  const blogEntries = posts.map<MetadataRoute.Sitemap[number]>((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectNames = Array.from(
    new Set(posts.map((p) => (p.project ?? "none").trim() || "none"))
  ).filter((n) => n !== "none");

  const projectEntries = projectNames.map<MetadataRoute.Sitemap[number]>(
    (name) => ({
      url: `${base}/projects/${projectToSlug(name)}`,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/projects`, changeFrequency: "weekly", priority: 0.6 },
    ...projectEntries,
    ...blogEntries,
  ];
}
