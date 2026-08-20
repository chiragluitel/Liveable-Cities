/** @type {import('tailwindcss').Config} */
const { colours } = require("./src/theme/colours");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",          
    "./src/components/**/*.{js,jsx,ts,tsx}",   
    "./src/types/**/*.{js,jsx,ts,tsx}"         
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: colours,
    }
  },
  plugins: [],
}