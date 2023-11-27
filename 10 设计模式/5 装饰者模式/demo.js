//装饰者模式或装饰模式（Decorator Pattern）允许在运行时动态添加新的行为到对象上，
//相比继承提供了一种更加灵活的替代方案。

function Coffee() {
  this.cost = function () {
    return 1;
  };
}

function Milk(coffee) {
  this.cost = function () {
    return coffee.cost() + 0.5;
  };
}

var coffee = new Coffee();
coffee = new Milk(coffee);