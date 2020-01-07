import Vue from 'vue'
import { VBtn, VIcon, VMenu, VList, VListItem, VListItemTitle, VCheckbox, VRow, VCol, VDivider } from '../../vuetify-import'
//

export default Vue.extend({
  name: 'v-column-editor',
  props: {
    headerIcon: {
      type: String,
      default: undefined
    },
    headerIconColor: {
      type: String,
      default: undefined
    },
    headers: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    isMenuActive: false
  }),
  methods: {
    deactivateMenu () {
      this.isMenuActive = false
    },
    genActivator (listeners) {
      return this.$createElement(VBtn, {
        props: {
          icon: true
        },
        slot: 'activator',
        on: {
          click: (e) => {
            e.stopPropagation()
            this.isMenuActive = !this.isMenuActive
            this.$nextTick()
          },
          listeners
        }
      }, [
        this.genIcon()
      ])
    },
    genIcon () {
      return this.$createElement(VIcon, {
        props: {
          color: this.headerIconColor
        }
      }, [this.headerIcon])
    },
    genMenuItem (header) {
      return this.$createElement(VListItem, {}, [
        this.$createElement(VRow, {
          props: {
            align: 'stretch',
            justify: 'space-around'
          }
        }, [
          this.$createElement(VCol, {}, [
            this.$createElement(VListItemTitle, {
              domProps: {
                innerHTML: header.value
              }
            })
          ]),
          this.$createElement(VCol, {}, [
            this.$createElement(VCheckbox, {})
          ]),
          this.$createElement(VCol, {}, [
            this.$createElement(VDivider, {})
          ])
        ])

      ])
    },
    genMenuContent () {
      const items = this.headers.map(header => this.genMenuItem(header))
      return this.$createElement(VList, {}, items)
    }

  },
  render () {
    const self = this
    return this.$createElement(VMenu, {
      props: {
        closeOnContentClick: false,
        value: this.isMenuActive
      },
      on: {
        input: () => this.deactivateMenu()
      },
      scopedSlots: {
        'activator' (on) {
          return self.genActivator(on)
        }
      }
    }, [
      this.genMenuContent()
    ])
  }
})
