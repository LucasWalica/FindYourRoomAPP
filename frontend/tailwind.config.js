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
      'green1':'#68F583',
      'green2':'#689B71',
      'green3':'#37463A',
      'magenta1':'#B06875',
      'magenta2':'#F0516D',
      'brown':'#705E61'
    },
    extend: {},
  },
  plugins: [],
}

