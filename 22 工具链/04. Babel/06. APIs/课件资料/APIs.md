# APIs

关于 babel 里面的 APIs 主要位于 @babel/core 这个依赖里面，你可以在官网左下角的 Tooling Packages 分类下找到这个依赖包。

这里顺便介绍一下每一种依赖包的作用：

- *@babel/parser*: 是 *Babel* 的解析器，用于将源代码转换为 *AST*。
- *@babel/core*: *Babel* 的核心包，它提供了 *Babel* 的核心编译功能。这个包是使用 *Babel* 必须安装的。
- *@babel/generator*: 是 *Babel* 的代码生成器，它接收一个 *AST* 并将其转换为代码和源码映射（*sourcemap*）。
- *@babel/code-frame*: 提供了一种用于生成 *Babel* 错误消息的方法，可以在代码帧中高亮显示错误。
- *@babel/runtime*: 提供了 *Babel* 运行时所需要的辅助函数和 *polyfills*，以避免在每个文件中都重复这些代码。
- *@babel/template*: 提供了一种编写带有占位符的 *Babel AST* 模板的方法。
- *@babel/traverse*: 是 *Babel* 的 *AST* 遍历器，它包含了一些用于处理 *AST* 的工具。
- *@babel/types*: 提供了一种用于 *AST* 节点的 *Lodash-esque* 实用程序库。

在第一节课的时候，我们安装了三个依赖：core、cli、preset，但是我们使用 babel 进行编译的时候发现最终是生成了编译后的代码的，而从 AST 生成编译后代码是 generator 的工作，实际上当你安装 core 的时候，就会间接的安装 generator、traverse 等需要用到的依赖包。



通过对官方 API 的观察，我们发现 babel/core 的 API 主要分为三大类：

- transformXXX
- parseXXX
- loadXXX



## transformXXX

这一组方法一看就是做和编译相关的操作，之所以有这么多，其实就是同步或者异步、编译代码或者文件的区别，每个方法的具体含义如下：

- *transform(code: string, options: Object)*: 这是一个异步函数，用于将源代码字符串转换为 *Babel* 的结果对象。结果对象包含了转换后的代码，源码映射，以及 *AST*。
- *transformSync(code: string, options: Object)*: 这个函数和 *transform* 函数功能相同，但它是同步执行的。
- *transformAsync(code: string, options: Object)*: 这个函数和 *transform* 函数功能相同，它返回一个 *Promise*，这个 *Promise* 会在转换完成后解析为结果对象。
- *transformFile(filename: string, options: Object, callback: Function)*: 这个函数会读取并转换指定的文件。转换完成后，会调用提供的回调函数，并将结果对象传递给回调函数。
- *transformFileSync(filename: string, options: Object)*: 这个函数和 *transformFile* 函数功能相同，但它是同步执行的。
- *transformFileAsync(filename: string, options: Object)*: 这个函数和 *transformFile* 函数功能相同，它返回一个 *Promise*，这个 *Promise* 会在转换完成后解析为结果对象。
- *transformFromAst(ast: Object, code: string, options: Object)*: 这个函数接受一个 *AST* 对象，然后将这个 *AST* 转换为 *Babel* 的结果对象。这个函数可以用于在已经有 *AST* 的情况下避免重新解析代码。
- *transformFromAstSync(ast: Object, code: string, options: Object)*: 这个函数和 *transformFromAst* 函数功能相同，但它是同步执行的。
- *transformFromAstAsync(ast: Object, code: string, options: Object)*: 这个函数和 *transformFromAst* 函数功能相同，它返回一个 *Promise*，这个 *Promise* 会在转换完成后解析为结果对象。

上面这些方法中，只要搞懂一个，其他的也就搞懂了。



## parseXXX

该系列方法主要负责将源码转为抽象语法树（AST），之后就不管了。

- *parse(code: string, options: Object)*: 这是一个异步函数，用于解析源代码字符串并返回一个 *AST*。你可以通过选项对象来配置解析过程，例如是否包含注释，是否包含 *location* 信息等。

- *parseSync(code: string, options: Object)*: 这个函数和 *parse* 函数功能相同，但它是同步执行的。

- *parseAsync(code: string, options: Object)*: 这个函数和 *parse* 函数功能相同，它返回一个 *Promise*，这个 *Promise* 会在解析完成后解析为 *AST*。



## loadXXX

这一系列方法主要是做配置文件的加载工作的

- *loadOptions(options: Object)*: 这个函数接受一个选项对象，然后返回一个完整的、已解析的 *Babel* 配置对象。这个配置对象包括了所有的预设，插件，和其他配置选项。如果提供的选项对象中没有指定配置，那么这个函数会尝试从 .*babelrc* 文件或 *babel.config.js* 文件中加载配置。

    例如：
    
    ```js
    const babel = require('@babel/core');

    const options = {
      filename: './src/myFile.js',
    };
    
    const config = babel.loadOptions(options);
    
    console.log(config);
    ```
    
    在这个例子中，我们首先导入了 *@babel/core*，然后定义了一个选项对象。这个对象中，*filename* 属性指定了我们正在处理的文件的路径。然后我们使用 *@babel/core* 的 *loadOptions* 方法来加载 *Babel* 的配置。

    *loadOptions* 方法返回一个配置对象，这个对象包括了所有的预设，插件，和其他配置选项。在这个例子中，我们将这个配置对象打印到控制台。

- *loadPartialConfig(options: Object)*: 这个函数和 *loadOptions* 函数类似，但是返回的配置对象可能是部分的，也就是说，它可能没有包括所有的预设和插件。这个函数主要用于在构建工具中，当你需要对 *Babel* 配置进行更精细的控制时。