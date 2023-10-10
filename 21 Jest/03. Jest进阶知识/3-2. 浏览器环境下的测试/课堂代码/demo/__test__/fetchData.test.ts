import tools from "../ts/tools";
import "jest-fetch-mock";
const { fetchData } = tools;

describe("测试fetchData", () => {
  // 测试返回的数据是否有对应的属性
  test("测试返回的数据是否有对应的属性", async () => {
    const result = await fetchData(1);
    expect(result).toHaveProperty("userId");
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("completed");
  });

  // 测试返回的数据对应的值是否正确
  test("测试返回的数据对应的值是否正确", async () => {
    const result = await fetchData(1);
    expect(result).toEqual({
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    });
  });
});
