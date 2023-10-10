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
