const tailwindcss = require("tailwindcss");
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    tailwindcss,
    cssnano({
      preset: "default",
    }),
  ].filter(Boolean),
};
