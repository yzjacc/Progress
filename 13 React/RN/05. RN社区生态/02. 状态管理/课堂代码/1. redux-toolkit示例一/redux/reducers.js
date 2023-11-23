// 引入 createSlice 方法
import { createSlice } from "@reduxjs/toolkit";

// 从这个方法名我们可以看出这是创建一个切片
// 这个切片里面就包含了一系列信息
const counterSlice = createSlice({
  name: "counter",
  // 初始化状态
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
