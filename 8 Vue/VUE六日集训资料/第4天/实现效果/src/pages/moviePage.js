import MovieList from "../components/movieList.js"
import Pager from "../components/pager.js"
import movieService from "../services/movieService.js"
import Loading from "../components/loading.js"
//根组件，整个页面的内容靠该组件完成

const template = `
    <div id="myDiv">
        <MovieList :movies="movies"/>
        <Pager 
        :value="current"
        @input="handlePageChange"
        :total="total" 
        :page-size="pageSize" 
        />
        <Loading :show="isLoading"/>
    </div>
`
export default {
    template,
    mounted() {
        //远程获取数据
        this.setMovies();
    },
    methods: {
        //按照当前的页码和页容量，重新设置电影数据
        setMovies() {
            this.isLoading = true; //开始远程获取数据
            movieService.getMovies(this.current, this.pageSize).then(resp => {
                // {total:xx, datas:[xxx]}
                this.total = resp.total;
                this.movies = resp.datas;
                this.isLoading = false;
            })
        },
        handlePageChange(newPage) {
            this.current = newPage;//更改页码
            //重新设置电影数据
            this.setMovies();
        }
    },
    data() {
        return {
            current: 1,
            total: 0,
            pageSize: 2,
            movies: [],
            isLoading: false //是否正在远程获取数据
        }
    },
    components: {
        MovieList,
        Pager,
        Loading
    }
}