/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FFF9E6',
          100: '#FFF0BF',
          200: '#FFE080',
          300: '#F5C842',
          400: '#E6A817',
          500: '#D4A017',
          600: '#B8860B',
          700: '#9A6F09',
          800: '#7A5607',
          900: '#5C4005',
        },
        ink: {
          900: '#0A0A0A',
          800: '#141414',
          700: '#1F1F1F',
          600: '#2E2E2E',
          500: '#4A4A4A',
          400: '#6B6B6B',
          300: '#9A9A9A',
          200: '#C4C4C4',
          100: '#E8E8E8',
          50:  '#F5F5F5',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
