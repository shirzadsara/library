import type { Config } from "tailwindcss";

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazir", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["PlayfairDisplay", "serif"],
      },
      colors: {
        midnight: {
          900: "#0b1220",
          800: "#0f172a",
          700: "#111827",
        },
        accent: {
          DEFAULT: "#F59E0B",
          light: "#FFD88C",
        },
        accent2: {
          DEFAULT: "#60A5FA",
        },
      },
      boxShadow: {
        "soft-lg": "0 6px 20px rgba(2,6,23,0.6)",
      },
    },
  },
  
  plugins: [],
} satisfies Config;

export default config;
