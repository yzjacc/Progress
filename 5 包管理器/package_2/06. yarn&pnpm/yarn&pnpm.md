# yarn&pnpm

这一小节我们来了解一下 yarn 和 pnpm 是在什么背景下出现的，解决了 npm 当时所存在的什么问题。



## yarn

yarn这个包管理器是在 2016 年出现的，yarn 是由几家公司（Facebook、google、Exponent）的团队共同开发推出的。

yarn官网：https://yarnpkg.com/

当时 yarn 的出现，主要是为了解决 npm 在速度、安全性以及一致性上面的一些问题。

- 安装速度：在早期的时候，npm 的安装速度是很慢的，尤其是在大型项目中尤为明显，yarn 使用了并行下载以及缓存的机制，显著的提升了依赖安装的速度。
- 一致性：npm 在安装依赖的时候，同一个项目在不同时期进行安装的话，会产生不同的 node_module 结构，因为早期的 npm 只有 package.json，该文件只能确定包的元数据信息（包名、版本、作者....）以及直接依赖，但是间接依赖的版本是没有确定的，这样就会存在因为间接依赖版本不一致导致的项目无法重现的潜在问题。在 yarn 中，引入了一个名为 yarn.lock 的锁文件，该文件记录了所有依赖（直接依赖以及间接依赖）的版本信息，从而保证同一个项目无论什么时候安装的依赖都是相同的。
- 安全性：yarn 提供了一种在安装过程中对包进行校验的机制，确保包的完整性。
- 离线安装：在没有网络的情况下，可以从缓存中离线安装依赖。



这里罗列出中yarn中常用指令和npm之间的对比：

| *npm*                               | *yarn*                       | 说明               |
| ----------------------------------- | ---------------------------- | ------------------ |
| *npm init*                          | *yarn init*                  | 初始化项目         |
| *npm install/link*                  | *yarn install/link*          | 默认的安装依赖操作 |
| *npm install \<package>*            | *yarn add \<package>*        | 安装某个依赖       |
| *npm uninstall \<pacakge>*          | *yarn remove \<package>*     | 移除某个依赖       |
| *npm install \<package> --save-dev* | *yarn add \<pacakge> --dev*  | 安装开发依赖       |
| *npm update \<package> --save*      | *yarn upgrade \<package>*    | 更新某个依赖       |
| *npm install \<package> --global*   | *yarn global add \<pacakge>* | 全局安装           |
| *npm publish/login/logout*          | *yarn publish/login/logout*  | 发布/登录/登出     |
| *npm run \<script>*                 | *yarn run \<script>*         | 执行 *script* 命令 |

通过上面的表格对比，我们可以看出，从 npm 切换到 yarn 基本上是无缝切换，没有什么学习成本。

在 yarn 出现之后，npm团队也意识到了这些问题，对后续的 npm 做了一定程度的改进。

- 速度：从 npm v5 版本开始，内部做了一些优化，包括提供了缓存的机制，因此速度大幅提升
- 确定性：从 npm v5 版本开始，提供了一个名为 package.lock.json 的文件，该文件就类似于 yarn.lock 文件，会记录所有依赖的版本信息。
- 安全性：使用 npm audit 这个指令可以检查是否有存在漏洞的包。
- 离线安装：从 npm v5 开始，也引入缓存的机制，在没有网络的时候，也可以从缓存中进行安装。



## pnpm

pnpm 是一个最近新推出的包管理器，它主要是解决了 npm 和 yarn 在包安装策略上面的一些问题。

pnpm官网：https://pnpm.io/

1. 磁盘空间利用的问题

在 npm 和 yarn 中，当多个项目使用相同的依赖包的时候，这些依赖包会在每个项目都存在一份。这个对我们的磁盘空间来讲实际上是一种浪费。pnpm就解决了这个问题，在 pnpm 中会使用一个全局的存储空间，存放已经安装的包，在每个项目里面的 node_modules 里面会创建相同的符号链接去链接全局的包，这样相同的包只需要存储一次，从而节省了磁盘空间。

![16852383061314](https://resource.duyiedu.com/xiejie/2023-05-30-013245.jpg)

2. 有更加严格的依赖关系管理

pnpm 有更加严格的依赖关系管理，限制开发者只能在代码中引入 package.json 里面声明了的依赖包。

这是一个比较经典的问题，被称之为幽灵依赖。假设我在 package.json 里面依赖了 A 这个包（直接依赖），A 这个包又间接依赖 B 这个包（间接依赖），根据 npm 的下载规则，会将 A 和 B 这两个包都下载到 node_modules 目录里面，B就被称之为幽灵依赖。B 这个幽灵依赖由于和 A 是平级的，用户就可以直接引入 B 这个包，哪怕在 package.json 里面并没有书写这个依赖项

```js
import B from "B";
```

这里会存在以下两个问题：

- 难以理解的依赖关系：当一个包意外的去引入一个幽灵依赖时，会导致整个依赖关于变得混乱，难以维护和追踪。
- 潜在的错误：假设我们现在在项目中直接引入了 B 这个幽灵依赖，后面在重现项目的时候，A 的版本更新了引起 B 的版本也更新了，那么在你的项目中就会存在兼容性的问题。

pnpm 会更加严格的控制依赖包，pnpm 在创建 node_modules 的时候，只会存在package.json 中声明了的依赖，其他的间接依赖（幽灵依赖）统统不会在 node_modules 里面出现。



**pnpm的基本使用**

从 npm 到 pnpm 的切换，基本上也就是零学习成本，可以做到无缝切换：

- 安装 *pnpm*：可以使用 *npm* 或者 *yarn* 进行安装，*npm install -g pnpm*
- 创建新项目：*pnpm init*
- 添加依赖：*pnpm add \<package>*
- 添加所有依赖：*pnpm install* 
- 升级依赖：*pnpm update \<package>*
- 删除依赖：*pnpm remove \<package>*

关于 pnpm 还有一个非常重要的知识点，叫做 workspace（工作空间），在后面我们介绍 monorepo 的时候，再来进行介绍。

针对 pnpm的出现，解决了上述所存在的问题，npm 和 yarn 自身也在做一些改进：

- *npm*：从 *npm v7* 开始，引入了一项名为 "*Workspaces*" 的功能，用于管理多个包的 *monorepo* 结构。这在一定程度上解决了多个项目之间共享相同依赖包的问题。然而，*npm* 仍然在每个项目的 *node_modules* 目录中存储依赖包，所以在磁盘空间利用上没有得到明显改善。

- *yarn*：*yarn v1* 提供了 "*Workspaces*" 功能，用于管理 *monorepo* 结构。*yarn v2*（*Yarn Berry*）引入了 "*Plug'n'Play*"（*PnP*）安装策略，它摒弃了 *node_modules* 目录，而是将依赖包存储在一个全局的位置，并直接从这个位置加载依赖。这在一定程度上解决了磁盘空间利用的问题。然而，*PnP* 改变了 *Node.js* 的模块解析方式，可能导致兼容性问题，因此并非所有项目都能直接使用。

关于几个包管理器之间的详细功能区别，在 pnpm 官网上面也有一张图：https://pnpm.io/feature-comparison