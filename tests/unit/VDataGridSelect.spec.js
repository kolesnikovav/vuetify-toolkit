// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// Utilities
import {
  mount,
  createLocalVue
} from '@vue/test-utils'
// component to be tested
import { VDataGridSelect } from '@/components'

Vue.use(Vuetify)

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

describe('VDataGridSelect.js', () => {
  it('renders', () => {
    const wrapper = mount(VDataGridSelect, {
      vuetify,
      propsData: {
        items: singleRootTwoChildren
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
