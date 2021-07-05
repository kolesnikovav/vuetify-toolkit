import { VNode, VNodeChildrenArrayContents } from 'vue'
import { VTreeviewA } from '../../shims-vuetify'
import { getObjectValueByPath } from '../../vuetify-import'
import InternalTreeViewNode from './InternalTreeViewNode'

type VTreeviewNodeInternalInstance = InstanceType<typeof InternalTreeViewNode>

export default VTreeviewA.extend({
  name: 'v-internal-treeview',
  props: {
    allowSelectParents: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    selectedKeys: {
      type: Array,
      default: () => [] as (string|number)[]
    },
    openKeys: {
      type: Array,
      default: () => [] as (string|number)[]
    },
    searchText: String,
    highlightClass: String,
    parentKeys: {
      type: Map,
      default: undefined
    },
    itemCache: {
      type: Map,
      default: null
    },
    currentItem: {
      type: [String, Number],
      default: undefined
    }
  },
  data: () => ({
    nodes: null,
    currentItemKey: '' as (string|number)
  }),
  watch: {
    items: {
      handler () {
        // do nothing here!
      },
      deep: true
    },
    // selectedKeys: {
    //   immediate: true,
    //   handler (val) {
    //     this.$nextTick(() => {
    //       for (const [key, value] of this.nodes) {
    //         value.$data.isSelected = val.includes(key)
    //       }
    //     })
    //   }
    // },
    openKeys: {
      immediate: true,
      handler (val) {
        this.$nextTick(() => {
          // for (const [key, value] of this.$props.items) {
          //   value.$data.isOpen = val.indexOf(key) !== -1
          // }
        })
      }
    }
    // currentItemKey: {
    //   immediate: true,
    //   handler (val) {
    //     this.$nextTick(() => {
    //       for (const [key, value] of this.nodes) {
    //         value.$data.isActive = key === val
    //       }
    //     })
    //   }
    // }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    register (node: VTreeviewNodeInternalInstance) {
    },
    unregister (node: VTreeviewNodeInternalInstance) {
    },
    buildTree (items: any[], parent: (string | number | null) = null) {
    },
    calculateState (node: string | number, state: any) {
    },
    updateSelected (key: string | number, isSelected: boolean, isForced = false) {
      this.$emit('update:selected', key, isSelected)
    },
    updateOpen (key: string | number, isOpen: boolean, isForced = false) {
      this.$emit('update:open', key, isOpen)
    },
    emitOpen () {
    },
    emitSelected () {
    },
    updateActive (keyItem: string|number) {
      this.$emit('update:active', { keyItem })
    },
    getChildKeys (key: string | number): (string|number)[] {
      const result: (string|number)[] = []
      if (!this.itemCache || !this.openKeys.includes(key)) return result
      const item = this.itemCache.get(key)
      if (item) {
        const children = getObjectValueByPath(item, this.$props.itemChildren)
        if (children) {
          for (let i = 0; i < children.length; i++) {
            const itemKey = getObjectValueByPath(children[i], this.$props.itemKey, [])
            result.push(itemKey)
          }
        }
      }
      return result
    },
    getItemByKey (key: string | number): any {
      if (!this.itemCache) return
      const item = this.itemCache.get(key)
      return item
    },
    genChildNode (item: any, parentIsDisabled: boolean, level: number): VNode {
      const key = getObjectValueByPath(item, (this as any).itemKey)
      const chldKeys = this.getChildKeys(key).filter((k: number|string) => {
        const cItem = this.getItemByKey(k)
        const chld = getObjectValueByPath(cItem, this.$props.itemChildren)
        return this.openKeys.includes(k) || !chld || chld.length === 0
      })
      const chldNodes: VNode[] = []
      if (chldKeys.length > 0) {
        console.log(chldKeys)
        chldKeys.map((k: (string|number)) => {
          const chldItem = this.getItemByKey(k)
          chldNodes.push(this.genChildNode(chldItem, parentIsDisabled, level + 1))
        })
      }
      const node = this.$createElement(InternalTreeViewNode, {
        key,
        props: {
          activatable: this.$props.activatable,
          activeClass: this.$props.activeClass,
          itemOpen: this.openKeys.includes(key),
          itemSelected: this.selectedKeys.includes(key),
          item,
          selectable: (this as any).selectable,
          selectedColor: this.$props.selectedColor,
          color: this.$props.color,
          expandIcon: this.$props.expandIcon,
          indeterminateIcon: this.$props.indeterminateIcon,
          offIcon: this.$props.offIcon,
          onIcon: this.$props.onIcon,
          loadingIcon: this.$props.loadingIcon,
          itemKey: this.$props.itemKey,
          itemText: this.$props.itemText,
          itemDisabled: this.$props.itemDisabled,
          itemChildren: this.$props.itemChildren,
          loadChildren: this.$props.loadChildren,
          transition: (this as any).transition,
          openOnClick: this.$props.openOnClick,
          rounded: this.$props.rounded,
          shaped: this.$props.shaped,
          level: level,
          selectionType: this.$props.selectionType,
          parentIsDisabled
        },
        scopedSlots: this.$scopedSlots
      }, chldNodes)
      return node
    }
  },
  render (h): VNode {
    const level = 0
    const children: VNodeChildrenArrayContents = this.$props.items.length
      ? this.$props.items.filter((item: any) => {
        return !(this as any).isExcluded(getObjectValueByPath(item, (this as any).itemKey))
      }).map((item: any) => {
        const node = this.genChildNode(item, getObjectValueByPath(item, (this as any).itemDisabled), level)
        return node
      })
      /* istanbul ignore next */
      : this.$slots.default! // TODO: remove type annotation with TS 3.2
    return h('div', {
      staticClass: 'v-treeview',
      class: {
        'v-treeview--hoverable': (this as any).hoverable,
        'v-treeview--dense': this.$props.dense,
        ...(this as any).themeClasses
      }
    }, children)
  }
})
