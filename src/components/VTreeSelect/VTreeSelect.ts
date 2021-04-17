import { VNode, VNodeData, PropType } from 'vue'
import { VTreeviewNodeProps, consoleError, getObjectValueByPath, getPropertyFromItem } from '../../vuetify-import'
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
    openOnePath: {
      type: Boolean,
      default: false
    },
    showFullPath: {
      type: Boolean,
      default: true
    },
    delimeter: {
      type: [String],
      default: ','
    },
    openAll: Boolean,
    selectionType: {
      type: String as PropType<'leaf' | 'independent'>,
      default: 'leaf',
      validator: (v: string) => ['leaf', 'independent'].includes(v)
    },
    toolbarCommands: {
      type: Array,
      default: function () {
        return openCloseCommands(this as any)
      }
    }
  },
  data: () => ({
    parents: new Map(),
    itemCashe: new Map(),
    openCache: [] as (string|number)[]
  }),
  computed: {
    filteredItems (): any[] {
      const items = this.buildTree(this.$props.items)
      return items
    },
    selectedKeys (): string|number[] {
      const keys: string|number[] = []
      this.selectedItems.map((v: any) => {
        keys.push(getObjectValueByPath(v, this.$props.itemKey, []))
      })
      return keys
    },
    listData (): Object {
      const data = (commonSelect as any).options.computed.listData.call(this)
      mergeProps(data.props, this.$props, VTreeviewNodeProps)
      data.props.items = this.filteredItems
      data.props.selectedKeys = this.selectedKeys
      data.props.allowSelectParents = this.$props.allowSelectParents
      Object.assign(data.on, {
        'update-dimensions': () => (this.$refs.menu as any).updateDimensions(),
        'update:selected': (key: string | number, isSelected: boolean) => this.updateSelected(key, isSelected),
        'update:open': (key: string | number, isOpen: boolean) => this.updateOpen(key, isOpen)
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
  methods: {
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
    },
    itemMatchFilter (item: any): boolean {
      if (this.internalSearch && this.internalSearch != null) {
        const comparedVal = getPropertyFromItem(item, this.$props.itemText)
        return this.$props.filter(item, this.internalSearch, comparedVal)
      } else return true
    },
    getDescendantsKeys (key: string | number, descendants: (string|number)[] = []) {
      const item = this.itemCashe.get(key)
      if (item) {
        const children = this.itemCashe.get(key).children
        if (children) {
          for (let i = 0; i < children.length; i++) {
            const itemKey = getObjectValueByPath(children[i], this.$props.itemKey, [])
            descendants.push(itemKey)
            descendants = this.getDescendantsKeys(itemKey, descendants)
          }
        }
      }
      return descendants
    },
    getParentKeys (key: string | number):(string | number)[] {
      const res:(string | number)[] = []
      let k = key
      while (this.parents.has(k)) {
        k = this.parents.get(k)
        if (k) {
          res.unshift(k)
        }
      }
      return res
    },
    updateSelected (key: string | number, isSelected: boolean) {
      let recalculateKeys: (string|number)[] = []
      const curItem = this.itemCashe.get(key)
      if (curItem && this.selectedItems.indexOf(curItem) === -1 && isSelected) {
        recalculateKeys.push(key)
        if (this.$props.selectionType === 'leaf' && this.$props.allowSelectParents && this.$props.multiple) {
          recalculateKeys = this.getDescendantsKeys(key, recalculateKeys)
        }
      } else if (curItem && this.selectedItems.indexOf(curItem) > -1 && !isSelected) {
        recalculateKeys.push(key)
        if (this.$props.selectionType === 'leaf' && this.$props.allowSelectParents && this.$props.multiple) {
          recalculateKeys = this.getDescendantsKeys(key, recalculateKeys)
        }
      }
      if (recalculateKeys.length === 0) return

      if (!isSelected) {
        const a = this.selectedItems.filter((v) => {
          const itemKey = getObjectValueByPath(v, this.$props.itemKey, [])
          return !recalculateKeys.includes(itemKey)
        })
        this.selectItems(a)
      } else {
        const a = this.$props.multiple ? this.selectedItems : []
        recalculateKeys.map(k => {
          const item = this.itemCashe.get(k)
          if (a.indexOf(item) === -1) {
            a.push(item)
          }
        })
        this.selectItems(a)
      }
    },
    updateOpen (key: string | number, isOpen: boolean) {
      console.log(this.getParentKeys(key))
      if (isOpen && this.openCache.indexOf(key) === -1) {
        this.openCache.push(key)
      } else if (!isOpen && this.openCache.indexOf(key) > -1) {
        this.openCache = this.openCache.filter(() => !this.openCache.includes(key))
      }
    },
    buildTree (items: any, parentkey?: string|number|undefined, forceInclude?: false): any[] {
      const newItems: any[] = []
      const pk = parentkey
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
            this.parents.set(itemKey, pk)
          }
        } else {
          this.parents.set(itemKey, pk)
          if (itemForceInclude) {
            const clone = Object.assign({}, item)
            newItems.push(clone)
          }
        }
      })
      return newItems
    }
  }
})
