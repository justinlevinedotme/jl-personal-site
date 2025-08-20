// components/prev-next.tsx
'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { PostMeta } from '@/lib/posts'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type Props = {
  prev: PostMeta | null
  next: PostMeta | null
  /** when true, append "vX.Y" next to titles if available */
  showVersion?: boolean
  className?: string
}

export default function PrevNext({ prev, next, showVersion = false, className }: Props) {
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Previous/next posts"
      className={cn('flex justify-between gap-3', className)}
    >
      {/* Prev (older) */}
      <div className="min-w-0 flex-1">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 opacity-70 group-hover:opacity-100" />
            <span className="truncate">
              {prev.title}
              {showVersion && prev.version ? ` · v${prev.version}` : ''}
            </span>
          </Link>
        ) : (
          <span className="inline-flex items-center gap-2 text-muted-foreground opacity-60">
            <ArrowLeft className="h-4 w-4" /> No older post
          </span>
        )}
      </div>

      {/* Next (newer) */}
      <div className="min-w-0 flex-1 text-right">
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <span className="truncate">
              {next.title}
              {showVersion && next.version ? ` · v${next.version}` : ''}
            </span>
            <ArrowRight className="h-4 w-4 opacity-70 group-hover:opacity-100" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-2 text-muted-foreground opacity-60">
            No newer post <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </nav>
  )
}