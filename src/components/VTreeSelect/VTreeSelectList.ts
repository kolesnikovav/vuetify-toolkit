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
    },
    selectedKeys: {
      type: Array,
      default: () => [] as (string|number)[]
    },
    itemKeys: {
      type: Array,
      default: [] as (string|number)[]
    }
  },
  watch: {
  },
  methods: {
    genSelectList (): VNode {
      const treeviewProps = {} as any
      mergeProps(treeviewProps, this.$props, VTreeviewNodeProps)
      treeviewProps.activatable = true
      treeviewProps.active = [this.currentItem]
      treeviewProps.selectable = true
      treeviewProps.returnObject = false
      treeviewProps.selectedItems = this.selectedItems
      treeviewProps.items = this.items
      treeviewProps.multiple = this.multiple
      treeviewProps.initialItem = this.$data.currentItem
      treeviewProps.allowSelectParents = this.$props.allowSelectParents
      treeviewProps.selectedKeys = this.$props.selectedKeys
      treeviewProps.itemCashe = this.$props.itemCashe
      return (this as any).$createElement(InternalTreeView, {
        ref: 'selectList',
        props: treeviewProps,
        scopedSlots: this.$scopedSlots,
        on: {
          // input: (e: any[]) => {
          //   if (this.$props.multiple) {
          //     this.$emit('select', e)
          //   } else {
          //   // select last added item
          //     const lastAdded = e.filter(v => this.selectedItems.indexOf(v) === -1)
          //     if (lastAdded.length > 0) {
          //       this.$emit('select', lastAdded)
          //     }
          //   }
          // },
          'update:open': (e: any[]) => {
            this.$emit('update-dimensions')
          },
          'update:selected': (e: { key: string| number, isSelected: boolean}) => {
            this.$emit('update:selected', e)
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
