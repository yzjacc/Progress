import { EventCenterMicroApp } from "./data";
export default class SandBox { 
  active = false; //沙箱是否运行
  microWindow = {} //一开始代理的空对象
  injectedKeys = new Set(); //新添加的属性,可以再卸载的时候清空

  constructor(appName) { 
    this.microWindow.microApp = new EventCenterMicroApp(appName);

    this.proxyWindow = new Proxy(this.microWindow,{
      get(target,key){
        //优先从代理对象上取值
        if(Reflect.has(target,key)){
          return Reflect.get(target,key);
        }
  
        //如果找不到，就直接从window对象上取值
        const rawValue = Reflect.get(window,key);
  
        //如果兜底的是一个函数，需要绑定window对象，比如window.addEventListener
        if(typeof rawValue === 'function'){
          const valueStr = rawValue.toString(); //转换为字符串
          //如果valueStr<<不是>>以大写字母开头的函数名或者以class开头的字符串,需要执行其中的代码块
          //简单来说，就是排除构造函数和类
          if(!/^function\s+[A-Z]/.test(valueStr) && !/^class\s+/.test(valueStr)){
            return rawValue.bind(window); //绑定window对象
          }
        }
  
        //其他情况直接返回
        return rawValue
      },

      set: (target, key, value) => {
        if (this.active) { 
          Reflect.set(target, key, value);
          //记录添加的变量，方便后续操作
          this.injectedKeys.add(key);
        }
        return true;
      },

      deleteProperty: (target, key) => { 
        if(target.hasOwnProperty(key)){
          return Reflect.deleteProperty(target, key);
        }
        return true;
      }
    });
  }

  //启动沙箱
  start() { 
    if (!this.active) { 
      this.active = true;
    }
  }

  //停止沙箱
  stop() { 
    if (this.active) { 
      this.active = false;
      this.injectedKeys.forEach(key => { 
        Reflect.deleteProperty(this.microWindow, key);
      });
      this.injectedKeys.clear();
    }
  }

  //修改js作用域,将window对象替换为代理对象
  bindScope(code) { 
    window.proxyWindow = this.proxyWindow;
    return `;(function(window,self){with(window){;${code}\n}}).call(window.proxyWindow,window.proxyWindow,window.proxyWindow)`
  }
}