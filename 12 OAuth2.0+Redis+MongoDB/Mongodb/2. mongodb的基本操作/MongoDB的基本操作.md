通过`mongo`命令，即可进入`mongodb`的`shell`交互环境，在`shell`环境中，很多时候都可以使用简单的`js`语句即可完成对`mongodb`的控制



下面是`mongo`的常用命令：

1. 查看所有数据库：

   ```
   show dbs;
   ```

2. 显示当前使用的数据库：

   ```
   db;
   ```

3. 查看当前数据库状态：

   ```
   db.stats()
   ```

4. 查看数据库中所有的集合：

   ```shell
   show collections;
   ```

5. 切换数据库：

   ```shell
   use 数据库名;
   ```

6. 向集合中添加文档：

   ```js
   db.collection.insertOne({文档内容});
   db.collection.insertMany([多个文档]);
   ```

   > 新的文档如果没有指定字段`_id`，则会自动添加一个字段`_id`作为主键
   >
   > 自动的主键是一个`ObjectId`对象，该对象是通过调用函数`ObjectId()`创建的
   >
   > 它的原理是根据`时间戳+机器码+进程Id+自增量`生成的一个十六进制的唯一字符串
   >
   > 使用`ObjectId`函数还可以把某个字符串还原成一个`ObjectId`对象，例如`ObjectId("xxxxx")`

7. 查询文档：

   ```js
   db.collection.find(查询对象);
   ```

8. 修改文档：

   ```shell
   db.collection.updateOne(<filter>, <update>)
   db.collection.updateMany(<filter>, <update>)
   db.collection.replaceOne(<filter>, <update>)
   ```

9. 删除文档：

   ```shell
   db.collection.deleteMany(查询对象)
   db.collection.deleteOne(查询对象)
   ```

   