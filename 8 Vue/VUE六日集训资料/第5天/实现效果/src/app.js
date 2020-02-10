import Header from "./components/header.js"
//根组件，整个页面的内容靠该组件完成

const template = `
    <div>
        <Header />
        <RouterView></RouterView>
    </div>
`
export default {
    template,
    components: {
        Header
    }
}