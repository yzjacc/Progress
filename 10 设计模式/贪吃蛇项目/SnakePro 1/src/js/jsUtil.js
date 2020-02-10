var tool = {
    inherit: function (target, origin) {
        var temp = function () {};
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.constructor = target;
    },
    extends: function (origin) {
        var result = function () {
            // 私有属性
            origin.apply(this, arguments);
            return this;
        };
        // 原型
        this.inherit(result, origin);
        return result;
    },
    single: function (origin) {
        var singleResult = (function () {
            var instance;
            return function () {
                if (typeof instance == 'object') {
                    return instance;
                }
                origin && origin.apply(this, arguments);
                instance = this;
            }
        })();
        origin && this.inherit(singleResult, origin);
        return singleResult;
    }
};


