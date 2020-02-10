import pager from "./pager.js"
import movies from "./movieList.js"
import mockDatas from "./mockDatas.js"
const template = `
    <div>
        <movie-list :datas="pageDatas"></movie-list>
        <pager 
        v-model="page" 
        :total="total" 
        :page-size="pageSize" 
        :panelNumber="5"
        ></pager>
    </div>
`;

export default {
    data() {
        return {
            page: 1,
            total: mockDatas.length,
            pageSize: 3,
            datas: mockDatas
        }
    },
    computed: {
        pageDatas() {
            return this.datas.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
        }
    },
    components: {
        pager,
        movieList: movies
    },
    template
}