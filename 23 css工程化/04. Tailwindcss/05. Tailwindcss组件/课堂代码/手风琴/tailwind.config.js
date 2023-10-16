/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        50: "50px",
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["peer-checked"]
    },
  },
  plugins: [],
};
