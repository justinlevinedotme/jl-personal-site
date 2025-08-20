// app/projects/page.tsx
import Link from "next/link";
import { getAllProjects } from "@/lib/posts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const revalidate = false;

export default function ProjectsIndex() {
  const projects = getAllProjects();

  return (
    <>
      <h1 className="display lower">projects</h1>

      {projects.length === 0 ? (
        <p className="text mt-2">
          no projects yet — add <code>project:</code> to a post.
        </p>
      ) : (
        <div className="grid gap-4 mt-4">
          {projects.map((p) => (
            <Card key={p.name} className="bg-card border border-border">
              <CardHeader className="pb-2">
                <CardTitle className="lower">
                  <Link href={`/projects/${encodeURIComponent(p.name)}`} className="transition-colors hover:text-neutral-500">
                    {p.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text text-sm">
                {p.count} post{p.count === 1 ? "" : "s"}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
