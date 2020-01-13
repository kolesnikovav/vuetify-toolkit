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
  computed: {
    sortedHeaders () {
      if (!this.dataHeaders) {
        return this.headers.slice().sort((a, b) => a.order - b.order)
      }
      return this.dataHeaders
    },
    resultHeaders () {
      return this.sortedHeaders.filter(v => v.visible)
    }
  },
  data: () => ({
    isMenuActive: false,
    dataHeaders: undefined
  }),
  methods: {
    deactivateMenu (e, payload) {
      if (payload === 'CLOSE') {
        this.isMenuActive = true
      } else {
        e.stopPropagation()
        this.isMenuActive = false
        if (payload === 'OK') {
          this.$emit('headers-changed', this.resultHeaders)
        }
      }
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
    genVisibleCheckbox (header) {
      return this.$createElement(VCheckbox, {
        props: {
          value: header.visible,
          inputValue: header.visible,
          trueValue: true,
          falseValue: false
        },
        on: {
          click: (e) => {
            e.stopPropagation()
            e.preventDefault()
            header.visible = !header.visible
          }
        }
      })
    },
    genMenuItem (header) {
      return this.$createElement(VListItem, {
        props: {
          dense: this.dense
        }
      }, [
        this.$createElement(VListItemAction, {}, [
          this.genVisibleCheckbox(header)
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
    setDataHeaders () {
      if (!this.dataHeaders) {
        this.dataHeaders = this.sortedHeaders
      }
    },
    upHeader (header) {
      this.setDataHeaders()
      const i = this.dataHeaders.indexOf(header)
      if (i === 0) {
        const a = this.dataHeaders.slice(1)
        a.push(header)
        a.map(v => { v.order = a.indexOf(v) })
        this.dataHeaders = a
      } else {
        const a = this.dataHeaders.slice(0, i - 1)
        a.push(header)
        a.push(this.dataHeaders[i - 1])
        a.push(...this.dataHeaders.slice(i + 1))
        a.map(v => { v.order = a.indexOf(v) })
        this.dataHeaders = a
      }
      this.$nextTick()
    },
    downHeader (header) {
      this.setDataHeaders()
      const i = this.dataHeaders.indexOf(header)
      if (i === this.dataHeaders.length) {
        const a = this.dataHeaders.slice(0, i - 1)
        a.push(header)
        a.map(v => { v.order = a.indexOf(v) })
        this.dataHeaders = a
      } else {
        const a = this.dataHeaders.slice(0, i - 1)
        a.push(header)
        a.push(this.dataHeaders[i - 1])
        a.push(...this.dataHeaders.slice(i + 1))
        a.map(v => { v.order = a.indexOf(v) })
        this.dataHeaders = a
      }
      this.$nextTick()
    },
    genMenuContent () {
      const items = this.sortedHeaders.map(header => this.genMenuItem(header))
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
              click: (e) => this.deactivateMenu(e, 'CANCEL')
            }
          }),
          this.$createElement(VBtn, {
            props: {
              text: true
            },
            on: {
              click: (e) => this.deactivateMenu(e, 'OK')
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
        input: (e) => this.deactivateMenu(e, 'CLOSE')
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
