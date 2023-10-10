/**
 * 判断数组里面的数字是否重复
 * @param arr
 */
function isRepeat(arr: (string | number)[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        // 说明有数字重复
        return true;
      }
    }
  }
  return false;
}

/**
 * 生成 4 位随机数的方法
 */
function randomNum(): number[] {
  let num: number = 0; // 用于存放 0-9 之间的随机数
  let comNum: number[] = []; // 存放电脑所生成的数字，一开始是空数组
  while (true) {
    comNum.length = 0;
    for (let i = 0; i < 4; i++) {
      num = Math.floor(Math.random() * 10);
      comNum.push(num);
    }
    // 经历了上面的 for 循环，comNum 里面已经有 4 个数了
    // 但是数字可能是重复的 [1,1,3,4]
    if (!isRepeat(comNum)) {
      // 进入该 if，说明符合要求
      return comNum;
    }
  }
}

module.exports = {
    isRepeat,
    randomNum
};

export {};