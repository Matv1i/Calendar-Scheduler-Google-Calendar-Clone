/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        modalFadeIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        modalFadeOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.8)" },
        },
      },
      animation: {
        modalFadeIn: "modalFadeIn 0.2s ease-out forwards",
        modalFadeOut: "modalFadeOut 0.2s ease-out forwards",
      },

      colors: {
        "black-nondark": "#18181B",
        "black-dark": "#121314",
        "gray-dark": "#222222",
        "light-gray": "#A1A1AA",
        "blue-spec": "#445CBC",
        "green-spec": "#00E076",
        "purple-spec": "#A417A0",
      },
    },
  },
  plugins: [],
}
