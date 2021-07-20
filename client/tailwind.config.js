const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      TLGOrange: '#C05F26',
      HDgray: '#E5E7EB',
      CPgray: '#F3F4F6',
      white: '#F9FAFB',
      borderGray: '#9CA3AF'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
