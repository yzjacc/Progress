//loader.js 自动获取web目录下 所有文件 并把它们加载
var fs = require("fs");
var globalConfig = require("./config");

var controllerSet = [];
var pathMap = new Map();

var files = fs.readdirSync(globalConfig["web_path"]);//读取该目录下所有文件名
 
for (var i = 0 ; i < files.length ; i ++) {
    var temp = require("./" + globalConfig["web_path"] + "/" + files[i]);
    if (temp.path) {
        for (var [key,value] of temp.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, value);
            } else {
                throw new Error("url path异常，url:" + key);
            }
            controllerSet.push(temp);
        }

    }
}

module.exports = pathMap;
