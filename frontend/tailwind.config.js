/** @type {import('tailwindcss').Config} */ 
const { colors } = require('./src/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors,
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'pts': ['PT Sans', 'sans-serif']
      },
      colors: {
        cgrey: {
          50: "#F5F7FA",
          100: "#E4E7EB",
          200: "#CBD2D9",
          300: "#9AA5B1",
          400: "#7B8794",
          500: "#616E7C",
          600: "#52606D",
          700: "#3E4C59",
          800: "#323F48",
          900: "#1F2933"
        }
      }
    },
  },
  plugins: [],
}