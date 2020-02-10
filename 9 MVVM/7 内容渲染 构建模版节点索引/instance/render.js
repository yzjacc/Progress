//通过模版，找到哪些节电用到了模版
let template2Vnode = new Map();
//通过节点，找到，这个节点有哪些模版
let vnode2Template = new Map();

export function prepareRender(vm, vnode) {
  if (vnode == null) {
    //是个文本节点
    return;
  }
  if (vnode.nodeType == 3) {
    //是个文本节点
    analysisTemplateString(vnode);
  }
  if (vnode.nodeType == 1) {
    //是个标签节点
    for (let i = 0; i < vnode.children.length; i++) {
      prepareRender(vm, vnode.children[i]);
    }
  }
}
function analysisTemplateString(vnode) {
  // console.log(vnode.text);
  let templateStrList = vnode.text.match(/{{[a-zA-Z0-9_.]+}}/g);
  // console.log(templateStrList);
  for (let i = 0; templateStrList && i < templateStrList.length; i++) {
    setTemplate2Vnode(templateStrList[i], vnode);
    setVnode2Template(templateStrList[i], vnode);
  }
}
function setTemplate2Vnode(template, vnode) {
  // console.log(template);
  let templateName = getTemplateName(template);
  let vnodeSet = template2Vnode.get(templateName);
  if (vnodeSet) {
    vnodeSet.push(vnode);
  } else {
    template2Vnode.set(templateName, [vnode]);
  }
}
function setVnode2Template(template, vnode) {
  let templateSet = vnode2Template.get(vnode);
  if (templateSet) {
    templateSet.push(getTemplateName(template));
  } else {
    vnode2Template.set(vnode, [getTemplateName(template)]);
  }
}
function getTemplateName(template) {
  //判断是否患有花括号 如果有 则解掉 如果没有则返回
  if (
    template.substring(0, 2) == "{{" &&
    template.substring(template.length - 2, template.length)
  )
    return template.substring(2, template.length - 2);
  else return template;
}
export function getTemplate2VnodeMap(){
  return template2Vnode;
}
export function getVnode2TemplateMap(){
  return vnode2Template;
}