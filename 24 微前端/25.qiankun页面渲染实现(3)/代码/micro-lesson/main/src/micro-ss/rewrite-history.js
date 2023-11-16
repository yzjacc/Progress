import { handleRouter } from "./handle-router";

export const rewriteHistory = () => {

  window.addEventListener('popstate',()=>{
    console.log('---popstate---',window.location.pathname)
    handleRouter();
  })

  //由于pushState replaceState只是改变路由地址，并不能实现处理，所以我们需要自己重新这个两个函数
  const rawPushState = window.history.pushState;
  window.history.pushState = function pushState(...args){

    rawPushState.apply(window.history,args);
    console.log('pushState',window.location.pathname);

    handleRouter();
  }

  const rawReplaceState = window.history.replaceState;
  window.history.replaceState = function replaceState(...args){
    rawReplaceState.apply(window.history,args);
    console.log('replaceState',window.location.pathname);
    handleRouter();
  }
}