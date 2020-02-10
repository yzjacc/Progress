import movie from "./movie.js"

const template = `
<div class="data-container">
    <movie v-for="item in datas" :data="item" :key="item.id" />
</div>
`;

export default {
    props: ["datas"],
    components: { movie },
    template,
    updated() {
        window.scroll(0, 0);
    }
}