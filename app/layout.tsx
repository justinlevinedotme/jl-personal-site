// app/layout.tsx
import "./globals.css";
import { IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
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
    <html lang="en" className={plex.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/mono-icons@latest/iconfont/icons.css"
        />
      </head>
      <body>
        <main className="max-w-[720px] mx-auto px-5 mt-14 mb-20">
          <header className="text-center mb-4">
            <Link href="/" className="inline-block mb-2 text-foreground">
              <span className="logo-mask align-middle" aria-label="justin’s projects logo" />
            </Link>

            {/* Mobile nav (simple links) */}
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

          {children}

          <footer className="mt-12 text-center text-sm text-muted">
            © {new Date().getFullYear()} with ❤️ by Justin Levine
          </footer>
        </main>
      </body>
    </html>
  );
}