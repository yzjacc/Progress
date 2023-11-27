//策略模式则是定义了一组算法，并将每个算法封装起来，使得它们可以互相替换。
//策略模式让算法的变化独立于使用算法的客户。这使得你可以独立的改变和扩展算法。
class Context {
    constructor(strategy) {
        this.strategy = strategy;
    }

    getStrategy() {
        return this.strategy();
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }
}

let strategies = {
    "strategyA": function () {
        return "This is strategy A!";
    },
    "strategyB": function () {
        return "This is strategy B!";
    },
    "strategyC": function () {
        return "This is strategy C!";
    }
};

let context = new Context(strategies.strategyA);

console.log(context.getStrategy());  // This is strategy A!
context.setStrategy(strategies.strategyB);
console.log(context.getStrategy());  // This is strategy B!
context.setStrategy(strategies.strategyC);
console.log(context.getStrategy());  // This is strategy C!