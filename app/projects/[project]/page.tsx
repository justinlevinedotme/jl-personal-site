// app/projects/[project]/page.tsx
import Link from "next/link";
import { format } from "date-fns";
import { getAllProjects, getPostsByProject } from "@/lib/posts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { projectToSlug, matchProjectBySlug } from "@/lib/slug";
import { notFound } from "next/navigation";

type Props = { params: { project: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  // prebuild using slugs
  const names = getAllProjects()
    .map((p) => p.name)
    .filter(Boolean);
  return names.map((name) => ({ project: projectToSlug(name) }));
}

export default function ProjectPage({ params }: Props) {
  // Map slug -> original display name
  const allNames = getAllProjects()
    .map((p) => p.name)
    .filter(Boolean);
  const projectName = matchProjectBySlug(params.project, allNames);

  // If the slug doesn't match any known project, 404
  if (!allNames.includes(projectName)) notFound();

  const posts = getPostsByProject(projectName);

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
          <BreadcrumbItem>{projectName}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="display lower mt-3">{projectName}</h1>

      {posts.length === 0 ? (
        <p className="text mt-4">no posts yet for this project.</p>
      ) : (
        <div className="grid gap-4 mt-4">
          {posts.map((p) => (
            <Card key={p.slug} className="bg-card border border-border">
              <CardHeader className="pb-2">
                <CardTitle className="lower">
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                {format(new Date(p.date), "MMMM d, yyyy")}
                {p.summary ? (
                  <p className="text-muted-foreground mt-2">{p.summary}</p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
