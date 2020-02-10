var JsUtil = {
    // 通用继承方法
    extends: function(parent) {
        var result = function() {
            parent.apply(this, arguments);
        }
        var Super = function() {}
        Super.prototype = parent.prototype;
        result.prototype = new Super();
        return result
    },
    single: function() {
        var result = function() {
            if (typeof result.instance === 'object') {
                return result.instance
            }
            result.instance = this;
            return this
        }
        return result
    }
}