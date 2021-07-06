import { VNode, PropType } from 'vue'
import { VTreeviewNodeProps, getObjectValueByPath } from '../../vuetify-import'
import InternalTreeview from './InternalTreeView'
import commonSelectorCard from '../mixin/commonSelectorCard'
import { mergeProps } from '../../utils/mergeProps'
import { TreeviewItemFunction } from 'vuetify/types'

export default commonSelectorCard.extend({
  name: 'v-tree-select-list',
  props: {
    ...VTreeviewNodeProps,
    filter: Function as PropType<TreeviewItemFunction>,
    allowSelectParents: {
      type: Boolean,
      default: false
    },
    selectionType: {
      type: String as PropType<'leaf' | 'independent'>,
      default: 'leaf',
      validator: (v: string) => ['leaf', 'independent'].includes(v)
    },
    selectedKeys: {
      type: Array,
      default: () => [] as (string|number)[]
    },
    searchText: String,
    openCache: {
      type: Array,
      default: () => [] as (string|number)[]
    },
    itemCache: {
      type: Map,
      default: null
    }
  },
  watch: {
    selectedItems: {
      immediate: true,
      handler (val, oldVal) {
        if (this.$refs.selectList) {
          if (!val || val.length === 0) {

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
    }
  },
  methods: {
    genSelectList (): VNode {
      const props = {}
      mergeProps(props, this.$props, (InternalTreeview as any).options.props);
      (props as any).selectable = true;
      (props as any).selectOnly = true;
      (props as any).value = this.selectedItems;
      (props as any).returnObject = true;
      (props as any).openKeys = this.$props.openCache;
      (props as any).itemCache = this.$props.itemCache
      return (this as any).$createElement(InternalTreeview, {
        ref: 'selectList',
        props,
        scopedSlots: this.$scopedSlots,
        on: {
          'update:open': (key: string|number, isOpen: boolean) => {
            this.$emit('update:open', key, isOpen)
            this.$emit('update-dimensions')
          },
          'update:selected': (key: string|number, isSelected: boolean) => {
            this.$emit('update:selected', key, isSelected)
          }
        }
      })
    }
  }
})
