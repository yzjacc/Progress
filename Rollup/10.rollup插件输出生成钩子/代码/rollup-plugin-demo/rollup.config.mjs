import { defineConfig } from "rollup";
import example1 from "./plugins/rollup-plugin-example1.js";
import example2 from "./plugins/rollup-plugin-example2.js";
import virtualModule from "./plugins/rollup-plugin-virtual.js";
import json from "./plugins/rollup-plugin-json.js";
import customPlugin from "./plugins/rollup-plugin-custom.js";
import myImage from "./plugins/rollup-plugin-image.js";
import bundleStats from "./plugins/rollup-plugin-bundle-stats.js";
import uglifyPlugin from "./plugins/rollup-plugin-uglify.js";

export default defineConfig({
  input: "src/index.js",
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
    entryFileNames: "[name]-[hash].js",
    banner: "/* this is a banner */",
    footer: "/* this is a footer */",
  },
  plugins: [
    // example1(),
    // example2(),
    // virtualModule(),
    // json(),
    // customPlugin({
    //   include: "src/**/*.js",
    //   emitFile:true
    // }),
    // myImage({
    //   fileSize: 1024 * 10,
    //   target: "./dist/assets",
    // })
    bundleStats(),
    uglifyPlugin(),
  ],
});
