/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        product: "rgb(0 0 0 / 10%) 0px 0px 20px;",
      },
      colors: {
        "light-gray": "rgb(128, 128, 137)",
        "character-color": "rgb(36, 36, 36)",
        "price-color": "rgb(255, 66, 78)",
        "promotion-color": "rgb(255, 66, 78)",
        "dark-blue": "rgb(13, 92, 182)",
        "primary": "#0083ff"
      },
      backgroundColor: {
        "light-gray": "rgb(128, 128, 137)",
        "light-red": "rgb(255, 66, 78)",
        "main": "#f5f5fa",
        "primary": "#0083ff"
      },
    },
  },
  plugins: [],
};
