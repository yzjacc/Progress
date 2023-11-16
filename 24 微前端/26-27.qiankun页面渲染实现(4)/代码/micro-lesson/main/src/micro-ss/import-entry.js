import { fetchSource } from './utils';

export const importEntry = async (entry,options) => {
  //远程获取html字符串内容
  const html = await fetchSource(entry);
  let template = document.querySelector(`div[data-name=${options.name}]`);
  console.log("template",template);
  //如果没有template的div容器，就创建一个新的
  if(!template){
    template = document.createElement('div');
    template.setAttribute('data-name',options.name);
    template.innerHTML = html;
  }

  //设置缓存
  const source = {
    scripts: new Map()
  }

  //template.children 是一个伪数组
  const children = Array.from(template.children);

  //获取所有的script标签
  const scripts = children.filter(item => item.tagName === 'SCRIPT');

  scripts.forEach(dom => {
    const src = dom.getAttribute('src');
    if(src){
      source.scripts.set(src,{
        code:'', //如果是外链的script，还需要通过远程获取
        isExternal:true //是否是外链js
      });
    }
    else if(dom.textContent){
      //内链js
      //随机给一个map的键名
      const randomName = Math.random().toString(36).substring(2,15);
      source.scripts.set(randomName,{
        code:dom.textContent,
        isExternal:false
      })
    }
  })

  const getExternalScripts = () => {
    //获取缓存中存放的所有外链script地址
    const scriptEntries = Array.from(source.scripts.entries());

    const fetchScriptPromise = [];

    for(let [url,info] of scriptEntries){
      console.log(url,info);
      //这里的url可能是本地的绝对地址 /开头，也可能是远程的绝对地址 http开头
      //如果是本地的绝对地址，需要拼接上子应用的地址
      //因为/开头的话，在基座应用中，加上的就是基座应用的域名地址
      if(!url.includes('http') && info.isExternal){
        url = `${entry.endsWith('/') ? entry.substring(0,entry.length-1) : entry}${url}`;
        console.log("----",url)
      }

      //info.code如果有，表明是内链的js
      fetchScriptPromise.push(info.code ? Promise.resolve(info.code) : fetchSource(url));
    }

    console.log(fetchScriptPromise);

    return Promise.all(fetchScriptPromise);
  };

  const execScripts = async () => {
    //获取缓存中存放的所有外链script地址
    const scriptEntries = Array.from(source.scripts.entries());
    const scripts = await getExternalScripts();

    const module = {
      exports:{}
    }

    const exports = module.exports;

    scripts.forEach((code,i) => {
      scriptEntries[i][1].code = code;
      eval(code);
    })

    return module.exports;
  };

  return {
    template,
    getExternalScripts,
    execScripts
  }
}