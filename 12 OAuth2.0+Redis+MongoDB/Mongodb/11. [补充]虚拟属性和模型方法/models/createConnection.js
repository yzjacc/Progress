const mongoose = require("mongoose");
const { updateIfCurrentPlugin } = require('../mongoose-update-if-current/lib');
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.plugin(updateIfCurrentPlugin);
mongoose.connection.on("open", () => {
  console.log("连接已打开");
});
