import compile from "./compile.js"
export default function render(vNode, envObj) {
    if (vNode.realDom.nodeType === Node.TEXT_NODE) {
        var result = compile(vNode.template, envObj);
        if(result!==vNode.realDom.nodeValue){
            vNode.realDom.nodeValue = compile(vNode.template, envObj);
        }
    }
    else {
        for (var i = 0; i < vNode.children.length; i++) {
            var childVNode = vNode.children[i];
            render(childVNode, envObj);
        }
    }
}