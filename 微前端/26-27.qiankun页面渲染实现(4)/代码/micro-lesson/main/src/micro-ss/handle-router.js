import {getApps} from './index';
import {importEntry} from "./import-entry";
import { getPrevRouter,getNextRouter } from './rewrite-history';

export const handleRouter = async () => {
  const apps = getApps();
  //找到注册中的子应用对象
  const app = apps.find(item => getNextRouter().startsWith(item.activeRule));
  //得到上一次的app
  const prevApp = apps.find(item => getPrevRouter().startsWith(item.activeRule));
  
  console.log("______",prevApp,app);

  if(prevApp && prevApp !== app){
    await unmount(prevApp);
  }

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

    const appExports = await execScripts();
    console.log("++++",appExports);

    app.bootstrap = appExports.bootstrap;
    app.mount = appExports.mount;
    app.unmount = appExports.unmount;

    await bootstrap(app);
    await mount(app);

  }catch(e){
    console.log(e);
  }
}

async function bootstrap(app){
  app.bootstrap && await app.bootstrap(app);
}

async function mount(app){
  app.mount && await app.mount({
    container:document.querySelector(app.container),
    ...app.props
  });
}

async function unmount(app){
  console.log("unmount",app);
  app.unmount && await app.unmount({
    container:document.querySelector(app.container),
    ...app.props
  });
}