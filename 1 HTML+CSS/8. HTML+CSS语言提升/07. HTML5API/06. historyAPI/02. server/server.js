const express = require("express");
const path = require("path");
const server = express();
server.use(express.static(path.join(__dirname, "static")));
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "demo.html"));
});

server.listen(12345);
