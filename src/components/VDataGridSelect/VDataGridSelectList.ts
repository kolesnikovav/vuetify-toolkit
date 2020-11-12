import { VNode } from 'vue'
import { VDataTableA } from '../../shims-vuetify'
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
  watch: {
    selectedItems: {
      immediate: true,
      handler (val, oldVal) {
        if (this.$refs.selectList) {
          val.map((v: any) => {
            (this.$refs.selectList as any).select(v, true, false)
          })
        }
      }
    },
    currentItem: {
      immediate: true,
      handler (val) {
        if (val && this.$refs.selectList) {
        }
      }
    }
  },
  methods: {
    genSelectList (): VNode {
      const inputHandler = {
        input: (e: any[]) => {
          this.$emit('input', e)
        }
      }
      return (this as any).$createElement(VDataTableA, {
        ref: 'selectList',
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
          value: this.selectedItems
        },
        scopedSlots: tableScopedSlots(this.$scopedSlots),
        on: inputHandler
      })
    },
    OK () {
      this.$emit('close-menu')
    },
    InvertSelection () {
      this.items.map((v: any) => {
        const isSelected = (this.$refs.selectList as any).isSelected(v);
        (this.$refs.selectList as any).select(v, !isSelected, false)
      })
    }
  }
})
