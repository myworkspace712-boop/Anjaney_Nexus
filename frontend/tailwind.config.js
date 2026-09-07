/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pb: {
          bg: 'var(--pb-bg)',
          surface: 'var(--pb-surface)',
          accent: 'var(--pb-accent)',
          'accent-hover': 'var(--pb-accent-hover)',
          secondary: 'var(--pb-secondary)',
          text: 'var(--pb-text)',
          'text-secondary': 'var(--pb-text-secondary)',
          border: 'var(--pb-border)',
        },
        spice: {
          red: '#9B2C2C', // Deep terracotta red
          gold: '#D69E2E', // Turmeric gold
          green: '#2F855A', // Earthy leaf green
          dark: '#1A202C', // Deep text
          light: '#F7FAFC' // Off-white bg
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', '"DM Sans"', 'Syne', 'sans-serif']
      }
    }
  },
  plugins: []
}