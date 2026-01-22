/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/index.{js, ts, tsx}", "./components/**/*.{js, ts, tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};

