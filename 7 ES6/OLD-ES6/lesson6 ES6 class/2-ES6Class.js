// class
// class 

// 私有属性 公属性（原型属性） 静态属性 （函数属性）
class Plane {

    // ES7
    // static alive = 10;
    static alive () {
        return true;
    }

    constructor (name) {
        this.name = name || '普通飞机';
        this.blood = 100;
        return {
            son: 'xixi'
        }
    }
    fly () {
        console.log('fly');
    }

    // ES7 私有属性
    // name = 10;
};
// Plane();




//
class AttackPlane extends Plane{
    constructor (name) {
        super(name);
        this.logo = 'duyi';
    }
    dan () {
        console.log('biubiubiu');
    }
}

var oAp = new AttackPlane('攻击机');
console.log(oAp);

//ES5
//1. must be new
//2. class Plane.prototype 不能枚举
//3. 静态属性要放到Plane 非原型

