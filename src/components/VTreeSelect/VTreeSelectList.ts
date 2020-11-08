import { VNode, PropType } from 'vue'
import { VTreeviewNodeProps } from '../../vuetify-import'
import { VTreeviewA } from '../../shims-vuetify'
import { Command, defaultTreeSelectCommands } from '../../utils/ToolbarCommand'
import commonSelectorCard from '../mixin/commonSelectorCard'

export default commonSelectorCard.extend({
  name: 'v-tree-select-list',
  props: {
    ...VTreeviewNodeProps,
    selectionType: {
      type: String as PropType<'leaf' | 'independent'>,
      default: 'leaf',
      validator: (v: string) => ['leaf', 'independent'].includes(v)
    }
  },
  computed: {
    computedToolbarCommands (): Command[] {
      return this.$props.toolbarCommands.length > 0 ? this.$props.toolbarCommands : defaultTreeSelectCommands(this as any)
    }
  },
  methods: {
    genSelectList (): VNode {
      return (this as any).$createElement(VTreeviewA, {
        ref: 'selectList',
        props: {
          activatable: true,
          dense: this.$props.dense,
          items: this.items,
          toolbarCommands: this.computedToolbarCommands,
          itemDisabled: this.$props.itemDisabled,
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
    },
    ExpandAll () {
      (this.$refs.selectList as any).updateAll(true)
    },
    CollapseAll () {
      (this.$refs.selectList as any).updateAll(false)
    },
    SelectAll () {
      for (var node in (this.$refs.selectList as any).nodes) {
        (this.$refs.selectList as any).nodes[node].isSelected = true
      }
    },
    UnselectAll () {
      for (var node in (this.$refs.selectList as any).nodes) {
        (this.$refs.selectList as any).nodes[node].isSelected = false
      }
    },
    InvertSelection () {
      for (var node in (this.$refs.selectList as any).nodes) {
        (this.$refs.selectList as any).nodes[node].isSelected = !(this.$refs.selectList as any).nodes[node].isSelected
      }
    }
  }
})
