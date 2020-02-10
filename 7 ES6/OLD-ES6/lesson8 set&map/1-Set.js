// Set
//Proxy 
//Set Map
    // 简介：
    //     Set是ES6提供给我们的构造函数，能够造出一种新的存储数据的结构

    // 特点：
    //     只有属性值，成员值唯一（不重复）

    // 用途：
    //     可以转成数组，其本身具备去重，交集，并集，差集的作用等

// 初始化
// 参数 iterator 接口
// [] string 
// let oS = new Set(['a', 'b', 'c', ['a', 1, 2], {name: 'cst'}]);
// let oS2 = new Set('abc');
// oS2.add(9);

// // api 
// let oS3 = new Set();
// oS3.add(true);
// oS3.add(1);


// delete

// has
// 具备Iterator接口的值 arr set map string

// for (let val of oS2) {
//     console.log(val);
// };

// oS2.forEach((ele, key, self) => {
//     console.log(ele, key, self);
// });


// Set转换arr

// let arr = [1, 2, 4, 3, 2, 1, 3, 4, 5, 1];
// let oS = new Set(arr);
// // 
// console.log([...oS]);
// Array.from 

// 
// let o2 = {
//     name: 'cst'
// }

// let arr = [1, 2, 4, 3, 2, 1, 3, 4, 5, 1, o2, o2, {name: 'cg'}];

// // Set
// let oS = new Set(arr);



// let o = {
//     name: 'cst'
// }
// let arr = [1, 2, 3, 4, 5, o, 6, 1, o, 2, 3, {name: 'cg'}];
// let obj = {};
// let newArr = [];

// for (let i = 0; i < arr.length; i++) {
//     if ( !obj[ arr[i] ]) {
//         newArr.push(arr[i]);
//         obj[arr[i]] = true;
//     }
// };
// console.log( newArr );



// Set
// let o = {
//     name: 'cst'
// }
// let arr = [1, 2, 3, 4, 5, o, 6, 1, o, 2, 3, {name: 'cg'}];
// let oS = new Set(arr);

// 并集 交集和差集
// 集合 
// arr obj set map

// 并集
// let arr1 = [1, 2, 3, 2, 3];
// let arr2 = [3, 2, 4, 4, 5];

// Set
// let oS = new Set([...arr1, ...arr2]);


// 交集
// let arr1 = [1, 2, 3, 2, 3];
// let arr2 = [3, 2, 4, 4, 5];

// let oS1 = new Set(arr1);
// let oS2 = new Set(arr2);

// let newArr = [...oS1].filter( ele => oS2.has(ele) );
// console.log(newArr);

// 差集
// [1, 2, 4, 5];

// let arr1 = [1, 2, 3, 2, 3];
// let arr2 = [3, 2, 4, 4, 5];

// let oS1 = new Set(arr1);
// let oS2 = new Set(arr2);

// let newArr1 = [...oS1].filter(ele =>!oS2.has(ele));

// let newArr2 = [...oS2].filter(ele =>!oS1.has(ele));

// console.log( [...newArr1, ...newArr2] );

// 不在前端搞，后台



