const template = `
<div id="pager" class="pager">
<a class="pager-item" :class="{disabled: value === 1}" @click="changePage(1)">首页</a>
<a class="pager-item" :class="{disabled: value === 1}" @click="changePage(value-1)">上一页</a>
<a class="pager-item" :class="{active: n === value}" @click="changePage(n)" v-for="n in numbers">{{n}}</a>
<a class="pager-item" :class="{disabled: value === pageNumber}" @click="changePage(value+1)">下一页</a>
<a class="pager-item" :class="{disabled: value === pageNumber}" @click="changePage(pageNumber)">尾页</a>

<span class="pager-text">
<i>{{value}}</i> 
/ 
<i>{{pageNumber}}</i></span></div>
`;

export default {
    template,
    props: [
        "total",
        "value",
        "panelNumber",
        "pageSize"
    ],
    computed: {
        pageNumber() {
            return Math.ceil(this.total / this.pageSize)
        },
        numbers() {
            let min = Math.floor(this.value - this.panelNumber / 2);
            if (min < 1) {
                min = 1;
            }
            let max = min + this.panelNumber - 1;
            if (max > this.pageNumber) {
                max = this.pageNumber;
            }
            const arr = [];
            for (let i = min; i <= max; i++) {
                arr.push(i);
            }
            return arr;
        }
    },
    methods: {
        changePage(newPage) {
            if (newPage < 1) {
                newPage = 1;
            }
            else if (newPage > this.pageNumber) {
                newPage = this.pageNumber;
            }
            if (newPage === this.value) {
                return;
            }
            this.$emit("input", newPage);
        }
    }
}