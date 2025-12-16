/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tv': '1920px', // TV 45 inci biasanya 1920x1080
        'tv-4k': '3840px', // TV 4K
      },
    },
  },
  plugins: [],
}

