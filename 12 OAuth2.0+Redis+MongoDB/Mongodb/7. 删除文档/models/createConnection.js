const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("open", () => {
  console.log("连接已打开");
});
