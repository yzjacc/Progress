## node_modules

```shell
# react
pnpm add react react-dom

# @types/react
pnpm add @types/react @types/react-dom -D

# react预设
pnpm add @babel/preset-react -D

# rollup
pnpm add rollup -D 

# rollup常规插件
pnpm add @rollup/plugin-node-resolve @rollup/plugin-commonjs -D

# typescript相关
pnpm add typescript tslib @rollup/plugin-typescript -D

# @rollup/plugin-babel相关
pnpm add @rollup/plugin-babel @babel/core @babel/preset-env -D

# @babel/runtime相关
pnpm add @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs3 -D

# html文件模板
pnpm add rollup-plugin-generate-html-template -D

# 替换字符串
pnpm add @rollup/plugin-replace -D 

# 开发服务器与live server
pnpm add rollup-plugin-serve rollup-plugin-livereload -D

# clear插件
pnpm add rollup-plugin-clear -D

# scss
pnpm add rollup-plugin-scss sass -D 

# postcss
pnpm add postcss rollup-plugin-postcss -D

# 图片处理
pnpm add @rollup/plugin-image -D

# nodejs typescript类型
pnpm add @types/node -D

# 别名插件
pnpm add @rollup/plugin-alias -D 

# terser
pnpm add @rollup/plugin-terser -D

# visualizer
pnpm add rollup-plugin-visualizer -D
```

## tsconfig.json

```javascript
{
  "compilerOptions": {
    "module": "esnext",
    "target": "es5",
    "lib": ["esnext", "dom", "dom.iterable"],
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "noEmit": true,
    "allowImportingTsExtensions":true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",

    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },
  },
  "include": ["src/**/*","rollup.config.ts", "global.d.ts"],
}
```

## .babelrc.json

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.25%, not dead",
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ],
    ["@babel/preset-react"]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

## rollup.config.ts

```javascript
import { RollupOptions } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import htmlTemplate from "rollup-plugin-generate-html-template";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import clear from "rollup-plugin-clear";
import image from "@rollup/plugin-image"
import terser from '@rollup/plugin-terser';
import { fileURLToPath } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";

const config: RollupOptions = {
  input: "src/main.tsx",
  output: {
    dir: "dist/",
    format: "esm",
    name: "rollupDemo",
    sourcemap: true,
    plugins: [terser()],
    entryFileNames: "[name].[hash:6].js",
    chunkFileNames: "chunks/chunk-[name]-[hash].js",
    // 代码分割
    // manualChunks: { 
    //   react: ["react", "react-dom"]
    // },
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
    paths: {
      react: "https://cdn.jsdelivr.net/npm/react@18.2.0/+esm",
      "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.2.0/+esm",
    }
  },
  external: ["react", "react-dom"],
  plugins: [
    visualizer(),
    nodeResolve({
      extensions: [".js", "jsx", "ts", "tsx"],
    }),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: "runtime",
      include: "src/**",
      exclude: "node_modules/**",
      extensions: [".js", ".ts", "jsx", "tsx"],
    }),
    alias({
      entries: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("src", import.meta.url)),
        },
      ],
    }),
    postcss({
      extensions: [".css"], // 将scss解析成css
      extract: true,
      modules: true,
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"), // 否则会报：process is not defined的错
    }),
    clear({
      targets: ["dist"],
    }),
    htmlTemplate({
      template: "public/index.html",
      target: "dist/index.html",
      attrs: ['type="module"'],
    }),
    image(),
    serve("dist"),
    livereload("src"),
  ],
};
export default config;
```

