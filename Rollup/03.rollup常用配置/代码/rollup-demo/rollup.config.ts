import { RollupOptions } from "rollup";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel"
import typescript from "@rollup/plugin-typescript"

const config: RollupOptions = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
    entryFileNames: '[name].[hash].js',
    chunkFileNames: 'chunk-[name].[hash].js',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      include: 'src/**',
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts'],
    }),
    typescript()
  ],
}

export default config;