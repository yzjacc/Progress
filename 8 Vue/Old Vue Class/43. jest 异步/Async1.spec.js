import Async from '@/components/Async';
import { mount } from '@vue/test-utils';
import Vue from 'vue';

jest.mock('axios');

describe('Async.vue', () => {

  it('获取name', done => {
    const wrapper = mount(Async);
    wrapper.findAll('button').at(0).trigger('click');
    Vue.nextTick(() => {
      expect(wrapper.findAll('h4').at(0).text()).toBe('shanshan');
      done();
    })
  })

  it('获取name', () => {
    const wrapper = mount(Async);
    wrapper.findAll('button').at(0).trigger('click');
    return Promise.resolve().then(() => {
      expect(wrapper.findAll('h4').at(0).text()).toBe('shanshan');
    })
  })

  it('获取name', async () => {
    const wrapper = mount(Async);
    await wrapper.vm.getName();
    expect(wrapper.findAll('h4').at(0).text()).toBe('shanshan');    
  })
  
})