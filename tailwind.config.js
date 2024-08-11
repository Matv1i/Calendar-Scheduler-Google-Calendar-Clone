/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "fade-out": {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        "fade-in-top-left": {
          "0%": {
            opacity: 0,
            transform: "translate3d(-100%, -100%, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        "fade-in-top-right": {
          "0%": {
            opacity: 0,
            transform: "translate3d(100%, -100%, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
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
