const { PostModel } = require("../models");
let mockPosts = require("../mock/mockPost");

async function add(posts) {
  let data = await PostModel.create(posts);
  return data;
}

// add(mockPosts);

/**
 * 查询所有用户信息
 * @returns 用户信息的数组
 */
async function getAllPosts() { 
  let result = await PostModel.find();
  return result;
}

/**
 * 返回所有用户数据的个数
 * @returns 所有用户数据的数量
 */
async function getAllPostsCount() { 
  let data = await PostModel.find().count();
  return data;
}

async function list(filter,page=1,limit=10) { 
  let result = await PostModel
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
  return result;
}

async function count(filter) { 
  let data = await PostModel.find(filter).count();
  return data;
}

async function deleteById(id) { 
  let data = await PostModel.deleteOne({ "_id": id });
  return data;
}



module.exports.getAllPosts = getAllPosts;
module.exports.getAllPostsCount = getAllPostsCount;
module.exports.list = list;
module.exports.count = count;
module.exports.deleteById = deleteById;
module.exports.add = add;