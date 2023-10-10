import storage from "../ts/storage";

describe("测试storage存储", () => {
  // 测试存储
  test("测试存储", () => {
    storage.set("newKey", "Hello");
    expect(localStorage.getItem("my-app-newKey")).toBe("Hello");
  });

  // 测试获取
  test("测试获取", () => {
    localStorage.setItem("my-app-newKey", "World");
    expect(storage.get("newKey")).toBe("World");
  });
});
