import "./globals.css";
import { IBM_Plex_Mono } from "next/font/google";
import {
  NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeSelect from "@/components/theme-select";

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  display: "swap",
});

export const metadata = {
  title: "Justin’s Projects",
  description: "a simple markdown-powered project log",
  keywords: ["Next.js", "blog", "software", "tech", "personal site"],
  authors: [{ name: "Justin Levine", url: "https://justinlevine.me" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plex.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <main className="max-w-[720px] mx-auto px-5 mt-14 mb-20">
            <header className="mb-4">
              <div className="flex items-center justify-between">
                <a href="/" className="inline-block text-foreground">
                  <span className="logo-mask align-middle" aria-label="justin’s projects logo" />
                </a>
                <div className="flex items-center gap-3">
                  <NavigationMenu className="hidden sm:flex">
                    <NavigationMenuList className="gap-4">
                      <NavigationMenuItem><NavigationMenuLink href="/" className="transition-colors hover:text-neutral-500">home</NavigationMenuLink></NavigationMenuItem>
                      <NavigationMenuItem><NavigationMenuLink href="/projects" className="transition-colors hover:text-neutral-500">projects</NavigationMenuLink></NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </div>
            </header>

            <Separator className="bg-line mb-6" />

            {children}


<footer className="mt-12 text-sm text-muted-foreground">
  <div className="flex items-center justify-between gap-4">
    <span>© {new Date().getFullYear()} with ❤️ by Justin Levine</span>
    <ThemeSelect /> {/* icons-only theme switcher */}
  </div>
</footer>

          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
