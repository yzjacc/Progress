var mongoose = require("mongoose");
const { updateIfCurrentPlugin } = require("../mongoose-update-if-current/lib");
var Schema = mongoose.Schema;
const addressSchema = require("./addressSchema");

var userSchema = new Schema({
  loginId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 18,
  }, // String is shorthand for {type: String}
  loginPwd: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 10,
  },
  age: {
    type: Number,
    default: 18,
  },
  loves: {
    type: [String],
    default: [],
  },
  address: {
    type: addressSchema,
    required: true,
  },
  info: {
    type: String,
    virtual: true,
    get() {
      return `姓名：${this.name}, 年龄: ${this.age}`;
    },
  },
  operations: [{ type: Schema.Types.ObjectId, ref: "Operation" }],
});

userSchema.methods.print = function () {
  console.log(`姓名: ${this.name}
年龄: ${this.age}
爱好：${this.loves.join(",")}`);
};

userSchema.static("getUsers", async function (
  page = 1,
  limit = 10,
  keywords = ""
) {
  const skip = (page - 1) * limit;
  const reg = new RegExp(keywords);
  const filter = {
    $or: [{ name: reg }, { loginId: reg }],
  };
  const total = await this.countDocuments(filter);
  const datas = await this.find(filter).skip(skip).limit(limit);
  return {
    total,
    datas,
  };
});

userSchema.plugin(updateIfCurrentPlugin);
module.exports = mongoose.model("User", userSchema);
