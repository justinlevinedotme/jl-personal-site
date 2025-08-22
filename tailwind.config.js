// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,js,jsx,md,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,md,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      // maps Tailwind's font-sans/mono to your CSS variables from layout.tsx
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["var(--font-plex)", ...fontFamily.mono],
      },

      // your existing color tokens (leave as-is)
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      fontSize: {
        title: ["2rem", { lineHeight: "2.5rem", fontWeight: "700" }],
      },

      // Typography plugin defaults driven by your tokens (affects .prose wrappers)
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.muted.foreground"),
            "--tw-prose-headings": theme("colors.foreground"),
            "--tw-prose-links": theme("colors.accent.DEFAULT"),
            "--tw-prose-bold": theme("colors.foreground"),
            "--tw-prose-counters": theme("colors.muted.foreground"),
            "--tw-prose-bullets": theme("colors.muted.foreground"),
            "--tw-prose-hr": theme("colors.border"),
            "--tw-prose-quotes": theme("colors.muted.foreground"),
            "--tw-prose-code": theme("colors.foreground"),
            "--tw-prose-th-borders": theme("colors.border"),
            "--tw-prose-td-borders": theme("colors.border"),

            maxWidth: "65ch",
            lineHeight: "1.75",

            // Optional: make MDX headings use Plex Mono
            "h1,h2,h3,h4": { color: theme("colors.foreground") },

            h1: {
              fontSize: "1.75rem",
              lineHeight: "2.25rem",
              fontWeight: "900",
              marginTop: "1.6em",
              marginBottom: "0.6em",
            },
            h2: {
              fontSize: "1.5rem",
              lineHeight: "2rem",
              fontWeight: "900",
              marginTop: "1.4em",
              marginBottom: "0.5em",
            },
            h3: {
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              fontWeight: "900",
              marginTop: "1.2em",
              marginBottom: "0.4em",
            },
            h4: {
              fontSize: "1.125rem",
              lineHeight: "1.6rem",
              fontWeight: "900",
              marginTop: "1.1em",
              marginBottom: "0.35em",
            },

            p: {
              marginTop: "1.05em",
              marginBottom: "1.05em",
              fontWeight: "400",
            },

            a: { textDecoration: "none", transition: "color .15s ease" },
            "a:hover": {
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            },

            code: {
              backgroundColor: theme("colors.secondary.DEFAULT"),
              borderRadius: "0.375rem",
              padding: "0.15rem 0.35rem",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: {
              backgroundColor: theme("colors.popover.DEFAULT"),
              color: theme("colors.popover.foreground"),
              padding: "1rem 1.125rem",
              borderRadius: "0.75rem",
              overflowX: "auto",
            },

            img: { borderRadius: "0.75rem", margin: "1.25rem 0" },
            table: { width: "100%" },
            th: {
              fontWeight: "600",
              background: theme("colors.secondary.DEFAULT"),
            },
            "th, td": { padding: "0.55rem 0.75rem" },
          },
        },
        // optional slight upscale on large screens
        lg: {
          css: {
            h1: { fontSize: "1.875rem", lineHeight: "2.375rem" },
            h2: { fontSize: "1.625rem", lineHeight: "2.125rem" },
          },
        },
        // You can keep invert minimal since tokens already flip under .dark
        invert: {
          css: {
            "--tw-prose-body": theme("colors.muted.foreground"),
            "--tw-prose-headings": theme("colors.foreground"),
            "--tw-prose-links": theme("colors.accent.DEFAULT"),
          },
        },
      }),

      // (your animations/borderRadius as-is)
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
