// 自定义 hook
// 这是一个计数器的自定义 hook
// 内部维护了一个计数的值，以及修改这个值的一些方法

import { useState } from "react";

interface Options {
  min?: number;
  max?: number;
}

type ValueParam = number | ((c: number) => number);

// 该方法主要是做一个边界的判断，如果超过了边界，那么就取边界值
function getTargetValue(val: number, options: Options = {}) {
  const { min, max } = options;
  let target = val;
  // 判断有没有超过最大值，如果超过了，那么我们就取最大值
  if (typeof max === "number") {
    target = Math.min(max, target);
  }
  // 判断有没有超过最小值，如果超过了，那么我们就取最小值
  if (typeof min === "number") {
    target = Math.max(min, target);
  }
  return target;
}

// useCounter(100, {min : 1, max : 1000})
function useCounter(initialValue = 0, options: Options = {}) {
  const { min, max } = options;

  // 设置初始值，初始值就为 initialVaule
  // 初始值是该自定义 hook 内部维护的状态，用来表示计数器的数值
  const [current, setCurrent] = useState(() => {
    return getTargetValue(initialValue, {
      min,
      max,
    });
  });

  // 设置新的值
  // 在设置新的值的时候，调用了 getTargetValue 来判断新值是否越界
  const setValue = (value: ValueParam) => {
    setCurrent((c) => {
      const target = typeof value === "number" ? value : value(c);
      return getTargetValue(target, {
        max,
        min,
      });
    });
  };

  // 下面就是自定义 hook 提供的 4 个方法
  // 用于修改计数器的数值

  // 增加
  const inc = (delta = 1) => {
    setValue((c) => c + delta);
  };

  const asyncInc = (delta = 1) => {
    setTimeout(()=>{
        setValue((c) => c + delta);
    }, 2000);
  };

  // 减少
  const dec = (delta = 1) => {
    setValue((c) => c - delta);
  };

  // 设置
  const set = (value: ValueParam) => {
    setValue(value);
  };

  // 重置
  const reset = () => {
    setValue(initialValue);
  };

  // 像外部暴露
  return [
    current,
    {
      inc,
      asyncInc,
      dec,
      set,
      reset,
    },
  ] as const;
}

export default useCounter;
