import TodoList from '@/components/TodoList';
import { mount } from '@vue/test-utils';
import { expect } from 'chai';


// wrapper.vm  ==> data 
// oInput.element 元素
// oInput.trigger('input');
// oInput.setValue 等同于 上面两句话
// wrapper.findAll
describe('TodoList.vue', () => {
  it('初始时，数据mask为""，输入框内容为""', () => {
    const wrapper = mount(TodoList);
    const maskVal = wrapper.find('input').text();
    const maskData = wrapper.vm.mask;
    expect(maskVal).to.be.equal("");
    expect(maskData).to.be.equal("");
  })

  it('数据mask跟随输入框内容改变', () => {
    const wrapper = mount(TodoList);
    const oInput = wrapper.find('input');
    // oInput.element.value = '杉杉最美';
    // oInput.trigger('input');
    oInput.setValue('杉杉最美');
    expect(wrapper.vm.mask).to.be.equal('杉杉最美');
  })

  it('添加任务', () => {
    const wrapper = mount(TodoList);
    const oBtn = wrapper.find('button');
    const length = wrapper.vm.maskList.length;
    oBtn.trigger('click');
    expect(wrapper.vm.maskList).lengthOf(length + 1);
    expect(wrapper.findAll('li')).lengthOf(length + 1);
    expect(wrapper.vm.mask).to.be.equal('');
  })
})
