# ESLint 插件

*ESLint* 支持插件，使用插件是扩展 *ESLint* 功能的一种方式，你可以通过插件的方式来自定义新的规则或者处理器，你也可以自己写一个有独特功能的插件发布到 *npm* 上面。

使用插件能够带来的好处包括：

- 自定义规则：用于验证你的代码是否满足某种预期，如果不满足该预期，应该如何处理。
- 自定义配置：用于定义一组规则和设置，这些规则和设置可以被重复使用，不需要在每个项目中重新定义。
- 自定义环境：用于定义一组全局变量，这些变量在特定环境下（例如浏览器、*Node.js、Jest* 等）是预定义的。
- 自定义处理器：用于从其他类型的文件中提取 *JavaScript* 代码，或在进行语法检查之前预处理代码。



## 插件名称的规范

ESLint 中的插件，每一个插件是一个 npm 模块，命名的格式为 eslint-plugin-\<插件名称>，eslint-plugin-jquery、eslint-plugin-react

插件还可以使用 scope 包的形式：

- @\<scope>/eslint-plugin-\<插件名称>
  - @jquery/eslint-plugin-jquery
  - 还可以只有前面的 scope：@jquery/eslint-plugin

在 npm 官网上面搜索 eslint-plugin 能够找到很多 ESLint 相关的插件。



## 使用插件的方式

使用现有的插件，方式非常简单，就分为两步：

- 安装插件
- 在配置文件中进行配置

假设你要使用一个名为 eslint-plugin-react 的插件，首先安装该插件：

```bash
pnpm add eslint-plugin-react -D
```

接下来在配置文件中进行配置：

```js
{
  "plugins": ["react"]
}
```

配置完成后，就可以在配置文件添置该插件所提供的各种规则：

```js
{
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  }
}
```



## 使用插件实例演示

这里我们来演示 eslint-plugin-vue 插件的使用。

该插件对应的官网地址：https://eslint.vuejs.org/

首先我们初始化一个 vue 的项目：

```bash
npm init vue@latest
```

接下来控制台会出现交互式选择，我们选择安装 ESLint 以及 Prettier



eslint-plugin-vue 提供了一些预定义配置的选项，说明如下：

- "*plugin:vue/base*"：提供设置和规则以启用正确的 *ESLint* 解析。

针对使用 *Vue.js 3.x* 的配置：

- "*plugin:vue/vue3-essential*"：包括 "*plugin:vue/base*"，并添加了一些规则以防止错误或意外行为。
- "*plugin:vue/vue3-strongly-recommended*"：在上述配置的基础上，添加了一些能显著提高代码可读性和/或开发体验的规则。
- "*plugin:vue/vue3-recommended*"：在上述配置的基础上，添加了一些强制执行社区主观默认的规则，以确保一致性。

针对使用 *Vue.js 2.x* 的配置：

- "*plugin:vue/essential*"：包括 "*plugin:vue/base*"，并添加了一些规则以防止错误或意外行为。
- "*plugin:vue/strongly-recommended*"：在上述配置的基础上，添加了一些能显著提高代码可读性和/或开发体验的规则。
- "*plugin:vue/recommended*"：在上述配置的基础上，添加了一些强制执行社区主观默认的规则，以确保一致性。



插件安装好了后，接下来就是这个插件具体带来了哪些规则。例如：

```js
rules: {
  'vue/html-quotes': ['error', 'double'],
  'vue/html-self-closing': [
    'error',
    {
      html: {
        void: 'always',
        normal: 'never',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }
  ]
},
```

这些规则你在插件的官网都是能够查询到的。