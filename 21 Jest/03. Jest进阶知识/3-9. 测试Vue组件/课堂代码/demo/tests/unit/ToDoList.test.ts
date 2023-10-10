import { shallowMount } from "@vue/test-utils";
import ToDoList from "@/components/ToDoList.vue";

test("测试新增待办事项",async () => {
    const wrapper = shallowMount(ToDoList);

    // 生成快照
    expect(wrapper.element).toMatchSnapshot();

    const todo = wrapper.get('[data-test="todo"]');
    // 因为一开始只有一条待办事项
    expect(todo.text()).toBe('Learn Vue.js 3');

    // act
    // 接下来来测试新增
    await wrapper.get('[data-test="new-todo"]').setValue('New To Do Item');
    // 触发 submit 事件
    await wrapper.get('[data-test="form"]').trigger("submit");

    // assert
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2);
});
