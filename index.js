const fs = require("fs");
const path = require("path");

// 要扫描的目录路径
const directoryPath = "./";

function walkDir(dirPath, callback) {
  fs.readdirSync(dirPath).forEach((f) => {
    let dirFilePath = path.join(dirPath, f);

    if (fs.statSync(dirFilePath).isDirectory()) {
      walkDir(dirFilePath, callback);
    } else if (path.basename(dirFilePath) === ".gitignore") {
      callback(path.join(dirPath, f));
    }
  });
}

walkDir(directoryPath, function (filePath) {
  fs.unlink(filePath, function (err) {
    if (err) {
      console.log("Failed to delete file:", err);
    } else {
      console.log(`Successfully deleted file at ${filePath}`);
    }
  });
});

// Delete all 'abc.txt' files
deleteFile(directoryPath);
