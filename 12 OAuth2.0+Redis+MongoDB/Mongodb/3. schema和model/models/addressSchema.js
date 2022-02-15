const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});
