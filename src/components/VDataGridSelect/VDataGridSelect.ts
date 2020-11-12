import { VNode } from 'vue'
import { consoleError } from '../../vuetify-import'
import { VDataTableA } from '../../shims-vuetify'
import commonSelect from '../mixin/commonSelect'
import VDataGridSelectList from './VDataGridSelectList'
import { VNodeChildren } from 'vue/types/vnode'

export default commonSelect.extend({
  name: 'v-data-grid-select',
  props: {
    ...(VDataTableA as any).options.props
  },
  computed: {
    listData (): Object {
      const data = (commonSelect as any).options.computed.listData.call(this)
      Object.assign(data.props, {
        activatable: this.$props.activatable,
        activeClass: this.$props.activeClass,
        dark: this.$props.dark,
        selectable: true,
        selectedColor: this.$props.selectedColor,
        indeterminateIcon: this.$props.indeterminateIcon,
        onIcon: this.$props.onIcon,
        offIcon: this.$props.offIcon,
        expandIcon: this.$props.expandIcon,
        loadingIcon: this.$props.loadingIcon,
        itemKey: this.$props.itemKey,
        itemText: this.$props.itemText,
        multiple: this.$props.multiple,
        transition: this.$props.transition,
        selectedItems: this.selectedItems,
        headers: this.$props.headers,
        headersLength: this.$props.headersLength,
        headerText: this.$props.headerText,
        headerKey: this.$props.headerKey,
        hideHeaders: this.$props.hideHeaders,
        rowsPerPageText: this.$props.rowsPerPageText,
        customFilter: this.$props.customFilter
      })
      Object.assign(data.on, {
        input: (e: any[]) => {
          (this as any).selectItems(e)
        }
      })
      Object.assign(data.scopedSlots, this.$scopedSlots)
      return data
    },
    staticList (): VNode {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        consoleError('assert: staticList should not be called if slots are used')
      }
      const slots: VNodeChildren = []
      slots.push((this.$scopedSlots.items as any))
      return this.$createElement(VDataGridSelectList, this.listData, slots)
    }
  },
  methods: {
    genListWithSlot (): VNode {
      return this.$createElement(VDataGridSelectList, {
        ...(this as any).listData
      }, this.genSlots())
    }
  }
})
