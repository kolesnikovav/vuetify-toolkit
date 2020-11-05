import { VNode, PropType } from 'vue'
import { VTreeviewNodeProps } from '../../vuetify-import'
import { VListItemA, VTreeviewA } from '../../shims-vuetify'
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
      console.log(this.$refs.selectList);
      (this.$refs.selectList as any).updateAll(true)
    },
    CollapseAll () {
      (this.$refs.selectList as any).updateAll(false)
    },
    SelectAll () {
      // (this.$refs.selectList as any).$data.nodes
      // array.forEach(element => {
      // });
      // console.log((this.$refs.selectList as any).$data.nodes);
      // (this.$refs.selectList as any).$data.nodes.map((v: any) => {
      //   console.log(v)
      //   v.isSelected = true
      // })
    },
    UnselectAll () {
      (this.$refs.selectList as any).$data.nodes.map((v: any) => { v.isSelected = false })
    }
  }
})
