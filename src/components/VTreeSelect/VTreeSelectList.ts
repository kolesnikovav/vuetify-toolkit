import { VNode, PropType } from 'vue'
import { mixins, VTreeviewNodeProps, Themeable, Colorable } from '../../vuetify-import'
import { VListItemA, VListItemContentA, VListItemTitleA } from '../../shims-vuetify'
import { Command, defaultTreeSelectCommands } from '../../utils/ToolbarCommand'
import commonSelectorCard from '../mixin/commonSelectorCard'

import VTreeViewSelector from './VTreeViewSelector'

export default commonSelectorCard.extend({
  name: 'v-tree-select-list',
  props: {
    selectedItems: {
      type: Array,
      default: () => ([])
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
    },
    ...VTreeviewNodeProps,
    selectionType: {
      type: String as PropType<'leaf' | 'independent'>,
      default: 'leaf',
      validator: (v: string) => ['leaf', 'independent'].includes(v)
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
    computedToolbarCommands (): Command[] {
      return this.$props.toolbarCommands.length > 0 ? this.$props.toolbarCommands : defaultTreeSelectCommands(this as any)
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
      return (this as any).$createElement(VTreeViewSelector, {
        props: {
          dense: this.$props.dense,
          items: this.items,
          toolbarCommands: this.computedToolbarCommands,
          // itemDisabled: this.itemDisabled,
          // itemText: this.itemText,
          // itemKey: this.itemKey,
          // itemChildren: this.itemChildren,
          // loadChildren: this.loadChildren,
          selectable: true,
          returnObject: true,
          selectOnly: true,
          selectedItems: this.selectedItems,
          // openAll: this.openAll,
          // shaped: this.shaped,
          // rounded: this.rounded,
          selectionType: this.$props.selectionType
        },
        scopedSlots: this.$scopedSlots,
        on: {
          input: (e: any[]) => {
            this.$emit('select', e)
          }
        }
      })
    }
  }
})
