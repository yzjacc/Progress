var express = require('express');
var router = express.Router();
var postDao = require('../dao/postDao')

router.get('/list', async function (req, res, next) {
  let { page, limit } = req.query;
  let locale = req.headers['accept-language'];

  console.log(locale)

  if (locale.includes('zh-CN')) {
    locale = 'zh-CN';
  }
  else if (locale.includes('en-US')) { 
    locale = 'en-US'
  }

  const filter = { 'locale': locale };

  let result = await postDao.list(filter,page,limit);

  res.json(result)

});

module.exports = router;
