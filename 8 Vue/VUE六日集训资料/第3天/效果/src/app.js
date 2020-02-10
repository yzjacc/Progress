import pager from "./components/pager.js"
import movies from "./components/movieList.js"
import movieService from "./services/movieService.js"
import loading from "./components/loading.js"
const template = `
    <div>
        <movie-list :datas="datas"></movie-list>
        <pager 
        :value="page" 
        @input="handlePageChange"
        :total="total" 
        :page-size="pageSize" 
        :panelNumber="5"
        ></pager>
        <loading :show="isLoading"/>
    </div>
`;

export default {
    data() {
        return {
            page: 1,
            total: 0,
            pageSize: 3,
            isLoading: false,
            datas: []
        }
    },
    mounted() {
        this.setMovies();
    },
    methods: {
        async setMovies() {
            this.isLoading = true;
            window.onscroll = (e) => e.preventDefault();
            let datas = await movieService.getMovies(this.page, this.pageSize);
            this.total = datas.total;
            this.datas = datas.datas;
            this.isLoading = false;
        },
        handlePageChange(newPage) {
            this.page = newPage;
            this.setMovies();
        }
    },
    components: {
        pager,
        movieList: movies,
        loading
    },
    template
}