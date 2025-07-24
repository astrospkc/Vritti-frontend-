/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Adjust paths as per your project structure
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#f3f4f6",
          300: "#d1d5db",
        },
        neutral: {
          500: "#737373",
          700: "#404040",
        },

        juice: {
          background: "#0F172A",
          surface: "#1E293B",
          berry: "#9991AE",
          citrus: "#FBBF24",
          neon: "#3B82F6",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        chonburi: ['"Chonburi"', "cursive"],
        yusei: ['"Yusei Magic"', "sans-serif"],
        // ...map more fonts if needed
      },
      keyframes: {
        "fade-in": {
          "50%": { opacity: 0.5, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
