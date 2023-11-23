import { createSlice } from "@reduxjs/toolkit";
import defaultState from "./state";

const translateSlice = createSlice({
  name: "translate",
  initialState: defaultState,
  reducers: {
    // 选择语言
    changeLan: (state, action) => {
      state.curIndex = action.payload;
    },
    // 添加历史记录
    addHistory: (state, action)=>{
        const arr = [...state.history];
        arr.unshift(action.payload);
        state.history = arr;
    },
    // 删除历史记录
    clearHistory: (state)=>{
        state.history = [];
    }
  },
});

export default translateSlice.reducer; // 导出 reducer

export const { changeLan, addHistory, clearHistory } = translateSlice.actions; // 导出各种 action creater
