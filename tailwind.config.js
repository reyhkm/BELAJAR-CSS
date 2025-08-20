/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace']
      },
      colors: {
        primary: '#4F46E5',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        background: '#1F2937',
        text: '#F9FAFB',
        'text-light': '#D1D5DB',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444'
      }
    },
  },
  plugins: [],
}
