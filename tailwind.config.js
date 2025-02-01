/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        light: "#F7F7F7",
        dark: "#252525",
        primary: "#6C63FF"
      }
    },
  },
  plugins: [],
}

