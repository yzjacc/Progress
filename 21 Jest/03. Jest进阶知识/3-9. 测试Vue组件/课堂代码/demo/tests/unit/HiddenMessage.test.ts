import { shallowMount } from "@vue/test-utils";
import HiddenMessage from "@/components/HiddenMessage.vue";

test("正确的渲染出来", () => {
  const wrapper = shallowMount(HiddenMessage);
  expect(wrapper.find("label").text()).toBe("显示说明");
  expect(wrapper.find("input").attributes("type")).toBe("checkbox");
});

test("默认不显示信息",()=>{
    const wrapper = shallowMount(HiddenMessage);
    expect(wrapper.find('#showMessage').exists()).toBe(true);
    expect(wrapper.find('#showMessage').text()).toBe("");
});

test("点击复选框之后能够显示信息",async ()=>{
    const wrapper = shallowMount(HiddenMessage, {
        slots : {
            default : '<p>这是一段说明文字</p>'
        }
    });
    const checkbox = wrapper.find('input');
    await checkbox.trigger('click');
    expect(wrapper.find('#showMessage').text()).toBe("这是一段说明文字");
    await checkbox.trigger('click');
    expect(wrapper.find('#showMessage').text()).toBe("");
});