// 仓库文件，我们没有使用 redux 库，而是使用了官方推荐的 @reduxjs/toolkit 工具库
// 该工具库创建 store 使用通过 configureStore 方法

import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./reducers"

// 创建一个仓库
// 接收一个配置对象，配置对象里面其中有一项就是 reducer
export default configureStore({
    reducer: {
        counter : counterReducer
    }
})