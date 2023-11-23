/**
 * 深拷贝
 * @param obj 需要深拷贝的对象
 * @returns 深拷贝对象
 */
export const deepClone = <T>(obj: T): T => {
  if(typeof obj !== 'object' || obj === null) {
    return obj
  }
  const result:any = Array.isArray(obj) ? [] : {};
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}

export const getRandomNum = (min: number, max: number): number => {
  let num = Math.floor(Math.random() * (min - max) + max);
  return num;
}