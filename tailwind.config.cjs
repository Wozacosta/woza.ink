/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        cream: "#faf8f5",
        ink: "#1a1a1a",
        // Semantic tokens, defined per theme in globals.css
        bg: "var(--background)",
        fg: "var(--foreground)",
        muted: "var(--muted)",
        subtle: "var(--subtle)",
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
        },
        surface: "var(--surface)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
