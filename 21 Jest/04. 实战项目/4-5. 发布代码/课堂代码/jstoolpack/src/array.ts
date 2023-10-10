// 理论上来讲，start,stop,step 都应该是 number 类型
// 但是我们的代码最终是打包为 js 给开发者使用
// 开发者可能会存在各种非常的调用 range() range('a','b','c')
// 因此我们这里打算从方法内部进行参数防御，从而提升我们代码的健壮性
export function range(start?: any, stop?: any, step?: any) {
  // 参数防御
  start = start ? (isNaN(+start) ? 0 : +start) : 0;
  stop = stop ? (isNaN(+stop) ? 0 : +stop) : 0;
  step = step ? (isNaN(+step) ? 0 : +step) : 1;

  // 保证 step 的正确
  if ((start < stop && step < 0) || (start > stop && step > 0)) {
    step = -step;
  }

  const arr: number[] = [];
  for (let i = start; start > stop ? i > stop : i < stop; i += step) {
    arr.push(i);
  }

  return arr;
}
