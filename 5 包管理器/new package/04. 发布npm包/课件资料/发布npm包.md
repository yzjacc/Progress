# 发布npm包

要发布自己的包到 npm 上面，大致分为如下的步骤：

- 准备账号
- 配置 package.json
- 打包发布



## 准备账号

首先去 npm 官网注册一个账号：https://www.npmjs.com/

注意在注册账号的时候，把邮箱也一并设置了，方便之后接收验证码。

账号注册完毕后，就可以在控制台通过 npm login 来进行登录

还可以通过 npm profile 相关的指令来获取个人账号相关的信息

如果要退出登录，可以通过 npm logout 指令

> 注意，由于我们是要向 npm 官方推送包，所以需要将镜像修改为 npm 的镜像源
>
> npm config set registry=https://registry.npmjs.org/



## 配置 package.json

- 设置忽略文件
- 设置模块类型



### 设置忽略文件

当我们将包发布到 npm 上面的时候，意味着我们发布了哪些文件，最终用户下载安装的时候就会得到哪些文件，因此我们在发布的时候就要尽量避免不要上传没有意义的文件，这里就涉及到设置忽略文件。

设置忽略文件的方式有两种：

- 黑名单
- 白名单

**黑名单**

在项目根目录下面创建一个 .npmignore 的文件，该文件就用于设置哪些文件或者目录不需要上传到 npm

```
# .npmignore
src
tests
```

对于黑名单的方式，在新增了不需要发布的文件后，容易忘记修改 .npmignore 文件，因此我更加推荐使用白名单的方式。

**白名单**

所谓白名单，就是只只有出现在我名单里面的文件或目录才会被上传。

在 package.json 文件里面有一个 files 字段，只有 files 字段里面出现的文件或目录才会被上传。

```
{
  "name": "toolset2",
  "version": "1.0.7",
  "private": false,
  "description": "This is a JavaScript function library, primarily aimed at learning and communication.",
  // ...
  "files": [
    "/dist",
    "LICENSE"
  ]
}
```



### 设置模块类型

通过 type 值来设置模块类型。type 对应的有两个值：

- *commonjs*：当 *type* 的值设置为 *commonjs* 时，*node.js* 将默认使用 *CommonJS* 模块系统，这是 *node.js* 中最常见的模块系统。在这种情况下，可以直接使用 *require* 函数来导入模块。如果想使用 *ECMAScript* 模块（即使用 *import* 和 *export* 语法），则需要将文件扩展名设置为 .*mjs*。
- *module*：当 *type* 的值设置为 *module* 时，*node.js* 将默认使用 *ECMAScript* 模块系统。在这种情况下，可以直接使用 *import* 和 *export* 语法来导入和导出模块。如果你想使用 *CommonJS* 模块（即使用 *require* 导入模块），则需要将文件扩展名设置为 .*cjs*。

说白了现在的 node，你使用哪一种模块规范都无所谓，因为它两种都支持，你只需要通过 type 值来配置一下就可以了。

关于 type 这个配置项，不是 npm 所提供的配置选项，而是 node 提供的配置选项。

node 常见的配置项除了 type 以外，还有一个 exports，该配置项用于定义一个模块的导出映射，通过这个配置项，可以对模块的导入环境以及条件做一个更精细的控制，指定不同的模块的入口文件。

```
{
  "exports": {
    "import": "./dist/index.esm.js",
    "require": "./dist/index.cjs"
  }
}
```

我们在这里为不同的模块系统提供了不同的入口文件

- 使用的 ESM，那么在导入模块的时候，node.js 会去加载 index.esm.js
- 使用的是 commonjs，那么在导入模块的时候，node.js 会去加载 index.cjs



## 打包发布

首先我们有如下的项目：

```js
- src
   |-- index.js
	 |-- sum.js
   |-- sub.js
- package.json
- rollup.config.js
```

package.json 配置如下：

```json
{
  "name": "duyi-jstools",
  "version": "1.0.1",
  "description": "this package just for study and useless",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "build": "rollup -c"
  },
  "exports": {
    "require": "./dist/index.cjs",
    "import": "./dist/index.js"
  },
  "keywords": [
    "study",
    "useless"
  ],
  "files": [
    "/dist"
  ],
  "author": "xiejie",
  "license": "ISC",
  "devDependencies": {
    "rollup": "^2.79.1",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-terser": "^7.0.2"
  }
}

```

上面的重点配置：type、exports、files

还有一点一定要注意，rollup 打包工具一定要声明为开发依赖。

还有一些命令：

- npm whoami：查看当前登录的用户
- npm publish：发布包（如果你是要向 npm 推送包，确定你镜像切换为了 npm 镜像）