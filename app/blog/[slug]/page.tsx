// app/blog/[slug]/page.tsx
import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts, getPostMdx, getAdjacentPosts } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PrevNext from "@/components/prev-next";
import ThemeSelect from '@/components/theme-select'

import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Button } from "@/components/ui/button";

const mdxComponents = {
  Button,
  Badge, // optional: allow <Badge> in posts too
};

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { meta } = await getPostMdx(params.slug);
  return {
    title: `${meta.title} • Justin’s Projects`,
    description: meta.summary ?? "",
  };
}

export default async function PostPage({ params }: Props) {
  const { meta, mdx } = await getPostMdx(params.slug);
  const { prev, next } = getAdjacentPosts(params.slug);

  return (
    <>
      {/* top row: breadcrumbs (left) + date badge (right) */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {meta.project ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/projects/${encodeURIComponent(meta.project)}`}>
                      {meta.project}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ) : null}

            <BreadcrumbSeparator />
            <BreadcrumbItem>{meta.title}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2 text-sm">
          {meta.date && (
            <Badge variant="outline">
              {format(new Date(meta.date), "MMMM d, yyyy")}
            </Badge>
          )}
          {/* You can expose project as a badge too if you want: */}
          {/* {meta.project && (
            <Badge asChild variant="outline">
              <Link href={`/projects/${encodeURIComponent(meta.project)}`}>
                {meta.project}
              </Link>
            </Badge>
          )} */}
        </div>
      </div>

      <h1 className="display text-[2rem] mt-2 font-semibold">{meta.title}</h1>

      {meta.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={meta.cover}
          alt=""
          className="rounded-xl border border-line mt-3"
        />
      )}

      {/* MDX content */}
      <article className="prose prose-invert">
        <MDXRemote
          source={mdx}
          components={mdxComponents} // 👈 gives MDX access to <Button /> etc.
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
              ],
            },
          }}
        />
      </article>

      <Separator className="bg-line my-6" />

      <PrevNext
        prev={prev ?? null}
        next={next ?? null}
        showVersion
        className="mt-8"
      />
    </>
  );
}
