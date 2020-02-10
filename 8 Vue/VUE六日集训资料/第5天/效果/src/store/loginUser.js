import loginService from "../services/loginService.js"

export default {
    namespaced: true,
    state: {
        data: null,
        isLoading: false
    },
    mutations: {
        setIsLoading(state, newStatus) {
            state.isLoading = newStatus;
        },
        setData(state, data) {
            state.data = data;
        }
    },
    actions: {
        async login(context, {loginId, loginPwd}) {
            context.commit("setIsLoading", true);
            const result = await loginService.login(loginId, loginPwd)

            context.commit("setIsLoading", false);
            if (result) {
                context.commit("setData", result);
                localStorage.setItem("loginUser", JSON.stringify(result))
                return true;
            }
            return false;
        },
        autoLogin(context) {
            var item = localStorage.getItem("loginUser");
            var user = null;
            if (item) {
                user = JSON.parse(item);
            }
            context.commit("setData", user);
        },
        loginOut(context) {
            context.commit("setData", null);
            localStorage.removeItem("loginUser");
        }
    }
}