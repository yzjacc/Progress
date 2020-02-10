import { getValue } from "../until/ObjectUtil.js";
import VNode from "../vdom/vnode.js";

//通过模版，找到哪些节电用到了模版
let template2Vnode = new Map();
//通过节点，找到，这个节点有哪些模版
let vnode2Template = new Map();
export function renderMixin(Due) {
  Due.prototype._render = function() {
    renderNode(this, this._vnode);
  };
}
export function renderData(vm, data){
  let vnodes = template2Vnode.get(data);
  if(vnodes!=null){
    for (let i = 0; i < vnodes.length; i++) {
      //  console.log(vnodes[i]);
      renderNode(vm,vnodes[i]);
    }
  }

}
export function renderNode(vm, vnode) {
  if (vnode.nodeType == 3) {
    let templates = vnode2Template.get(vnode);
    if (templates) {
      let result = vnode.text;
      for (let i = 0; i < templates.length; i++) {
        //第一个参数写为数组 是一个预留 当前节点参数 可以来自于Due对象 也可以来自于父级节点（v-for）
        let templateValue = getTemplateValue(
          [vm._data, vnode.env],
          templates[i]
        );
        if (templateValue) {
          result = result.replace("{{" + templates[i] + "}}", templateValue);
        }
        vnode.elm.nodeValue = result;
        console.log(templateValue);
      }
    }
  } else if(vnode.nodeType == 1 && vnode.tag =="INPUT"){
    let templates = vnode2Template.get(vnode);
    if(templates){
      for (let i = 0; i < templates.length; i++) {
        let templateValue = getTemplateValue(
          [vm._data, vnode.env],
          templates[i]
        );
        if(templateValue){
          vnode.elm.value = templateValue;
        }
      }
    }

  }
  else {
    for (let i = 0; i < vnode.children.length; i++) {
      renderNode(vm, vnode.children[i]);
    }
  }
}

export function prepareRender(vm, vnode) {
  if (vnode == null) {
    //是个文本节点
    return;
  }
  if (vnode.nodeType == 3) {
    //是个文本节点
    analysisTemplateString(vnode);
  }
  analysisAttr(vm,vnode)
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
function getTemplateValue(objs, templateName) {
  for (let i = 0; i < objs.length; i++) {
    let temp = getValue(objs[i], templateName);
    if (temp != null) {
      return temp;
    }
  }
  return null;
}
function analysisAttr(vm,vnode){
  if(vnode.nodeType != 1){
    return;
  }
  console.log(vnode)
  let attrNames = vnode.elm.getAttributeNames();
  if (attrNames.indexOf("v-model") > -1) {
    setTemplate2Vnode(vnode.elm.getAttribute("v-model"),vnode);
    setVnode2Template(vnode.elm.getAttribute("v-model"),vnode);
  }
}