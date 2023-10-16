/** @type {import('tailwindcss').Config} */

const myPlugin = require("./src/plugins/my-plugin.js");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        '35': '35px',
      },
      boxShadow: {
        custom: "0 0 0.1em rgba(0, 0, 0, 0.3)",
      },
      borderRadius: {
        "15p": "15%",
      },
      brightness: {
        '100': '1',
        '115': '1.15',
        '130': '1.3',
        '145': '1.45',
      },
    },
  },
  plugins: [myPlugin],
};
