import pager from "../components/pager.js"
import movies from "../components/movieList.js"
import loading from "../components/loading.js"
const template = `
    <div>
        <movie-list :datas="datas"></movie-list>
        <pager 
        v-model="page" 
        :total="total" 
        :page-size="pageSize" 
        :panelNumber="5"
        ></pager>
        <loading :show="isLoading"/>
    </div>
`;

export default {
    mounted() {
        this.$store.dispatch("movies/fetch");
    },
    computed: {
        ...Vuex.mapState("movies", ["page", "pageSize", "total", "datas", "isLoading"]),
        page: {
            get() {
                return this.$store.state.movies.page;
            },
            set(newPage){
                this.$store.commit("movies/setState", { page: newPage });
                this.$store.dispatch("movies/fetch");
            }
        }
    },
    components: {
        pager,
        movieList: movies,
        loading
    },
    template
}