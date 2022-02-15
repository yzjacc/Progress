var mongoose = require("mongoose");
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
  operations: [{ type: Schema.Types.ObjectId, ref: "Operation" }],
});

module.exports = mongoose.model("User", userSchema);
