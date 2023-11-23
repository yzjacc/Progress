import { createSlice } from "@reduxjs/toolkit";
import defaultState from "./state"


const slice = createSlice({
    name : "movieSlice",
    initialState : defaultState,
    reducers : {
        // 清除整个历史记录
        clearAllHistory:(state)=>{
            state.searchHistory = [];
        },
        // 清除单个历史记录
        clearOneHistory:(state, action)=>{
            const arr = [...state.searchHistory];
            arr.splice(action.payload, 1);
            state.searchHistory = arr;
        },
        // 更新用户输入的搜索内容
        updateSearchContent:(state, action)=>{
            state.searchContent = action.payload;
        }
    }
})

// 导出 reducer
export default slice.reducer;

// 导出 action creater
export const {clearAllHistory, clearOneHistory, updateSearchContent} = slice.actions;