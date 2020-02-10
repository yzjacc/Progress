const template = `
<div>
    <h1>
        姓：{{firstName}}，名：{{lastName}}，全名：{{fullName}}
        <span>{{n}}</span>
        <button @click="n++">加</button>
    </h1>

    <p>
        全名：<input type="text" v-model="fullName"/>
    </p>
</div>
    
`;

const config = {
    template,
    data: {
        firstName: "摸",
        lastName: "妮卡",
        n: 0
    },
    el: "#app",
    computed: {
        fullName: {
            get() {
                console.log("属性重新计算了！！！！")
                return this.firstName + this.lastName;
            },
            set(newVal){
                console.log(newVal)
                this.firstName = newVal[0];//第一个字符
                this.lastName = newVal.substr(1); //从第2个字符开始截取
            }
        }
    },
    methods: {
        getFullName() {
            console.log("方法调用了！！！！")
            return this.firstName + this.lastName;
        }
    }
}

var app = new Vue(config)