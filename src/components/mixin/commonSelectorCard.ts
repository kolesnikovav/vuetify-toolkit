import Vue, { VNode } from 'vue'
import { Themeable, Colorable } from '../../vuetify-import'
import { VListItemA, VListItemContentA, VListItemTitleA } from '../../shims-vuetify'
import ComandToolbar from './comandToolbar'

export default Vue.extend({
  mixins: [
    Themeable, Colorable, ComandToolbar
  ],
  props: {
    selectedItems: {
      type: Array,
      default: () => ([])
    },
    currentItem: {
      type: [Number, String, Object],
      default: undefined
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
    },
    hasData (): boolean {
      return !(!this.items || !Array.isArray(this.items) || this.items.length < 1)
    }
  },
  methods: {
    genSelectList (): VNode {
      return (this as any).$createElement('div')
    },
    genTileNoDataContent (): VNode {
      const innerHTML = (this as any).noDataText
      return (this as any).$createElement(VListItemContentA,
        [(this as any).$createElement(VListItemTitleA, {
          domProps: { innerHTML }
        })]
      )
    },
    closeMenu () {
      this.$emit('close-menu')
    },
    OK () {
      this.$emit('select-ok', this.selectedItems)
    }
  },
  render (): VNode {
    const children = []
    if ((this as any).useToolbar && (this as any).computedToolbarCommands.length > 0 && ['top-left', 'top-right'].includes(this.$props.toolbarPosition) && this.hasData) {
      children.push((this as any).genToolbar())
    }
    if (!this.hasData) {
      children.push(this.$slots['no-data'] || this.staticNoDataTile)
    }
    this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])
    const childrenAppend = []
    this.$slots['append-item'] && childrenAppend.push(this.$slots['append-item'])
    if ((this as any).useToolbar && (this as any).computedToolbarCommands.length > 0 && ['bottom-left', 'bottom-right'].includes(this.$props.toolbarPosition) && this.hasData) {
      childrenAppend.push((this as any).genToolbar())
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
