// components/theme-provider.tsx
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"        // use .dark on <html>
      defaultTheme="dark"      // 👈 default to dark
      enableSystem={true}      // allow “System” choice; set false to force dark only
      disableTransitionOnChange
      {...props}               // still let you override per usage if needed
    >
      {children}
    </NextThemesProvider>
  )
}
