var { User } = require("./models");

var obj = {
  loginId: "user13",
  loginPwd: "asdfasdfasdfasdf",
  name: "邓哥",
  loves: ["秋葵", "香菜"],
  abc: 1,
  address: {
    province: "黑龙江",
    city: "哈尔滨",
  },
};

// async function test() {
//   var u = new User(obj);

//   var result = await u.save();
//   console.log(result);
// }

async function test() {
  const result = await User.create(obj);
  // console.log(result);
  // User.validate(obj);
}
test();
