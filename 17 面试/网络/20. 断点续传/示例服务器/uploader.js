const express = require('express');
const router = express.Router();
const file = require('./file');
const config = {
  fieldName: 'file',
  port: require('./config').port,
};
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({
  storage,
}).single(config.fieldName);

router.post('/', upload, async (req, res) => {
  if (!req.body.chunkId) {
    res.send({
      code: 403,
      msg: '请携带分片编号',
      data: null,
    });
    return;
  }
  if (!req.body.fileId) {
    res.send({
      code: 403,
      msg: '请携带文件编号',
      data: null,
    });
    return;
  }
  try {
    const needs = await file.handleChunk(
      req.body.chunkId,
      req.body.fileId,
      req.file.buffer
    );
    res.send({
      code: 0,
      msg: '',
      data: needs,
    });
  } catch (err) {
    res.send({
      code: 403,
      msg: err.message,
      data: null,
    });
  }
});

router.post('/handshake', async (req, res) => {
  if (!req.body.fileId) {
    res.send({
      code: 403,
      msg: '请携带文件编号',
      data: null,
    });
    return;
  }
  if (!req.body.ext) {
    res.send({
      code: 403,
      msg: '请携带文件后缀，例如 .mp4',
      data: null,
    });
    return;
  }
  if (!req.body.chunkIds) {
    res.send({
      code: 403,
      msg: '请按顺序设置文件的分片编号数组',
      data: null,
    });
    return;
  }
  const result = await file.getFileInfo(req.body.fileId, req.body.ext);
  if (result === true) {
    // 不用上传了
    res.send({
      code: 0,
      msg: '',
      data: `${req.protocol}://${req.hostname}:${config.port}/upload/${req.body.fileId}${req.body.ext}`,
    });
    return;
  }
  if (result) {
    // 已经有文件了
    res.send({
      code: 0,
      msg: '',
      data: result.needs,
    });
    return;
  }

  const info = await file.createFileInfo(
    req.body.fileId,
    req.body.ext,
    req.body.chunkIds
  );
  res.send({
    code: 0,
    msg: '',
    data: info.needs,
  });
});

module.exports = router;
