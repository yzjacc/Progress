# 运行本地命令

使用`npx 命令`时，它会首先从本地工程的`node_modules/.bin`目录中寻找是否有对应的命令

例如：

```shell
npx webpack
```

上面这条命令寻找本地工程的`node_modules/.bin/webpack`

如果将命令配置到`package.json`的`scripts`中，可以省略`npx`

# 临时下载执行

当执行某个命令时，如果无法从本地工程中找到对应命令，则会把命令对应的包下载到一个临时目录，下载完成后执行，临时目录中的命令会在适当的时候删除

例如：

```shell
npx prettyjson 1.json
```

npx会下载`prettyjson`包到临时目录，然后运行该命令

如果命令名称和需要下载的包名不一致时，可以手动指定报名

例如`@vue/cli`是包名，`vue`是命令名，两者不一致，可以使用下面的命令

```shell
npx -p @vue/cli vue create vue-app
```

# npm init

`npm init`通常用于初始化工程的`package.json`文件

除此之外，有时也可以充当`npx`的作用

```shell
npm init 包名 # 等效于 npx create-包名
npm init @命名空间 # 等效于 npx @命名空间/create
npm init @命名空间/包名 # 等效于 npx @命名空间/create-包名
```

