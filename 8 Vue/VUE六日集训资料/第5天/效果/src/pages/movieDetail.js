import movieService from "../services/movieService.js"
import Loading from "../components/loading.js"
import MovieDetail from "../components/movieDetail.js"
const template = `
    <div class="data-container">
        <MovieDetail v-if="movieData" :data="movieData"/>
        <h1 v-if="!isLoading && !movieData">找不到这个电影</h1>
        <loading :show="isLoading" />
    </div>
`;

export default {
    template,
    data() {
        return {
            movieData: null,
            isLoading: false
        }
    },
    async mounted(){
        this.isLoading = true;
        this.movieData = await movieService.getMovie(this.$route.params.id);
        this.isLoading = false;
    },
    components: {
        MovieDetail,
        Loading
    }
}