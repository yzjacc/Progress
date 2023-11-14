import { fetchSource } from "./utils";

export default function loadHtml(app) {
  fetchSource(app.url)
    .then((html) => {
      html = html
        .replace(/<head[^>]*>[\s\S]*?<\/head>/i, (match) => {
          // 将head标签替换为micro-app-head，因为web页面只允许有一个head标签
          return match
            .replace(/<head/i, "<micro-app-head")
            .replace(/<\/head>/i, "</micro-app-head>");
        })
        .replace(/<body[^>]*>[\s\S]*?<\/body>/i, (match) => {
          // 将body标签替换为micro-app-body，防止与基座应用的body标签重复导致的问题。
          return match
            .replace(/<body/i, "<micro-app-body")
            .replace(/<\/body>/i, "</micro-app-body>");
        });

      // 将html字符串转化为DOM结构
      const htmlDom = document.createElement("div");
      htmlDom.innerHTML = html;
      // console.log("html:", htmlDom);

      // 提取子应用的link或者script标签资源
      extractSourceDom(htmlDom, app);

      // console.log(app.source.links);
      console.log(app.source.links.entries());

      const microAppHead = htmlDom.querySelector("micro-app-head");
      if (app.source.links.size) {
        fetchLinksFromHtml(app, microAppHead, htmlDom);
      } else { 
        //如果没有link标签，就直接挂载到界面上
        app.onLoad(htmlDom);
      }

      if (app.source.scripts.size) { 
        fetchScriptFromHtml(app, htmlDom);
      }
      else {
        app.onLoad(htmlDom);
      }

    })
    .catch((e) => {
      console.log("加载子应用远程html出错", e);
    });
}

function extractSourceDom(parent, app) {
  //将伪数组转换为数组
  const children = Array.from(parent.children);

  //递归每一个子元素
  children.length &&
    children.forEach((child) => {
      extractSourceDom(child, app);
    });

  for (const dom of children) {
    console.log(dom);
    //如果是link标签
    if (dom instanceof HTMLLinkElement) {
      const href = dom.getAttribute("href");
      //如果link标签有href属性，并且有rel属性===stylesheet
      //说明是css资源
      if (dom.getAttribute("rel") === "stylesheet" && href) {
        //先将href地址存放到缓存中
        app.source.links.set(href, {
          code: "", //具体css的代码内容，这个我们还需要通过远程获取
        });
      }
      
      parent.removeChild(dom);
    }
    else if (dom instanceof HTMLScriptElement) { 
      //获取src属性
      const src = dom.getAttribute("src");
      //如果有src属性，说明是外联js资源，还需要远程获取
      if (src) {
        app.source.scripts.set(src, {
          code: "", //具体js的代码内容，这个我们还需要通过远程获取
          isExternal:true,//是否是外联js
        })
      }
      else if (dom.textContent) { //内联js
        //随机名字，当做缓存键名
        const randomName = Math.random().toString(36).substring(2,15);
        app.source.scripts.set(randomName, {
          code: dom.textContent, 
          isExternal:false,
        })
      }
      parent.removeChild(dom);
    }
  }
}

//远程提取link中的内容，并生成style标签，把内容放入进去
// style标签放入到micro-app-head标签中
export function fetchLinksFromHtml(app, microAppHead, htmlDom) {
  //由于links的内容是放入到map中的，所以先讲map中的所有links地址取出来放入到数组中好循环处理
  const linkEntries = Array.from(app.source.links.entries());
  //linkEntries是一个二维数组
  // console.log(linkEntries);
  //声明远程获取的promise数组
  const fetchLinkPromise = [];

  for (let [href, source] of linkEntries) {
    if (!href.includes('http')) { 
      href = `${app.url.endsWith('/') ? app.url.substring(0, app.url.length - 1) : app.url}${href}`;
    }
    fetchLinkPromise.push(fetchSource(href));
  }

  Promise.all(fetchLinkPromise)
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        const code = res[i];
        //将代码放入到缓存中
        linkEntries[i][1].code = code;
        //创建style标签，将内容放入到style标签中
        const link2Style = document.createElement("style");
        link2Style.textContent = code;
        microAppHead.appendChild(link2Style);
      }

      //将处理好的htmlDom挂载到micro-app上
      app.onLoad(htmlDom);
    })
    .catch((e) => {
      console.error("远程加载css出错", e);
    });
}

//远程获取js资源
export function fetchScriptFromHtml(app, htmlDom) { 
  //先将map中的内容转换成数组
  const scriptEntries = Array.from(app.source.scripts.entries());
  //声明远程获取的promise数组
  const fetchScriptPromise = [];
  for (let [url, info] of scriptEntries) { 
    console.log(url, info);
    //这里的url可能是本地的相对地址
    //由于我们有基座引用，如果是相对地址，就会到基座的下面去查找js文件
    //所以这里需要将相对地址转换为子应用绝对地址
    if (!url.includes('http')) { 
      url = `${app.url.endsWith('/') ? app.url.substring(0, app.url.length - 1) : app.url}${url}`;
    }
    //放入promise到数组中
    fetchScriptPromise.push(info.code ? Promise.resolve(info.code) : fetchSource(url));
  }

  Promise.all(fetchScriptPromise).then(res => { 
    for (let i = 0; i < res.length; i++) { 
      const code = res[i];
      scriptEntries[i][1].code = code;
    }

    app.onLoad(htmlDom);
  }).catch(e=>{
    console.error('加载js资源出错', e);
  })
}