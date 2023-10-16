# 集成Prettier

目前我们所学习的两个工具：Pretter 和 ESLint，两者都有管理代码风格的功能，因此两者往往就会在代码风格的管理上面存在一些冲突。

例如举一个例子：

- ESLint 配置了单引号规则
- Prettier 配置了要使用双引号

那么现在假设你使用双引号，ESLint 会提示错误，然后我们将引号手动改为单引号，但是我们一格式化，因为会应用 Prettier 的格式化规则，又会被格式化为双引号，也就是说只要一格式化就会报错。

下面是一个具体的示例：

首先我们初始化了一个名为 eslint-prettier-demo 的项目，使用 pnpm init 进行一个初始化，之后分别安装 eslint 以及 prettier

接下来创建这两个工具的配置文件

prettier 配置文件：

```js
{
  "singleQuote": true,
  "semi": false,
  "printWidth": 80,
  "trailingComma": "es5"
}
```

eslint 配置文件

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'double'],
    semi: ['error', 'always'],
  },
}
```

src/index.js

```js
const str = 'Helo World'

const arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
]

const obj = {
  name: 'John Doe',
  age: 30,
  address: {
    city: 'New York',
    state: 'NY',
  },
}

console.log(str)
console.log(arr)
console.log(obj)
```



此时，我们就会发现两份配置之间就存在了冲突。只要一格式化（prettier），eslint 就会报错。

为了解决这个问题，有两个思路：

- 手动的将其中一个工具的配置文件进行修改，改成和另外一个工具的配置是相同的。这种方式肯定是没有问题的，但是缺点在于这种方式是手动的，如果涉及到大量的规则，那么手动操作比较繁琐
- 使用一些插件来帮助我们解决这个
  - *eslint-config-prettier* 会关闭所有与 *Prettier* 冲突的 *ESLint* 规则
  - *eslint-plugin-prettier* 将 *Prettier* 作为 *ESLint* 规则来运行，这样在运行 *ESLint* 时也会运行 *Prettier*。



接下来我们来安装这两个插件：

```bash
pnpm add eslint-config-prettier eslint-plugin-prettier -D
```

之后修改 ESLint 的配置文件，代码如下：

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        semi: false,
      },
    ],
  },
}
```

在上面的配置文件中，我们在 extends 里面添加了一个 plugin:prettier/recommended 配置项目，该配置项表示应用 prettier 来作为 ESLint 的插件来运行，当遇到 ESLint 和 Prettier 冲突的规则的时候，关闭 ESLint 的然后用 Prettier 的。

我们也可以书写 rules，但是rules注意就不要再和 ESLint 冲突了，一般只修改规则的重要级别，不修改其他的配置项。