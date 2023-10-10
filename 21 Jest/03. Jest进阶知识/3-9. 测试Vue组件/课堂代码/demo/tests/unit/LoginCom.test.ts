import { shallowMount } from "@vue/test-utils";
import Login from "@/components/LoginCom.vue";

// 前期准备
const fakeUserResponse = { token: "fake_user_token" };
window.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve(fakeUserResponse),
});

afterEach(() => {
  window.localStorage.removeItem("token");
});

test("请求成功", async () => {
  // arrage
  const wrapper = shallowMount(Login);

  // act 填写表单
  await wrapper.find("#usernameInput").setValue("xiejie");
  await wrapper.find("#passwordInput").setValue("123456");
  await wrapper.find("form").trigger("submit");

  // 等待
  await wrapper.vm.$nextTick();
  await new Promise((resolve) => setTimeout(resolve, 100));

  // assert
  expect(window.localStorage.getItem("token")).toEqual(fakeUserResponse.token);
  expect(wrapper.find('[role="alert"]').text()).toMatch(/Congrats/i);
});

test("请求失败",async () => {
  window.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.reject({
        message: "服务器内部错误",
      }),
  });

   // arrage
   const wrapper = shallowMount(Login);

   // act 填写表单
   await wrapper.find("#usernameInput").setValue("xiejie");
   await wrapper.find("#passwordInput").setValue("123456");
   await wrapper.find("form").trigger("submit");
 
   // 等待
   await wrapper.vm.$nextTick();
   await new Promise((resolve) => setTimeout(resolve, 100));
 
   // assert
   expect(window.localStorage.getItem("token")).toBeNull();
   expect(wrapper.find('[role="alert"]').text()).toMatch("服务器内部错误");

});
