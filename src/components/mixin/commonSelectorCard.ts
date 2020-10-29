import Vue, { VNode, PropType } from 'vue'
import { Themeable, Colorable } from '../../vuetify-import'
import { VBtnA, VListItemA, VListItemContentA, VListItemTitleA, VToolbarA } from '../../shims-vuetify'

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
    },
    toolbarPosition: {
      type: String as PropType<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>,
      default: 'top-left',
      validator: (v: string) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(v)
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
    genToolbar (): VNode {
      return (this as any).$createElement(VToolbarA, {}, [
        this.$createElement(VBtnA, {
          props: {
            text: true
          }
        })
      ])
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
    children.push(this.genToolbar())
    if (!this.items || !Array.isArray(this.items) || this.items.length < 1) {
      children.push(this.$slots['no-data'] || this.staticNoDataTile)
    }
    this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])
    const childrenAppend = []
    this.$slots['append-item'] && childrenAppend.push(this.$slots['append-item'])
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
