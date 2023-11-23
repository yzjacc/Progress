const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = require('./config').port;
app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/upload', require('./upload-handler'));
app.use('/api/user', require('./user'));

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
