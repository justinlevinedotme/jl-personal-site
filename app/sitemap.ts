import { getAllPosts, getAllProjects } from "@/lib/posts";

export default async function sitemap() {
  const baseUrl = "https://yourdomain.com"; // change me

  const posts = getAllPosts().map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.date,
  }));

  const projects = getAllProjects().map((pr) => ({
    url: `${baseUrl}/projects/${encodeURIComponent(pr.name)}`,
    lastModified: new Date().toISOString(),
  }));

  const staticPages = [
    { url: baseUrl, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/projects`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
  ];

  return [...staticPages, ...posts, ...projects];
}
