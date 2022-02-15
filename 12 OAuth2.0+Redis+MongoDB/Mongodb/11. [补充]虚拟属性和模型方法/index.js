var { User, Operation } = require("./models");

async function test() {
  const us = await User.getUsers(1, 2, "邓");
  console.log(us);
}

test();
