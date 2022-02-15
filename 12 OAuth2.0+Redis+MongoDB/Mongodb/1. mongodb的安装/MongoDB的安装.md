MongoDB官网：https://www.mongodb.com/zh

# windows下安装mongodb

下载`msi`安装程序

一步一步安装即可



# MacOS下安装mongodb

安装流程：https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

首先安装`homebrew`

**注意事项：**

在安装过程中如果出现权限不足的问题，输入命令：

```shell
sudo chown -R $(whoami) /usr/local/include /usr/local/lib /usr/local/lib/pkgconfig
```



添加开启自启动服务时需要使用`sudo`



# 安装robo 3T

类似于`mysql`的`navicat`

下载地址：https://robomongo.org/



# 基础概念

- `db`：和`mysql`的概念一致
- `collection`：集合，类似于`mysql`中的表
- `document`：每个集合中的文档，类似于`mysql`中的记录
  - `Primary Key`：和`mysql`中的主键含义一致，每个`document`都有一个主键
  - `field`：文档中的字段

![image-20200521170211855](http://mdrs.yuanjin.tech/img/image-20200521170211855.png)

`mongodb`属于`nosql`中的文档型数据库，每个文档相当于是一个对象，它没有列的概念，也没有表关系

由于它是一个`nosql`数据库：

- 无`sql`语句
- 使用极其简单，学习成本非常低
- 由于没有集合之间的关联，难以表达复杂的数据关系
- 存取速度极快

由于它是一个`文档型`数据库：

- 数据内容非常丰富和灵活
- 对数据结构难以进行有效的限制

