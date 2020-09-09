import { VNode } from 'vue'
import { mixins, Themeable, Colorable } from '../../vuetify-import'
import { VDataTableA, VListItemA, VListItemContentA, VListItemTitleA } from '../../shims-vuetify'
import tableScopedSlots from '../../utils/TableScopedSlots'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VDataTableProps = ((VDataTableA as any).options as any).props

export default mixins(
  Themeable, Colorable
  /* @vue/component */
).extend({
  name: 'v-data-grid-select-list',
  props: {
    selectedItems: {
      type: Array,
      default: () => ([])
    },
    noDataText: String,
    dense: Boolean,
    multiple: Boolean,
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
    headers: {
      type: Array,
      default: () => []
    },
    ...VDataTableProps
  },
  computed: {
    staticNoDataTile (): VNode {
      const tile = {
        on: {
          mousedown: (e: MouseEvent) => e.preventDefault() // Prevent onBlur from being called
        }
      }
      return (this as any).$createElement(VListItemA, tile, [
        (this as any).genTileNoDataContent()
      ])
    }
  },
  methods: {
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
    if (!this.items || !Array.isArray(this.items) || this.items.length < 1) {
      children.push(this.$slots['no-data'] || this.staticNoDataTile)
    }
    this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])
    const childrenAppend = []
    this.$slots['append-item'] && childrenAppend.push(this.$slots['append-item'])

    return this.$createElement('div', {
      staticClass: 'v-select-list v-card',
      class: this.themeClasses
    }, [
      children,
      // this.genHeader(),
      this.$createElement(VDataTableA, {
        props: {
          selected: true,
          dense: this.dense,
          items: this.items,
          itemKey: this.itemKey,
          returnObject: false,
          itemText: this.itemText,
          headers: this.headers,
          headersLength: this.headersLength,
          headerText: this.headerText,
          headerKey: this.headerKey,
          hideHeaders: this.hideHeaders,
          rowsPerPageText: this.rowsPerPageText,
          customFilter: this.customFilter,
          showSelect: true,
          singleSelect: !this.multiple
        },
        scopedSlots: tableScopedSlots(this.$scopedSlots),
        on: {
          input: (e: any[]) => {
            this.$emit('input', e)
          }
        }
      }), childrenAppend
    ])
  }
})
