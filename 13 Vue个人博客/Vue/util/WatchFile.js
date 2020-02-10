const fs = require('fs');
const md5 = require('md5');
const filePath = __dirname + '/_post';
var url ='https://pg12138.oss-cn-beijing.aliyuncs.com/img/_post';
var fileUtil = require('../util/FileUtil');
var blogDao = require("../dao/BlogDao");


function watchFile() {
    setInterval(function () {
    console.log('正在监听');
    var files = fs.readdirSync(filePath);
    for (let i = 0; i < files.length - 1 ; i++) {
            if (files[i] == 'test') continue;
            console.log(files[i])
            if (files[i]) {
                fileUtil.reData(url + '/' + files[i], 2, function () {
                    var currentMd5 = md5(fs.readFileSync(filePath + '/' + files[i]))
                    var testMd5 = md5(fs.readFileSync(filePath + '/test/' + files[i]));
                    if (testMd5 == currentMd5) {
                        fs.renameSync(filePath + '/test/' + files[i], filePath + '/' + files[i])
                        console.log("移动文件成功")
                    } else {
                        blogDao.updadaBlog(fileUtil.template(), files[i], function () {
                            console.log("更新成功")
                        });
                        fs.renameSync(filePath + '/test/' + files[i], filePath + '/' + files[i])
                        console.log("移动文件成功");
                    }
                })
            }
    }

    },50000);
}

module.exports.watchFile = watchFile;