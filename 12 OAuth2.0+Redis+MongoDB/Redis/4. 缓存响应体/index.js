const express = require("express");

const app = express();
app.use(express.static("./public"));

const router = express.Router();

router.get("/:id", require("./cache")({ ttl: 10 }), (req, res) => {
  console.log(req.originalUrl, "没有使用缓存");
  // 从数据库中取出对应id的新闻数据
  res.send({
    title: "新闻标题" + req.params.id,
    content: "新闻内容" + req.params.id,
  });
});

app.use("/api/news", router);

app.listen(9527);
