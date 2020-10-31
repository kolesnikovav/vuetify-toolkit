import Vue, { VNode, PropType } from 'vue'
import { Themeable, Colorable } from '../../vuetify-import'
import { VBtnA, VListItemA, VListItemContentA, VListItemTitleA, VToolbarA, VIconA, VSpacerA, VTooltipA } from '../../shims-vuetify'
import { Command } from '../../utils/ToolbarCommand'
import { VToolBtn } from '../VToolBtn'
import { PropValidator } from 'vue/types/options'

export default Vue.extend({
  mixins: [
    Themeable, Colorable
  ],
  props: {
    selectedItems: {
      type: Array,
      default: () => ([])
    },
    noDataText: String,
    dense: Boolean,
    multiple: Boolean,
    items: {
      type: Array,
      default: () => ([])
    },
    openAll: Boolean,
    returnObject: {
      type: Boolean,
      default: false // TODO: Should be true in next major
    },
    value: {
      type: Array,
      default: () => ([])
    },
    search: String,
    filter: {
      type: Function,
      default: undefined
    },
    useDefaultToolbarCommand: {
      type: Boolean,
      default: false
    },
    // custom commands
    toolbarCommands: {
      type: Array,
      default: () => []
    } as PropValidator<Command[]>,
    toolbarPosition: {
      type: String as PropType<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>,
      default: 'top-left',
      validator: (v: string) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(v)
    },
    toolbarFlat: {
      type: Boolean,
      default: true
    },
    toolbarButtonOutlined: {
      type: Boolean,
      default: true
    },
    toolbarButtonRounded: {
      type: Boolean,
      default: false
    },
    toolbarButtonTile: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    staticNoDataTile (): VNode {
      const tile = {
        on: {
          mousedown: (e: any) => e.preventDefault() // Prevent onBlur from being called
        }
      }
      return (this as any).$createElement(VListItemA, tile, [
        (this as any).genTileNoDataContent()
      ])
    }
  },
  methods: {
    genSelectList (): VNode {
      return (this as any).$createElement('div')
    },
    genButtonWithTooltip (v: Command): VNode {
      return this.$createElement(VToolBtn, {
        props: {
          hint: v.text,
          btnIcon: v.icon,
          icon: !!v.icon,
          color: v.iconColor
        }
      })
      // const icon = v.icon ? this.$createElement(VIconA, {
      //   props: {
      //     color: v.iconColor
      //   }
      // }, v.icon) : undefined
      // const button = this.$createElement(VBtnA, {
      //   props: {
      //     icon: !!v.icon,
      //     outlined: this.$props.toolbarButtonOutlined,
      //     rounded: this.$props.toolbarButtonRounded,
      //     tile: this.$props.toolbarButtonTile
      //   },
      //   on: {
      //     click: (e: any) => {
      //       if (v.action instanceof String) {
      //         this.$emit(e, v.action)
      //       }
      //     }
      //   }
      // }, [icon])
      // if (v.text) {
      //   return this.$createElement(VTooltipA, {},
      //     [
      //       this.$createElement('template', {
      //         slot: 'activator'
      //       }, [button]),
      //       this.$createElement('span', {
      //         domProps: {
      //           innerHTML: v.text
      //         }
      //       })
      //     ])
      // }
      // return button
    },
    genToolbar (): VNode {
      const buttons: VNode[] = []
      if (['top-right', 'bottom-right'].includes(this.$props.toolbarPosition)) {
        buttons.push(this.$createElement(VSpacerA))
      }
      this.$props.toolbarCommands.map((v: Command) => buttons.push(this.genButtonWithTooltip(v)))
      return (this as any).$createElement(VToolbarA, {
        style: {
          border: '1px solid'
        },
        props: {
          flat: this.$props.toolbarFlat,
          dense: this.$props.dense
        }
      }, buttons)
    },
    genTileNoDataContent (): VNode {
      const innerHTML = (this as any).noDataText
      return (this as any).$createElement(VListItemContentA,
        [(this as any).$createElement(VListItemTitleA, {
          domProps: { innerHTML }
        })]
      )
    }
  },
  render (): VNode {
    const children = []
    if (this.$props.toolbarCommands.length > 0 && ['top-left', 'top-right'].includes(this.$props.toolbarPosition)) {
      children.push(this.genToolbar())
    }
    if (!this.items || !Array.isArray(this.items) || this.items.length < 1) {
      children.push(this.$slots['no-data'] || this.staticNoDataTile)
    }
    this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])
    const childrenAppend = []
    this.$slots['append-item'] && childrenAppend.push(this.$slots['append-item'])
    if (this.$props.toolbarCommands.length > 0 && ['bottom-left', 'bottom-right'].includes(this.$props.toolbarPosition)) {
      childrenAppend.push(this.genToolbar())
    }
    return this.$createElement('div', {
      staticClass: 'v-select-list v-card',
      class: (this as any).themeClasses
    }, [
      children,
      this.genSelectList(),
      childrenAppend
    ])
  }
})
