# CLI

关于 babel 所提供的 CLI，你可以在 https://babeljs.io/docs/babel-cli 看到所有所支持的 CLI 命令。

要使用 CLI 命令，首先第一步是安装：

```bash
pnpm add --save-dev @babel/core @babel/cli
```

注意在安装 @babel/cli 这个包的时候，需要同时安装 @babel/core 这个包，这个包是提供 babel 核心 API 的。CLI 背后实际上就是使用的 API 来实现的。



## 编译文件相关的 CLI

在使用 babel 的 CLI 命令的时候，有一个基本的格式：

```bash
babel [file | dir | glob] --out-[file | dir]
```

如果你没有指定 --out，那么 babel 会将编译后的结果输出到控制台。

常见的格式如下：

```bash
# 编译结果输出到控制台
babel script.js 
# 编译结果输出到指定文件
babel script.js --out-file script-compiled.js 
# 编译整个目录到指定目录下
babel src --out-dir lib
# 编译整个目录下的文件，输出到一个文件里面
babel src --out-file script-compiled.js
# 监视文件，当文件发生变化时自动重新编译
babel script.js --watch --out-file script-compiled.js 
```

我们在进行编译的时候，可以指定是否要生成 source map：

```bash
babel script.js --out-file script-compiled.js --source-maps
babel script.js --out-file script-compiled.js --source-maps inline
```



## 忽略文件和拷贝文件

有些时候我们在进行编译的时候，想要忽略某些文件

```bash
# 忽略 src 目录下面的所有测试文件
babel src --out-dir lib --ignore "src/**/*.spec.js","src/**/*.test.js"
```

有些文件我们想要原封不动的进行拷贝，不需要 babel 进行编译

```bash
# 将 src 目录下的文件原封不动的复制到 lib 目录下
babel src --out-dir lib --copy-files 
# 进行拷贝的时候忽略文件中匹配的文件不要拷贝
babel src --out-dir lib --copy-files --no-copy-ignored
```



## 使用插件和预设

在 CLI 命令行里面也是可以指定插件和预设的

```bash
# 指定插件
babel script.js --out-file script-compiled.js --plugins=@babel/transform-class-properties,@babel/transform-modules-amd
# 指定预设
babel script.js --out-file script-compiled.js --presets=@babel/preset-env,@babel/flow
```



## 使用配置文件

通过 --config-file 可以指定配置文件的位置

```bash
babel --config-file /path/to/my/babel.config.json --out-dir dist ./src
```

如果想要忽略已经有了的配置文件中的配置，可以使用 --no-babelrc

```bash
babel --no-babelrc script.js --out-file script-compiled.js --presets=@babel/preset-env,@babel/preset-react
```

