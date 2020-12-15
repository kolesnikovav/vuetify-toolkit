import { VNode, VNodeData, PropType } from 'vue'
import { VTreeviewNodeProps, consoleError, getPropertyFromItem, getObjectValueByPath } from '../../vuetify-import'
import VTreeSelectList from './VTreeSelectList'
import treeviewScopedSlots from '../../utils/TreeviewScopedSlots'
import commonSelect from '../mixin/commonSelect'
import { mergeProps } from '../../utils/mergeProps'
import { openCloseCommands } from '../../utils/ToolbarCommand'

export default commonSelect.extend({
  name: 'v-tree-select',
  props: {
    ...VTreeviewNodeProps,
    allowSelectParents: {
      type: Boolean,
      default: false
    },
    toolbarCommands: {
      type: Array,
      default: function () {
        return openCloseCommands(this as any)
      }
    },
    openAll: Boolean,
    selectionType: {
      type: String as PropType<'leaf' | 'independent'>,
      default: 'leaf',
      validator: (v: string) => ['leaf', 'independent'].includes(v)
    }
  },
  computed: {
    filteredItems (): any[] {
      const items = this.buildTree(this.$props.items)
      return items
    },
    listData (): Object {
      const data = (commonSelect as any).options.computed.listData.call(this)
      mergeProps(data.props, this.$props, VTreeviewNodeProps)
      data.props.allowSelectParents = this.$props.allowSelectParents
      data.props.items = this.filteredItems
      data.props.currentItem = this.$data.currentItem
      Object.assign(data.on, {
        select: (e: any[]) => {
          this.selectItems(e)
        },
        'update:open': (e: any[]) => {
          (this.$refs.menu as any).updateDimensions()
          this.selectItems(e)
        },
        'update-dimensions': () => (this.$refs.menu as any).updateDimensions()
      })
      Object.assign(data.scopedSlots, treeviewScopedSlots(this.$scopedSlots))
      return data
    },
    staticList (): VNode {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        consoleError('assert: staticList should not be called if slots are used')
      }
      return this.$createElement(VTreeSelectList, this.listData)
    }
  },
  data: () => ({
    parents: new Map(),
    itemCashe: new Map()
  }),
  watch: {
    items: {
      immediate: true,
      handler (val) { this.buildTree(val) }
    },
    internalSearch: {
      immediate: true,
      handler (val) {
        this.buildTree(this.$props.items)
      }
    }
  },
  methods: {
    itemMatchFilter (item: any): boolean {
      if (this.internalSearch && this.internalSearch != null) {
        const comparedVal = getPropertyFromItem(item, this.$props.itemText)
        const a = this.$props.filter(item, this.internalSearch, comparedVal)
        return a
      } else return true
    },
    buildTree (items: any, parentkey?: any, forceInclude?: false): any[] {
      const newItems: any[] = []
      items.map((item: any) => {
        const localChildren = getObjectValueByPath(item, this.$props.itemChildren, [])
        const itemKey = getObjectValueByPath(item, this.$props.itemKey, [])
        this.itemCashe.set(itemKey, item)
        const itemForceInclude = forceInclude || this.itemMatchFilter(item)
        if (localChildren.length > 0) {
          const newChildren = (this as any).buildTree(localChildren, itemKey, itemForceInclude)
          if (newChildren.length > 0) {
            const clone = Object.assign({}, item)
            clone[this.$props.itemChildren] = newChildren
            clone.hasChildren = true
            newItems.push(clone)
          }
        } else {
          this.$data.parents.set(itemKey, parentkey)
          if (itemForceInclude) {
            const clone = Object.assign({}, item)
            newItems.push(clone)
          }
        }
      })
      return newItems
    },
    genListWithSlot (): VNode {
      const slots = ['prepend-item', 'no-data', 'append-item']
        .filter(slotName => this.$slots[slotName])
        .map(slotName => this.$createElement('template', {
          slot: slotName
        }, this.$slots[slotName]))
      // Requires destructuring due to Vue
      // modifying the `on` property when passed
      // as a referenced object
      return this.$createElement(VTreeSelectList, ({ ...this.listData }) as VNodeData, slots)
    }
  }
})
