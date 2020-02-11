# sinon 
> 辅助我们进行前端测试。

> 安装：npm install sinon -D

> 引入: import sinon from 'sinon';

## spy 间谍函数

> const spy = sinon.spy();

- 使用方法
  > spy.called; 表示函数是否被调用,返回布尔值

  > spy.callCount; 函数被调用的次数

  > spy.calledOnce; 函数只被调用了一次，返回布尔值

  > spy.calledTwice; 函数被连续调用了两次，返回布尔值

  > spy.calledThrice; 函数被连续调用了三次，返回布尔值

  > spy.firstCall; 函数第一次被调用。返回布尔值

  > spy.secondCall; 函数第二次被调用。返回布尔值

  > spy.thirdCall; 函数第三次被调用。返回布尔值

  > spy.lastCall; 函数最后一次被调用。返回布尔值

  > spy.calledOn('xxx');  调用函数时，函数的this至少有一次是xxx，返回布尔值。

  > spy.alwaysCalledOn('xxx');  调用函数时，函数的this始终是xxx，返回布尔值。

  > spy.calledWidth(1, 2, 3); 函数至少被调用一次，且参数包含1, 2, 3,返回布尔值。

  > spy.calledOnceWith(1, 2, 3); 函数只被调用一次，且参数包含1, 2, 3,返回布尔值。

  > spy.alwaysCalledWith(1, 2, 3); 函数被调用时传的参数始终包括1,2,3，返回布尔值。

  > spy.calledWithExactly(1, 2, 3); 函数至少被调用一次，且参数只为1,2,3，返回布尔值。

  > spy.alwaysCalledWithExactly(1, 2, 3); 函数被调用时传的参数始终只为1,2,3，返回布尔值。

  > spy.calledWithNew(); 函数被作为构造函数new,返回布尔值。

  > spy.neverCalledWith(1, 2, 3); 函数执行时，参数从不为1, 2, 3。返回布尔值。

  > spy.threw(); 函数执行时，抛出一个异常。返回布尔值。

  > spy.threw("TypeError"); 函数执行时，至少抛出一次TypeError异常。返回布尔值。

  > spy.threw('xxx'); 函数执行时，至少抛出一次xxx异常。返回布尔值。

  > spy.alwaysThrew(); 函数执行时，始终抛出异常。返回布尔值。

  > spy.alwaysThrew("TypeError"); 函数执行时，始终抛出TypeError异常。返回布尔值。

  > spy.alwaysThrew('xxx'); 函数执行时，失踪抛出xxx异常。返回布尔值。

  > spy.returned('xxx'); 函数执行时，至少返回一次xxx。返回布尔值。

  > spy.alwaysReturned('xxx'); 函数执行时，始终返回'xxx'。返回布尔值。

  > spy.getCall(n); 返回函数被第n次调用。

  > spy.getCalls(); 返回一个函数被调用的数组。

  > spy.thisValues; 返回函数被调用时this指向的集合, 值类型为数组。

  > spy.args; 返回函数被调用时参数，值类型为数组。

  > spy.exceptions; 返回函数被调用时抛出的异常集合. 值类型为数组。

  > spy.returnValues; 返回函数被调用时返回的值，值类型为数组。