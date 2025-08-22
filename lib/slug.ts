// lib/slug.ts
/** "Site Changelog" -> "site-changelog" */
export const projectToSlug = (s: string) =>
  (s ?? "none").trim().toLowerCase().replace(/\s+/g, "-");

/** Map a slug back to the original project name */
export const matchProjectBySlug = (slug: string, allNames: string[]) => {
  const target = (slug ?? "").trim().toLowerCase();
  return allNames.find((n) => projectToSlug(n) === target) ?? slug;
};
