import {rewriteHistory} from './rewrite-history';
import { handleRouter } from './handle-router';
//全局变量
let _app = [];

export const getApps = () => _app;

export const registerMicroApps = (app)=>{
  _app = app;
};

export const start = ()=>{
  console.log(getApps());
  //关注路由
  // history go back forward (pushState replaceState 仅仅是改变了浏览器的地址)
  // window事件 popstate 关注浏览器的前进后退事件

  rewriteHistory();

  handleRouter();
}