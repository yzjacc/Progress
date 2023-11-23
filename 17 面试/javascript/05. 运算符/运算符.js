// 加法运算符

// console.log(1 + 2); // 3

// 非数值（非字符串）会被转换为数值
// console.log(true + true); // 2

// 如果有一个操作数是字符串，那么就是进行字符串的拼接
// console.log('3' + 4 + 5); // '345'

// 如果是对象，会先将对象转为数值类型（Number）
// 对象转 Number 会先调用 valueOf，如果得到的还是对象
// 那么就会调用 toString，如果 toString 都还是对象，那就报错
// console.log([] + 1); // '1'

// var obj = {
//     name : "xiejie",
//     valueOf(){
//         return 2;
//     },
//     toString(){
//         return 3;
//     }
// }

// console.log(obj + 1); // '[object Object]1'

// console.log([].valueOf());
// console.log([].toString());

// console.log({}.valueOf());
// console.log({}.toString());

// var d = new Date();
// d.toString = function(){
//     return 2;
// }
// d.valueOf = function(){
//     return 3;
// }
// console.log(d + 1);

// 四则运算中的 -、*、/ 都是转成数值进行运算即可
// 如果无法转为数值，那么最终得到的就是 NaN
// console.log('5' - '2');
// console.log('5' - true);
// console.log({} - '2');

// 余数
// console.log(5 % 2);

// 在做取余运算时，小数对大数取余，直接得到这个小数
// console.log(3 % 100);
// console.log(1 % -2);

// 自增自减
// 需要注意的就是运算符在前和在后的区别
// 在前：先做自增或者自减，然后再参与运算
// 在后：先做运算，然后再自增或者自减

// var i = 1;
// ++i;
// var j = i + 5;
// console.log(i);
// console.log(j);

// 数值运算符
// console.log(+5);
// console.log(-5);

// console.log(-true);
// console.log(-[]);
// console.log(-{});
// 之所以 [] 转出来是 0，是因为空数组在转为字符串的时候得到的是空字符串
// 空字符串转为数字就是 0

// 而 {} 转字符串得到的是 [object Object]

// console.log(Number([1]));

// 指数运算符

// console.log(Math.pow(2, 3));
// console.log(2 ** 3);

// 比较运算符

// console.log(5 > 3);

// NaN 在做比较的时候一定得到的是 false
// NaN 在做计算的时候得到的是 NaN
// console.log(5 > NaN);
// console.log(5 < NaN);
// console.log(5 + NaN);
// console.log(5 - NaN);
// console.log(5 * NaN);
// console.log(5 / NaN);
// console.log(NaN === NaN);

// 会先将 '3' 转为数值
// 当遇到不是数值的操作数，会先将其转为数值
// console.log(5 > '3');
// console.log(5 > true);
// console.log(5 > []);
// console.log(5 > {});

// 如果两边都是字符串，那么这个比较规则就又变化了
// 比较的是字符的编码大小

// 如果是一个字符串，那么就取出字符串的每一个字符来进行比较
// console.log('a' > 'A');
// console.log('cat' > 'coyfriend');
// console.log('cat' > 'cata');
// console.log('大' > '小');

// 严格相等
// console.log(5 === '5');

// 相等运算符
// console.log(5 == '5');


// console.log(3 === 0b11);

// 对象在比较的时候，比较的就不是值了
// 而是比较的地址
// console.log([] > []);

// var arr = [];
// var arr2 = arr;
// console.log(arr === arr2);

// 严格不想等

// console.log(5 !== '5');

// 相等运算符
// console.log('123' > 1);

// console.log(5 != '5');

// console.log(Boolean(undefined));
// console.log(Boolean(null));
// console.log(Boolean(''));
// console.log(Boolean(0));
// console.log(Boolean([]));

// 快速将一个值转为布尔值
// console.log(!!54);
// console.log(!!undefined);

// && 运算符
// 有一个为假就都为假，全部为真最终才会得到真
// 注意短路现象

// console.log(1 && 2 && 0 && 4 && 5);

// || 运算符
// 有一个是真值，就为真，如果全部都为假最终就是假
// console.log(0 || '' || null || null || undefined)

// 位运算符
// console.log(~5);

// console.log(12 & 10);
// console.log(12 | 10);
// console.log(12 ^ 10);

// console.log(10 >> 3);
// 等价于乘以 2 的 3 次方

var a = {
    i: 1,
    toString() {
        return a.i++;
    }
}
// Number ----> valueOf ----> toString
if (a == 1 && a == 2 && a == 3) {
    console.log('1');
}