import loadHtml from "./source";
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
  }

  status = 'created';

  //存放子应用资源
  source = {
    links: new Map(), //子应用link元素对应的静态资源
    scripts: new Map() //子应用script元素对应的静态资源
  }

  //资源加载完成时执行函数
  onLoad() { }

  //资源加载完成后进行渲染时执行
  mount() { }

  //卸载子应用时执行
  //清空缓存
  unmount() { }
}