import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/posts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VersionBadge from "@/components/version-badge";
import { projectToSlug } from "@/lib/slug";

export const revalidate = false;

export default function Home() {
  const posts = getAllPosts();
  return (
    <>
      <div className="space-y-4 mt-4">
        {posts.map((p) => (
          <Card key={p.slug} className="bg-card border-line">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline">
                  {format(new Date(p.date), "MMMM d, yyyy")}
                </Badge>
                <VersionBadge version={p.version} />
              </div>
              <CardTitle className="display text-[2rem] mt-2">
                <Link
                  href={`/blog/${p.slug}`}
                  className="transition-colors hover:text-neutral-500"
                >
                  {p.title}
                </Link>
              </CardTitle>

              {p.project && (
                <div className="text text-sm font-semibold">
                  project:{" "}
                  <Link
                    href={`/projects/${projectToSlug(p.project)}`}
                    className="transition-colors hover:text-neutral-50 font-normal"
                  >
                    {p.project}
                  </Link>
                </div>
              )}
            </CardHeader>

            {p.cover && (
              <CardContent className="pt-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.cover}
                  alt=""
                  className="rounded-xl border border-line mt-2"
                />
              </CardContent>
            )}

            {p.summary && (
              <CardContent className={p.cover ? "pt-2" : ""}>
                <p>{p.summary}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
