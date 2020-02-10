var fileListDao = require("../dao/fileListDao");
var path = new Map();

function upload(request, response) {
    
    fileListDao.insertFileList(request.file.originalname, request.file.size, request.file.path, request.cookies.id, function (result) {
       console.log("写库成功");
       response.end(request.file.path);
    });

}
path.set("/upload", upload);

module.exports.path = path;