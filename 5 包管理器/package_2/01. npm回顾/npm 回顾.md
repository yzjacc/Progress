# npm 回顾

- 回顾 npm 基本概念
- 关于包的概念



## 回顾npm基本概念

node package manager，翻译成中文就是 node 包管理器。

为什么现代前端开发中需要包管理器 ？

- 因为在进行项目开发的时候，往往会需要用到别人现成的代码，但是这里就会涉及到一个问题，如果采用传统的方式，那么每次我们在引入一个包的时候，需要从官网下载代码，解压，然后放入到自己的项目，这样的做法太过原始，非常繁琐
- 在现代开发中，引用的包往往存在复杂的依赖关系，例如模块A依赖于模块B，模块B又依赖于模块C，如果让开发者来管理这种依赖，非常容易出错也很麻烦。

因此包管理器诞生了，包管理器就是专门用于管理软件包、库以及相互之间的依赖关系的一种工具。

一般来讲，一门成熟的语言，一定会有配套的包管理器：

- *Node.js*: *npm* (*Node Package Manager*)
- *Python*: *pip* (*Pip Installs Packages*)
- *Ruby*: *rubygems* (*Ruby Gems*)
- *Java*: *Maven* (*Maven Repository*)
- *PHP*: *Composer* (*Dependency Manager for PHP*)
- *Rust*: *Cargo* (*Rust's Package Manager*)
- *Go*: *Go mod* (*Go's Package Manager*)

npm 实际上是由 3 个部分组成：

- 网站：也就是 npm 的官网：https://www.npmjs.com/ ，注册账号、搜索某一个包查看这个包（某一个插件没有官网那种）的说明
- CLI（command line interface）：所谓命令行接口，就是在控制台输入命令来进行交互。这个是我们平时和 npm 打交道最多的方式，我们在控制台能够输入一些命令（npm i、 npm init）进行交互。
- registry：这个就是 npm 对应的大型仓库，上传的包都会存储到这个仓库里面。



## 关于包的概念

究竟什么是包（package）？

- 一个目录就是一个包 ？
- 包和 module 有什么区别 ？
- public package、private package、scope package ？

从软件工程的角度来讲，包是一种组织代码结构的方式，一般来讲，一个包提供了一个功能来解决某一个问题，一般一个包会将相关的所有目录和文件放到一个独立的文件夹中，并且通过一个特殊的文件（package.json）来描述这个包。

另外，如果你要向npm发布包，npm要求你必须要有 package.json 这个文件。



module 翻译成中文叫做模块。一般来讲我们会将一个单独的 JS 文件称之为一个模块（module），这个模块通过会包含一个或多个变量、函数、类、对象的导出。模块是一个独立的单元，可以被其他模块导入并使用。

例如：

```bash
my-package/
|-- lib/
|   |-- string-utils.js
|-- package.json
|-- README.md
```

在上面的示例中，my-package 就是一个包，string-utils.js 就是一个模块。



一个包可以分为 scoped 和 unscoped，翻译成中文就是“作用域包”和“非作用域包”。

- scoped package（作用域包）：必须要以 @ 符号开头，后面跟上你的作用域名称，接下来一个斜杠，最后是包名。@scope-name/package-name，其实你在前面的学习中也是接触过的：@vue/cli、@vue/runtime-core、@vue/shared

  - 针对这种作用域包，我们在安装的时候，就需要将作用域名写全

  ```bash
  npm i @vue/cli -g
  ```

  - 包括在被引入的时候，也需要将作用域名写全

  ```js
  const mypackage = require("@myorg/mypackage");
  ```

  - 可以避免重名的情况，这个作用域名可以充当一个命名空间
  - 通过作用域名往往也能表达某一系列包是属于某一个组织

- unscoped package（非作用域包）：非作用域包由于没有特定的作用域，因此你在发布的时候一定要保证你的包名是全局唯一的。常见的非作用域包也很多：lodash、axios



一个包还可以分为 public 和 private，翻译成中文就是“公共包”和“私有包”。

- *public package*：公共包是在 *npm* 注册表中公开发布的包，任何人都可以搜索、查看和安装这些包。公共包在发布时默认为开源许可证（如 *MIT*、*BSD*、*Apache* 等），这意味着其他人可以自由地查看源代码、修改代码并在自己的项目中使用。当你希望与广泛的开发者社区共享你的代码并允许他们参与到项目中时，可以选择发布为公共包。
- *private package*：私有包是在 *npm* 注册表中非公开发布的包，它们只能被特定的用户或团队成员搜索、查看和安装。私有包通常用于存储企业内部的代码和资源，或者在开发过程中尚未准备好向公众发布的项目。要发布和使用私有包，**你需要拥有一个 *npm* 付费账户** 并将包的 *private* 属性设置为 *true*。*private package* 通常都是 *scoped package*。

