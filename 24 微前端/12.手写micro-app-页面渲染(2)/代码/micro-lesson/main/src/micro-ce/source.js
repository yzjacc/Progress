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

  for (const [href, source] of linkEntries) {
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