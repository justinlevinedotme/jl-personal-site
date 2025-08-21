// app/blog/[slug]/twitter-image.tsx
import OG, { alt, size, contentType } from "./opengraph-image";

// MUST be a string literal in this file
export const runtime = "nodejs";

export { alt, size, contentType };
export default OG;
