import { VNode, PropType } from 'vue'
import { VTreeviewNodeProps, getObjectValueByPath } from '../../vuetify-import'
import { VTreeviewA } from '../../shims-vuetify'
import commonSelectorCard from '../mixin/commonSelectorCard'
import { mergeProps } from '../../utils/mergeProps'
import { TreeviewItemFunction } from 'vuetify/types'

export default commonSelectorCard.extend({
  name: 'v-tree-select-list',
  props: {
    ...VTreeviewNodeProps,
    filter: Function as PropType<TreeviewItemFunction>,
    selectionType: {
      type: String as PropType<'leaf' | 'independent'>,
      default: 'leaf',
      validator: (v: string) => ['leaf', 'independent'].includes(v)
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
      mergeProps(props, this.$props, (VTreeviewA as any).options.props);
      (props as any).selectable = true;
      (props as any).selectOnly = true;
      (props as any).value = this.selectedItems;
      (props as any).returnObject = true
      return (this as any).$createElement(VTreeviewA, {
        ref: 'selectList',
        props,
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
          'update:open': () => {
            this.$emit('update-dimensions')
          }
        }
      })
    }
  }
})
