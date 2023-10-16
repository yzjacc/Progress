# CLI命令行工具

关于 CLI 命令行工具，我们在第一节课的时候就用到过一个：

```js
eslint --fix . 
```

在官网，我们可以看到 CLI 命令行工具的基本格式为：

```bash
eslint [options] [file|dir|glob]*
```

我们先来看后面的 [file|dir|glob]* ， 这个部分主要是用来指定 ESLint 应该检查哪些文件：

- file：用于指定一个具体的文件名

```bash
eslint app.js # 使用 eslint 检查 app.js 这个文件
```

- dir：指定一个目录

```bash
eslint src/ 
# 检查 src 目录下面的所有文件
```

- glob：这个 glob 是一种模式，有点类似于正则表达式，专门用来匹配文件的路径，glob 模式下面可以使用一些特殊的字符（ * ? []）来匹配文件名

```bash
eslint src/**/*.js
# 检查 src 以及下面所有子目录下的所有 js 文件
```

- \*：表示你可以指定多个文件或者目录或者 glob 模式



学习 CLI 命令行工具，主要是 options 这一块，这一块的配置选项是相当丰富的，这里我们对众多的 options 选项进行一个分类，然后每一类选择几个典型的命令来进行介绍。

- 基本配置
- 特殊规则和插件的配置
- 自动修复
- 忽略文件
- 输出
- 缓存



## 基本配置

#### `--no-eslintrc`

告诉 ESLint 忽略所有的配置文件，当你使用这个 option 的时候，ESLint 只会使用内置的规则集来对匹配上的文件进行检查

```bash
eslint --no-eslintrc .
```



#### `-c`, `--config`

允许我们指定配置文件的路径

```bash
eslint -c ~/my-eslint.json file.js
```

> ~ 在类 Unix 系统里面表示用户根目录



#### `--env`

该配置项允许我们指定一些环境，当指定了具体的环境之后，那么就会预设一些该环境下才会有的全局变量。

```bash
eslint --env browser,node file.js
eslint --env browser --env node file.js
```

在上面的 CLI 命令中，指定了 browser 以及 node 环境，指定了这两个环境之后，就会预设一些 window、process 之类的全局变量



#### `--ext`

允许我们指定 ESLint 要检查的文件的扩展名，默认情况下，ESLint 只检查 js 文件。

```bash
eslint . --ext .ts # 检查 ts 文件
eslint . --ext .js --ext .ts # 检查 js 和 ts 文件
eslint . --ext .js,.ts # 和上面一样，换了一种写法
```



#### `--global`

该配置项允许我们定义全局变量。例如我们的项目使用到了 jQuery，但是这个 ESLint 是不认识的，所以这里我们就可以使用 global 来定义这个全局变量

```bash
eslint --global jQuery:true .
```



#### `--parser`

这个选项允许你指定一个自定义的 *JavaScript* 解析器。默认情况下，*ESLint* 使用 *Espree*，但是你可以使用其他的解析器。例如，你可以使用 *Babel-ESLint*，如果你的项目中使用了 *Babel* 和 *ESLint*，你可以使用它来解析你的 *JavaScript* 代码。



## 特殊规则和插件的配置

#### `--plugin`

该配置项是用来指定要使用插件。

```bash
eslint --plugin jquery file.js # 指定使用 jquery 这个插件
```



#### `--rule`

该配置项就是指定检查的规则，一般来讲，检查规则是写到配置文件里面。但是针对某些场景下单独的一两条规则要改变，可以使用这种方式

```bash
eslint --rule 'quotes: [error, double]' .
```



## 自动修复

#### `--fix`

表示自动修复，但是需要主要，不是所有的问题 ESLint 都可以帮你修复。



#### `--fix-type`

允许你指定修复问题的类型，对应的值有 problem、suggestion、layout、directive

- *problem*：修复代码中的潜在错误，这种类型的问题通常是代码错误，如果不修复，可能会导致程序运行错误。
- *suggestion*：对代码应用改进性的修复，这种类型的问题通常不会导致程序错误，但修复它们可以改进代码，使代码更易读、更易维护，或更符合最佳实践。这些问题可能涉及到代码的优化、重构或者一些编程习惯的改进。例如，未使用的变量、复杂的表达式可以简化、不必要的代码重复等，都属于 *suggestion* 类型的问题。
- *layout*：应用不改变程序结构（抽象语法树，*AST*）的修复，主要涉及到代码的格式和样式。这些问题不会影响代码的功能或语义，但是修复它们可以使代码更具可读性和一致性。例如，不正确的缩进、缺失的分号、超过设定长度的行等，都属于 *layout* 类型的问题。
- *directive*：对内联指令（如 // *eslint-disable*）应用修复

注意上面的修复问题类型是可以同时指定多个的

```bash
eslint --fix --fix-type suggestion --fix-type problem .
```



## 忽略文件

#### `--ignore-path`

很明显是指定忽略文件的路径。

所谓忽略文件，就是指在项目中可以创建一个 .eslintignore 的文件，该文件里面记录一些文件名或者目录名，ESLint 在进行代码检查的时候，会忽略这些匹配上的文件名或者目录下面的文件

```bash
 eslint --ignore-path tmp/.eslintignore file.js
```



#### `--no-ignore`

忽略所有的忽略指令。本来 .eslintignore 文件里面记录了 ESLint 在进行检查的时候要忽略那鞋文件，当你用了这个指令之后，相当于你的 .eslintignore 文件失效了，里面记录的那些文件都要被 ESLint 检查

```bash
eslint --no-ignore .
```



#### `--ignore-pattern`

简单来说，就是将原本你应该写在 .eslintignore 里面的文件或者目录，写在了命令行里面

```bash
eslint --ignore-pattern "/lib/" --ignore-pattern "/src/vendor/*" .
```



## 输出

#### `-o`, `--output-file`

允许将 ESLint 的检查报告输出到一个文件里面

```bash
eslint -o report.txt .
```

在上面的配置中，ESLint 会将最终的检查结果报告输出到 report.txt 的文件中



#### `-f`, `--format`

正常情况下，ESLint 的检查报告在控制台进行输出，那么这个指令可以配置输出的格式

- "*stylish*"（默认）：这是 *ESLint* 默认的格式化选项。它以易于读取的方式显示 *linting* 结果，对于每个文件，它会列出所有的错误和警告，然后在下面显示一个摘要，包括总的错误和警告数量。

- "*compact*"：这种格式更加简洁。它将每个错误或警告限制为一行，其中包括文件名、行号、列号和问题描述。这种格式适合那些希望尽可能节省空间的情况。
- "*tap*" 是一个代表 "*Test Anything Protocol*" 的缩写，这是一个简单的文本格式，用于记录和通信测试结果。*ESLint* 会按照 *TAP* 规范来输出 *linting* 结果。这种格式特别适合于 *CI/CD*（持续集成和持续部署）环境，因为很多 *CI/CD* 工具都支持解析 *TAP* 格式的输出。



## 缓存

#### `--cache`

该配置项表示在进行ESLint检查的时候，生成一个缓存文件 .eslintcache，缓存文件默认在当前目录下面，有了缓存文件之后，下一次 ESLint 在做检查的时候速度会更快

```bash
eslint --cache .
```



#### `--cache-location`

我们可以指定缓存文件的位置

```bash
eslint "src/**/*.js" --cache --cache-location "/Users/user/.eslintcache/"
```



#### `--cache-strategy`

指定生成缓存时的缓存策略，对应的策略值有两个：

1. `metadata`：这是默认值，使用文件的元数据（修改时间和文件大小）来判断文件是否发生了变化
2. `content`：基于文件的内容来判断文件是否发生变化

```bash
eslint "src/**/*.js" --cache --cache-strategy content
```