// 由于考虑到除了“游戏”以外的对象，都需要绑定 setInterval 函数，所以，这里我们考虑封装一个函数

/*
    通过此函数，可以统一的为各个对象绑定一个计时器
    该函数会返回一个计时器对象，该对象会提供两个方法 1. start 创建计时器  2. stop 停止计时器
    该函数接收三个参数
    （1） duration：setInterval 方法的第二个参数   
    （2） thisObj 要绑定在哪一个对象上面  
    （3） callback：要做什么事儿，setInterval 方法的第一个参数
*/
export default function getTimer(
  duration: number,
  thisObj: object,
  callback: Function
) {
  let timer: NodeJS.Timeout | null = null; // 存储 setInterval 的返回值，用于停止计时器
  return {
    start: function () {
      // 如果计时器不存在时才会进行计时器的生成
      if (!timer) {
        timer = setInterval(function () {
          callback.bind(thisObj)();
        }, duration);
      }
    },
    stop: function () {
      if (timer) {
        clearInterval(timer); // 停止计时器
        timer = null;
      }
    },
  };
}
