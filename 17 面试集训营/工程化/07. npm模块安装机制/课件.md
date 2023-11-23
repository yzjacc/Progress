解释一下 npm 模块安装机制是什么？

> 参考答案：
>
> 1. npm 会检查本地的 node_modules 目录中是否已经安装过该模块，如果已经安装，则不再重新安装
> 2. npm 检查缓存中是否有相同的模块，如果有，直接从缓存中读取安装
> 3. 如果本地和缓存中均不存在，npm 会从 registry 指定的地址下载安装包，然后将其写入到本地的 node_modules 目录中，同时缓存起来。



> npm 缓存相关命令：
>
> ```shell
> # 清除缓存
> npm cache clean -f
> 
> # 获取缓存位置
> npm config get cache
> 
> # 设置缓存位置
> npm config set cache "新的缓存路径"
> ```