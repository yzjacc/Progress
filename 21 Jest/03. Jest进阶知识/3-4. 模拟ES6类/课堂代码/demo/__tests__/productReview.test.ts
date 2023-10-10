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