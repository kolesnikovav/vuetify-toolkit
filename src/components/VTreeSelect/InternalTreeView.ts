import { VNode, VNodeChildrenArrayContents } from 'vue'
import { VTreeviewA } from '../../shims-vuetify'
import { getObjectValueByPath } from '../../vuetify-import'
import InternalTreeViewNode from './InternalTreeViewNode'

type VTreeviewNodeInternalInstance = InstanceType<typeof InternalTreeViewNode>

type NodeStateInternal = {
  parent: number | string | null
  children: (number | string)[]
  vnode: VTreeviewNodeInternalInstance | null
  isActive: boolean
  isSelected: boolean
  isIndeterminate: boolean
  isOpen: boolean
  item: any
}

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
    currentItem: {
      type: [String, Number],
      default: undefined
    }
  },
  data: () => ({
    nodes: new Map<(string|number), VTreeviewNodeInternalInstance>(),
    currentItemKey: '' as (string|number)
  }),
  watch: {
    selectedKeys: {
      immediate: true,
      handler (val) {
        this.$nextTick(() => {
          for (const [key, value] of this.nodes) {
            value.$data.isSelected = val.indexOf(key) !== -1
          }
        })
      }
    },
    openKeys: {
      immediate: true,
      handler (val) {
        this.$nextTick(() => {
          for (const [key, value] of this.nodes) {
            value.$data.isOpen = val.indexOf(key) !== -1
          }
        })
      }
    },
    currentItemKey: {
      immediate: true,
      handler (val) {
        this.$nextTick(() => {
          for (const [key, value] of this.nodes) {
            value.$data.isActive = key === val
          }
        })
      }
    }
  },
  methods: {
    register (node: VTreeviewNodeInternalInstance) {
      if (node.$vnode.key) {
        this.nodes.set(node.$vnode.key, node)
      }
    },
    unregister (node: VTreeviewNodeInternalInstance) {
      if (node.$vnode.key) {
        this.nodes.delete(node.$vnode.key)
      }
    },
    buildTree (items: any[], parent: (string | number | null) = null) {
    },
    calculateState (node: string | number, state: Record<string | number, NodeStateInternal>) {
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
      this.$nextTick(() => {
        for (const [key, value] of this.nodes) {
          value.$data.isActive = this.selectedKeys.indexOf(key) !== -1 && key === keyItem
        }
      })
    }
  },
  render (h): VNode {
    const children: VNodeChildrenArrayContents = this.$props.items.length
      ? this.$props.items.filter((item: any) => {
        return !(this as any).isExcluded(getObjectValueByPath(item, (this as any).itemKey))
      }).map((item: any) => {
        const genChild = (InternalTreeViewNode as any).options.methods.genChild.bind(this)
        const node = genChild(item, getObjectValueByPath(item, (this as any).itemDisabled))
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
