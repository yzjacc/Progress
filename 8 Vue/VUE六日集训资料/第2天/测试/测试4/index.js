/**
 * 组件的配置对象（pager组件）
 */
const pager = {
    template: `<h1>分页组件要显示的内容</h1>`
}
//全局注册组件
// Vue.component("MyPager", pager);

const config = {
    template: `<div>
        <my-pager></my-pager>
    </div>`,
    components: {
        MyPager: pager
    },
    el: "#app"
}

new Vue(config)