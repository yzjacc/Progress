import Father from '@/components/Father';
import Son from '@/components/Son';
import { shallowMount } from '@vue/test-utils';

describe('Father.vue', () => {
  it('测试子组件触发show事件，显示信息', () =>{
    const wrapper = shallowMount(Father);
    expect(wrapper.find('.info').exists()).toBeFalse;
    wrapper.find(Son).vm.$emit('show');
    expect(wrapper.find('.info').exists()).toBetrue;
  })

  it('执行changeAge函数，数据age改变', () => {
    const wrapper = shallowMount(Father);
    wrapper.vm.changeAge();
    expect(wrapper.vm.age).toBe(16);
  })
})