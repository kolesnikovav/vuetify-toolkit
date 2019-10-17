import Vue from 'vue'
import {
  mount,
  shallowMount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'

import VTreeSelect from '@/components/VTreeSelect/VTreeSelect'

Vue.prototype.$vuetify = {
  icons: {
    values: {
      subgroup: 'arrow_drop_down',
      checkboxOn: 'check_box',
      checkboxOff: 'check_box_outline_blank',
    },
  },
}

const singleRootTwoChildren = [
  { id: 0, name: 'Root', children: [{ id: 1, name: 'Child' }, { id: 2, name: 'Child 2' }] },
]

const threeLevels = [
  { id: 0, name: 'Root', children: [{ id: 1, name: 'Child', children: [{ id: 2, name: 'Grandchild' }] }, { id: 3, name: 'Child' }] },
]

describe('VTreeSelect.js', () => {
  it('renders all items', () => {
    const wrapper = shallowMount(VTreeSelect, {
      propsData: { 
        items: singleRootTwoChildren 
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})