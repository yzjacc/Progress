import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";


export default defineConfig({
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "esm",
    name:"rollup-npm"
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    babel({babelHelpers:"bundled"})
  ],
  external: ["lodash-es"]
})