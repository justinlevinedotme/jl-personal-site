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
import ThemeSelect from "@/components/theme-select"; // OK to keep if used
import { Button } from "@/components/ui/button";
// ⬇️ new
import MdxRenderer from "./MdxRenderer";


type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { meta } = await getPostMdx(params.slug);
  return {
    title: `${meta.title} - Justin Levine`,
    description: meta.summary ?? "",

  };
}

export default async function PostPage({ params }: Props) {
  const { meta } = await getPostMdx(params.slug);
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
      {meta.summary && (
        <p className="text-muted-foreground mt-2">{meta.summary}</p>
      )}

      <MdxRenderer slug={params.slug}/>

      { /* debug mode summary */ }
      {process.env.NODE_ENV === "development" && (
        <details className="mt-6">
          <summary className="cursor-pointer text-sm opacity-70">debug: meta</summary>
          <pre className="text-xs p-3 rounded-lg border mt-2 overflow-x-auto">
            {JSON.stringify(meta, null, 2)}
          </pre>
        </details>
      )}


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
