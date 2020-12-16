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
    }
  },
  data: () => ({
    nodes: {} as Record<string | number, NodeStateInternal>
  }),
  methods: {
    register (node: VTreeviewNodeInternalInstance) {
      const key = getObjectValueByPath((node as any).item, (this as any).itemKey)
      this.nodes[key].vnode = node;
      (this as any).updateVnodeState(key)
    },
    unregister (node: VTreeviewNodeInternalInstance) {
      const key = getObjectValueByPath((node as any).item, (this as any).itemKey)
      if (this.nodes[key]) this.nodes[key].vnode = null
    },
    buildTree (items: any[], parent: (string | number | null) = null) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const key = getObjectValueByPath(item, this.$props.itemKey)
        const children = getObjectValueByPath(item, this.$props.itemChildren, [])
        // eslint-disable-next-line no-prototype-builtins
        const oldNode = this.$data.nodes.hasOwnProperty(key) ? this.nodes[key] : {
          isSelected: false, isIndeterminate: false, isActive: false, isOpen: false, vnode: null
        } as NodeStateInternal

        const node: any = {
          vnode: oldNode.vnode,
          parent,
          children: children.map((c: any) => getObjectValueByPath(c, this.$props.itemKey)),
          item
        }

        this.buildTree(children, key)

        // This fixed bug with dynamic children resetting selected parent state
        // eslint-disable-next-line no-prototype-builtins
        if (!this.nodes.hasOwnProperty(key) && parent !== null && this.nodes.hasOwnProperty(parent)) {
          node.isSelected = this.nodes[parent].isSelected
        } else {
          node.isSelected = oldNode.isSelected
          node.isIndeterminate = oldNode.isIndeterminate
        }

        node.isActive = oldNode.isActive
        node.isOpen = oldNode.isOpen

        this.nodes[key] = node

        if (children.length) {
          const { isSelected, isIndeterminate } = this.calculateState(key, this.nodes)

          node.isSelected = isSelected
          node.isIndeterminate = isIndeterminate
        }

        // Don't forget to rebuild cache
        if (this.nodes[key].isSelected && (this.$props.selectionType === 'independent' || node.children.length === 0)) this.$data.selectedCache.add(key)
        if (this.nodes[key].isActive) this.$data.activeCache.add(key)
        if (this.nodes[key].isOpen) {
          this.$data.openCache.add(key)
        }
        (this as any).updateVnodeState(key)
      }
    },
    calculateState (node: string | number, state: Record<string | number, NodeStateInternal>) {
      const children = state[node].children
      const counts = children.reduce((counts: number[], child: string | number) => {
        counts[0] += +Boolean(state[child].isSelected)
        counts[1] += +Boolean(state[child].isIndeterminate)

        return counts
      }, [0, 0])

      const isSelected = !!children.length && counts[0] === children.length
      const isIndeterminate = !isSelected && (counts[0] > 0 || counts[1] > 0)

      return {
        isSelected,
        isIndeterminate
      }
    },
    updateSelected (key: string | number, isSelected: boolean, isForced = false) {
      // eslint-disable-next-line no-prototype-builtins
      if (!this.$data.nodes.hasOwnProperty(key)) return

      const changed = new Map()

      if (this.$props.selectionType !== 'independent') {
        for (const descendant of (this as any).getDescendants(key)) {
          if (!getObjectValueByPath(this.$data.nodes[descendant].item, (this as any).itemDisabled) || isForced) {
            this.$data.nodes[descendant].isSelected = isSelected
            this.$data.nodes[descendant].isIndeterminate = false
            changed.set(descendant, isSelected)
          }
        }

        const calculated = (this as any).calculateState(key, this.$data.nodes)
        this.$data.nodes[key].isSelected = isSelected
        this.$data.nodes[key].isIndeterminate = calculated.isIndeterminate
        changed.set(key, isSelected)

        for (const parent of (this as any).getParents(key)) {
          const calculated = (this as any).calculateState(parent, this.$data.nodes)
          this.$data.nodes[parent].isSelected = calculated.isSelected
          this.$data.nodes[parent].isIndeterminate = calculated.isIndeterminate
          changed.set(parent, calculated.isSelected)
        }
      } else {
        this.$data.nodes[key].isSelected = isSelected
        this.$data.nodes[key].isIndeterminate = false
        changed.set(key, isSelected)
      }

      for (const [key, value] of changed.entries()) {
        (this as any).updateVnodeState(key)

        if (this.$props.selectionType === 'leaf' && (this as any).isParent(key)) continue

        value === true ? (this as any).selectedCache.add(key) : (this as any).selectedCache.delete(key)
      }
    }
  },
  render (h): VNode {
    const children: VNodeChildrenArrayContents = this.$props.items.length
      ? this.$props.items.filter((item: any) => {
        return !(this as any).isExcluded(getObjectValueByPath(item, (this as any).itemKey))
      }).map((item: any) => {
        const genChild = (InternalTreeViewNode as any).options.methods.genChild.bind(this)

        return genChild(item, getObjectValueByPath(item, (this as any).itemDisabled))
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
