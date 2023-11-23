// let i = 1;
// function a(){
//     let i = 2;
// }
// a();
// console.log(i);


// function test(){
//     i = 10; // i 就会是一个全局变量
// }
// test();
// console.log(i);

// var i = 10;
// function a(){
//     function b(){
//         function c(){
//             console.log(i);
//         }
//         c();
//     }
//     b();
// }
// a();

var x = 10
function fn() {
    console.log(x)
}
function show(f) {
    var x = 20;
    (function () {
        f() // 10，而不是 20
    })()
}
show(fn)