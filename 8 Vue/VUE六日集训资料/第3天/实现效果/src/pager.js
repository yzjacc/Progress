const template = `
<div class="pager">
<a @click="changePage(1)" class="pager-item" :class="{disabled: value === 1}">首页</a>
<a @click="changePage(value - 1)" class="pager-item" :class="{disabled: value === 1}">上一页</a>  
<a class="pager-item" @click="changePage(item)" :class="{active: item===value }" v-for="item in numbers">
    {{item}}
</a>
<a @click="changePage(value + 1)" class="pager-item" :class="{disabled: value === pageNumber}">下一页</a>
<a @click="changePage(pageNumber)" class="pager-item" :class="{disabled: value === pageNumber}">尾页</a> 
<span class="pager-text">
<i>{{value}}</i> 
/ 
<i>{{pageNumber}}</i></span></div>
`;

export default {
    template,
    props: {
        value: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        panelNumber: {
            type: Number,
            default: 5
        },
        total: {
            type: Number,
            required: true
        }
    },
    computed: {
        pageNumber() { //总页数
            return Math.ceil(this.total / this.pageSize)
        },
        numbers() {
            //用于得到一个数字的数组
            //最小页码数字
            var min = this.value - Math.floor(this.panelNumber / 2);
            if (min < 1) {
                min = 1;
            }
            //最大页码数字
            var max = min + this.panelNumber - 1;
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
            // this.value = newPage; //不可以直接修改属性
            // 应该变页码！！，但是由于数据不是我的，我不能改，所以，只能触发事件，让父组件（使用这个组件的组件）收到通知
            this.$emit("input", newPage); 
        }
    }
}