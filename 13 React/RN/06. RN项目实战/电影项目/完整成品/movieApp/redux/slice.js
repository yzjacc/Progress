import { createSlice } from "@reduxjs/toolkit";
import defaultState from "./state";

const slice = createSlice({
  name: "movieSlice",
  initialState: defaultState,
  reducers: {
    // 更新用户输入的搜索内容
    updateSearchContent: (state, action) => {
      state.searchContent = action.payload;
    },
    // 清除用户输入的搜索内容
    clearSearchContent: (state) => {
      state.searchContent = "";
    },
    // 清除整个历史搜索
    clearAllSearchHistory: (state, action) => {
      state.searchHistory = [];
    },
    // 清除单个历史搜索
    clearOneSearchHistory: (state, action) => {
      const arr = [...state.searchHistory];
      arr.splice(action.payload, 1);
      state.searchHistory = arr;
    },
  },
});

export default slice.reducer; // 导出 reducer

// 导出各种 action creater
export const {
  updateSearchContent,
  clearSearchContent,
  clearAllSearchHistory,
  clearOneSearchHistory,
} = slice.actions;
