const fs = require('fs');
const path = require('path');
const chunkDir = path.join(__dirname, './chunktemp');
const fileInfoDir = path.join(__dirname, './filetemp');
const fileDir = path.join(__dirname, './file');

async function exists(path) {
  try {
    await fs.promises.stat(path);
    return true;
  } catch {
    return false;
  }
}

function existsSync(path) {
  try {
    fs.statSync(path);
    return true;
  } catch {
    return false;
  }
}

function createDir() {
  function _createDir(path) {
    if (!existsSync(path)) {
      fs.mkdirSync(path);
    }
  }
  _createDir(chunkDir);
  _createDir(fileInfoDir);
  _createDir(fileDir);
}

createDir();

async function createFileChunk(id, buffer) {
  const absPath = path.join(chunkDir, id);
  if (!(await exists(absPath))) {
    await fs.promises.writeFile(absPath, buffer); // 写入文件
  }
  return {
    id,
    filename: id,
    path: absPath,
  };
}

async function writeFileInfo(id, ext, chunkIds, needs = chunkIds) {
  const absPath = path.join(fileInfoDir, id);
  let info = {
    id,
    ext,
    chunkIds,
    needs,
  };
  await fs.promises.writeFile(absPath, JSON.stringify(info), 'utf-8');
  return info;
}

async function getFileInfo(id) {
  const absPath = path.join(fileInfoDir, id);
  if (!(await exists(absPath))) {
    return null;
  }
  const json = await fs.promises.readFile(absPath, 'utf-8');
  return JSON.parse(json);
}

/**
 * 添加chunk
 */
async function addChunkToFileInfo(chunkId, fileId) {
  const fileInfo = await getFileInfo(fileId);
  if (!fileInfo) {
    return null;
  }
  fileInfo.needs = fileInfo.needs.filter((it) => it !== chunkId);
  return await writeFileInfo(
    fileId,
    fileInfo.ext,
    fileInfo.chunkIds,
    fileInfo.needs
  );
}

async function combine(fileInfo) {
  //1. 将该文件的所有分片依次合并
  const target = path.join(fileDir, fileInfo.id) + fileInfo.ext;

  async function _move(chunkId) {
    const chunkPath = path.join(chunkDir, chunkId);
    const buffer = await fs.promises.readFile(chunkPath);
    await fs.promises.appendFile(target, buffer);
    fs.promises.rm(chunkPath);
  }
  for (const chunkId of fileInfo.chunkIds) {
    await _move(chunkId);
  }

  //2. 删除文件信息
  fs.promises.rm(path.join(fileInfoDir, fileInfo.id));
}

/**
 * return:
 * null: 没有此文件，也没有文件信息
 * true: 有此文件，无须重新上传
 * object：没有此文件，但有该文件的信息
 */
exports.getFileInfo = async function (id, ext) {
  const absPath = path.join(fileDir, id) + ext;
  if (await exists(absPath)) {
    return true;
  }
  return await getFileInfo(id);
};
exports.createFileInfo = async function (id, ext, chunkIds) {
  return await writeFileInfo(id, ext, chunkIds);
};
exports.handleChunk = async function (chunkId, fileId, chunkBuffer) {
  let fileInfo = await getFileInfo(fileId);
  if (!fileInfo) {
    throw new Error('请先提交文件分片信息');
  }
  if (!fileInfo.chunkIds.includes(chunkId)) {
    throw new Error('该文件没有此分片信息');
  }
  if (!fileInfo.needs.includes(chunkId)) {
    // 此分片已经上传
    return fileInfo.needs;
  }
  // 处理分片
  await createFileChunk(chunkId, chunkBuffer);
  // 添加分片信息到文件信息
  fileInfo = await addChunkToFileInfo(chunkId, fileId);
  // 还有需要的分片吗？
  if (fileInfo.needs.length > 0) {
    return fileInfo.needs;
  } else {
    // 全部传完了
    await combine(fileInfo);
    return [];
  }
};
