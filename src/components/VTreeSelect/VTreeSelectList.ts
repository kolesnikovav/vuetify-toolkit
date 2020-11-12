import { VNode, PropType } from 'vue'
import { VTreeviewNodeProps, getObjectValueByPath } from '../../vuetify-import'
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
  watch: {
    selectedItems: {
      immediate: true,
      handler (val, oldVal) {
        if (this.$refs.selectList) {
          if (!val || val.length === 0) {
            this.UnselectAll()
          } else {
            const iKey = this.$props.itemKey
            const selected = [] as any[]
            val.map((v: any) => {
              const key = getObjectValueByPath(v, iKey)
              selected.push(key);
              (this.$refs.selectList as any).updateSelected(key, true)
            })
            if (oldVal && oldVal.length > 0) {
              oldVal.map((v: any) => {
                const key = getObjectValueByPath(v, iKey)
                if (selected.indexOf(key) === -1) {
                  (this.$refs.selectList as any).updateSelected(key, false)
                }
              })
            }
            // const iKey = this.$props.itemKey
            // const deselected = oldVal.filter((v: any) => val.indexOf(v) > -1) as any[]
            // deselected.map(v => {
            //   const key = getObjectValueByPath(val, iKey)
            //   console.log(key);
            //   (this.$refs.selectList as any).updateSelected(key, false)
            // })
          }
        }
      }
    },
    currentItem: {
      immediate: true,
      handler (val) {
        this.CollapseAll()
        if (val && this.$refs.selectList) {
          const key = getObjectValueByPath(val, this.$props.itemKey)
          const parents = (this.$refs.selectList as any).getParents(key) as any[]
          parents.map(v => {
            (this.$refs.selectList as any).updateOpen(v, true)
          })
        }
      }
    }
  },
  methods: {
    genSelectList (): VNode {
      return (this as any).$createElement(VTreeviewA, {
        ref: 'selectList',
        props: {
          activatable: true,
          active: [this.currentItem],
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
      if (this.$refs.selectList) {
        (this.$refs.selectList as any).updateAll(true)
        this.$emit('update-dimensions')
      }
    },
    CollapseAll () {
      if (this.$refs.selectList) {
        (this.$refs.selectList as any).updateAll(false)
        this.$emit('update-dimensions')
      }
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
