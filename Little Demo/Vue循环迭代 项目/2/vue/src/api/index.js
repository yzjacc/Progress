import Axios from "axios";
import urls from "./urls";
const appkey = {
    appkey: "panda_1545214432912"
};
const api = Axios.create({
    baseURL: urls.baseURL,
    params: {
        ...appkey
    }
});

export default {
    findByPage(page, size) {
        return api.get(urls.findByPage, {params: {page, size}})
    },
    updateStu(data) {
        return api.get(urls.updateStu, {params: {...data}})
    }
};
