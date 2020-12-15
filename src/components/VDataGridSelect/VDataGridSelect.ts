import { VNode } from 'vue'
import { consoleError } from '../../vuetify-import'
import { VDataTableA } from '../../shims-vuetify'
import commonSelect from '../mixin/commonSelect'
import VDataGridSelectList from './VDataGridSelectList'
import { VNodeChildren } from 'vue/types/vnode'
import { mergeProps } from '../../utils/mergeProps'
import { defaultDataGridSelectCommands } from '../../utils/ToolbarCommand'

export default commonSelect.extend({
  name: 'v-data-grid-select',
  props: {
    toolbarCommands: {
      type: Array,
      default: function () {
        return defaultDataGridSelectCommands(this as any)
      }
    },
    ...(VDataTableA as any).options.props
  },
  watch: {
    filteredItems: {
      immediate: true,
      handler (val) {
        if (val) {
          if (Array.isArray(val) && this.$props.autocomplete && this.$props.autoSelectFirst && val.length === 1) {
            if (!this.$props.multiple) {
              this.selectedItems = val
              const inputRef = this.$refs.input as HTMLElement
              if (inputRef) {
                inputRef.blur()
              }
            } else if (this.selectedItems.indexOf(val[0]) === -1) {
              this.selectedItems.push(val[0])
            }
            this.$data.isMenuActive = false
            this.internalSearch = ''
          }
        }
      }
    }
  },
  computed: {
    listData (): Object {
      const data = (commonSelect as any).options.computed.listData.call(this)
      mergeProps(data.props, this.$props, (VDataTableA as any).options.props)
      data.props.selectable = true
      data.props.selectedItems = this.selectedItems
      data.props.search = this.internalSearch
      data.ref = 'selectList'
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
    },
    InvertSelection () {
      if (!this.$props.multiple) return
      const nSelected = [] as any[]
      this.$props.items.map((v: any) => {
        if (this.$data.selectedItems.indexOf(v) === -1) {
          nSelected.push(v)
        }
      })
      this.$data.selectedItems = nSelected
    }
  }
})
