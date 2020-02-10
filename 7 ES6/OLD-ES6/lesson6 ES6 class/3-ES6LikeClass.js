// es5 es6

//ES5

//1. must be new
//2. class Plane.prototype 不能枚举
//3. 静态属性要放到Plane 非原型


function _classCallCheck (_this, _constructor) {
    if (! (_this instanceof _constructor) ) {
        throw "TypeError: Class constructor Plane cannot be invoked without 'new'";
    }
};

// 处理公有属性和静态属性
// 
function _defineProperties (target, props) {
    // Object.defineProperty
    props.forEach(function (ele) {
        // ele.key ele.value
        Object.defineProperty(target, ele.key, {
            value: ele.value,
            writable: true,
            configurable: true
        });
    })
}

function _createClass (_constructor, _prototypeProperties, _staticProperties) {
    // 给原型上赋值
    if (_prototypeProperties) {
        _defineProperties(_constructor.prototype, _prototypeProperties);
    }
    if (_staticProperties) {
        _defineProperties(_constructor, _staticProperties);
    }
}

var Plane = (function () {
    function Plane (name) {
        // 判断是否以new的方式来执行
        _classCallCheck(this, Plane);
        this.name = name || '普通飞机';
        this.blood = 100;
    }

    _createClass(Plane, [
        {
            key: 'fly',
            value: function () {
                console.log('fly');
            }
        }
    ], [
        {
            key: 'alive',
            value: function () {
                return true;
            }
        }
    ]);

    return Plane;
})();

var oP = new Plane('cst&普通飞机');

// console.log(oP)


function _inherit (sub, sup) {
    Object.setPrototypeOf(sub.prototype, sup.prototype);
}



var AttackPlane = (function (Plane) {
    
    _inherit(AttackPlane, Plane);
    function AttackPlane (name) {
        _classCallCheck(this, Plane);
        var _this = this;
        var that = Plane.call(_this, name);
        if (typeof that == 'object') {
            _this = that;
        }
        _this.logo = 'duyi';
        return _this;
    };

    _createClass(AttackPlane, [
        {
            key: 'dan',
            value: function () {
                console.log('biubiubiu');
            }
        }
    ], [
        {
            key: 'alive',
            value: function () {
                return true;
            }
        }
    ]);
    
    return AttackPlane;
})(Plane);


var oAp = new AttackPlane();
console.log(oAp);







