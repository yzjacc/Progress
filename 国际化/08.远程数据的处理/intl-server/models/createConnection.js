//导入mongoose
const mongoose = require("mongoose");

//连接数据库的字符串
const dbURL = "mongodb://127.0.0.1:27017/intl";

//防止新版本的提示警告
mongoose.set('strictQuery', true);
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", function () { 
  console.log("连接数据库成功，连接地址为：" + dbURL);
})