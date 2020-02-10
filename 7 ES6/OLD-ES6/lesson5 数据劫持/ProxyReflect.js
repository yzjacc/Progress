// 

let oData = {
    val: 'duyi',
    _val: 'aaaa'
}

let oProxyData = new Proxy(oData, {
    set (target, key, value, receiver) {
        // console.log(target, key, value, receiver);
        Reflect.set(target, key, value);
        upDate();
    },
    get (target, key, receiver) {
        // console.log(target, key, receiver);
        return Reflect.get(target, key);
    },
    has (target, key) {
        return key.indexOf('_') != -1 ? false : key in oData;
    },
    deleteProperty () {

    }
});

console.log( delete oProxyData.val );



// 读写 控制
// console.log( oProxyData.val );
// oProxyData.val = 10;

// function upDate () {
//     console.log('更新了')
// }

// oProxyData.name = 20;