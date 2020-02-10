import Count from '@/components/Count';
import { mount, createLocalVue } from '@vue/test-utils';
// import Vue from 'vue'
import Vuex from 'vuex';

let localVue = createLocalVue();
localVue.use(Vuex);

describe('Count.vue', () => {
  let store;
  let state;
  let getters;
  let mutations;
  let actions;

  beforeEach(() => {
    state = { count: 1 } 

    getters = {
      dbCount: () => state.count * 2
    }

    mutations = {
      changeCount: jest.fn()
    }

    actions = {
      changeCount: jest.fn()
    }

    store = new Vuex.Store({
      state,
      getters,
      mutations,
      actions
    })
  })

  it('state', () => {
    const wrapper = mount(Count, { localVue, store })
    expect(wrapper.findAll('h4').at(0).text()).toContain(1);
  })

  it('getters', () => {
    const wrapper = mount(Count, { localVue, store })
    expect(wrapper.findAll('h4').at(1).text()).toContain(getters.dbCount());
  })

  it('mutations', () => {
    const wrapper = mount(Count, { localVue, store })
    wrapper.findAll('button').at(0).trigger('click');
    // expect(mutations.changeCount.mock.calls.length).toBe(1);
    expect(mutations.changeCount).toHaveBeenCalled();
  })

  it('actions', () => {
    const wrapper = mount(Count, { localVue, store })
    wrapper.findAll('button').at(1).trigger('click');
    expect(actions.changeCount).toHaveBeenCalled();
  })
})