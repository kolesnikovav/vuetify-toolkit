import { VNode } from 'vue'
import { VDataTableA, VListItemContentA, VListItemTitleA } from '../../shims-vuetify'
import tableScopedSlots from '../../utils/TableScopedSlots'
import commonSelectorCard from '../mixin/commonSelectorCard'
import { Command, defaultDataGridSelectCommands } from '../../utils/ToolbarCommand'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VDataTableProps = ((VDataTableA as any).options as any).props

export default commonSelectorCard.extend({
  name: 'v-data-grid-select-list',
  props: {
    ...VDataTableProps
  },
  computed: {
    computedToolbarCommands (): Command[] {
      return this.$props.toolbarCommands.length > 0 ? this.$props.toolbarCommands : defaultDataGridSelectCommands(this as any)
    }
  },
  methods: {
    genSelectList (): VNode {
      const inputHandler = {
        input: (e: any[]) => { this.$emit('input', e) }
      }
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
    },
    OK () {
      this.$emit('close-menu')
    }
  }
})
