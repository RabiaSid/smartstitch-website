import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Navy Blue Palette ──
        navy: {
          darkest: "#0A1F44",
          dark:    "#123A73",
          DEFAULT: "#1E5EFF",
          light:   "#5B8CFF",
          soft:    "#DCE7FF",
        },
        // ── Gold Palette ──
        gold: {
          dark:    "#7A5C00",
          bronze:  "#A67C00",
          DEFAULT: "#D4AF37",
          light:   "#F1D77A",
          cream:   "#FFF4CC",
        },
        // ── Neutral Palette ──
        neutral: {
          jet:       "#111111",
          charcoal:  "#222222",
          text:      "#333333",
          silver:    "#999999",
          smoke:     "#F5F5F5",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body:    ["var(--font-body)", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      animation: {
        "fade-in":     "fadeIn 0.5s ease-in-out",
        "slide-up":    "slideUp 0.4s ease-out",
        "slide-down":  "slideDown 0.3s ease-out",
        "scale-in":    "scaleIn 0.3s ease-out",
        "shimmer":     "shimmer 1.5s infinite",
        "float":       "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:   { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp:  { "0%": { transform: "translateY(20px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        slideDown:{ "0%": { transform: "translateY(-10px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        scaleIn:  { "0%": { transform: "scale(0.95)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
        shimmer:  { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        float:    { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      boxShadow: {
        "navy":   "0 4px 24px rgba(30, 94, 255, 0.25)",
        "gold":   "0 4px 24px rgba(212, 175, 55, 0.30)",
        "card":   "0 2px 16px rgba(10, 31, 68, 0.08)",
        "card-hover": "0 8px 32px rgba(10, 31, 68, 0.16)",
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(135deg, #0A1F44 0%, #123A73 50%, #1E5EFF 100%)",
        "gradient-gold": "linear-gradient(135deg, #7A5C00 0%, #D4AF37 50%, #F1D77A 100%)",
        "gradient-hero": "linear-gradient(135deg, #0A1F44 0%, #123A73 100%)",
        "shimmer-bg":    "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      },
    },
  },
  plugins: [],
};

export default config;
