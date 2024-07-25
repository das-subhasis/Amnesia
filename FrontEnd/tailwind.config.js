/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      mont: ["'Montserrat'", "sans-serif"],
      roboto: ["'Roboto'", "sans-serif"]
    },
    extend: {},
  },
  plugins: [],
}