var app = require("../express");
var url = require("url");
var tagsDao = require("../dao/TagsDao");

app.get("/getTagsCloud", function (request, response) {
    tagsDao.queryAllTags(function (result) {
        result.sort(function () {
            return 0.5 - Math.random();
        });
        response.writeHead(200);
        response.end(JSON.stringify(result));
    });
});