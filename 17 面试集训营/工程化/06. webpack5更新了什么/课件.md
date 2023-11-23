# 清除输出目录

`webpack5`清除输出目录开箱可用，无须安装`clean-webpack-plugin`，具体做法如下：

```js
module.exports = {
  output: {
    clean: true
  }
}
```

# top-level-await

`webpack5`现在允许在模块的顶级代码中直接使用`await`

```js
// src/index.js
const resp = await fetch("http://www.baidu.com");
const jsonBody = await resp.json();
export default jsonBody;
```

目前，`top-level-await`还未成为正式标准，因此，对于`webpack5`而言，该功能是作为`experiments`发布的，需要在`webpack.config.js`中配置开启

```js
// webpack.config.js
module.exports = {
  experiments: {
    topLevelAwait: true,
  },
};
```

# 打包体积优化

`webpack5`对模块的合并、作用域提升、`tree shaking`等处理更加智能

# 打包缓存开箱即用

在`webpack4`中，需要使用`cache-loader`缓存打包结果以优化之后的打包性能

而在`webpack5`中，默认就已经开启了打包缓存，无须再安装`cache-loader`

默认情况下，`webpack5`是将模块的打包结果缓存到内存中，可以通过`cache`配置进行更改

```js
const path = require("path");

module.exports = {
  cache: {
    // 缓存类型，支持：memory、filesystem
    type: "filesystem", 
    // 缓存目录，仅类型为 filesystem 有效
    cacheDirectory: path.resolve(__dirname, "node_modules/.cache/webpack"), 
  },
};
```

> 关于`cache`的更多配置参考：https://webpack.docschina.org/configuration/other-options/#cache

# 资源模块

在`webpack4`中，针对资源型文件我们通常使用`file-loader`、`url-loader`、`raw-loader`进行处理

由于大部分前端项目都会用到资源型文件，因此`webpack5`原生支持了资源型模块

详见：https://webpack.docschina.org/guides/asset-modules/