// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Utilities
import {
  mount,
  createLocalVue
} from '@vue/test-utils'

import VTreeSelect from '@/components/VTreeSelect/VTreeSelect'

// console.log(vuetify)

const localVue = createLocalVue()

const singleRootTwoChildren = [
  { id: 0, name: 'Root', children: [{ id: 1, name: 'Child' }, { id: 2, name: 'Child 2' }] }
]

const threeLevels = [
  { id: 0, name: 'Root', children: [{ id: 1, name: 'Child', children: [{ id: 2, name: 'Grandchild' }] }, { id: 3, name: 'Child' }] }
]

describe('VTreeSelect.js', () => {
  // let vuetify

  // beforeEach(() => {
  //   vuetify = new Vuetify()
  // })
  // console.log(vuetify)

  let vuetify = new Vuetify({
      $vuetify: {
        lang: {
          t: (val) => val
        }
      }
  })

  console.log(vuetify)

  it('renders all items', () => {
    const wrapper = mount(VTreeSelect, {
      vuetify,
      propsData: {
        items: singleRootTwoChildren
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
