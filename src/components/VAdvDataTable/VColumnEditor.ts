import Vue, { PropType, VNode } from 'vue'
import {
  VBtnA,
  VIconA,
  VMenuA,
  VListA,
  VListItemA,
  VListItemContentA,
  VListItemTitleA,
  VListItemSubtitleA,
  VListItemActionA,
  VCheckboxA,
  VDividerA,
  VCardA,
  VCardActionsA
} from '../../shims-vuetify'
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
      return this.$createElement(VBtnA, {
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
      return this.$createElement(VIconA, {
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
      return this.$createElement(VCheckboxA, {
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
      return this.$createElement(VListItemA, {
        props: {
          dense: this.dense
        }
      }, [
        this.$createElement(VListItemActionA, {}, [
          this.genVisibleCheckbox(header)
        ]),
        this.$createElement(VListItemActionA, {}, [
          this.$createElement(VBtnA, {
            props: {
              icon: true
            },
            on: {
              click: () => this.downHeader(header)
            }
          }, [
            this.$createElement(VIconA, this.downIcon)
          ])
        ]),
        this.$createElement(VListItemActionA, {}, [
          this.$createElement(VBtnA, {
            props: {
              icon: true
            },
            on: {
              click: () => this.upHeader(header)
            }
          }, [
            this.$createElement(VIconA, this.upIcon)
          ])
        ]),
        this.$createElement(VListItemContentA, {
          style: {
            'padding-left': '18px',
            'padding-right': '18px'
          }
        }, [
          this.$createElement(VListItemTitleA, {
            domProps: {
              innerHTML: header.value
            }
          }),
          this.$createElement(VListItemSubtitleA, {
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
      return this.$createElement(VCardA, {
        props: {
          dark: this.dark,
          dense: this.dense,
          closeOnContentClick: false
        }
      },
      [
        this.$createElement(VListA, {}, items),
        this.$createElement(VDividerA, {}),
        this.$createElement(VCardActionsA, {
          style: {
            'justify-content': 'flex-end'
          }
        }, [
          this.$createElement(VBtnA, {
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
          this.$createElement(VBtnA, {
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
    return this.$createElement(VMenuA, {
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
