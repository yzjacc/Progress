var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const addressSchema = require("./addressSchema");
const operationTypes = require("./operationTypes");
var opSchema = new Schema({
  operation: {
    type: String,
    required: true,
    index: true,
    trim: true,
    enum: operationTypes,
  }, // String is shorthand for {type: String}
  time: {
    type: Date,
    default: Date.now,
  },
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  extraInfo: {
    type: Object,
    default: {},
  },
  address: {
    type: addressSchema,
    required: true,
  },
});

module.exports = mongoose.model("Operation", opSchema);
