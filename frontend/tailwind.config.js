/** @type {import('tailwindcss').Config} */
module.exports = {
  // Update this to include the paths to all your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}