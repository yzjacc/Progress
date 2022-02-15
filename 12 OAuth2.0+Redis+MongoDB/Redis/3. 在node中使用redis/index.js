const redis = require("redis");
const { promisify } = require("util");
const client = redis.createClient();

// client.set("name", "chengge", (err, reply) => {
//   console.log(reply);
// });

const getAsync = promisify(client.get).bind(client);

getAsync("name").then((reply) => {
  console.log(reply);
});
