# mongodb原生操作

```js
// 新增单个数据，doc是一个文档对象
db.<collection>.insertOne(doc); 

// 新增多个数据，docs是一个文档数组
db.<collection>.insertMany(docs); 

// 新增单个或多个数据，返回新增的行数，doc即可以是一个文档对象，也可以是一个文档数组
db.<collection>.insert(doc); 
```

> mognoose中的所有验证规则在原生操作中无效

# mongoose操作

**方式1：创建模型对象，然后保存**

```js
var obj = new <Model>(doc); 
var result = await obj.save(); // 保存文档到数据库，会触发验证，也可以使用回调模式
```

**方式2：直接使用函数创建对象**

```js
// 创建一个或多个文档
// 也可以使用回调模式
// 若传入单个对象，返回单个对象
// 若传入多个对象，返回一个数组
var result = await <Model>.create(...doc); 
```



**创建操作的细节**：

- `mongoose`会为每个对象（包括子对象）添加唯一键`_id`，这是一种极好的的做法，特别是在对象数组中，可以有效的维护数据的唯一标识

  - 如果希望禁用这种做法，只需要在相应的`Schema`中配置`_id: false`

- `mongoose`在创建文档时，会自动生成一个字段`__v`，该字段用于方式并发冲突（后续课程中讲解）

  - 如果希望禁用这种做法，只需要在`Schema`的第二个参数中配置`versionKey: false`

- `mongoose`总是会在保存文档时触发验证，如果希望禁用这种行为，可以有两种做法：

  - 在`Schema`的第二个参数中配置`validateBeforeSave:false`，这将导致使用该`Schema`的`Model`在保存时均不会触发验证

  - 在调用`save`方法或`create`方法时，传入一个配置对象，配置`validateBeforeSave:false`，这样一来，仅针对这一次调用不进行验证。当给`create`方法传入配置时，为了避免歧义，需要将第一个参数设置为数组。

    > `mongoose`支持`<Model>.validate(doc, [context])`直接对文档进行验证，该验证是异步的。
    >
    > 当验证失败时，抛出的错误类型是`ValidationError`
    >
    > 注意：unique在数据库中表现为唯一索引（unique index），并不属于验证的范畴，因此尽管`unique`约束不满足，也不会导致验证失败，最终在添加时会抛出`MongoError`，而不是`ValidationError`

- `<Model>.create(doc, option)`等效于`new <Model>(doc).save(option)`

  - 如果你给`create`传入的是多个文档，则其在内部会创建多个模型，然后循环调用它们的`save`方法

- 无论用哪一种方式，都会得到**模型实例**，该实例会被`mongoose`持续跟踪，只要对模型实例的修改都会被记录，一旦重新调用模型实例的`save`方法，就会把之前对模型的所有更改持久化到数据库。

- 新增对象时，如果遇到`Schema`中没有定义的字段，则会被忽略

