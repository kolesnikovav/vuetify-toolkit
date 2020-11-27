import { VNode } from 'vue'
import {
  VListA, VListItemA, VDividerA, VIconA
} from '../../shims-vuetify'
import { getPropertyFromItem } from '../../vuetify-import'
import commonSelectorCard from '../mixin/commonSelectorCard'

export default commonSelectorCard.extend({
  name: 'v-cascader-select-list',
  props: {
    parents: {
      type: Array,
      default: () => ([])
    },
    itemText: {
      type: [String, Array, Function],
      default: 'text'
    }
  },
  methods: {
    genIcon (item: object): VNode|undefined {
      if (!(item as any).hasChildren) return undefined
      return this.$createElement(VIconA, 'mdi-chevron-right')
    },
    genItem (item: object): VNode {
      return (this as any).$createElement(VListItemA, {
        on: {
          click: () => {
            this.$emit('select', item)
            this.$emit('update-dimensions')
          }
        }
      }, [getPropertyFromItem(item, this.$props.itemText), this.genIcon(item)])
    },
    genDivider (): VNode {
      return (this as any).$createElement(VDividerA)
    },
    genParents (): VNode[] {
      const parents: VNode[] = []
      this.$props.parents.map((v: any) => {
        parents.push(this.$createElement(VListItemA, {
          on: {
            click: () => {
              this.$emit('select-parent', v)
              this.$emit('update-dimensions')
            }
          }
        }, [
          getPropertyFromItem(v, this.$props.itemText), this.$createElement(VIconA, 'mdi-chevron-left')]))
      })
      return parents
    },
    genSelectList (): VNode {
      const inputHandler = {
        input: (e: any[]) => {
          this.$emit('input', e)
        }
      }
      const content: any[] = []
      if (this.$props.parents.length > 0) {
        content.push(this.genParents())
        content.push(this.genDivider())
      }
      this.$props.items.map((v: any) => {
        content.push(this.genItem(v))
      })
      return (this as any).$createElement(VListA, {
        ref: 'selectList',
        props: {
          selected: true,
          dense: this.dense,
          items: this.$props.items,
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
        on: inputHandler
      }, content)
    }
  }
})
