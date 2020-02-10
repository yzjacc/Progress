let a = 10;
export default a;//export default 后面不能接声明
export let b = {
    n: 10,
    m: 20
};
export let c = 30;

setInterval(function () {
    c += 10;
}, 1000);

// setTimeout(function () {
//     console.log("==========");
//     console.log(b);
// }, 1000);

// export let c = 30;//export导出的（不带default的）必须得用{}阔上才能引用