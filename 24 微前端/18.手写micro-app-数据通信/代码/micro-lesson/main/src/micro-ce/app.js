import loadHtml from "./source";
import SandBox from "./SandBox";
//存放子应用实例的map
export const appInstanceMap = new Map();

//创建子应用的类
export default class CreateApp { 
  constructor({ name, url, container}) { 
    this.name = name;
    this.url = url;
    this.container = container;

    //当前子应用的状态
    this.status = 'loading';

    //加载子应用的静态资源
    loadHtml(this);
    this.SandBox = new SandBox(this.name);
  }

  status = 'created';

  //存放子应用资源
  source = {
    links: new Map(), //子应用link元素对应的静态资源
    scripts: new Map() //子应用script元素对应的静态资源
  }

  //资源加载完成时执行函数
  onLoad(htmlDom) {
    //因为css会加载一次htmlDom，script又会加载一次
    //总共我们要加载两次htmlDom，换句话说，两次htmlDom加载完成之后我们就才真的需要挂载到页面上
    this.loadCount = this.loadCount ? this.loadCount + 1 : 1;
    //执行挂载之前先判断
    if (this.loadCount === 2 && this.status !== 'unmount') {
      this.source.htmlDom = htmlDom;
      //在mount方法中进行挂载
      this.mount();
    }
    
  }

  //资源加载完成后进行渲染时执行
  mount() { 
    this.SandBox.start();
    const cloneHtml = this.source.htmlDom.cloneNode(true);
    //创建一个fragment片段
    const fragment = document.createDocumentFragment();
    Array.from(cloneHtml.childNodes).forEach(node => { 
      fragment.appendChild(node);
    })

    this.container.appendChild(fragment);
    console.log(this.container);

    //执行js代码
    this.source.scripts.forEach(info => { 
      // Function(info.code)();
      // (0,eval)(info.code)
      (0, eval)(this.SandBox.bindScope(info.code));
    });

    this.status = 'mounted'
  }

  //卸载子应用时执行
  //清空缓存
  unmount(destroy) { 
    this.SandBox.stop();
    //更新状态
    this.status = 'unmount';
    //清空容器
    this.container = null;
    //清空缓存，如果有destroy参数，就清空map中的缓存
    if (destroy) { 
      appInstanceMap.delete(this.name);
    }
  }
}