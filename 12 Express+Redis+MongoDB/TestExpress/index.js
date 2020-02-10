var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var cookie = require("cookie-parser");
var multer = require("multer");

var app = new express();
var uploadSingle = multer({dest: "./file/"});

app.use(express.static(globalConfig["page_path"]));
app.use(cookie());


app.get("/api/*", function (request, response, next) {
    if (request.cookies.id) {
        next();
    } else {
        response.redirect("/login.html");
    }
});

app.get("/api/getAllStudent", loader.get("/api/getAllStudent"));

app.get("/api/addStudent", loader.get("/api/addStudent"));

app.get("/login", loader.get("/login"));

app.post("/upload", uploadSingle.single("file"), loader.get("/upload"));

app.get("/getPic", loader.get("/getPic"));

app.listen(globalConfig["port"]);