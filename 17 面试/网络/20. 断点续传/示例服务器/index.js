const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = require('./config').port;
app.use(cors());
app.use('/upload', express.static(path.join(__dirname, './file')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/download/:filename', (req, res) => {
  const filename = path.join(__dirname, './res', req.params.filename);
  res.download(filename, req.params.filename);
});

app.use('/api/upload', require('./uploader'));

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
