/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
        secondary: '#16a34a',
        'background-dark': '#0B1120',
        'surface-dark': '#151e32',
        'accent-pink': '#f43f5e',
        'accent-purple': '#8b5cf6',
      },
      fontFamily: {
        title: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-space)', 'sans-serif'],
        display: ['var(--font-syne)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
