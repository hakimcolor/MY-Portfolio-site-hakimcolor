/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#AAFFC7',
        secondary: '#67C090',
        'background-dark': '#0B1120',
        'surface-dark': '#151e32',
        'accent-pink': '#f43f5e',
        'accent-purple': '#8b5cf6',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
