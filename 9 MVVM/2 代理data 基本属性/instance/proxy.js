// 我们要知道哪个属性被修改了，我们才能对页面上的内容进行更新
// 所以我们必须先能够捕获修改这个事件
// 所以我们需要用代理的方式来监听属性修改
function constructObjectProxy (vm,obj,namespace){
    let proxyObj = {};
    for(let prop in obj){
        Object.defineProperty(proxyObj,prop,{
            configurable:true,
            get(){
                return obj[prop];
            },
            set(vaule){
                console.log(prop);
                obj[prop] = vaule;
            }
        });
        Object.defineProperty(vm,prop,{
            configurable:true,
            get(){
                return obj[prop];
            },
            set(vaule){
                console.log(prop);
                obj[prop] = vaule;
            }
        })
    }
    return proxyObj;
}
export function constructProxy(vm, obj, namespace) {
  //递归
  let proxyObj = null;
  if (obj instanceof Array) {
  } else if (obj instanceof Object) {
    proxyObj = constructObjectProxy(vm, obj, namespace);
  } else {
    throw new Error("error");
  }
  return proxyObj;
}
