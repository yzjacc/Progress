import Modal from "./modal.js"

const template = `
    <Modal v-show="show">
        <div style="font-size:1.5em; color:#fff">
            加载中...
        </div>
    </Modal>
`;

export default {
    template,
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Modal
    }
}