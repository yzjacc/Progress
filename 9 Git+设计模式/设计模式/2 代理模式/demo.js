let handler = {
  get: function (target, key) {
    console.log(`Getting value for key: "${key}"`);
    return target[key];
  },

  set: function (target, key, value) {
    console.log(`Setting value for key: "${key}" to "${value}"`);
    target[key] = value;
  }
};

let targetObject = {};
let proxy = new Proxy(targetObject, handler);

proxy.name = 'Proxy'; // 输出: Setting value for key: "name" to "Proxy"
console.log(proxy.name); // 输出: Getting value for key: "name"，接着输出: Proxy

