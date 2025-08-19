// components/theme-select.tsx
'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Laptop } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ORDER: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system']

export default function ThemeSelect() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) return <span className="inline-block h-9 w-[100px]" aria-hidden />

  const current = (theme ?? resolvedTheme ?? 'system') as (typeof ORDER)[number]
  const idx = ORDER.indexOf(current)
  const next = ORDER[(idx + 1) % ORDER.length]

  const Icon =
    current === 'light' ? Sun :
    current === 'dark'  ? Moon :
    Laptop

  const label =
    current === 'light' ? 'Light' :
    current === 'dark'  ? 'Dark'  :
    'System'

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 rounded-full"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${label}. Click to switch to ${next}`}
      title={`Theme: ${label} (click → ${next})`}
    >
      {label}
      <Icon className="h-4 w-4" />
    </Button>
  )
}
