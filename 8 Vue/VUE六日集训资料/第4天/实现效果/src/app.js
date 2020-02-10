//根组件，整个页面的内容靠该组件完成

const template = `
    <div >
        <nav>
            <router-link to="/">首页</router-link>
            <router-link to="/movie">电影页</router-link>
        </nav>
        <RouterView></RouterView>
    </div>
`
export default {
    template
}