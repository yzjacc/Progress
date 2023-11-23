const http = require('http');
const path = require('path');
const fs = require('fs');

var hashStr = "A hash string.";
var hash = require("crypto").createHash('sha1').update(hashStr).digest('base64');

http.createServer(function (req, res) {
    const url = req.url; // 获取到请求的路径
    let fullPath; // 用于拼接完整的路径
    if (req.headers['if-none-match'] == hash) {
        res.writeHead(304);
        res.end();
        return;
    }
    if (url === '/') {
        // 代表请求的是主页
        fullPath = path.join(__dirname, 'static/html') + '/index.html';
    } else {
        fullPath = path.join(__dirname, "static", url);
        res.writeHead(200, {
            'Cache-Control': 'max-age=10',
            "Etag": hash
        });
    }
    // 根据完整的路径 使用fs模块来进行文件内容的读取 读取内容后将内容返回
    fs.readFile(fullPath, function (err, data) {
        if (err) {
            res.end(err.message);
        } else {
            // 读取文件成功，返回读取的内容，让浏览器进行解析
            res.end(data);
        }
    });
}).listen(3000, function () {
    console.log("服务器已启动，监听 3000 端口...");
})