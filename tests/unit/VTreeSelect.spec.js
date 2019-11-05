// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// Utilities
import {
  mount,
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
// component to be tested
import { VTreeSelect } from '@/components'

Vue.use(Vuetify, {VTreeSelect})

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi'
  }
})

const localVue = createLocalVue()

const singleRootTwoChildren = [
  { id: 0, name: 'Root', children: [{ id: 1, name: 'Child' }, { id: 2, name: 'Child 2' }] }
]

const threeLevels = [
  { id: 0, name: 'Root', children: [{ id: 1, name: 'Child', children: [{ id: 2, name: 'Grandchild' }] }, { id: 3, name: 'Child' }] }
]

describe('VTreeSelect.js', () => {
  it('renders', () => {
    const wrapper = mount(VTreeSelect, {
      vuetify,
      propsData: {
        items: singleRootTwoChildren
      }
    })
    let q = document.getElementsByTagName('input')
    console.log(q[0])
    expect(wrapper.html()).toMatchSnapshot()
  })
})
