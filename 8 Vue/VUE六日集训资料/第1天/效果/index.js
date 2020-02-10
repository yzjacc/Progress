const template = `
<div>
    <h1>{{title}}</h1>
    <div>
        <input type="text" v-model="newProduct.name"/>
        <input type="number" min="0" v-model.number="newProduct.stock"/>
        <button @click="addProduct">添加</button>
    </div>
    <ul class="list">
        <li v-for="(item, index) in products">
            <span>{{item.name}}</span>
            <button @click="change(item, item.stock-1)">-</button>
            <span v-if="item.stock===0" class="stock">售罄</span>
            <span v-else class="stock">{{item.stock}}</span>
            <button @click="change(item, item.stock+1)">+</button>
            <input type="number" min="0" v-model.number="item.stock"/>
            <button @click="remove(index)">删除</button>
        </li>
    </ul>
</div>
`;

const config = {
    el: "#app",
    data: {
        title: "商品和库存管理",
        products: [
            { name: "小米手机", stock: 10 },
            { name: "华为手机", stock: 5 },
            { name: "iphone", stock: 6 },
        ],
        newProduct: { name: "", stock: 0 }
    },
    template,
    methods: {
        addProduct() {
            this.products.push(this.newProduct);
            this.newProduct = {
                name: "",
                stock: 0
            }
        },
        change(item, newStock) {
            if (newStock < 0) {
                newStock = 0;
            }
            item.stock = newStock;
        },
        remove(index) {
            this.products.splice(index, 1);
        }
    }
};

new Vue(config);

