import { VNode, VNodeData, PropType } from 'vue'
import { VTreeviewNodeProps, consoleError, getPropertyFromItem } from '../../vuetify-import'
import VTreeSelectList from './VTreeSelectList'
import treeviewScopedSlots from '../../utils/TreeviewScopedSlots'
import commonSelect from '../mixin/commonSelect'
import { mergeProps } from '../../utils/mergeProps'
import { Command, openCloseCommands } from '../../utils/ToolbarCommand'

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
    // filteredItems (): any[] {
    //   if (!this.$props.autocomlete || !this.internalSearch || this.internalSearch === '' || this.internalSearch === undefined) {
    //     return this.$props.items
    //   }
    //   const result: any[] = []
    //   this.$props.items.map((v: any) => {
    //     const chld = getPropertyFromItem(v, this.$props.itemChildren)
    //     console.log(chld)
    //   })
    //   return result
    // },
    listData (): Object {
      const data = (commonSelect as any).options.computed.listData.call(this)
      mergeProps(data.props, this.$props, VTreeviewNodeProps)
      data.props.allowSelectParents = this.$props.allowSelectParents
      // data.props.items = this.filteredItems
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
    }
  }
})
