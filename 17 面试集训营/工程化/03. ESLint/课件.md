> ESLint官网：https://eslint.org/
>
> ESLint民间中文网：https://eslint.bootcss.com/

# ESLint的由来

JavaScript是一个过于灵活的语言，因此在企业开发中，往往会遇到下面两个问题：

- 如何让所有员工书写高质量的代码？

  比如使用`===`替代`==`

- 如何让所有员工书写的代码风格保持统一？

  比如字符串统一使用单引号

上面两个问题，一个代表着代码的质量，一个代表着代码的风格。

如果纯依靠人工进行检查，不仅费时费力，而且还容易出错。

ESLint由此诞生，它是一个工具，**预先配置好各种规则**，通过这些规则来自动化的验证代码，甚至自动修复

<img src="http://mdrs.yuanjin.tech/img/20211103145845.png" alt="image-20211103145844948" style="zoom:50%;" />

# ESLint的基本使用

## 安装

```shell
npm i -D eslint
```

## 如何验证

```shell
# 验证单个文件
npx eslint 文件名
# 验证全部文件
npx eslint src/**
```

## 配置规则

eslint会自动寻找根目录中的配置文件，它支持三种配置文件：

- `.eslintrc` JSON格式
- `.eslintrc.js` JS格式
- `.eslintrc.yml` YAML格式

这里以`.eslintrc.js`为例：

```js
// ESLint 配置
module.exports = {
  // 配置规则
  rules: {
    规则名1: 级别,
    规则名2: 级别,
    ...
  },
};
```

每条规则由名称和级别组成

**规则名称决定了要检查什么**

**规则级别决定了检查没通过时的处理方式**

所有的规则名称看这里：

- 官方：https://eslint.org/docs/rules/
- 中文：https://eslint.bootcss.com/docs/rules/

所有级别如下：

- 0 或 'off'：关闭规则
- 1 或 'warn'：验证不通过提出警告
- 2 或 'error'：验证不通过报错，退出程序

## 在VSCode中及时发现问题

每次都要输入命令发现问题非常麻烦

可以安装VSCode插件**ESLint**，只要项目的node_modules中有eslint，它就会按照项目根目录下的规则自动检测

## 使用继承

ESLint的规则非常庞大，全部自定义过于麻烦

一般我们继承其他企业开源的方案来简化配置

这方面做的比较好的是一家叫Airbnb的公司，他们在开发前端项目的时候自定义了一套开源规则，受到全世界的认可

我们只需要安装它即可

```shell
# 为了避免版本问题，不要直接安装eslint，直接安装下面的包，会自动安装相应版本的eslint
npm i -D eslint-config-airbnb
```

然后稍作配置

```shell
module.exports = {
	extends: 'airbnb' # 配置继承自 airbnb
}
```

## 在框架中使用

一般我们使用脚手架搭建工程，在搭建工程时通常都可以直接设置eslint

# 企业开发的实际情况

<img src="http://mdrs.yuanjin.tech/img/20211103163608.png" alt="image-20211103163608481" style="zoom:50%;" />

我们要做什么？

- 安装好VSCode的ESLint插件
- 学会查看ESLint错误提示