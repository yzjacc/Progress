const express = require('express');
const router = express.Router();
const path = require('path');
const config = {
  fieldName: 'file',
  sizeLimit: 1 * 1024 * 1024,
  extends: ['.jpg', '.jpeg', '.gif', '.png', '.bmp', '.webp'],
  saveDir: path.resolve(__dirname, './public/upload'),
  createFilename(ext) {
    if (!ext.startsWith('.')) {
      ext = '.' + ext;
    }
    const rad = Math.random().toString(36).substr(2);
    const time = new Date().getTime().toString(36);
    return rad + time + ext;
  },
};

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.saveDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, config.createFilename(ext));
  },
});
class ExtendNameError extends Error {}
const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    if (config.extends.includes(ext)) {
      cb(null, true);
    } else {
      cb(new ExtendNameError('无效的文件类型'));
    }
  },
  limits: {
    fileSize: config.sizeLimit,
  },
}).single(config.fieldName);

router.post('/', (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      let msg;
      switch (err.message) {
        case 'File too large':
          msg = '文件大小超过了限制';
          break;
        case 'Unexpected field':
          msg = `无法找到${fieldName}字段`;
          break;
      }
      if (err instanceof ExtendNameError) {
        msg = err.message;
      }
      res.send({
        code: 403,
        msg,
        data: null,
      });
    } else {
      res.send({
        code: 0,
        msg: '',
        data: `${req.protocol}://${req.hostname}:${
          require('./config').port
        }/upload/${req.file.filename}`,
      });
    }
  });
});

module.exports = router;
