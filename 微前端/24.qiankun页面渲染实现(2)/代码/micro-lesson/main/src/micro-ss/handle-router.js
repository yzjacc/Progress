import {getApps} from './index';
import {importEntry} from "./import-entry";

export const handleRouter = async () => {
  const apps = getApps();
  //找到注册中的子应用对象
  const app = apps.find(item => item.activeRule === window.location.pathname);

  if(!app){
    return;
  }

  try{
    //加载子应用资源 index.html
    // const html = await fetchSource(app.entry);
    // const container = document.querySelector(app.container);
    // container.innerHTML = html;

    let {template,getExternalScripts,execScripts} = await importEntry(app.entry, app)
    const container = document.querySelector(app.container);

    container.appendChild(template);

    // getExternalScripts();

    window.__POWERED_BY_QIANKUN__ = true;
    window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + "/";

    execScripts();
  
  }catch(e){
    console.log(e);
  }
}