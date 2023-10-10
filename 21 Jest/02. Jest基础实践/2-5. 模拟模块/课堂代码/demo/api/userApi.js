/**
 * 和请求相关的
 */

const axios = require("axios");

class User {
  /**
   * 获取所有的用户
   */
  static all() {
    return axios.get("/users.json").then((resp) => resp.data);
  }

  static testArg(){
    // 这个方法本身 axios 是没有的
    // 我们通过模拟 axios 这个模块，然后给 axios 这个模块添加了这么一个 test方法
    // 这里在实际开发中没有太大意义，仅做演示
    return axios.test();
  }
}

module.exports = User;
