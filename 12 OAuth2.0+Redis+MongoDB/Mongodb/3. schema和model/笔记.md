mongodb的驱动就叫做`mongodb`



> 创建连接、模型定义，CRUD



mongoose官网：https://mongoosejs.com/

mongoose民间中文网：http://www.mongoosejs.net/



schema: 结构，描述某种数据中有哪些字段、每个字段是什么类型、每个字段的约束

模型：对应数据库中集合的文档



模型：



1. 用户：

   ```js
   {
     loginId:"账号",
     loginPwd:"密码",
     name:"姓名",
     loves: ["爱好"],
     address: {
       province: "省份",
       city: "城市"
     }
   }
   ```

   



2. 用户操作：

   ```js
   {
     operation: "登录",
     time: 日期,
     userid: 用户的id,
     extraInfo: 任意对象, // 操作额外的信息
     address: { // 操作的地址
       province: "省份",
       city: "城市"
     }
   }
   ```

   

