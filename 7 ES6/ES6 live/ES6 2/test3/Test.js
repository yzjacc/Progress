class Animal {
    constructor(name) {
        this.name = name;
    }
    eat(something) {
        console.log(this.name + " eat " + something);
    }
    run() {
        console.log(this.name + " run ...");
    }
}

class Dog extends Animal {
    constructor(name, type) {
        super(name);
        this.type = type;
    }
    bite(animal) {
        console.log(this.name + " 咬 " + animal.name);
    }
}
class Cat extends Animal {
    constructor(name, type) {
        super(name);
        this.type = type;
    }
    nao(animal) {
        console.log(this.name + " 挠 " + animal.name);
    }
}

var xiaohua = new Cat("小花", "布偶");
var dahuang = new Dog("大黄", "哈士奇");

xiaohua.run();
dahuang.run();
dahuang.bite(xiaohua);
xiaohua.nao(dahuang);
dahuang.run();

class Customer {
    constructor(account, name, money) {
        this.account = account;
        this.name = name;
        this.money = money;
    }
}

class Seller {
    constructor(account, name, money, goods) {
        this.account = account;
        this.name = name;
        this.money = money;
        this.goods = goods;
    }
}

class Order {
    constructor(customer, seller, good, money, status) {

    }
}

