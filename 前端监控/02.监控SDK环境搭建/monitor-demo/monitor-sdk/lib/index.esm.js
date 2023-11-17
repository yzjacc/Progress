var fn = function fn() {
  console.log('fn');
  return [1, 2, 3, 4].map(function (item) {
    return item + 1;
  });
};
fn();
