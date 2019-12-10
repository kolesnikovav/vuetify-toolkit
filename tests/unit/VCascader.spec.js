// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// Utilities
import {
  mount
} from '@vue/test-utils'
// component to be tested
import { VCascader } from '@/components'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi'
  }
})

const singleRootTwoChildren = [
  { id: 0, name: 'Root', children: [{ id: 1, name: 'Child' }, { id: 2, name: 'Child 2' }] }
]

describe('VCascader.js', () => {
  it('renders', () => {
    const wrapper = mount(VCascader, {
      vuetify,
      propsData: {
        items: singleRootTwoChildren
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
