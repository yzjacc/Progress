var express = require("express");
var cookie = require("cookie-parser");
var bodyParser = require("body-parser");
var app = new express();
app.use(express.static("./page"));
app.use(cookie());
// app.use(bodyParser.json());//数据JSON类型
// app.use(bodyParser.urlencoded({ extended: false }));
module.exports = app;