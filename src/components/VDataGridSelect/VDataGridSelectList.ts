import { VNode } from 'vue'
import { VDataTableA } from '../../shims-vuetify'
import tableScopedSlots from '../../utils/TableScopedSlots'
import commonSelectorCard from '../mixin/commonSelectorCard'
import { mergeProps } from '../../utils/mergeProps'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VDataTableProps = ((VDataTableA as any).options as any).props

export default commonSelectorCard.extend({
  name: 'v-data-grid-select-list',
  props: {
    ...VDataTableProps
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
    }
  },
  methods: {
    genSelectList (): VNode {
      const inputHandler = {
        input: (e: any[]) => {
          this.$emit('input', e)
        }
      }
      const props = {}
      mergeProps(props, this.$props, (VDataTableA as any).options.props);
      (props as any).selected = true;
      (props as any).showSelect = true;
      (props as any).singleSelect = !this.multiple;
      (props as any).value = this.selectedItems
      return (this as any).$createElement(VDataTableA, {
        ref: 'selectList',
        props,
        scopedSlots: tableScopedSlots(this.$scopedSlots),
        on: inputHandler
      })
    }
  }
})
