import loginService from "../services/loginService.js"

export default {
    namespaced: true, //开启命名空间
    state: {
        data: null, //当前登录的用户为空
        isLoading: false //当前正在登录
    },
    mutations: { //配置状态有哪些变化，每一个变化是一个函数
        setIsLoading(state, payload) { //用于改变是否正在登录的状态
            //参数state：表示当前的状态
            //payload（负载）：可选的，该参数表示额外的信息
            state.isLoading = payload;
        },
        setUser(state, userObj) {//用于改变登录的用户
            state.data = userObj;
        }
    },
    actions: { //配置副作用操作，每个action是一个函数
        async login(context, payload) {  //需要传入账号和密码 {loginId:xxx, loginPwd:xxx}
            context.commit("setIsLoading", true);
            const resp = await loginService.login(payload.loginId, payload.loginPwd)
            if (resp) {
                //登录成功
                context.commit("setUser", resp);
                //额外的操作，保存用户信息到localStorage
                localStorage.setItem("loginUser", JSON.stringify(resp));
                return true;
            }
            context.commit("setIsLoading", false);
            return false;
        },
        loginOut(context) {
            //退出登录
            context.commit("setUser", null);
            localStorage.removeItem("loginUser");
        },
        syncLocal(context) {
            //初始化时，同步本地存储
            const local = localStorage.getItem("loginUser");
            if (local) {
                //已经登录
                const user = JSON.parse(local); //拿出本地存储中的用户对象
                context.commit("setUser", user); //同步到状态
            }
        }
    }
}
