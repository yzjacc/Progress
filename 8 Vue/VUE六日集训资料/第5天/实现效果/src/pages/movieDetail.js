import Movie from "../components/movie.js"
import movieDetail from "../services/movieService.js"
import Loading from "../components/loading.js"

const template = `
<div class="data-container">
    <Movie v-if="movie" :data="movie"/>
    <Loading :show="isLoading"/>
</div>
    
`;

export default {
    components: {
        Movie,
        Loading
    },
    data() {
        return {
            movie: null,
            isLoading: false //是否正在远程获取
        }
    },
    mounted() {
        //获取id
        const id = this.$route.params.id;
        this.isLoading = true;
        //根据id获取电影数据
        movieDetail.getMovie(id).then(resp => {
            this.movie = resp; //将服务器的电影对象赋值给movie
            this.isLoading = false;
        })
    },
    template
}