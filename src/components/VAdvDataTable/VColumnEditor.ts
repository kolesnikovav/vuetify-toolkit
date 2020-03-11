import Vue, { PropType, VNode } from 'vue'
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
import { TableHeader, TableHeaderEdition } from '../VAdvDataTable/utils/AdvTableUtils'

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
    editedHeaders: Array as PropType<TableHeader[]>,
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
    sortedHeaders (): TableHeaderEdition[] {
      // const hd: TableHeader[] = []
      // this.orderedHeaders.forEach(v => {
      //   const currentHeder = this.editedHeaders.find(name => name.value === v)
      //   if (currentHeder) hd.push(currentHeder)
      // })
      // console.log(hd)
      // return hd
      return this.orderedHeaders
    }
  },
  watch: {
    isMenuActive: {
      handler (val: boolean) {
        if (val) {
          this.orderedHeaders = []
          return this.editedHeaders.map(v => {
            this.orderedHeaders.push({
              value: v.value,
              text: v.text,
              visible: v.visible || false
            })
          })
        }
      }
    }
  },
  data: () => ({
    isMenuActive: false,
    invisibleHeaders: new Set<string>(),
    orderedHeaders: [] as TableHeaderEdition[]
  }),
  methods: {
    deactivateMenu (e: Event, payload: string) {
      if (payload === 'CLOSE') {
        this.isMenuActive = true
      } else {
        e.stopPropagation()
        this.isMenuActive = false
        if (payload === 'OK') {
          this.$emit('headers-changed', { invisible: this.invisibleHeaders, order: this.orderedHeaders })
        }
        this.invisibleHeaders = new Set<string>()
      }
    },
    genActivator (listeners: EventListener): VNode {
      return this.$createElement(VBtn, {
        props: {
          icon: true
        },
        slot: 'activator',
        on: {
          click: (e: Event) => {
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
    genIcon (): VNode {
      return this.$createElement(VIcon, {
        props: {
          color: this.headerIconColor
        }
      }, [this.headerIcon])
    },
    changeVisibility (header: TableHeaderEdition, val: boolean) {
      if (!val && !this.invisibleHeaders.has(header.value)) this.invisibleHeaders.add(header.value)
      else if (val && this.invisibleHeaders.has(header.value)) this.invisibleHeaders.delete(header.value)
    },
    genVisibleCheckbox (header: TableHeaderEdition): VNode {
      return this.$createElement(VCheckbox, {
        props: {
          value: header.visible,
          inputValue: header.visible,
          trueValue: true,
          falseValue: false
        },
        on: {
          change: (newVal: boolean) => this.changeVisibility(header, newVal)
        }
      })
    },
    genMenuItem (header: TableHeaderEdition): VNode {
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
              click: () => this.downHeader(header)
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
              click: () => this.upHeader(header)
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
              innerHTML: header.text
            }
          })
        ])
      ])
    },
    upHeader (header: TableHeaderEdition) {
      this.$nextTick(() => {
        const idx = this.orderedHeaders.findIndex(v => v.value === header.value)
        const idxToChange = (idx === 0) ? this.orderedHeaders.length - 1 : idx - 1
        const vChange = this.orderedHeaders[idxToChange]
        this.orderedHeaders[idxToChange] = header
        this.orderedHeaders[idx] = vChange
        const o = this.orderedHeaders.slice()
        this.orderedHeaders = o
      })
    },
    downHeader (header: TableHeaderEdition) {
      this.$nextTick(() => {
        const idx = this.orderedHeaders.findIndex(v => v.value === header.value)
        const idxToChange = (idx === this.orderedHeaders.length - 1) ? 0 : idx + 1
        const vChange = this.orderedHeaders[idxToChange]
        this.orderedHeaders[idxToChange] = header
        this.orderedHeaders[idx] = vChange
        const o = this.orderedHeaders.slice()
        this.orderedHeaders = o
      })
    },
    genMenuContent (): VNode {
      const items = this.orderedHeaders.map(header => this.genMenuItem(header))
      return this.$createElement(VCard, {
        props: {
          dark: this.dark,
          dense: this.dense,
          closeOnContentClick: false
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
              click: (e: Event) => this.deactivateMenu(e, 'CANCEL')
            }
          }),
          this.$createElement(VBtn, {
            props: {
              text: true
            },
            on: {
              click: (e: Event) => this.deactivateMenu(e, 'OK')
            },
            domProps: {
              innerHTML: 'OK'
            }
          })
        ])

      ])
    }
  },
  render (): VNode {
    const self = this
    return this.$createElement(VMenu, {
      props: {
        closeOnContentClick: false,
        value: this.isMenuActive
      },
      on: {
        input: (e: Event) => this.deactivateMenu(e, 'CLOSE')
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
