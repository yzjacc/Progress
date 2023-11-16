/**
 * 远程获取静态资源
 * @param {*} url 
 * @returns 
 */
export function fetchSource(url){
  return fetch(url).then(res=>res.text());
}