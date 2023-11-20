const fs = require('fs');
const path = require('path');

// 要扫描的目录路径
const directoryPath = './';

// 函数用于递归删除文件夹及其所有内容
function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file, index) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // 如果是文件夹，则递归删除
                deleteFolderRecursive(curPath);
            } else {
                // 如果是文件，则删除
                fs.unlinkSync(curPath);
            }
        });

        // 删除文件夹
        fs.rmdirSync(folderPath);
        console.log(`Successfully deleted folder at ${folderPath}`);
    }
}

// 函数用于深度遍历给定的目录，寻找名为 'abc' 的文件夹
function walkDir(dirPath) {
    fs.readdirSync(dirPath).forEach(f => {
        let dirFilePath = path.join(dirPath, f);
        if (fs.statSync(dirFilePath).isDirectory()) {
            if (path.basename(dirFilePath) === 'node_modules') {
                deleteFolderRecursive(dirFilePath);
            } else {
                walkDir(dirFilePath);
            }
        }
    });
};

walkDir(directoryPath);