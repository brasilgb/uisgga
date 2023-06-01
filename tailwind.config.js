/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto, sans-serif"]
      },
      colors: {
        "secundary-blue": "#2c4c64",
        "primary-blue": "#194162",
        "gray-light": "#E9E9E9"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
