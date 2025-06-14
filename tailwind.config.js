import tailwindScrollbar from "tailwind-scrollbar";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        juice: {
          background: "#0F172A",
          surface: "#1E293B",
          berry: "#9991AE",
          citrus: "#FBBF24",
          neon: "#3B82F6",
          muted: "#94A3B8",
        },
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
  plugins: [tailwindScrollbar],
};
