// components/prev-next.tsx
import Link from "next/link";
import { cn } from "@/lib/utils"; // or replace cn(...) with a template string

type Item = { slug: string; title: string };
export default function PrevNext({
  prev,
  next,
  className,
  showVersion, // kept for compatibility; ignore if unused
}: {
  prev?: Item | null;
  next?: Item | null;
  className?: string;
  showVersion?: boolean;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      <NavCell
        dir="prev"
        href={prev ? `/blog/${prev.slug}` : undefined}
        label={prev ? prev.title : "No older post(s)"}
        disabled={!prev}
      />
      <NavCell
        dir="next"
        href={next ? `/blog/${next.slug}` : undefined}
        label={next ? next.title : "No newer post(s)"}
        disabled={!next}
      />
    </div>
  );
}

function NavCell({
  dir,
  href,
  label,
  disabled,
}: {
  dir: "prev" | "next";
  href?: string;
  label: string;
  disabled?: boolean;
}) {
  const content = (
    <div
      className={cn(
        // same size/shape for both cells
        "w-full h-12 inline-flex items-center gap-20 rounded-2xl px-4 text-sm bg-muted-foreground/10 transition-colors",
        // align arrows toward the outer edges
        dir === "prev" ? "justify-start" : "justify-end",
        // subtle hover for enabled only
        disabled
          ? "opacity-50 pointer-events-none"
          : "hover:bg-accent transition-colors"
      )}
    >
      {dir === "prev" && <span aria-hidden>←</span>}
      <span className="truncate">{label}</span>
      {dir === "next" && <span aria-hidden>→</span>}
    </div>
  );

  return disabled ? (
    <span aria-disabled className="block">
      {content}
    </span>
  ) : (
    <Link
      aria-label={`${dir === "prev" ? "Previous" : "Next"} post: ${label}`}
      href={href!}
      className="block"
    >
      {content}
    </Link>
  );
}
