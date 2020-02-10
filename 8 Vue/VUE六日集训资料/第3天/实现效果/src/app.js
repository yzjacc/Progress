import MovieList from "./movieList.js"
import Pager from "./pager.js"
import movies from "./mockDatas.js";
//根组件，整个页面的内容靠该组件完成

const template = `
    <div>
        <MovieList :movies="allMovies"/>
        <Pager 
        v-model="current"
        :total="total" 
        :page-size="pageSize" 
        />
    </div>
`

export default {
    template,
    data() {
        return {
            current: 1,
            total: movies.length,
            pageSize: 2,
            allMovies: movies
        }
    },
    computed: {
        pageMovies() {
            return this.allMovies.slice(
                (this.current - 1) * this.pageSize, 
                this.current * this.pageSize);
        }
    },
    components: {
        MovieList,
        Pager
    }
}