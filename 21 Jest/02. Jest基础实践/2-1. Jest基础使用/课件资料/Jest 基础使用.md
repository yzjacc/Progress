# Jest 基础使用

这节课会包含两个部分：

- Jest 快速入门
- 测试用例的分组



## Jest 快速入门

首先通过 npm init -y 初始化项目，书写需要测试的工具方法：

```js
/**
 * 工具库
 */

exports.sum = function(a, b){
    return a + b + 1;
}

exports.sub = function(a, b){
    return a - b;
}

exports.mul = function(a, b){
    return a * b;
}

exports.div = function(a, b){
    return a / b;
}

```

接下来需要安装 jest，通过命令

```js
npm install --save-dev jest
```

在项目下面创建测试文件，tools.test.js，安装了 jest 之后，会提供一些全局的方法或者对象，例如 test、expect、jest，这些方法或者对象不需要导入，直接在测试文件中使用即可

```js
const { sum } = require("./tools");

/**
 * 一个 test 方法意味着书写了一个测试用例
 * param1 ：针对这个测试用例的一个描述
 * param2 ：执行该用例所对应的回调函数
 */
test("测试加法", ()=>{
    const result = sum(1, 2);
    expect(result).toBe(3);
});
```

我们可以以相同的方式测试其他的工具函数：

```js
const { sum, sub, mul, div } = require("./tools");

/**
 * 一个 test 方法意味着书写了一个测试用例
 * param1 ：针对这个测试用例的一个描述
 * param2 ：执行该用例所对应的回调函数
 */
test("测试加法", ()=>{
  expect(sum(1, 2)).toBe(3);
  expect(sub(10, 5)).toBe(5);
  expect(mul(2, 3)).toBe(6);
  expect(div(10, 2)).toBe(5);
});
```



我们也可以书写多个测试用例：

```js
/**
 * 改文件就是一个测试文件
 * 在该文件中，我们会书写一个一个的测试用例
 * 安装了 jest 之后，默认会提供一些全局的方法和对象
 * test、expect、jest
 */

const { sum, sub, mul, div } = require("./tools");

/**
 * 一个 test 方法意味着书写了一个测试用例
 * param1 ：针对这个测试用例的一个描述
 * param2 ：执行该用例所对应的回调函数
 */
test("测试加法", () => {
  expect(sum(1, 2)).toBe(3);
});

test("测试减法", () => {
  expect(sub(10, 5)).toBe(5);
});

/**
 * it 方法实际上是 test 方法的一个别名
 */
it("测试乘法", () => {
  expect(mul(2, 3)).toBe(6);
});

it("测试除法", () => {
  expect(div(10, 2)).toBe(5);
});
```

在上面的测试中，我们使用到了 it 方法，该方法实际上是 test 方法的一个别名方法。源码如下：

```js
const test: Global.It = (() => {
  // 实际上我们外部调用的是这个 test 方法
  // 内部调用了一个名为 _addTest 的方法
  const test = (
    testName: Circus.TestNameLike,
    fn: Circus.TestFn,
    timeout?: number,
  ): void => _addTest(testName, undefined, false, fn, test, timeout);
  
  return test;
})();

const it: Global.It = test;
```



上面的演示中，我们将所有的方法的测试可以写在一个测试用例中，也可以书写多个测试用例，那么真实的工具库应该如何书写呢？

实际上，最好的方式是一个工具函数对应一个测试套件，每一个测试套件里面根据函数的参数来书写测试用例，一个参数对应一个测试用例，后面我们在进行实战项目的时候，会采用这样的方式。



## 测试用例的分组

在一个测试套件中，我们实际上可以针对不同的测试用例来进行分组。

分组使用到了 describe 方法，这个方法也是一个全局方法，不需要导入，直接就可以使用。

```js
describe(这个分组的描述，回调函数)
```

示例如下：

```js
describe("这是一组测试，测试加减法", () => {
  // 回调函数中就放一个一个的测试用例

  /**
   * 一个 test 方法意味着书写了一个测试用例
   * param1 ：针对这个测试用例的一个描述
   * param2 ：执行该用例所对应的回调函数
   */
  test("测试加法", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("测试减法", () => {
    expect(sub(10, 5)).toBe(5);
  });
});

describe("这是一组测试，测试乘除法", () => {
  /**
   * it 方法实际上是 test 方法的一个别名
   */
  it("测试乘法", () => {
    expect(mul(2, 3)).toBe(6);
  });

  it("测试除法", () => {
    expect(div(10, 2)).toBe(5);
  });
});
```

在源码中，我们外部调用的 describe 实际上是如下的方法：

```js
const describe = (blockName: Circus.BlockNameLike, blockFn: Circus.BlockFn) =>
    _dispatchDescribe(blockFn, blockName, describe);
```



## 总结

1. Jest 中提供了一些全局方法或者对象，这些方法或者对象是无需引用的，可以在**测试文件**直接使用。
2. 通过 test 或者 it 方法来创建一个测试用例，it 方法实际上是 test 方法的别名方法。
3. 通过 describe 方法可以对多个测试用例进行分组。
