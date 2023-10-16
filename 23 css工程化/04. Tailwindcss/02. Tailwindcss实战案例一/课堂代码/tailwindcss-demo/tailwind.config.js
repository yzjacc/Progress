/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-gray": "#333",
        "custom-gray2": "#424242",
      },
      textColor: {
        "custom-light-gray": "#b0b0b0",
        "custom-gray": "#424242",
      },
      width: {
        1226: "1226px",
        120: "120px",
        320: "320px",
      },
      height: {
        40: "40px",
        100: "100px",
      },
      lineHeight: {
        100: "100px",
      },
      borderColor: {
        "custom-gray": "#424242",
      },
      marginLeft: {
        13: "13px",
      },
      zIndex: {
        50: 50,
      },
      padding:{
        7: "7px",
      }
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      backgroundColor: ["group-hover"],
      textColor: ["group-hover"],
    }
  },
  plugins: [],
};
