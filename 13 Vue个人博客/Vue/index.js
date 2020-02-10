var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var watchFile = require("./util/WatchFile");
var app = new express();
watchFile.watchFile();

app.use(express.static("./page/"));

for(var [key] of loader){
	if (key == "/editEveryDay" ) {
		app.post("/editEveryDay", loader.get("/editEveryDay"));
	}else if( key == "/editBlog"){
			app.post("/editBlog", loader.get("/editBlog"));
			}else {
		  	app.get(key, loader.get(key))
		  }
}

app.listen(globalConfig.port, function() {
	console.log("服务器已启动");
});
