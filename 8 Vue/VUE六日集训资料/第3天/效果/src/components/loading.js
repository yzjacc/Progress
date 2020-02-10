import modal from "./modal.js"

const template = `
    <modal v-if="show">
        <div class="loading">
            加载中...
        </div>
    </modal>
`;

export default {
    template,
    props: {
        show: {
            default: false
        }
    },
    components: {
        modal
    }
}