const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    required: false,
  },
  locale: {
    type: String,
    required: false,
  }
}, {versionKey:false});
module.exports = mongoose.model("PostModel", postSchema);