var { User, Operation } = require("./models");

async function test() {
  const user1 = await User.findById("5ed093872e3da2b654983476");
  const user2 = await User.findById("5ed093872e3da2b654983476");
  user1.name = "邓哥";
  await user1.save(); // 数据库真实：["a", "b"]

  user2.age = 20;
  await user2.save();

  console.log(user1, user2);
}

test();
