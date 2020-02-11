import TodoList from '@/components/TodoList';
import { mount } from '@vue/test-utils';

describe('TodoList.vue', () => {
  it('初始时，数据mask为""，输入框内容为""', () => {
    const wrapper = mount(TodoList);
    const maskVal = wrapper.find('input').text();
    const maskData = wrapper.vm.mask;
    expect(maskVal).toBe("");
    expect(maskData).toBe("");
  })

  it('数据mask跟随输入框内容改变', () => {
    const wrapper = mount(TodoList);
    const oInput = wrapper.find('input');
    // oInput.element.value = '杉杉最美';
    // oInput.trigger('input');
    oInput.setValue('杉杉最美');
    expect(wrapper.vm.mask).toBe('杉杉最美');
  })

  it('添加任务', () => {
    const wrapper = mount(TodoList);
    const oBtn = wrapper.find('button');
    const length = wrapper.vm.maskList.length;
    oBtn.trigger('click');
    expect(wrapper.vm.maskList).toHaveLength(length + 1);
    expect(wrapper.findAll('li')).toHaveLength(length + 1);
    expect(wrapper.vm.mask).toBe('');
  })
})