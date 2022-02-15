var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = new Schema({
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});
