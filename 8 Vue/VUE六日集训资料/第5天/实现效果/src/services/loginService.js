export default {
    async login(loginId, loginPwd) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (loginId === "admin" && loginPwd === "123123") {
                    resolve({
                        loginId,
                        name: "超级管理员"
                    })
                }
                else {
                    resolve(null)
                }
            }, 1000);
        })
    }
}