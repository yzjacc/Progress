import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel"

/**
 * @type {import('rollup').RollupOptions}
 */
const buildIndexOptions = {
  input: 'src/index.js',
  output: {
    dir: 'dist/esm',
    format: 'esm',
    // entryFileNames: '[name].[hash].js',
    // chunkFileNames: 'chunk-[name].[hash].js',
    // manualChunks: {
    //   "lodash-es":["lodash-es"]
    // }
    // manualChunks(id) { 
    //   if (id.includes("lodash-es")) { 
    //     return "lodash-es";
    //   }
    // }
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      include: 'src/**',
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts'],
    })
  ],
  // external: ['lodash-es']
}

// /**
//  * @type {import('rollup').RollupOptions}
//  */
// const buildMainOptions = {
//   input: 'src/main.js',
//   output: {
//     dir: 'dist/esm',
//     format: 'esm',
//     entryFileNames: '[name].[hash].js',
//     chunkFileNames: '[name].[hash].js'
//   }
// }

export default [buildIndexOptions]