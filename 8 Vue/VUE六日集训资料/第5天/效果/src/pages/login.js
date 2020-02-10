const template = `
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
            <button @click="login">登录</button>
        </p>
    </div>
`;

export default {
    template,
    data() {
        return {
            loginId: "",
            loginPwd: ""
        }
    },
    methods: {
        async login() {
            const result = await this.$store.dispatch("loginUser/login", {
                loginId: this.loginId,
                loginPwd: this.loginPwd
            })
            if (!result) {
                window.alert("账号密码错误");
            }
            else{
                this.$router.push("/")
            }
        }
    }
}