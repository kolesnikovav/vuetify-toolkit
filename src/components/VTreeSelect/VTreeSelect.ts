import { VNode, VNodeData, PropType } from 'vue'
import { VTreeviewNodeProps, consoleError } from '../../vuetify-import'
import VTreeSelectList from './VTreeSelectList'
import treeviewScopedSlots from '../../utils/TreeviewScopedSlots'
import commonSelect from '../mixin/commonSelect'

export default commonSelect.extend({
  name: 'v-tree-select',
  props: {
    ...VTreeviewNodeProps,
    openAll: Boolean,
    selectionType: {
      type: String as PropType<'leaf' | 'independent'>,
      default: 'leaf',
      validator: (v: string) => ['leaf', 'independent'].includes(v)
    }
  },
  computed: {
    listData (): Object {
      const data = (commonSelect as any).options.computed.listData.call(this)
      Object.assign(data.props, { ...VTreeviewNodeProps })
      /* to remove console warns and type conflicts */
      Object.assign(data.props, {
        activatable: this.$props.activatable,
        activeClass: this.$props.activeClass,
        color: this.$props.color,
        chips: this.$props.chips,
        dark: this.$props.dark,
        selectable: true,
        selectedColor: this.$props.selectedColor,
        indeterminateIcon: this.$props.indeterminateIcon,
        onIcon: this.$props.onIcon,
        offIcon: this.$props.offIcon,
        expandIcon: this.$props.expandIcon,
        loadingIcon: this.$props.loadingIcon,
        loadChildren: this.$props.loadChildren,
        itemKey: this.$props.itemKey,
        itemText: this.$props.itemText,
        itemChildren: this.$props.itemChildren,
        itemDisabled: this.$props.itemDisabled,
        transition: this.$props.transition,
        selectedItems: this.selectedItems,
        selectionType: this.$props.selectionType,
        shaped: this.$props.shaped,
        rounded: this.$props.rounded,
        openAll: this.$props.openAll,
        openOnClick: this.$props.openOnClick,
        useDefaultToolbarCommand: this.$props.useDefaultToolbarCommand,
        toolbarCommands: this.$props.toolbarCommands
      })
      Object.assign(data.on, {
        select: (e: any[]) => {
          this.selectItems(e)
        }
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
