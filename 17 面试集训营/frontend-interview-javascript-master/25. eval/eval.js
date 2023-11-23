"use strict"
// eval('console.log("Hello World")')

var str = `
    var a = 1;
    var b = 2;
    if(a > b) {
        console.log('a > b');
    } else {
        console.log('a<b');
    }
`;
// eval(str);

// console.log(eval('2+2'));

// console.log('2' === new String('2'));

// console.log(eval(true));
// console.log(eval(1));

// var Hello = 5;
// console.log(eval('Hello'));

// function f(){
//     let a = 1;
//     eval('console.log(a);')
// }
// f();

// let a = 1;
// eval('a = 10');
// console.log(a);


eval("var a = 100");
console.log(a);

var x = '';
eval(x)
