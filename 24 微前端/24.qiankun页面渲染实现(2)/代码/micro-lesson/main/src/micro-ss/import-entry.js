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

  const getExternalScripts = () => {};

  const execScripts = () => {};

  return {
    template,
    getExternalScripts,
    execScripts
  }
}