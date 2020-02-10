export default class VNode {
    constructor(tag,//标签类型，DIV，SPAN，INPUT，#TEXT
                elm,//对应的真实节点
                children,//当前节点下的子节点
                text,//当前虚拟节点的文本
                data,//VNodeData 暂时保留 暂无意义
                parent,//父级节点
                nodeType//节点类型
                ){
                    this.tag = tag;
                    this.elm = elm;
                    this.children = children;
                    this.text = text;
                    this.data = data;
                    this.parent = parent;
                    this.nodeType = nodeType;
                    this.env = {};// 当前节点的环境变量 预防节点是处在v-for环境还是data环境
                    this.instructions = null;//存放类似v-for指令的
                    this.template = [];//当前节点涉及到的模版
                }
}