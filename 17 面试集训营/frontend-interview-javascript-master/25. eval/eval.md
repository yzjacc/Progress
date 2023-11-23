# *eval*



## 经典真题



- *JavaScript* 中的 *eval* 方法是啥？一般什么场景下使用？



## 关于 *eval* 你所需要知道的内容



### *eval* 的基本用法



首先我们来看一下 *eval( )* 函数的基本用法。

*eval( )* 函数接收一个字符串作为参数，该字符串一个表示 *JavaScript* 表达式、语句或一系列语句的字符串。表达式可以包含变量与已存在对象的属性。

示例如下：

```js
eval('console.log("Hello!")'); // Hello!

var str = `
    var a = 1;
    var b = 2;
    if(a > b) {
        console.log('a > b');
    } else {
        console.log('a<b');
    }
`;
eval(str); // a<b

console.log(eval('2 + 2')); // 4（ number 类型 ）


console.log(eval(new String('Hello'))); // [String: 'Hello']


console.log(eval('2 + 2') === eval('4')); // true


console.log(eval('2 + 2') === eval(new String('2 + 2'))); // false
```

通过上面的代码我们可以发现，*eval( )* 会将传入的字符串作为 *JavaScript* 来进行执行。

如果 *eval( )* 的参数不是字符串， *eval( )* 会将参数原封不动地返回。例如：

```js
console.log(eval(true)); // true
console.log(eval(5)); // 5
```

如果传入的字符串不是 *JavaScript* 代码，那么也会将此字符串原封不动的返回。例如：

```js
var Hello = 5;
console.log(eval('Hello')); // 5
```



### *eval* 作用域



*eval* 里面的代码在当前词法环境中执行，因此它可以看到外部变量：

```js
let a = 1;

function f() {
  let a = 2;

  eval('console.log(a)'); // 2
}

f();
```

它也可以改变外部变量：

```js
let x = 5;
eval("x = 10");
console.log(x); // 10, value modified
```



在严格模式下， *eval* 有自己的词法环境。因此，在 *eval* 内部声明的函数和变量在外部不可见：

```js
eval("let x = 5; function f() {}");

console.log(typeof x); // undefined (no such variable)
```

如果没有 *use strict*，*eval* 没有自己的词法环境，所以我们会在外面看到 *x* 和 *f*  :

```js
eval("var x = 5; function f() {}");

console.log(x); // 5
console.log(typeof x); // number 
```



### 永远不要使用 *eval*



明白了 *eval( )* 函数的基本用法后，你心里一定会有这么一个疑问，那就是这玩意儿用来干嘛？

在现代编程中，*eval* 的使用非常谨慎。人们常说“ *eval is evil（eval 是邪恶的）* ”。

原因很简单：很久很久以前，*JavaScript* 是一种弱得多的语言，很多事情只能用 *eval* 来完成。但那段时间已经过去十年了。

现在，几乎没有理由使用 *eval*。如果有人使用了它，那么一个更好的选择是用现代语言结构或 *JavaScript* 模块替换它。



总结起来，有如下的理由让我们不要使用 *eval*：



- *eval* 是一个危险的函数， 它使用与调用者相同的权限执行代码。如果你用 *eval* 运行的字符串代码被恶意方（不怀好意的人）修改，您最终可能会在您的网页/扩展程序的权限下，在用户计算机上运行恶意代码。（不安全）
- *eval* 通常比其他替代方法更慢，因为它必须调用 *JS* 解释器，而许多其他结构则可被现代 *JS* 引擎进行优化。使用 *eval* 往往比普通 *JavaScript* 代码慢几个数量级。（性能不好）
- 产生混乱的代码逻辑



## 真题解答



- *JavaScript* 中的 *eval* 方法是啥？一般什么场景下使用？

> 参考答案：
>
> *eval* 是 *JavaScript* 中的一个全局函数，它将指定的字符串计算为 *JavaScript* 代码并执行它。
>
> 在现代 *JavaScript* 编程中，我们应该尽量避免使用 *eval*，之前所有使用 *eval* 的地方都有更好的方式来进行代替，所以在现代 *JavaScript* 编程中，*eval* 没有什么使用场景存在，也就是说，并不存在某些场景必须要使用 *eval* 才能实现的。



-*EOF*-