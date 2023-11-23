import { createSlice } from "@reduxjs/toolkit";

// 创建一个切片方法，回头可以从这个方法的返回值上面获取 actios 以及 reducer
const todolistSlice = createSlice({
  name: "todolist",
  // 仓库的初始数据状态
  initialState: {
    listItem: [
      {
        title: "看书",
        isCompleted: false,
      },
      {
        title: "写字",
        isCompleted: false,
      },
      {
        title: "学习",
        isCompleted: true,
      },
      {
        title: "玩游戏",
        isCompleted: true,
      },
    ],
  },
  reducers: {
    // 这里面就是一个一个 reducer
    increment: (state, action) => {
      let arr = [...state.listItem];
      arr.push({
        title: action.payload,
        isCompleted: false,
      });
      state.listItem = arr;
    },
    decrement: (state, action) => {
      let arr = [...state.listItem];
      arr.splice(action.payload, 1);
      state.listItem = arr;
    },
    changeStatus: (state, action) => {
      let arr = [...state.listItem];
      arr[action.payload].isCompleted = !arr[action.payload].isCompleted;
      state.listItem = arr;
    }
  },
});


// 导出
// actionCreater，reducer 需要导出

export const {increment, decrement, changeStatus}  = todolistSlice.actions;
export default todolistSlice.reducer;