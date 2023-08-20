/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'h-128': '32rem',
        'h-150' : '45rem'
      },
      gridTemplateColumns: {
        '17': 'repeat(17, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}