/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        earth: {
          50: '#fdfbf7',
          100: '#f7f3ea',
          200: '#ece3ce',
          300: '#decba9',
          400: '#ceb080',
          500: '#bf995f',
          600: '#aa804c',
          700: '#89643d',
          800: '#6f5236',
          900: '#5c442f',
        }
      }
    },
  },
  plugins: [],
}
