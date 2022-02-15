var { User, Operation } = require("./models");
const ObjectId = require("mongoose").Types.ObjectId;

async function test() {
  // const result = await User.findById(ObjectId("5ed093872e3da2b654983476"), {
  //   name: 1,
  //   age: 1,
  // });

  // const result = await User.findOne({
  //   age: {
  //     $gt: 20,
  //   },
  // });
  // const page = 3;
  // const limit = 10;
  // const result = await User.find(
  //   {
  //     age: {
  //       $gt: 30,
  //     },
  //   },
  //   "name age"
  // )
  //   .skip((page - 1) * limit)
  //   .limit(limit)
  //   .sort("-age");
  // console.log(result);

  // const result = await User.find().limit(1).populate("operations");
  // console.log(result);
}

test();
