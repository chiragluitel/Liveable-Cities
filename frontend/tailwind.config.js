/** @type {import('tailwindcss').Config} */
const { colours } = require("./src/theme/colours");

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",          
    "./src/components/**/*.{js,jsx,ts,tsx}",   
    "./src/types/**/*.{js,jsx,ts,tsx}"         
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: colours,
    }
  },
  plugins: [],
}