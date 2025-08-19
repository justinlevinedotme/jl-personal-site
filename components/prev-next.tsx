"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PostMeta } from "@/lib/posts";

type Props = {
  prev?: PostMeta | null;
  next?: PostMeta | null;
  className?: string;
};

export default function PrevNext({ prev, next, className = "" }: Props) {
  return (
    <div className={`flex justify-between gap-3 ${className}`}>
      <Side kind="prev" post={prev} />
      <Side kind="next" post={next} />
    </div>
  );
}

function Side({
  kind,
  post,
}: {
  kind: "prev" | "next";
  post?: PostMeta | null;
}) {
  if (!post) return <div />;

  const label = post.title ?? "";

  return (
    <Button
      asChild
      variant="outline"
      className="border-line bg-card text-text flex items-center gap-2"
    >
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`${kind === "prev" ? "Previous" : "Next"}: ${post.title}`}
      >
        {kind === "prev" ? <ArrowLeft /> : null}
        <span>{label}</span>
        {kind === "next" ? <ArrowRight /> : null}
      </Link>
    </Button>
  );
}

function ArrowLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M5 12h14" />
      <path d="M5 12l6 6" />
      <path d="M5 12l6-6" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M5 12h14" />
      <path d="M13 18l6-6" />
      <path d="M13 6l6 6" />
    </svg>
  );
}
