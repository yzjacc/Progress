var { User, Operation } = require("./models");

async function test() {
  console.time();
  const number = await User.countDocuments({
    age: {
      $gt: 25,
      $lt: 30,
    },
  });
  console.timeEnd();
  console.log(number);
}

test();