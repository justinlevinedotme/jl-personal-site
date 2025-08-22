// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeSelect from "@/components/theme-select";
import type { Metadata } from "next";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Justin Levine", template: "%s — Justin Levine" },
  description: "Projects, writing, and experiments by Justin Levine.",
  openGraph: {
    url: siteUrl,
    siteName: "Justin Levine",
    images: ["/opengraph-image"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plex.className} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Justin Levine",
              url: siteUrl,
              sameAs: [
                "https://github.com/justinlevinedotme",
                "https://www.linkedin.com/in/hellojustinlevine",
              ],
            }),
          }}
        />
      </head>
      <body>
        {/* Default theme = dark; still supports system / user choice */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-w-[720px] mx-auto px-5 mt-14 mb-20">
            {/* Header */}
            <header className="text-center mb-4">
              <Link href="/" className="inline-block mb-2 text-foreground">
                <span
                  className="logo-mask align-middle"
                  aria-label="justin’s projects logo"
                />
              </Link>

              {/* Mobile nav (always visible on small screens) */}
              <nav className="md:hidden mt-2 flex items-center justify-center gap-5 text-sm">
                <Link href="/" className="fade-hover">
                  home
                </Link>
                <Link href="/projects" className="fade-hover">
                  projects
                </Link>
              </nav>

              {/* Desktop nav (shadcn NavigationMenu) */}
              <div className="hidden md:block">
                <NavigationMenu className="mx-auto">
                  <NavigationMenuList className="gap-4">
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/">home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/projects">
                        projects
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </header>

            <Separator className="bg-line mb-6" />

            {/* Page content */}
            {children}

            {/* Footer with theme control */}
            <footer className="mt-12 text-sm text-muted-foreground">
              <div className="flex items-center justify-between gap-3">
                <p>© {new Date().getFullYear()} with ❤️ by Justin Levine</p>

                {/* Theme picker (icons/select) */}
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline"></span>
                  <ThemeSelect />
                </div>
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
