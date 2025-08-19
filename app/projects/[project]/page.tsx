import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/posts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = { params: { project: string } };
export const dynamicParams = false;

export function generateStaticParams() {
  const projects = Array.from(
    new Set(
      getAllPosts()
        .map((p) => (p.project || "").trim())
        .filter(Boolean)
    )
  );
  return projects.map((name) => ({ project: name }));
}

export default function ProjectPage({ params }: Props) {
  const name = decodeURIComponent(params.project);
  const posts = getAllPosts().filter((p) => (p.project || "").trim() === name);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/projects">projects</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="display lower mt-3">{name}</h1>

      <div className="grid gap-4 mt-4">
        {posts.map((p) => (
          <Card key={p.slug} className="bg-card border-line">
            <CardHeader className="pb-2">
              <CardTitle className="lower">
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              {format(new Date(p.date), "MMM d, yyyy")}
              {p.summary ? <p className="text-text mt-2">{p.summary}</p> : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
