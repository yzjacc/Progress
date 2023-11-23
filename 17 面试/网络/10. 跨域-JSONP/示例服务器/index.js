const express = require('express');

const app = express();
const path = '/api/user';
const users = [
  { name: 'monica', age: 17, sex: 'female' },
  { name: '姬成', age: 27, sex: 'male' },
  { name: '邓旭明', age: 37, sex: 'male' },
];
app.get(path, (req, res) => {
  res.setHeader('content-type', 'text/javascript');
  res.send(`callback(${JSON.stringify(users)})`);
});

const port = 8000;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
  console.log(`request for users: http://localhost:${port}${path}`);
});
