import VNode from "../../vdom/vnode.js";
import { getValue } from "../../until/ObjectUtil.js";

export function vforInit(vm, elm, parent,instructions){
    let virtualNode = new VNode(elm.nodeName,elm,[],"",getVirtualNodeData(instructions)[2],parent,0)
    virtualNode.instructions = instructions;
    parent.elm.removeChild(elm);
    parent.elm.appendChild(document.createTextNode(""));
    let resultSet =analysisInstructions(vm,instructions,elm,parent);
    return virtualNode;
}
function getVirtualNodeData(instructions){
    let insSet = instructions.trim().split(" ");
    if(insSet.length != 3 || insSet[1] != "in" && insSet[1] != "of"){
        throw new Error("error");
    }
    return insSet;
}
function analysisInstructions(vm,instructions,elm,parent){
    let insSet = getVirtualNodeData(instructions);
    let dataSet = getValue(vm._data,insSet[2]);
    if(!dataSet){
        throw new Error("error");
    }
    let resultSet = [];
    for (let i = 0; i < dataSet.length; i++) {
        let tempDom = document.createElement(elm.nodeName);
        console.log(elm.innerHTML)
        tempDom.innerHTML = elm.innerHTML;
        let env = analysisKV(insSet[0],dataSet[i],i);//获取局部变量
        tempDom.setAttribute("env",JSON.stringify(env));//将变量设置到dom中
        parent.elm.appendChild(tempDom);
        resultSet.push(tempDom);
    }
    return resultSet;
}
function analysisKV(instructions,value,index){
    if(/([a-zA-Z0-9_$]+)/.test(instructions)){
        instructions = instructions.trim();
        instructions = instructions.substring(1,instructions.length - 1);
    }
    let keys = instructions.split(",");
    if(keys.length == 0){
        throw new Error("error");
    }
    let obj = {};
    if(keys.length >= 1){
        obj[keys[0].trim()] = value;
    }
    if(keys.length >= 2){
        obj[keys[1].trim()] = index;
    }
    return obj;
}
     