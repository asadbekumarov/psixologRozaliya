import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Forest & Terracotta Editorial Design System
        sand: {
          DEFAULT: "#F3EBE1",
          deep: "#E8DDD0",
          border: "#DFD3C3",
        },
        "sand-deep": "#E8DDD0",
        "sand-border": "#DFD3C3",
        cream: {
          DEFAULT: "#FBF8F4",
          50: "#FCFBF9",
          100: "#FBF8F4",
          200: "#F3EBE1",
          300: "#E8DDD0",
          400: "#DFD3C3",
        },
        forest: {
          DEFAULT: "#163832",
          light: "#1E463F",
          dark: "#0F2622",
        },
        "forest-light": "#1E463F",
        terracotta: {
          DEFAULT: "#C86D51",
          hover: "#B05A3F",
          dark: "#964730",
          light: "#D88B73",
          soft: "rgba(200, 109, 81, 0.12)",
        },
        "terracotta-hover": "#B05A3F",
        ink: {
          DEFAULT: "#3D4644",
          dark: "#163832",
          muted: "#5C6660",
        },
        ivory: {
          DEFAULT: "#F7F3EB",
          muted: "#CBD5D1",
        },
        mist: {
          DEFAULT: "#CBD5D1",
          dark: "#8D9A95",
        },

        // Backward compatibility tokens mapped to new palette
        sage: {
          DEFAULT: "#163832",
          hover: "#1E463F",
          light: "#2A574F",
          dark: "#0F2622",
          soft: "rgba(22, 56, 50, 0.08)",
          dim: "rgba(22, 56, 50, 0.15)",
        },
        charcoal: {
          DEFAULT: "#163832",
          light: "#3D4644",
          muted: "#5C6660",
        },
        border: {
          DEFAULT: "#DFD3C3",
          subtle: "#E8DDD0",
          strong: "#C8BAA7",
        },
        muted: {
          DEFAULT: "#5C6660",
          light: "#78827C",
          dark: "#3D4644",
        },

        // Radix/Shadcn system tokens
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#B05A3F",
          foreground: "#F7F3EB",
        },
        secondary: {
          DEFAULT: "#E8DDD0",
          foreground: "#163832",
        },
        input: "#DFD3C3",
        ring: "#163832",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      boxShadow: {
        soft: "0 8px 30px rgba(22, 56, 50, 0.06)",
        card: "0 4px 20px rgba(22, 56, 50, 0.05)",
        glow: "0 10px 30px rgba(200, 109, 81, 0.2)",
        modal: "0 20px 50px rgba(22, 56, 50, 0.25)",
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "12px",
        md: "14px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        mono: [
          "var(--font-mono)",
          "monospace",
        ],
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
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-100%, 0, 0)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translate3d(-100%, 0, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
