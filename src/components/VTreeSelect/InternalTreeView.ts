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
    selectedCashe: {
      type: Map,
      default: new Map()
    }
  },
  data: () => ({
    nodes: {} as Record<string | number, NodeStateInternal>
  }),
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
    calculateState (node: string | number, state: Record<string | number, NodeStateInternal>) {
    },
    updateSelected (key: string | number, isSelected: boolean, isForced = false) {
      this.$emit('update:selected', { key, isSelected })
    },
    getSelectedStaus (key: string|number): string {
      if (this.selectedCashe.has(key)) return 'selected'
      return 'unselected'
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
