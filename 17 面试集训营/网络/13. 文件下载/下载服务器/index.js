const express = require('express');
const path = require('path');
const app = express();

const port = 8000;

app.get('/download/:filename', (req, res) => {
  const filename = path.join(__dirname, './res', req.params.filename);

  res.download(filename, req.params.filename);
});

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
