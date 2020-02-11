import Son from '@/components/Son';
import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import sinon from 'sinon';

// sinon npm install sinon -D
// spy 函数 间谍函数

describe('Son.vue', () => {
  it('测试name、age属性，有没有正确显示', () => {
    const name = '杉杉';
    const age = 18;
    const wrapper = mount(Son);
    wrapper.setProps({name, age});
    expect(wrapper.findAll('h4').at(0).text()).to.be.include(name);
    expect(wrapper.findAll('h4').at(1).text()).to.be.include(age);
  })

  it('测试点击button，有没有正确执行传递的函数属性', () => {
    const wrapper = mount(Son);
    const spy = sinon.spy();
    wrapper.setProps({ fn: spy })
    wrapper.findAll('button').at(1).trigger('click');
    // expect(spy.called).to.be.true;
    expect(spy.callCount).to.be.equal(2);

  })
})