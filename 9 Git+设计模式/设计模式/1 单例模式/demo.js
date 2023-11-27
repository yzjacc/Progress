const { log } = require("proto2api/dist");

class Singleton {
  constructor(name) {
    this.name = name;
    this.instance = null;
  }
  static a = 1
  static getInstance(name) {
    if (!this.instance) {
      this.instance = new Singleton(name);
    }
    return this.instance;
  }

  getName() {
    return this.name;
  }
}

// 测试代码
let singleton1 = Singleton.getInstance("singleton1");
let singleton2 = Singleton.getInstance("singleton2");
console.log(singleton1 === singleton2); // 输出: true
console.log(singleton1.getName()); // 输出: singleton1
console.log(singleton2.getName()); // 输出: singleton1