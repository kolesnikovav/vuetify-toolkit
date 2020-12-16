import { VNode, PropType } from 'vue'
import { VTreeviewNodeProps, getObjectValueByPath } from '../../vuetify-import'
import InternalTreeView from './InternalTreeView'
// import { VTreeviewA } from '../../shims-vuetify'
import commonSelectorCard from '../mixin/commonSelectorCard'
import { mergeProps } from '../../utils/mergeProps'

export default commonSelectorCard.extend({
  name: 'v-tree-select-list',
  props: {
    ...VTreeviewNodeProps,
    currentItem: {
      default: null
    },
    selectionType: {
      type: String as PropType<'leaf' | 'independent'>,
      default: 'leaf',
      validator: (v: string) => ['leaf', 'independent'].includes(v)
    },
    allowSelectParents: {
      type: Boolean,
      default: false
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
              (this.$refs.selectList as any).updateSelected(key, true, false)
            })
            oldVal.map((v: any) => {
              const key = getObjectValueByPath(v, iKey)
              if (selected.indexOf(key) === -1) {
                (this.$refs.selectList as any).updateSelected(key, false, false)
              }
            })
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
      const treeviewProps = {} as any
      mergeProps(treeviewProps, this.$props, VTreeviewNodeProps)
      treeviewProps.activatable = true
      treeviewProps.active = [this.currentItem]
      treeviewProps.selectable = true
      treeviewProps.returnObject = true
      treeviewProps.selectedItems = this.selectedItems
      treeviewProps.items = this.items
      treeviewProps.initialItem = this.$data.currentItem
      treeviewProps.allowSelectParents = this.$props.allowSelectParents
      return (this as any).$createElement(InternalTreeView, {
        ref: 'selectList',
        props: treeviewProps,
        scopedSlots: this.$scopedSlots,
        on: {
          input: (e: any[]) => {
            if (this.$props.multiple) {
              this.$emit('select', e)
            } else {
            // select last added item
              const lastAdded = e.filter(v => this.selectedItems.indexOf(v) === -1)
              if (lastAdded.length > 0) {
                this.$emit('select', lastAdded)
              }
            }
          },
          'update:open': (e: any[]) => {
            this.$emit('update-dimensions')
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
      const keys = (this.$refs.selectList as any).getKeys(this.items)
      keys.map((v: any) => {
        (this.$refs.selectList as any).updateSelected(v, true, false)
      })
    },
    UnselectAll () {
      const keys = (this.$refs.selectList as any).getKeys(this.items)
      keys.map((v: any) => {
        (this.$refs.selectList as any).updateSelected(v, false, false);
        (this.$refs.selectList as any).updateActive(v, false, false)
      })
    },
    InvertSelection () {
      for (var node in (this.$refs.selectList as any).nodes) {
        (this.$refs.selectList as any).nodes[node].isSelected = !(this.$refs.selectList as any).nodes[node].isSelected
      }
    }
  }
})
