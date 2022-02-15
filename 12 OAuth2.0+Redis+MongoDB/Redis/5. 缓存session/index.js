const express = require("express");
const redis = require("redis");
const session = require("express-session");

let RedisStore = require("connect-redis")(session);
let client = redis.createClient();
client.select(6);
const app = express();
app.use(
  session({
    store: new RedisStore({ client, ttl: 10 }),
    secret: "duyi",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/a", (req, res) => {
  if (!req.session.a) {
    req.session.a = 1;
    req.session.b = 2;
    req.session.rad = Math.random();
  }

  res.send("session已经有值了");
});

app.get("/b", (req, res) => {
  res.send(req.session);
});

app.listen(9527);
