/**
 * 随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @returns min-max之间的随机整数
 */
export const randomNumber = (min, max) => { 
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 深拷贝
 * @param {*} obj 需要深拷贝的对象
 * @returns 深拷贝的对象
 */
export const deepClone = (obj) => { 
  if(typeof obj !== 'object' || obj === null) {
    return obj
  }
  const result = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result;
}

export default { randomNumber, deepClone }