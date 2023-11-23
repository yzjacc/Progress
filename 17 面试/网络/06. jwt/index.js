const jwt = require('jsonwebtoken');

const key = 'yuanjinhenshuai';

// const token = jwt.sign({ a: 1, b: 2 }, key);
// console.log(token);

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ7.eyJhIjoxLCJiIjoyLCJpYXQiOjE2MzQ4MDg1Mzh9.EH6KLP-yegEN5H5As7JUzziOenlT5kuHM1Pxj6cJ9C8';

const result = jwt.verify(token, key);
console.log(result);
