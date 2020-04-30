var fs = require("fs");
var globalConfig = require("./config");

var fileName = globalConfig.log_path + globalConfig.log_name;

// 一件事与其他事没有必然联系时采用异步 
// fs.writeFile(fileName,"hdjw",function({})) 异步
// fs.writeFileSync(fileName,"hdjw",function({})) 同步

function log(data) {

    console.log(data);
    // flag:"a" 追加写入
    // fs.writeFile(fileName,data + '\n',{flag:"a"},function({
    //    console.log("finsh");
    //}))

    // appendFile追加写入
    fs.appendFile(fileName, data + "\n",{flag:"a"} , function () {});

}

module.exports = log;