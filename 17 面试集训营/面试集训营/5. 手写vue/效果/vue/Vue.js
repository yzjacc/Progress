import createNode from "./vNode.js"
import render from "./render.js"
import createResponsive from "./dataResponsive.js"
export default function Vue(options) {
    this.$el = options && options.el;
    this.$data = options && options.data;
    this.$vnode = createNode(document.querySelector(this.$el));
    var that = this;
    createResponsive(this.$data, this, function () {
        that.render();
    })
    this.render();
}

Vue.prototype.render = function () {
    render(this.$vnode, this);
}