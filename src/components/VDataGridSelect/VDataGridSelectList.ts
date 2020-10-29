import { VNode } from 'vue'
import { mixins, Themeable, Colorable } from '../../vuetify-import'
import { VDataTableA, VListItemA, VListItemContentA, VListItemTitleA } from '../../shims-vuetify'
import tableScopedSlots from '../../utils/TableScopedSlots'
import commonSelectorCard from '../mixin/commonSelectorCard'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VDataTableProps = ((VDataTableA as any).options as any).props

export default commonSelectorCard.extend({
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
    },
    genSelectList (): VNode {
      const inputHandler = { input: (e: any[]) => { this.$emit('input', e) } }
      return (this as any).$createElement(VDataTableA, {
        props: {
          selected: true,
          dense: this.dense,
          items: this.items,
          itemKey: this.$props.itemKey,
          returnObject: false,
          itemText: this.$props.itemText,
          headers: this.$props.headers,
          headersLength: this.$props.headersLength,
          headerText: this.$props.headerText,
          headerKey: this.$props.headerKey,
          hideHeaders: this.$props.hideHeaders,
          rowsPerPageText: this.$props.rowsPerPageText,
          customFilter: this.$props.customFilter,
          showSelect: true,
          singleSelect: !this.multiple,
          value: this.value
        },
        scopedSlots: tableScopedSlots(this.$scopedSlots),
        on: inputHandler
      })
    }
  }
})
