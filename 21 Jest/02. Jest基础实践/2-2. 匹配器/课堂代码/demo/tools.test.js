// const { sum } = require("./tools");

// test("测试加法", () => {
//   expect(sum(1, 2)).toBe(3);
//   expect(sum(1, 2)).not.toBe(4);
// });

// test("深度比较对象",()=>{
//   const stu = {name : "张三", score : {html : 100, css : 90}};
//   expect(stu).not.toBe({name : "张三", score : {html : 100, css : 90}});
//   // 使用 toEqual 来进行深度比较
//   // toEqual 会递归比较对象的所有属性
//   expect(stu).toEqual({name : "张三", score : {html : 100, css : 90}});
// })

// test("布尔值相关匹配器",()=>{
//   const n = null;
//   expect(n).toBeFalsy();
//   expect(n).not.toBeTruthy();

//   const a = 0;
//   expect(a).toBeFalsy();
//   expect(a).not.toBeTruthy();
// })

// test("无参匹配器",()=>{
//   const n = null;
//   expect(n).toBeNull();
//   expect(n).toBeDefined();
//   expect(n).not.toBeUndefined();
//   const a = 0;
//   expect(a).not.toBeNull();
//   expect(a).toBeDefined();
//   expect(a).not.toBeUndefined();
// })

// test("数值相关匹配器", () => {
//   const value1 = 4;
//   // 大于
//   expect(value1).toBeGreaterThan(3);
//   // 大于等于
//   expect(value1).toBeGreaterThanOrEqual(4);
//   // 小于
//   expect(value1).toBeLessThan(5);
//   // 小于等于
//   expect(value1).toBeLessThanOrEqual(4);

//   // 这里需要注意一下浮点数
//   const value2 = 0.1 + 0.2;
//   expect(value2).toBeCloseTo(0.3);
//   // toBeCloseTo 还接受第二个参数，第二个参数用于指定位数，默认是两位
//   expect(0.302).toBeCloseTo(0.301);
//   expect(0.302).not.toBeCloseTo(0.301, 5);
// });

// test("字符串相关匹配器",()=>{
//   expect("this is a test").toMatch(/test/);
//   expect("this is a test").not.toMatch(/abc/);
// })

// const shoppingList = [
//   "diapers",
//   "kleenex",
//   "trash bags",
//   "paper towels",
//   "milk",
// ];
// test("数组相关匹配器", () => {
//   expect(shoppingList).toContain("milk");
//   // toContain 进行的是全等比较，也就是严格比较
//   expect([1, 2, 3]).not.toContain("1");
//   expect([{ name: "张三" }, { name: "李四" }]).not.toContain({ name: "张三" });
//   // toContain 还可以用来检测一个字符串是否是另一个字符串的子串
//   expect("this is a test").toContain("test");
//   // 也可以用到集合（set）里面
//   expect(new Set(shoppingList)).toContain("milk");
// });

// function compileCode(){
//   throw new Error("aaa you are using the wrong JDK bbb");
// }

// test("异常相关的匹配器",()=>{
//   expect(()=>compileCode()).toThrow();
//   // toThrow 里面可以传递不同的参数
//   expect(()=>compileCode()).toThrow(Error);
//   expect(()=>compileCode()).toThrow("you are using the wrong JDK");
//   expect(()=>compileCode()).toThrow(/JDK/);
// })

// const arr = ["张三"];
// test("上面的数组不包含某一项", () => {
//   expect(["李四", "王武", "赵六"]).toEqual(expect.not.arrayContaining(arr));
// });


const obj = {name : "张三"};
test("对象不包含上面的键值对",()=>{
  expect({age : 18}).toEqual(expect.not.objectContaining(obj));
  expect({name: "李四",age : 18}).toEqual(expect.not.objectContaining(obj));
})