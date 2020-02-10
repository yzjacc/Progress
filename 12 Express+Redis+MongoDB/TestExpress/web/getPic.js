var path = new Map();
var url = require("url");
var fs = require("fs");

function getPic(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params.path);
    try {
        var data = fs.readFileSync("./" + params.path);
        response.writeHead(200);
        response.write(data);
        response.end();
    } catch (e) {
        response.writeHead(404);
        response.end();
    }

}
path.set("/getPic", getPic);

module.exports.path = path;