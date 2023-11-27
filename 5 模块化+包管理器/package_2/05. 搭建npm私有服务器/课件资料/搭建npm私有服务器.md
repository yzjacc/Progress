# 搭建npm私有服务器

在企业应用开发中，很多时候我们要发布的包是私有的，npm上面倒是支持发布私有包，但是需要付费账号，因此更好的选择就是搭建私有服务器。

- 能够保证代码的私密性
- 因为是在局域网内部，因此下载速度更快
- 可以将发布的包做一些权限上设置，利于维护



## Verdaccio

Verdaccio 是企业开发中非常流行的用来搭建 npm 私有仓库的一个工具，通过该工具可以让我们快速的搭建一个 npm 私服。

下面是关于 Verdaccio 的一些主要特点：

- 轻量级：*Verdaccio* 采用 *Node.js* 编写，安装和运行起来非常快速。它不依赖于任何外部数据库，而是将数据存储在本地文件系统中。
- 简单的配置：*Verdaccio* 的配置非常简单，只需一个 *YAML* 文件即可。您可以轻松地指定用户权限、上游代理、缓存设置等。
- 缓存和代理：*Verdaccio* 可以作为上游 *npm* 注册表的代理，从而帮助减轻网络延迟和提高包的安装速度。同时，它还会缓存已经下载的包，以便在没有互联网连接的情况下也能正常工作。
- 访问控制：*Verdaccio* 支持基于用户和包的访问控制，您可以轻松地管理谁可以访问、发布和安装私有 *npm* 包。
- 插件支持：*Verdaccio* 支持插件，您可以扩展其功能，如添加身份验证提供程序、审计日志等。

首先第一步需要安装：

```js
npm i -g verdaccio
```

查看 verdaccio 的基本信息：

```bash
verdaccio -h
```

要启动服务器只需要输入

```bash
verdaccio
```



### Verdaccio 相关的配置

Verdaccio 基本上做到了开箱即用，但是很多时候我们需要根据项目的需求做一些配置，你可以在官网查看到 Verdaccio 所有的配置：https://verdaccio.org/docs/next/configuration



首先要说一下，Verdaccio 配置文件采用的是 YAML 格式，这是配置文件的一种常用格式，基本的语法结构由键值对组成，使用缩进来表示层级关系，键值对使用冒号分隔，键和值之间使用一个空格分隔

```yaml
person:
  name: John
  age: 30
  address:
    street: Main St.
    city: New York
```



Verdaccio 相关的一些配置：

- storage：存储包的路径
- web：网站相关的配置，录入 titile 一类的
- uplinks：上游代理，我现在搭建了私服，但是我通过私服下载某些包的时候，私服可能没有。这个时候就会从上游代理中去下载这些包，然后缓存到私服里面

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

- packages：这个配置项就是对权限的控制，例如：

```bash
packages:
  '@your-scope/*':
    access: $authenticated
    publish: $authenticated
    proxy: npmjs
  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

@your-scope/ 这个作用域包，只允许认证过的用户访问和发布，对于其他的包，所有用户都能够访问，但是只有认证过的用户才能发布，从而能够对权限做一个很好的控制。



- auth：设置用户身份的验证方法，默认采用的是 htpasswd 的方式



## 镜像管理工具nrm

nrm 是一个专门用于管理 npm 镜像的工具，英语全称就是 npm registry manager

首先我们需要安装 nrm：

```bash
npm i -g nrm
```

安装的时候可能会遇到如下的错误：

```js
const open = require('open');
^

Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/jie/.nvm/versions/node/v16.17.1/lib/node_modules/nrm/node_modules/open/index.js from /Users/jie/.nvm/versions/node/v16.17.1/lib/node_modules/nrm/cli.js not supported.
```

这是因为 nrm 依赖于一个名为 open 的包，因此你在安装 nrm 的时候，同时也安装 open 即可：

```bash
npm install -g nrm open@8.4.2
```



nrm 常见的指令如下：

- nrm ls：列出你所有的可用的镜像列表
- nrm use \<registry>：切换镜像
- nrm add \<registry> \<url>：添加镜像
- nrm del \<registry>：删除镜像