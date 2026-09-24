/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        night: {
          DEFAULT: '#06080D',
          50: '#080B12',
          100: '#0B0F17',
          200: '#0E1420',
          300: '#131A29',
        },
        blue: {
          DEFAULT: '#2F6BFF',
          hover: '#1B4FE0',
          soft: '#E8EFFF',
          deep: '#0A2E80',
        },
      },
    },
  },
  plugins: [],
};