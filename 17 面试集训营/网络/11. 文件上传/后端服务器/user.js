const express = require('express');
const router = express.Router();
const users = [];
router.post('/reg', (req, res) => {
  users.push(req.body);
  res.send({
    code: 0,
    msg: '',
    data: {
      username: req.body.username,
      avatar: req.body.avatar,
    },
  });
});

module.exports = router;
