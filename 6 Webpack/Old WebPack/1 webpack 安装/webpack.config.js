// 最近，经常使用npm install安装一些模块包来辅助开发。在安装模块包的时候有时候使用“--save”参数，有时候使用“—save-dev”参数，对两者的使用笔者一开始是非常模糊的。于是各种查资料，将npn install的安装问题总结下来。


// 我们使用 npm install 安装模块，一般会使用下面这几种命令形式：

// 1、npm install moduleName ，安装模块到项目目录下，并在package文件的dependencies节点写入依赖。

// 2、npm install --global moduleName ， --global 的意思是将模块安装到全局，具体是安装到磁盘哪个位置，可以使用命令“ npm config get prefix” 来查看全局包的安装位置。

// 3、npm install --save moduleName ， --save 的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。

// 4、npm install --save-dev moduleName ，--save-dev 的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。

// 这四种安装命令都会安装模块，那么我们在安装模块时应该使用哪一种呢？

// npm install moduleName 命令

// 1. 安装模块到项目node_modules目录下。

// 2. 不会将模块依赖写入devDependencies节点，但会写入dependencies节点。针对这一点，网上普遍说不会修改package.json文件。但笔者实践，确实会修改package.json文件。

// 3. 运行 npm install 初始化项目时不会下载模块。


// npm install --global moduleName 命令

// 1. 安装模块到全局，不会在项目node_modules目录中保存模块包。

// 2. 不会将模块依赖写入devDependencies或dependencies 节点。

// 3. 运行 npm install 初始化项目时不会下载模块。

// npm install --save moduleName 命令

// 1. 安装模块到项目的node_modules目录下。

// 2. 会将模块依赖写入dependencies 节点。

// 3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。

// 4. 运行npm install --production或者注明NODE_ENV变量值为production时，会自动下载模块到node_modules目录中。

// npm install --save-dev moduleName 命令

// 1. 安装模块到项目node_modules目录下。

// 2. 会将模块依赖写入devDependencies 节点。

// 3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。

// 4. 运行npm install --production或者注明NODE_ENV变量值为production时，不会自动下载模块到node_modules目录中。

// 总结

// devDependencies 节点下的模块是我们在开发时需要用的，比如项目中使用构建工具webkpack、 gulp ，用来辅助压缩js、css、html等。这些模块在我们的项目部署后是不需要的，所以我们可以使用 --save-dev 的形式安装；像 bootstrap、vue、angular、express 这些模块是项目运行必备的，应该安装在 dependencies 节点下，所以我们应该使用 --save 的形式安装；工具类的比如构建工具gulp，需要使用命令来运行任务，则需要使用—global来安装。

// 至于不加任何参数的npm install moduleName 和npm install --save moduleName 命令，在笔者实践看来，目前这两个命令效果是一样的，笔者姑且认为是—save的缺省模式。不知道大家在使用npm install 安装模块包过程中，有没有遇到过迷惑呢？大家如果觉得笔者理解的不全面的话，欢迎补充！

var htmlPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: {
        index:'./src/index.js',
    },
    output: {
        filename:'[name].bundle.js',
        path: path.resolve(__dirname,'./dist')

    },
    module: {
        rules: [
            { test: /\.css$/,use:['style-loader','css-loader']}
        ]
    },
    mode: 'development',
    plugins:[
        new htmlPlugin()
    ],
}