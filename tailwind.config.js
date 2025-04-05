/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'player-red': '#e74c3c',
        'player-white': '#f5f5f5',
        'player-black': '#2c3e50',
        'board-light': '#f0d9b5',
        'board-dark': '#b58863',
        'board-highlight': '#58a4b0',
      },
    },
  },
  plugins: [],
}
