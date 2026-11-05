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
        brand: {
          navy: '#0b1d3a',
          'navy-dark': '#061021',
          'navy-light': '#1e3a8a',
          orange: '#f97316',
          'orange-hover': '#ea580c',
          'orange-light': '#fff7ed',
          border: '#e2e8f0',
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
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', '"DM Sans"', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif']
      }
    }
  },
  plugins: []
}