var fs = require("fs");

var files = fs.readdirSync("./web");
for (var i = 0 ; i < files.length ; i ++) {
    require("./web/" + files[i]);
}