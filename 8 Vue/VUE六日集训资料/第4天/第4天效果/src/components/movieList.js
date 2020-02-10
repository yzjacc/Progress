import movie from "./movie.js"

const template = `
<div class="data-container">
    <button @click="handleBack">回到首页</button>
    <movie v-for="item in datas" :data="item" :key="item.id" />
</div>
`;

export default {
    props: ["datas"],
    components: { movie },
    template,
    updated() {
        window.scroll(0, 0);
    },
    methods: {
        handleBack(){
            this.$router.push("/")
        }
    }
}