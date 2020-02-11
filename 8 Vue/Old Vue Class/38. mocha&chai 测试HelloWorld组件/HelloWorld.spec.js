import HelloWorld from '@/components/HelloWorld';
import Vue from 'vue';
import { expect } from 'chai';
import { mount } from '@vue/test-utils';

// Vue.component({})

// const vm = new Vue({})
// vm.$el == > 挂载的元素  vm.$el.  h1 innerHTML

// Vue.extend

// vue test units

describe('HelloWorld.vue', () => {
  it('测试msg属性，能否正常渲染, 原生', () => {
    const msg = 'hello world';
    const Constructor = Vue.extend(HelloWorld);
    const vm = new Constructor({
      propsData: {
        msg
      }
    }).$mount();
    const domInner = vm.$el.getElementsByTagName('h1')[0].innerHTML.trim();
    expect(domInner).to.be.equal(msg);
  })

  it('测试msg属性，能否正常渲染, vue test util', () => {
    const msg = 'hello world';
    // const wrapper = mount(HelloWorld, {
    //   propsData: {msg}
    // });
    const wrapper = mount(HelloWorld);
    wrapper.setProps({msg});
    const domInner = wrapper.find('h1').text();
    expect(domInner).to.be.include(msg);
  })
})