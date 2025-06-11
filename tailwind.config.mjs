export default {
    content: [
      "./index.html",
      "./privacy.html",
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          "button-primary":"#FF9900",
          "button-secondary":"#FFB100",
          "brand-primary": "#103d6e",
          "brand-accent-1": "#1d7ed3",
          "brand-accent-2": "#50c2ff",
          "brand-dark": "#062343",
          "neutral-90": "#f5f7fa",
          "neutral-60": "#d1d5db",
          "neutral-10": "#111827"
        },
        fontFamily: {
          display: ["Poppins", "sans-serif"],
          body: ["Open Sans", "sans-serif"],
          mono: ["Source Code Pro", "monospace"]
        },
        boxShadow: {
          card: "0 4px 12px rgba(16, 61, 110, 0.12)"
        },
        keyframes: {
          fadein: {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 }
          }
        },
        animation: {
          fade: "fadein 0.7s ease-out"
        }
      }
    },
    plugins: [require("@tailwindcss/typography")]
  };
  