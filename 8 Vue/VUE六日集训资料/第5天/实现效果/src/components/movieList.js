import Movie from "./movie.js"

const template = `
    <div class="data-container">
        <button @click="handleBack">返回首页</button>
        <Movie v-for="item in movies" :key="item._id" :data="item" />
    </div>
`;

export default {
    template,
    components: {
        Movie
    },
    props: {
        movies: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleBack() {
            //如何用编程的方式跳转页面
            this.$router.push("/");
        }
    }
}