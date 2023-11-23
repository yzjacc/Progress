console.log("我是新开启的worker线程，可以帮你解决一些问题");
self.onmessage = function (e) {
  let count = 0;
  for (let i = 0; i < 10 ** 1; i++) {
    count += e.data;
  }
  self.postMessage(count);
};
