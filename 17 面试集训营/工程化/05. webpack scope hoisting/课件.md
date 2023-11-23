# webpack scope hoisting

详细介绍：https://webpack.docschina.org/plugins/module-concatenation-plugin/

## 面试题

介绍一下 webpack scope hoisting？

> 参考答案：
>
> scope hoisting 是 webpack 的内置优化，它是针对模块的优化，在生产环境打包时会自动开启。
>
> 在未开启scope hoisting时，webpack 会将每个模块的代码放置在一个独立的函数环境中，这样是为了保证模块的作用域互不干扰。
>
> 而 scope hoisting 的作用恰恰相反，是把多个模块的代码合并到一个函数环境中执行。在这一过程中，webpack 会按照顺序正确的合并模块代码，同时对涉及的标识符做适当处理以避免重名。
>
> 这样做的好处是减少了函数调用，对运行效率有一定提升，同时也降低了打包体积。
>
> 但 scope hoisting 的启用是有前提的，如果遇到某些模块多次被其他模块引用，或者使用了动态导入的模块，或者是非 ESM 的模块，都不会有 scope hoisting。