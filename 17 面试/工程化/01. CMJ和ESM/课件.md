# CommonJS

关键词：

- 社区标准
- 使用函数实现
- 仅node环境支持
- 动态依赖（需要代码运行后才能确定依赖）
- 动态依赖是同步执行的

原理：

```js
// require函数的伪代码
function require(path){
  if(该模块有缓存吗){
    return 缓存结果;
  }
  function _run(exports, require, module, __filename, __dirname){
    // 模块代码会放到这里
  }
  
  var module = {
    exports: {}
  }
  
  _run.call(
    module.exports, 
    module.exports, 
    require, 
    module, 
    模块路径, 
    模块所在目录
  );
  
  把 module.exports 加入到缓存;
  return module.exports;
}
```

# ES Module

关键词：

- 官方标准

- 使用新语法实现

- 所有环境均支持

- 同时支持静态依赖和动态依赖

  静态依赖：在代码运行前就要确定依赖关系

- 动态依赖是异步的

- 符号绑定

关于符号绑定：

```js
// module a.js
export var a = 1;
export function changeA(){
  a = 2;
}

// index.js
// 导入位置的符号和导出的符号并非赋值，它们完全是一个东西
import {a, changeA} from './a.js';
console.log(a); // 1
changeA();
console.log(a); // 2
```



# 面试题

1. commonjs 和 es6 模块的区别是什么？

   > 参考答案：
   >
   > 1. CMJ 是社区标准，ESM 是官方标准
   > 2. CMJ 是使用 API 实现的模块化，ESM 是使用新语法实现的模块化
   > 3. CMJ 仅在 node 环境中支持，ESM 各种环境均支持
   > 4. CMJ 是动态的依赖，同步执行。ESM 既支持动态，也支持静态，动态依赖是异步执行的。
   > 5. ESM 导入时有符号绑定，CMJ 只是普通函数调用和赋值

2. export 和 export default 的区别是什么？

   > 参考答案：
   >
   > export 为普通导出，又叫做具名导出，顾名思义，它导出的数据必须带有命名，比如变量定义、函数定义这种带有命名的语句。在导出的模块对象中，命名即为模块对象的属性名。在一个模块中可以有多个具名导出
   >
   > export default 为默认导出，在模块对象中名称固定为 default，因此无须命名，通常导出一个表达式或字面量。在一个模块中只能有一个默认导出。

3. 下面的模块导出了什么结果？

   ```js
   exports.a = 'a';
   module.exports.b = 'b';
   this.c = 'c';
   module.exports = {
     d: 'd'
   }
   ```

   > 参考答案：
   >
   > ```js
   > { d: 'd' }
   > ```

4. 下面的代码输入什么结果？

   ```js
   // module counter
   var count = 1;
   export {count}
   export function increase(){
     count++;
   }
   
   // module main
   import { count, increase } from './counter';
   import * as counter from './counter';
   const { count: c } = counter;
   increase();
   console.log(count);
   console.log(counter.count);
   console.log(c);
   ```

   

