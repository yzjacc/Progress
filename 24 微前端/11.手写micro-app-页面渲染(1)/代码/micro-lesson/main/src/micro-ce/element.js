import CreateApp, { appInstanceMap} from "./app.js";
class MyElement extends HTMLElement { 
  constructor() { 
    super();
  }

  static get observedAttributes() { 
    return ['name','url']
  }

  connectedCallback() { 
    console.log('micro app 连接上了')
    // console.log(this);
    // console.log(this.name, this.url);
    console.log("===创建子应用对象===");

    const app = new CreateApp({
      name: this.name,
      url: this.url,
      container: this
    });

    //将当前创建的子应用加入到map中
    appInstanceMap.set(this.name, app);
    console.log(appInstanceMap)
  }

  disconnectedCallback() { 
    console.log('micro app 断开连接了')
  }

  attributeChangedCallback(attrName, oldValue, newValue) { 
    console.log(`attribute ${attrName}:${newValue}`);
    //分别记录name和url
    if (attrName === 'name' && !this.name && newValue) {
      this.name = newValue;
    }
    else if (attrName === 'url' && !this.url && newValue) { 
      this.url = newValue;
    }

  }
}

//为了防止重复定义，最好加入判断
export function defineElement() { 
  if (!window.customElements.get('micro-app')) { 
    window.customElements.define('micro-app', MyElement);
  }
}
