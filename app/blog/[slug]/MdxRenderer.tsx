// app/blog/[slug]/MdxRenderer.tsx
"use client";

import dynamic from "next/dynamic";

// ⬇️ import client-side UI here (shadcn components are client components)
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  slug: string;
};

export default function MdxRenderer({ slug }: Props) {
  // dynamically import the compiled MDX component for this slug
  const MDXContent = dynamic(
    () => import(`@/content/posts/${slug}.mdx` /* webpackChunkName: "post-[request]" */),
    { ssr: false }
  );

  // build the components map on the client so we’re not serializing functions across the RSC boundary
  const components = {
    Button,
    Badge,
  };

  return (
    <article className="prose dark:prose-invert">
      <MDXContent components={components as any} />
    </article>
  );
}
