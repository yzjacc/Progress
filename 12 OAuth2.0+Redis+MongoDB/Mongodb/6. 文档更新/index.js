var { User, Operation } = require("./models");

async function test() {
  // const u = await User.findById("5ed093872e3da2b65498347c");
  // u.address.province = "黑龙江";
  // u.address.city = "哈尔滨";
  // u.loves.push("秋葵", "香菜");
  // await u.save(); // 此时会自动对比新旧文档，完成更新

  await User.updateOne(
    {
      _id: "5ed093872e3da2b65498347c",
    },
    {
      loginId: "a",
    },
    {
      runValidators: true,
    }
  );
}

test();
