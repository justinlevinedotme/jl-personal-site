// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  version?: string;
  cover?: string;
  project: string; // always normalized (never empty) -> "none" if missing
};

const postsDir = path.join(process.cwd(), "content", "posts");

function readFileMaybe(p: string) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
}

/** Return all filenames that are posts (.md or .mdx) */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

/** Read a post by slug (extension-agnostic) and parse front-matter */
export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.(md|mdx)$/, "");

  // prefer .mdx, fall back to .md
  const mdxPath = path.join(postsDir, `${realSlug}.mdx`);
  const mdPath = path.join(postsDir, `${realSlug}.md`);

  const file =
    readFileMaybe(mdxPath) ??
    readFileMaybe(mdPath) ??
    (() => {
      throw new Error(`Post not found: ${realSlug} (.mdx or .md)`);
    })();

  const { data, content } = matter(file);

  // Normalize project: empty/undefined -> "none"
  const rawProject = (data.project ?? "").toString().trim();
  const project = rawProject.length ? rawProject : "none";

  const meta: PostMeta = {
    slug: realSlug,
    title: data.title ?? realSlug,
    date: data.date ?? new Date().toISOString(),
    summary: data.summary ?? "",
    version: data.version ?? "",
    cover: data.cover ?? "",
    project,
  };

  return { meta, content };
}

/** MDX renderer helper — returns raw MD/MDX source string plus meta */
export async function getPostMdx(slug: string) {
  const { meta, content } = getPostBySlug(slug);
  return { meta, mdx: content };
}

/** List of all posts' metadata, newest → oldest */
export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs.map((s) => getPostBySlug(s).meta);
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Aggregate unique projects with counts (includes "none"; "none" first, then A→Z) */
export function getAllProjects(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of getAllPosts()) {
    const key = (p.project ?? "none").trim() || "none";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) => {
    if (a.name === "none") return -1;
    if (b.name === "none") return 1;
    return a.name.localeCompare(b.name);
  });
}

/** Posts for a given project key (supports "none") */
export function getPostsByProject(name: string) {
  const key = (name ?? "none").trim() || "none";
  return getAllPosts().filter((p) => ((p.project ?? "none").trim() || "none") === key);
}

/** neighbors for prev/next pills (array sorted newest → oldest) */
export function getAdjacentPosts(slug: string) {
  const list = getAllPosts();
  const i = list.findIndex((p) => p.slug === slug);
  return {
    prev: i < list.length - 1 ? list[i + 1] : null, // older (since list is newest→oldest)
    next: i > 0 ? list[i - 1] : null, // newer
  };
}
