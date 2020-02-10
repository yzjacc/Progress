import Loading from "../components/loading.js"

const template = `
<div>
<div class="center">
        <p>
            <label>账号：</label>
            <input type="text" v-model="loginId"/>
        </p>
        <p>
            <label>密码：</label>
            <input type="password" v-model="loginPwd"/>
        </p>
        <p>
            <button @click="handleLogin">登录</button>
        </p>
        
    </div>
<Loading :show="isLoading"/>
</div>
`;

export default {
    template,
    data() {
        return {
            loginId: "", //暂存数据
            loginPwd: ""
        }
    },
    components: {
        Loading
    },
    computed: {
        isLoading() {
            return this.$store.state.loginUser.isLoading;
        }
    },
    methods: {
        async handleLogin() {
            const result = await this.$store.dispatch("loginUser/login", {
                loginId: this.loginId,
                loginPwd: this.loginPwd
            })
            if (result) {
                this.$router.push("/");//跳转到首页
            }
            else {
                alert("账号密码错误");
            }
        }
    }
}