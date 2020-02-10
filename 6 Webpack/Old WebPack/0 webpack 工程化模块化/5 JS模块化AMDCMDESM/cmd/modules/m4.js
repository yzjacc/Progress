define(function(require,exports,module){
    var msg = 'm4';
    // 同步引入
    var m2 = require('./m2');
    m2();
    // 异步引入
    require.async('./m3',function(m3){
        m3.m3.foo();
    });
    function fun(){
        console.log(msg);
    }
    exports.m4 = fun;
})