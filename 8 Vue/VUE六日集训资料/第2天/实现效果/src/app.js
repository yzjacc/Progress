import MovieList from "./movieList.js"
import Pager from "./pager.js"
//根组件，整个页面的内容靠该组件完成

const template = `
    <div>
        <MovieList />
        <Pager/>
    </div>
`

export default {
    template,
    components: {
        MovieList,
        Pager
    }
}