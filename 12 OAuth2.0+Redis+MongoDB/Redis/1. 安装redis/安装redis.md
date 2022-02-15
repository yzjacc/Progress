# redis 简介

> 官网：https://redis.io/
>
> 民间中文网：http://www.redis.cn/

`redis`是一个`键值对数据库`，属于`nosql数据库`的一种。

`redis`是开源系统，遵守`BSD开源协议`。

既然是键值对数据库，键自然是不可重复的，而值可以是

- 字符串 `String`，最常用的类型
- 哈希 `Hash`
- 列表 `list`
- 集合 `set` 
- 有序集合 `sorted sets`

有别于其他数据库，`redis`对数据的操作是在内存中完成的，因此：

- `redis`有着超高的读写效率
- `redis`会耗费大量内存，因此往往会搭建`redis`集群来解决内存不足的问题

尽管对数据的操作在内存中完成，但`redis`仍然提供了持久化的功能，在默认情况下，它使用异步的方式将数据写入到硬盘，以便重启之后从硬盘中恢复数据到内存

```mermaid
sequenceDiagram
rect rgba(0, 0, 255, .1)
Note right of redis: 程序运行中
redis->>内存: 写入数据
redis->>内存: 写入数据
内存->>redis: 读取数据
内存->>磁盘: 同步数据
redis->>内存: 写入数据
redis->>内存: 写入数据
内存->>redis: 读取数据
内存->>磁盘: 同步数据
end
rect rgba(255, 0, 0, .4)
Note right of redis: 程序停止
end
rect rgba(0, 0, 255, .1)
Note right of redis: 程序运行中
磁盘->>内存: 恢复数据
redis->>内存: 写入数据
内存->>redis: 读取数据
内存->>磁盘: 同步数据
redis->>内存: 写入数据
redis->>内存: 写入数据
内存->>redis: 读取数据
内存->>磁盘: 同步数据
end
```

基于`redis`的这种特点，我们通常用它记录`缓存`

```mermaid
sequenceDiagram
client->>redis: 请求
note over redis: 无缓存
redis->>db: 
note over redis,db: 从数据库获取内容，然后缓存起来
db->>redis: 
redis->>client: 响应
client->>redis: 请求
note over redis: 缓存命中
redis->>client: 响应缓存结果
```

常用服务器结构：

<img src="http://mdrs.yuanjin.tech/img/image-20200611140130649.png" alt="image-20200611140130649" style="zoom:50%;" />

# windows 中安装redis

1. 下载：https://github.com/microsoftarchive/redis/releases
2. 双击安装

# mac 中安装 redis

```shell
brew install redis # 安装redis
brew services start redis # 启动redis
brew services stop redis # 停止redis
brew services restart redis # 重启redis
```



# 可视化工具

 VSCode 插件 `Redis`