/**
 * 随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @returns min-max之间的随机整数
 */
const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default randomNumber