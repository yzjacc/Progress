function VNode(realDom, template) {
    this.realDom = realDom;
    this.template = template;
    this.children = [];
}

export default function createVNode(realDom) {
    var root = new VNode(realDom, "");
    if (root.realDom.nodeType === Node.TEXT_NODE) {
        root.template = realDom.nodeValue;
    }
    else {
        for (var i = 0; i < realDom.childNodes.length; i++) {
            var childRealDom = realDom.childNodes[i];
            var childNode = createVNode(childRealDom);
            root.children.push(childNode);
        }
    }
    return root;
}