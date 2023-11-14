import { appInstanceMap } from "./app";

class EventCenter{
  eventList = new Map(); //绑定数据和函数
  //监听事件
  on(name,f){
    //直接先从map中取出对应的事件列表
    let eventInfo = this.eventList.get(name);
    //如果没有对应的事件列表，就创建一个
    if(!eventInfo){
      eventInfo = {
        data:{}, //存放数据
        callback:new Set() //存放函数
      }

      //将创建的事件列表放入map中
      this.eventList.set(name,eventInfo);
    }
    //记录绑定的函数
    eventInfo.callback.add(f);
  }

  //触发事件
  dispatch(name,data){
    //先从map中取出对应的事件列表
    let eventInfo = this.eventList.get(name);
    
    if(eventInfo && eventInfo.data !== data){
      eventInfo.data = data;
      eventInfo.callback.forEach(f=>{
        f(data);
      })
    }
  }

  //移除事件
  off(name,f){
    let eventInfo = this.eventList.get(name);
    if(eventInfo && eventInfo.callback.has(f)){
      eventInfo.callback.delete(f);
    }
  }
}

const eventCenter = new EventCenter();

//基座引用的数据通信
export class EventCenterBaseApp { 
  setData(appName,data){
    eventCenter.dispatch(appName,data);
  }
}

//子应用引用的数据通信
export class EventCenterMicroApp { 
  constructor(appName) { 
    this.appName = appName;
  }

  //监听基座应用发送的数据
  addDataListener(cb) { 
    eventCenter.on(this.appName,cb);
  }

  //子应用发布数据

  dispatch(data) { 
    //首先根据appName获取在appInstanceMap缓存中的数据
    const app = appInstanceMap.get(this.appName);
    if (app.container) { 
      //子应用标签绑定自定义事件
      const event = new CustomEvent('datachange', {
        detail: {
          data
        }
      });

      //将事件绑定到<micro-app>标签上
      app.container.dispatchEvent(event);
    }
  }
}