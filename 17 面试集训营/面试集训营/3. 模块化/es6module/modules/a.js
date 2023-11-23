export var a = 1 //基本导出 a = 1  
export var b = function () { } //基本导出 b = function(){}
export function method() { }  //基本导出 method = function(){}
var c = 3;
export { c } //基本导出 c = 3
export { c as temp } //基本导出 temp = 3

export default 3 //默认导出 default = 3
export default function () { } //默认导出 default = function(){}
export { c as default } //默认导出 default = 3

export { a, b, c as default } //基本导出 a=1, b=function(){}, 默认导出 default = 3


//绝大部分情况
// export default xxx;