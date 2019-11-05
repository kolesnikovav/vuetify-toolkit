// Components
import VTreeSelect from '../../src/components/VTreeSelect'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

const threeLevels = [
    { id: 0, name: 'Root', children: [
        { id: 1, name: 'Child', children: [
            { id: 2, name: 'Grandchild' }]
        },
        { id: 3, name: 'Child' }
    ]}
  ]

describe('VTreeSelect-new.ts', () => {
    type Instance = InstanceType<typeof VTreeSelect>
    let mountFunction: (options?: object) => Wrapper<Instance>
    let el
  
    beforeEach(() => {
      el = document.createElement('div')
      el.setAttribute('data-app', 'true')
      document.body.appendChild(el)
      mountFunction = (options = {}) => {
        return mount(VTreeSelect, {
          // https://github.com/vuejs/vue-test-utils/issues/1130
          sync: false,
          mocks: {
            $vuetify: {
              lang: {
                t: (val: string) => val,
              },
              theme: {
                dark: false,
              },
            },
          },
          ...options,
        })
      }
    })
  
    it('should not close menu when multiple', async () => {
      const wrapper = mountFunction({
        attachToDocument: true,
        propsData: {
          value: null,
          items: threeLevels,
          multiple: true,
        },
      })
      const menu = wrapper.find('.v-input__slot')
       menu.trigger('click')
  
       await wrapper.vm.$nextTick()

      expect(wrapper.vm.isFocused).toBe(true)
      expect(wrapper.vm.isMenuActive).toBe(true) 
      
      const item = wrapper.find('.v-treeview-node__checkbox')
      item.trigger('click')
  
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.isFocused).toBe(true)
      expect(wrapper.vm.isMenuActive).toBe(true)       

      const fn = jest.fn()
      wrapper.vm.$on('blur', fn) 
      await wrapper.vm.$nextTick()

      wrapper.vm.$on('update:return-value', fn) 
      await wrapper.vm.$nextTick()
 
      expect(wrapper.vm.isMenuActive).toBe(false)      
    })
})
