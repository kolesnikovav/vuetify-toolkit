import { VNode } from 'vue'
import {
  VListA, VListItemA, VDividerA
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
    genItem (item: object): VNode {
      const a = getPropertyFromItem(item, this.$props.itemText)
      return (this as any).$createElement(VListItemA, {
        on: {
          click: () => {
            this.$emit('select', item)
          }
        }
      }, getPropertyFromItem(item, this.$props.itemText))
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
            }
          }
        }, getPropertyFromItem(v, this.$props.itemText)))
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
