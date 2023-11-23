/**
 * 深拷贝
 * @param obj 需要深拷贝的对象
 * @returns 深拷贝对象
 */
const deepClone = (obj) => {
  if(typeof obj !== 'object' || obj === null) {
    return obj
  }
  const result = Array.isArray(obj) ? [] : {};
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}
export default deepClone