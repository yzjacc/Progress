var app = require("../express");
var url = require("url");
var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var blogTagsMappingDao = require("../dao/BlogTagsMappingDao");
var timeUtil = require("../util/TimeUtil");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json();

app.post("/blog/addBlog", jsonParser, function (request, response) {
    blogDao.insertBlog(request.body.title, request.body.author, decodeURI(request.body.content), 0, timeUtil.getNow(), request.body.tags, function (blogResult) {
        let tags = request.body.tags.split(",");
        for (let i = 0 ; i < tags.length ; i ++) {
            tagsDao.queryTags(tags[i], function (tagsResult) {
               if (tagsResult.length > 0) {//有这个标签，
                    blogTagsMappingDao.insertBlogTagsMapping(blogResult.insertId, tagsResult[0].id, function (result) {});
               } else {//没有这个标签，创建标签
                    tagsDao.insertTags(tags[i], function (newTagsResult) {
                        blogTagsMappingDao.insertBlogTagsMapping(blogResult.insertId, newTagsResult.insertId, function (result) {});
                    });
               }
            });
        }
        response.writeHead(200);
        response.end(JSON.stringify({status: 1, msg: "ok"}));
    });
});

app.get("/blog/getHotBlog", function (request, response) {
    blogDao.queryBlogByViews(function (result) {
       response.writeHead(200);
       response.end(JSON.stringify(result));
    });
});

app.get("/blog/getBlogByPage", function (request, response) {
    var params = url.parse(request.url, true).query;
    var offset = params.offset;
    var limit = params.limit;
    blogDao.queryBlogByPage(parseInt(offset), parseInt(limit), function (result) {
        for (var i = 0 ; i < result.length ; i ++) {
            result[i].content = result[i].content.replace(/<[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/<\/[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/<img src="data:image\/jpeg;[\w\W]+>/g, "");
            result[i].ctime = timeUtil.timeFormat(result[i].ctime);
            if (result[i].content.length > 300) {
                result[i].content = result[i].content.substr(0, 300);
            }
        }
        response.writeHead(200);
        response.end(JSON.stringify(result));
    });
});

app.get("/blog/getTotalBlogCount", function (request, response) {
   blogDao.queryBlogCount(function (result) {
       response.writeHead(200);
       response.end(JSON.stringify(result));
   }) 
});

app.get("/blog/getBlogDetail", function (request, response) {
   var params = url.parse(request.url, true).query;
   if (!params.id) {
       response.writeHead(400);
       response.end("must be have param id");
       return;
   }
   blogDao.queryBlogById(parseInt(params.id), function (result) {
       response.writeHead(200);
       response.end(JSON.stringify(result));
       return;
   })
});

app.get("/blog/getAllBlogMsg", function (request, response) {
    blogDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.end(JSON.stringify(result));
    });
});

app.get("/blog/search", function (request, response) {
    var params = url.parse(request.url, true).query;
    if (!params.search) {
        response.writeHead(400);
        response.end("must have be search");
        return;
    }
    console.log(params.search);
    blogDao.queryBlogBySearch(params.search, function (result) {
        console.log(result);
        blogDao.queryBlogBySearchCount(params.search, function (count) {
            console.log(result);
            response.writeHead(200);
            response.end(JSON.stringify({count: count, list: result}));
        });
    });
});