import Vue from 'vue'
import {
  VBtn,
  VIcon,
  VMenu,
  VList,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VListItemSubtitle,
  VListItemAction,
  VCheckbox,
  VDivider,
  VCard,
  VCardActions
} from '../../vuetify-import'

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
    upIcon: {
      type: String,
      default: 'expand_more'
    },
    downIcon: {
      type: String,
      default: 'expand_less'
    },
    headers: {
      type: Array,
      default: () => []
    },
    dark: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
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
      return this.$createElement(VListItem, {
        props: {
          dense: this.dense
        }
      }, [
        this.$createElement(VListItemAction, {}, [
          this.$createElement(VCheckbox)
        ]),
        this.$createElement(VListItemAction, {}, [
          this.$createElement(VBtn, {
            props: {
              icon: true
            },
            on: {
              click: (e) => this.downHeader(header)
            }
          }, [
            this.$createElement(VIcon, this.downIcon)
          ])
        ]),
        this.$createElement(VListItemAction, {}, [
          this.$createElement(VBtn, {
            props: {
              icon: true
            },
            on: {
              click: (e) => this.upHeader(header)
            }
          }, [
            this.$createElement(VIcon, this.upIcon)
          ])
        ]),
        this.$createElement(VListItemContent, {
          style: {
            'padding-left': '18px',
            'padding-right': '18px'
          }
        }, [
          this.$createElement(VListItemTitle, {
            domProps: {
              innerHTML: header.value
            }
          }),
          this.$createElement(VListItemSubtitle, {
            domProps: {
              innerHTML: header.name
            }
          })
        ])
      ])
    },
    upHeader (header) {
      alert(header)
    },
    downHeader (header) {

    },
    genMenuContent () {
      const items = this.headers.map(header => this.genMenuItem(header))
      return this.$createElement(VCard, {
        props: {
          dark: this.dark,
          dense: this.dense
        }
      },
      [
        this.$createElement(VList, {}, items),
        this.$createElement(VDivider, {}),
        this.$createElement(VCardActions, {
          style: {
            'justify-content': 'flex-end'
          }
        }, [
          this.$createElement(VBtn, {
            props: {
              text: true
            },
            domProps: {
              innerHTML: 'Cancel'
            },
            on: {
              click: () => this.deactivateMenu()
            }
          }),
          this.$createElement(VBtn, {
            props: {
              text: true
            },
            on: {
              click: () => this.deactivateMenu()
            },
            domProps: {
              innerHTML: 'OK'
            }
          })
        ])

      ])
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
      slot: 'header.data-table-settings',
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
