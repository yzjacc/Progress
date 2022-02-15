// 1. 定义User Schema
const mongoose = require("mongoose");
const addressSchema = require("./addressSchema");
const userSchema = new mongoose.Schema({
  // Schema 的配置
  loginId: {
    type: String, // 类型是字符串
    required: true, // 必填
    trim: true,
    minlength: 6,
    maxlength: 18,

    index: true, // 将该字段设置为索引
    unique: true, // 特殊索引，唯一索引
  },
  loginPwd: {
    type: String, // 类型是字符串
    required: true, // 必填
    trim: true,
    minlength: 6,
    maxlength: 18,
    select: false, // 默认情况下，查询用户时不会查询该字段
  },
  name: {
    type: String, // 类型是字符串
    required: true, // 必填
    trim: true,
    minlength: 2,
    maxlength: 10,
  },
  loves: {
    type: [String], // 类型是一个数组，数组每一项是一个字符串
    required: true,
    default: [], // 默认值为一个空数组
  },
  address: {
    type: addressSchema,
    required: true,
  },
});

// 2. 通过User Schema定义模型，最终导出模型
module.exports = mongoose.model("User", userSchema);
