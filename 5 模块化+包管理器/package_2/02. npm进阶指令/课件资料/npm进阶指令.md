# npm进阶指令

平时同学们用的最多的指令可能就 3 个：

- npm init -y
- npm install xxx（npm i xxx）
- npm uninstall xxx（npm rm xxx）

所有的指令实际上可以在 npm 官网上面看到的：https://docs.npmjs.com/cli/v9/commands



## 查看相关信息的指令

- *npm version*：查看当前 npm cli 的详细信息，相比 npm -v 显示的信息要更丰富一些。
- *npm root*：查找本地或者全局安装的包的根目录。查看全局的包目录的话，需要添加 -g
- *npm info*：查看某一个包的详细信息，这里所说的信息是指包版本、依赖项、作者、描述等信息，便于开发者选择合适的包。
- *npm search*：这个命令是对包进行搜索，提供一个关键字，会搜索出所有和关键字相关的包
- *npm outdated*：该命令可以用于检查当前项目中的依赖包是否过时，以及当前可用的最新版本。
- *npm ls*：可以罗列出当前项目安装的依赖包以及依赖包下层的依赖。通过 --depth 0/1/2 来进行层级的调整，例如 npm ls --depth 1就能够罗列出当前依赖以及当前依赖下一层所需的依赖。如果是 npm ls -g 罗列出全局的包



## 配置相关指令

- npm config

一般来讲，一个成熟的工具，是一定会支持配置的，因为不可能把所有的东西写死，很多时候有一些东西需要让用户根据他们的需求进行配置。

npm 也如此，npm 的配置可以从三个地方：

- conmand line
- 环境变量
- .npmrc 文件

.npmrc 文件用的最多就是拿来配置仓库镜像，也可以通过命令行指令去改：

```bash
npm config get registry
npm config set registry=xxxxx
npm config list
```

我们还可以通过 npm config edit 进入到编辑模式，里面能够编辑各种配置项目



## 建立软链接

npm link

该命令用于针对一个包（a）创建一个快捷方式，其他项目假设要用到这个包（a），因为有快捷方式，其他项目通过快捷方式可以快速的链接到这个包，不需要每次 a 这个包重新发布，其他项目重新安装

下面是一个例子

假设我们有 a 和 b 两个包，这两个包都是独立发布的，现在 b 包中要用到 a 包里面的东西

首先针对 a 包做 link

```bash
npm link
```

运行上面的命令之后，就会在全局的 node_modules 下面创建一个软链接，指向 a

回头在 b 包里面要用到 a 包的时候，直接通过 link 去进行链接

```bash
npm link a
```



当开发完成后，我们需要断开链接，通过 npm unlink 来断开

```bash
cd /path/to/b
npm unlink a
```

假设现在 a 项目已经没有被任何项目所链接，那么我们就可以将其从全局 node_modules 里面删除

```bash
cd /path/to/a
npm unlink -g a
```



## 缓存相关的指令

npm cache

当我们安装、更新或者卸载包的时候，npm 会将这些包的 tarball 文件缓存到本地磁盘上，有助于加速将来的安装过程。之后再次安装的时候，可以直接从缓存文件中去获取，无需再次从远程仓库下载。

>*tarball* 文件是一种压缩文件格式，通常用于在 *Unix* 和 *Linux* 系统中打包和分发源代码、二进制文件或其他文件。*tarball* 文件的扩展名通常为 *.tar.gz* 或 *.tgz*，它们是通过将多个文件打包成一个 *.tar* 文件（使用 *tar* 工具），然后将该文件进行 *gzip* 压缩而创建的。
>
>在 *npm* 中，*tarball* 文件通常用于将包的所有文件（源代码、二进制文件、文档等）打包成一个单独的文件，以便在安装或更新包时从 *npm* 仓库（如 *registry.npmjs.org*）下载。当你运行 *npm install \<package>* 时，*npm* 会从远程仓库下载包的 *tarball* 文件，然后在本地解压缩和安装该包。

- 清理缓存：npm cache clean，在较新的版本中，目前已经不推荐直接清理缓存，而是推荐 npm cache verify 去验证缓存。
- 验证缓存：npm cache verify，验证缓存的完整性，检查缓存是否已经过期、无效、损坏，也就是说，验证缓存是否有用，如果没用再进行删除。
- 添加缓存：npm cache add \<package> ，一般不需要手动添加缓存，因为在安装包的时候就会自动添加缓存
- 查看缓存：npm cache ls 查看npm缓存的所有的包
- 查看缓存目录：npm config get cache



## 包的更新相关的指令

- npm update：该指令用于更新当前项目中的依赖包，npm 会检查是否有新的版本，如果有就会进行更新，但是注意，在更新的时候会去满足 package.json 里面的版本范围规定（^ ~）

  - 也可以指定要更新某一个包

  ```bash
  npm update package_name
  ```

  

- npm audit：用于检查当前项目中的依赖，哪些依赖有漏洞
  - 在审计的同时，可以直接进行修复，通过命令 npm audit fix



- npm dedupe：该命令能够优化项目里面的依赖树的结构，示例如下：

```bash
a
+-- b <-- depends on c@1.0.x
|   `-- c@1.0.3
`-- d <-- depends on c@~1.0.9
    `-- c@1.0.10

```

在上面的依赖树中，a 依赖 b 和 d，然而 b 和 d 都同时依赖 c，这种情况下，依赖是能够进行优化的

```bash
a
+-- b
+-- d
`-- c@1.0.10

```

注意，npm dedupe 无法将所有重复的包进行消除，因为在有些时候，不同的依赖项就是需要不同版本的相同依赖，不过 npm dedupe 会尽量去消除重复的包。



- npm prune：用于删除没有在 package.json 文件中列出的依赖包，该命令可以帮助我们清理 node_modules，删除不再需要的依赖。



## 提供帮助

上面我们已经介绍了很多的指令了，但是仍然没有覆盖所有的指令，而且不同指令还支持不同的配置参数。

- npm help：帮助指令，可以查看 npm 中提供的所有指令
- npm help xxx 来查看某个指令具体的一些信息