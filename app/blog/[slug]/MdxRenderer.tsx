// app/blog/[slug]/MdxRenderer.tsx
"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// client-side UI (shadcn)
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = { slug: string };

// Minimal, lib-agnostic typing for MDX components prop
type ComponentsMap = Record<string, ComponentType<any>>;
type MDXContentProps = { components?: ComponentsMap };

export default function MdxRenderer({ slug }: Props) {
  // Dynamically import the compiled MDX component for this slug
  const MDXContent = dynamic<MDXContentProps>(
    () =>
      import(`@/content/posts/${slug}.mdx`).then(
        (m) => m.default as ComponentType<MDXContentProps>
      ),
    { ssr: false }
  );

  const components: ComponentsMap = {
    Button,
    Badge,
  };

  return (
    <article className="prose dark:prose-invert">
      <MDXContent components={components} />
    </article>
  );
}
