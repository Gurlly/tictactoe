/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.{html}",
  ],
  theme: {
    extend: {
    },
    fontFamily: {
      'sans': ["Roboto", "sans-serif"]
    }
  },
  plugins: [
   require("rippleui"),
 ],
 }
 