var app = require("../express");
var url = require("url");
var everyDayDao = require("../dao/EveryDayDao");
var timeUtil = require("../util/TimeUtil");

app.get("/blog/addEveryDay", function (request, response) {
    var params = url.parse(request.url, true).query;
    everyDayDao.insertEveryDay(params.content, timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.end(JSON.stringify({status: 1, msg: "success"}));
    });
});

app.get("/blog/getEveryDay", function (request, response) {
    everyDayDao.queryLastEveryDay(function (result) {
        response.writeHead(200);
        response.end(JSON.stringify(result));
    });
});

