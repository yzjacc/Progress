// 仓库文件，我们没有使用 redux 库，而是使用了官方推荐的 @reduxjs/toolkit 工具库
// 该工具库创建 store 使用通过 configureStore 方法

import { configureStore } from "@reduxjs/toolkit";
import todolistReducer from "./reducers"

// 引入 reducer

export default configureStore({
    reducer : {
        todolist : todolistReducer
    }
});
