# 模拟 ES6 类

我们知道，在 ES6 中所提供的 class 本质上是一个语法糖，背后实际上是一个构造函数，因此在对类进行测试的时候，也可以使用 jest.mock 或者 jest.spyOn 来进行模拟测试。



经常我们会遇到这种情况：在测试一个模块的时候，这个模块依赖了其他的类，那么这个时候为了屏蔽其影响，我们需要模拟依赖的类

```ts
import ReviewCollector from "../ts/reviewCollector";
import ProductReview from "../ts/productReview";

// 我们这个测试套件是要对 ReviewCollector 进行测试
// 但是 ReviewCollector 又依赖了 ProductReview 这个类
// 为了屏蔽其影响，我们需要模拟 ProductReview 这个类

// 使用 jest.mock 就可以模拟
jest.mock("../ts/productReview", () => {
  return jest.fn().mockImplementation((name: string, review: string) => {
    return {
      name,
      review,
    };
  });
});
```

在上面的代码中，我们要对 ReviewCollector 进行测试，但是这个类里面又用到了 ProductReview，因此我们采取对 ProductReview 进行一个模拟。

之后就可以在测试用例中正常的使用 ProductReview 即可

```ts
describe("测试ReviewCollector", () => {
    let collector: ReviewCollector;
    beforeEach(()=>{
        collector = new ReviewCollector();
    })

    test("能够添加一条评论",()=>{
        const review = new ProductReview("产品A","好用");
        collector.addReview(review);

        // 进行断言测试
        expect(collector.getNumGoodReview("产品A")).toBe(1);
        expect(collector["productList"]).toContain("产品A");
    });

    test("能够获取好评数",()=>{
        const review1 = new ProductReview("产品A", "好用");
        const review2 = new ProductReview("产品A", "一般");
        const review3 = new ProductReview("产品B", "好用");

        collector.addReview(review1);
        collector.addReview(review2);
        collector.addReview(review3);

        // 接下来进行断言测试
        expect(collector.getNumGoodReview("产品A")).toBe(1);
        expect(collector.getNumGoodReview("产品B")).toBe(1);

    });
});
```



还有一些时候，我们需要对一个类进行一个测试，那么我们对于有些方法可以使用 jest.spyOn 来进行一个监听。

```ts
// 对 ProductReview 这个类的一些方法进行一些模拟

import ProductReview from "../ts/productReview";

// 模拟类的getter
const mockName = jest.spyOn(ProductReview.prototype, "name", "get").mockImplementation(()=>"小米手机")
const mockReview = jest.spyOn(ProductReview.prototype, "review", "get").mockImplementation(()=>"很好用")

// 模拟类的静态方法
const mockStatic = jest.spyOn(ProductReview, "showInfo").mockImplementation(()=>"静态方法");


test("ProductReview",()=>{
    const p = new ProductReview("", "");
    const result = ProductReview.showInfo();

    // 断言
    expect(mockStatic).toHaveBeenCalled();
    expect(result).toBe("静态方法");
    expect(p.name).toBe("小米手机");
    expect(p.review).toBe("很好用");
    expect(mockName).toHaveBeenCalled();
    expect(mockReview).toHaveBeenCalled();
})
```

在上面的代码中，我们是对 ProductReview 类的 getter 方法以及静态方法进行了一个模拟。