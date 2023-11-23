# 搭建 monorepo 工程

目前在企业里面搭建 monorepo 工程常见的方案有三种：

- lerna：https://lerna.js.org/
- yarn + workspace
- pnpm + workspace

考虑到 pnpm 内置了对 monorepo 的一个支持，搭建起来非常的简单快捷、门槛较低，所以我们选择采用 pnpm 的方案来搭建我们的工程。



## 工作区

workspace 翻译成中文，叫做“工作区”。

<img src="https://resource.duyiedu.com/xiejie/2023-06-05-062458.jpg" alt="16853413444404" style="zoom:50%;" />

一说到工作区，大家会想到上面的场景，在现实生活中，一个工作区意味着一个工作的空间，在这个工作的空间里面有你工作时需要的一切东西。

在软件开发中，工作区通常是指一个用于组织和管理项目文件、资源以及工具的逻辑容器。它可以是一个文件夹结构，用于将相关的代码、文件以及配置、其他资源集中的放置到一起。

工作区的主要功能包括：

- 组织和管理项目文件：工作区提供了一个用于存储和组织项目文件的结构。这种结构通常包含源代码、配置文件、测试文件和其他与项目相关的资源。

- 跨项目共享设置和工具：工作区允许开发者在多个项目之间共享设置、依赖和工具。这有助于保持项目的一致性，并减少在不同项目之间切换时的开销。

- 支持协同开发：工作区有助于团队成员协同开发多个项目。团队成员可以在同一个工作区中访问和修改项目文件，从而提高协同开发的效率。

在许多编程语言、框架以及开发工具中，都能看到工作区的概念。pnpm 中同样提供了工作区的功能，用于管理monorepo风格的多个项目。要在 pnpm 中创建一个工作区，非常的简单，只需要创建一个名为 pnpm-workspace.yaml 的文件，然后在该文件中定义哪些目录被包含在工作区即可。下面是一个 pnpm-workspace.yaml 的示例：

```yaml
packages:
  # packages/ 下所有子包，但是不包括子包下面的包
  - 'packages/*'
  # components/ 下所有的包，包含子包下面的子包
  - 'components/**'
  # 排除 test 目录
  - '!**/test/**'
```



## 搭建 monorepo 工程

首先创建一个新的目录：

```bash
mkdir frontend-projects2
```

接下来使用 pnpm 对该目录进行一个初始化

```bash
pnpm init
```

接下来下一步，我们就需要创建一个工作空间

```bash
touch pnpm-workspace.yaml
```

在 pnpm-workspace.yaml 中记入如下的内容：

```yaml
packages:
  - 'components/*'
  - 'utils/*'
  - 'projects/*'
```

上面的配置表示 components、utils、projects 这三个目录下面的所有子包会被放入到工作空间里面，在一个工作空间中，就意味着项目之间能够相互引用。

- components：存放公共组件的
- utils：存放工具库
- projects：各个项目

这一小节我们就来封装一个公共的函数库，这个函数库我们是可以正常打包，正常发布，以及能够被工程中的其他项目引用的。

首先我们在 utils 下面创建了一个名为 tools 的目录，该目录是我们的公共函数库，使用 pnpm init 进行初始化。

接下来我们会遇到第一个问题，函数库使用 typescript 进行安装，那么 typescript 安装到哪里？

考虑到 typescript除了这个工具库会使用以外，其他的项目大概率也会使用，因此我们选择将 typescript 安装到工作空间里面，命令如下：

```bash
pnpm add typescript -D -w
```

最后的 -w 就表示安装到工作空间。

接下来我们进行源码开发，源码对应如下：

```ts
// src/index.ts
export * from "./sum.js";
export * from "./sub.js";
```

```ts
// src/sum.ts
export function sum(a: number, b: number) {
  return a + b;
}
```

```ts
// src/sub.ts
export function sub(a: number, b: number) {
  return a - b;
}
```

源码开发工作结束。



因为我们开发的这个项目是一个公共的函数库，其他的项目也会使用该函数库，所以这个公共的函数库里面的每一个方法都需要进行测试。这里的测试我们选择使用 jest，因此这里就又涉及到一个装包装在哪儿的问题，考虑到其他项目也是需要测试的，因此我们还是将 jest 安装到工作空间里面：

```bash
pnpm add jest jest-environment-jsdom @types/jest -D -w
```



装包完毕后，接下来就开始书写测试代码，代码如下：

```ts
// tests/sum.test.ts
import { sum } from "../src/sum";

test("测试sum方法", () => {
  const result = sum(1, 2);
  expect(result).toBe(3);
});
```

```ts
// tests/sub.test.ts
import { sub } from "../src/sub";

test("测试sub方法", () => {
  const result = sub(10, 3);
  expect(result).toBe(7);
});
```



接下来我们需要创建一个 jest 的配置文件，通过以下命令进行创建：

```bash
npx jest --init
```

注意为了能够让 jest 识别 ts 文件，我们还需要安装如下的两个依赖：

```bash
pnpm add ts-jest ts-node -D -w
```

另外记得把 jest 的配置文件里面的 preset 设置为 ts-jest



上面的配置文件配置后了，理论上来讲 jest 跑测试这一块就能够跑的通了，但是还会提示你让你创建一个 ts 的配置文件：

```bash
npx tsc --init
```

这里我们修改了如下的配置：

- target：ES6
- module：ES6
- include：["./src"]
- declaration: true
- declarationDir: "./dist/types", 

至此，我们的源码测试也就是做完了。



接下来既然开发和测试都已经完成了，那么就应道到了打包和发布的阶段。

打包我们这里选择使用 rollup 来进行打包，而且打包我们会打包成三种格式：CommonJS、Brower、ES Module

安装如下的依赖：

```bash
pnpm add rollup rollup-plugin-typescript2 @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-json @rollup/plugin-babel @babel/preset-env -D -w
```

打包依赖安装好之后，我们就需要书写一份打包的配置文件，在 tools 根目录下创建一个 rollup.config.js 的文件，配置如下：

```js
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";

const extensions = [".js", ".ts"];

export default [
  // CommonJS
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ extensions }),
      commonjs(),
      json(),
    ],
  },
  // ESM
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "es",
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ extensions }),
      commonjs(),
      json(),
    ],
  },
  // Browser-compatible
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.browser.js",
      format: "iife",
      name: "jsTools",
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ extensions }),
      commonjs(),
      json(),
      babel({
        exclude: "node_modules/**",
        extensions,
        babelHelpers: "bundled",
        presets: [
          [
            "@babel/preset-env",
            {
              targets: "> 0.25%, not dead",
            },
          ],
        ],
      }),
    ],
  },
];
```

上面的配置文件写好之后，还有一个非常重要的地方需要修改，那就是 package.json，这个文件是对我们整个包的一个说明文件，它直接决定了别人如何来使用我们的包，重点的配置项目如下：

```json
{
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "type": "module",
  "types": "dist/types/index.d.ts",
  "exports" : {
     "require": "./dist/index.cjs",
     "import": "./dist/index.js"
  },
  script : {
    "build" : "rollup -c"
  }
}
```

之后，运行 pnpm build 进行一个打包操作，打包完成后，会在 tools 的根目录下生成一个 dist 目录，里面包含打包好后的文件。

打包完成后，我们就可以将 dist 上传到 npm 或者私服上面。



最后我们再来测试一下 projects 下面的项目能否引入刚才的写好的公共函数库。

在 projects 下面创建一个新项目 tools-test-proj，使用 pnpm init 进行初始化。

接下来涉及到一个问题，我们的 tools-test-proj 这个项目想要使用 tools 里面的工具方法，由于两个项目是在同一个工作空间里面，所以这里可以直接从工作空间里面进行一个安装操作：

```bash
pnpm add tools -w --filter tools-test-proj
```

安装完成后，我们就能够在 package.json 中看到这个依赖，并且这个依赖是来自于工作空间的：

```json
"dependencies": {
  "tools": "workspace:^"
}
```

之后在 tools-test-proj 目录下创建 src 源码目录，写入如下代码：

```ts
import {sum, sub} from "tools";

console.log(sum(1, 2));
console.log(sub(10, 3));
```

对应的 pakcage.json 需要做一些调整：

- "type": "module"

另外 ts 的配置文件也需要做出一定的调整：

- "target": "ESNext",    
- "module": "ESNext",   
- "moduleResolution": "node", 
- "outDir": "./dist",    
- "include": ["./src"]

最后配置脚本：

```json
"scripts": {
   "start" : "tsc && node ./dist/index.js"
},
```

执行 pnpm start 就能看到该项目成功的引入了 tools 依赖。