/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#1a1a2e',
        'brand-primary': '#16213e',
        'brand-secondary': '#0f3460',
        'brand-accent': '#e94560',
        'brand-light': '#f0f0f0',
      },
      fontFamily: {
        'sans': ['"Poppins"', 'sans-serif'],
        'mono': ['"Fira Code"', 'monospace'],
      }
    },
  },
  plugins: [],
}
