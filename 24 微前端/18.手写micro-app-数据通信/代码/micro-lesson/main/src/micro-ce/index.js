import {defineElement} from './element.js';
import { EventCenterBaseApp } from './data.js';

const baseAppData = new EventCenterBaseApp();

//记录原生setAttribute
const rawSetAttribute = Element.prototype.setAttribute

//重写setAttribute
Element.prototype.setAttribute = function setAttribute(key, value) { 
  // console.log(key, value, this.tagName);
  if (/^micro-app/i.test(this.tagName) && key === 'data') {
    console.log(value, value.toString());
    if (value.toString() === '[object Object]') { 
      //使用临时变量记录值
      const cloneValue = {};
      //Object.getOwnPropertyNames() 返回对象的全部属性名
      Object.getOwnPropertyNames(value).forEach(key => { 
        if (!(typeof key === 'string' && key.indexOf('__') === 0)) { 
          cloneValue[key] = value[key];
        }
      })
      //发送数据
      baseAppData.setData(this.getAttribute('name'), cloneValue);
    }
  }
  else { 
    rawSetAttribute.call(this, key, value);
  }

}

const SimpleMicroApp = {
  start() { 
    defineElement();
  }
}



export default SimpleMicroApp;