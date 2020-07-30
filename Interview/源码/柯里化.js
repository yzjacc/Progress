function curry(func) {
    //得到从下标1开始的参数
    var args = Array.prototype.slice.call(arguments, 1);
    var that = this;
    return function () {
        var curArgs = Array.from(arguments); //当前调用的参数
        var totalArgs = args.concat(curArgs);
        if (totalArgs.length >= func.length) {
            //参数数量够了
            return func.apply(null, totalArgs);
        }
        else {
            //参数数量仍然不够
            totalArgs.unshift(func);
            return that.curry.apply(that, totalArgs);
        }
    }
}