# mocha+chai

- mocha：测试框架
  > vue脚手架内部就安装好了，不需要再次引入
  
  > 自己安装：mocha mocha-webpack

- chai：断言库，断定左边的和右边的是否相等
  > 三种断言风格：should、expect、assert
  
  > www.chaijs.com

## 用法

- 套件
  > describe('套件名字', () => {})
  - 生命周期
    > before(()=>{}) 调用该套件的所有测试用例之前执行且只执行一次

    > after(()=>{}) 调用该套件的所有测试用例之后执行且只执行一次

    > beforeEach(()=>{}) 调用该套件的每个测试用例之前执行，有几个测试用例就执行几次

    > afterEach(()=>{}) 调用该套件的所有测试用例之后执行，有几个测试用例就执行几次

- 用例
  > it('用例名字', done => {}) 
  - done 
    > done函数被调用的时候，才能完成测试

### chai的基本用法

* 判断相等
  > 判断基本类型 expect(1).to.be.equal(1); 

  > 判断引用类型：expect({a: 1}).to.be.deep.equal({a: 1})   /   expect({a: 1}).to.be.eql({a: 1}) 

  > deep标记：该标记可以让其后的断言不是比较对象本身，而是递归比较对象的键值对

* 判断不等
  > expect(2).to.be.not.equal(1);

* 判断大于
  > expect(10).to.be.above(5);

  > expect(10).to.be.greaterThan(5);


* 判断小于
  > expect(5).to.be.below(10);

  > expect(5).to.be.lessThan(10);

* 判断大于等于
  > expect(10).to.be.at.least(10);

  > expect(10).to.be.not.lessThan(10);

* 判断小于等于
  > expect(5).to.be.at.most(5);

  > expect(5).to.be.not.greaterThan(5);

* 判断长度
  > expect([1, 2, 3]).to.be.lengthOf(3);

* 判断为truthy，(除了false、undefined、null、正负0、NaN、""的值)
  > expect(1).to.be.ok;

* 判断为true、false、null、undefined、NaN
  > expect(true).to.be.true;

  > expect(false).to.be.false;

  > expect(null).to.be.null;

  > expect(undefined).to.be.undefined;

  > expect(NaN).to.be.NaN;

* 判断包含
  > expect('shanshan').to.be.include('s'); 包含

  > expect('shanshan').to.be.contain('s'); 包含

  > expect('shanshan').to.be.match(/s/); 匹配