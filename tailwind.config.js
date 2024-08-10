/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-nondark": "#18181B",
        "gray-dark": "#222222",
        "light-gray": "#A1A1AA",
      },
    },
  },
  plugins: [],
}
