// //导出
// //{ a:xxx, b:xxx, default:xxx, c:xxx }

// import { a, b } from "模块路径"   //导入属性 a、b，放到变量a、b中
// import { a as temp1, b as temp2 } from "模块路径" //导入属性a、b，放到变量temp1、temp2 中

// import { default as a } from "模块路径" //导入属性default，放入变量a中，default是关键字，不能作为变量名，必须定义别名
// import { default as a, b } from "模块路径" //导入属性default、b，放入变量a、b中
// import c from "模块路径"  //相当于 import {default as c} from "模块路径"
// import c, { a, b } from "模块路径" //相当于 import {default as c, a, b} from "模块路径"
// import * as obj from "模块路径" //将模块对象放入到变量obj中
// // import "模块路径" //不导入任何内容，仅执行一次模块

var a = 1;

var b = 2;
import func from "./b.js";

func = 123;//报错
console.log(func)

// func();

// func();