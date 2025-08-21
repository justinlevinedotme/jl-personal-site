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

      /* ⬇️ NEW: name your page title size, keep it at 2rem */
      fontSize: {
        title: ["2rem", { lineHeight: "2.5rem", fontWeight: "700" }],
      },

      /* ⬇️ NEW: map Markdown heading sizes (prose) so none outgrow meta.title */
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontSize: "1.75rem",           // MDX/Markdown `#`
              lineHeight: "2.25rem",
              fontWeight: "700",
              marginTop: "1.6em",
              marginBottom: "0.6em",
            },
            h2: {
              fontSize: "1.5rem",            // `##`
              lineHeight: "2rem",
              fontWeight: "700",
              marginTop: "1.4em",
              marginBottom: "0.5em",
            },
            h3: {
              fontSize: "1.25rem",           // `###`
              lineHeight: "1.75rem",
              fontWeight: "600",
              marginTop: "1.2em",
              marginBottom: "0.4em",
            },
            h4: {
              fontSize: "1.125rem",          // `####`
              lineHeight: "1.6rem",
              fontWeight: "600",
              marginTop: "1.1em",
              marginBottom: "0.35em",
            },
            p: {
              fontSize: "1rem",
              lineHeight: "1.75rem",
            },
            small: {
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            },
          },
        },
        /* Optional: slightly scale headings up on large screens while still < 2rem */
        lg: {
          css: {
            h1: { fontSize: "1.875rem", lineHeight: "2.375rem" }, // 30px
            h2: { fontSize: "1.625rem", lineHeight: "2.125rem" }, // 26px
          },
        },
        invert: {
          css: {
            "--tw-prose-body": theme("colors.muted.foreground"),
            "--tw-prose-headings": theme("colors.foreground"),
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
