//使用vue实现效果

//模板, 要展示的东西
const template = `
<div>
    <h1>{{title}}</h1>
    <div>
        名称：<input v-model="newProduct.name" type="text"/>
        库存：<input v-model="newProduct.stock" type="number" min="0" />
        <button @click="add">添加商品</button>
    </div>
    <div>
        <ul>
            <li v-for="(item, index) in products">
                <span>{{item.name}}</span>
                <button @click="changeStock(item, item.stock - 1)">-</button>
                <span v-if="item.stock>0" class="stock">{{item.stock}}</span>
                <i v-else class="soldout">售罄</i>
                <input type="number" min="0" v-model="item.stock"/>
                <button @click="changeStock(item, item.stock + 1)">+</button>
                <button @click="remove(index)">删除</button>
            </li>
        </ul>
    </div>
</div>
`

//配置对象
const config = {
    template,
    data: {
        title: "商品和库存管理",
        number: 50,
        products: [
            { name: "华为手机", stock: 10 },
            { name: "小米手机", stock: 8 },
            { name: "iphone", stock: 11 }
        ], //商品数组
        newProduct: { //新商品
            name: "",
            stock: 0
        }
    },
    methods: {
        /**
         * 改变库存
         */
        changeStock(prod, newStock) {
            if (newStock < 0) {
                newStock = 0;
            }
            prod.stock = newStock;
        },
        remove(index) {
            this.products.splice(index, 1);
        },
        add() {
            this.products.push(this.newProduct);
            this.newProduct = {
                name: "",
                stock: 0
            }
        }
    }
};

//创建一个vue的实例
const app = new Vue(config);
//可能之后会做一些事情
//应用插件之类的

app.$mount("#app"); //与el配置的作用一样