/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      'green1':'#c1d7d3',
      'green2':'#689287',
      'green3':'#427064',
      'magenta1':'#480d05',
      'magenta2':'#f9b4ab',
      'brown':'#705E61'
    },
    extend: {},
  },
  plugins: [],
}

