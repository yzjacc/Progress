import tools from "../ts/tools";
import "jest-location-mock"
const { getSearchObj } = tools;

describe("测试getSearchObj", () => {
  // 测试是否正常返回对象
  test("测试是否正常返回对象", () => {
    // window.location.href = "https://www.baidu.com?a=1&b=2";
    window.location.assign("https://www.baidu.com?a=1&b=2");
    const result = getSearchObj();
    expect(result).toEqual({
      a: "1",
      b: "2",
    });
    expect(window.location.search).toBe("?a=1&b=2");
  });

  // 测试参数为空的时候
  test("测试参数为空的时候",()=>{
    window.location.assign("https://www.baidu.com");
    const result = getSearchObj();
    expect(result).toEqual({});
    expect(window.location.search).toBe("");
  });
});
