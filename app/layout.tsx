// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeSelect from "@/components/theme-select";

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

export const metadata = {
  title: "Justin’s Projects",
  description: "a simple markdown-powered project log",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plex.className} suppressHydrationWarning>
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
                <span className="logo-mask align-middle" aria-label="justin’s projects logo" />
              </Link>

              {/* Mobile nav (always visible on small screens) */}
              <nav className="md:hidden mt-2 flex items-center justify-center gap-5 text-sm">
                <Link href="/" className="fade-hover">home</Link>
                <Link href="/projects" className="fade-hover">projects</Link>
              </nav>

              {/* Desktop nav (shadcn NavigationMenu) */}
              <div className="hidden md:block">
                <NavigationMenu className="mx-auto">
                  <NavigationMenuList className="gap-4">
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/">home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/projects">projects</NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </header>

            <Separator className="bg-line mb-6" />

            {/* Page content */}
            {children}

            {/* Footer with theme control */}
            <footer className="mt-12 text-sm text-muted">
              <div className="flex items-center justify-between gap-3">
                <p>© {new Date().getFullYear()} with ❤️ by Justin Levine</p>

                {/* Theme picker (icons/select) */}
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-muted-foreground"></span>
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