import { defineConfig } from "rollup";
import example1 from "./plugins/rollup-plugin-example1.js";
import virtualModule from "./plugins/rollup-plugin-virtual.js";
import json from "./plugins/rollup-plugin-json.js";
import customPlugin from "./plugins/rollup-plugin-custom.js";

export default defineConfig({
  input: "src/index.js",
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    // example1(),
    virtualModule(),
    json(),
    customPlugin({
      emitFile:true
    })
  ],
});
