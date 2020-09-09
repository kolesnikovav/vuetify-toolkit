import { VNode, VNodeData, PropType } from 'vue'
import { VTreeviewNodeProps, consoleError } from '../../vuetify-import'
import { VAutocompleteA, VSelectA } from '../../shims-vuetify'
import VTreeSelectList from './VTreeSelectList'
import DefaultMenuProps from '../../utils/MenuProps'
import treeviewScopedSlots from '../../utils/TreeviewScopedSlots'

export default VAutocompleteA.extend({
  name: 'v-tree-select',
  props: {
    ...(VSelectA as any).options.props,
    ...(VAutocompleteA as any).options.props,
    ...VTreeviewNodeProps,
    autocomplete: {
      type: Boolean,
      default: false
    },
    menuProps: {
      type: [String, Array, Object],
      default: () => DefaultMenuProps
    },
    openAll: Boolean,
    selectionType: {
      type: String as PropType<'leaf' | 'independent'>,
      default: 'leaf',
      validator: (v: string) => ['leaf', 'independent'].includes(v)
    }
  },
  data: () => ({
    selectedItems: [] as any[]
  }),
  computed: {
    classes (): Object {
      if (this.$props.autocomplete) {
        return Object.assign({}, (VSelectA as any).options.computed.classes.call(this), {
          'v-autocomplete': true,
          'v-autocomplete--is-selecting-index': this.$data.selectedIndex > -1
        })
      } else {
        return Object.assign({}, (VSelectA as any).options.computed.classes.call(this), {})
      }
    },
    internalSearch: {
      get (): string {
        const result = this.$props.autocomplete ? (VAutocompleteA as any).options.computed.internalSearch.get.call(this)
          : ''
        return result
      },
      set (val: string) {
        if (this.$props.autocomplete) {
          (VAutocompleteA as any).options.computed.internalSearch.set.call(this, val)
        }
      }
    },
    listData (): Object {
      const data = (VSelectA as any).options.computed.listData.call(this)
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
    register () {},
    genInput (): VNode {
      return this.$props.autocomplete ? (VAutocompleteA as any).options.methods.genInput.call(this)
        : (VSelectA as any).options.methods.genInput.call(this)
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
    },
    genSelections (): VNode {
      let length = this.selectedItems.length
      const children = new Array(length)

      let genSelection
      if (this.$scopedSlots.selection) {
        genSelection = (this as any).genSlotSelection
      } else if ((this as any).hasChips) {
        genSelection = (this as any).genChipSelection
      } else {
        genSelection = (this as any).genCommaSelection
      }

      while (length--) {
        children[length] = genSelection(
          this.selectedItems[length],
          length,
          length === children.length - 1
        )
      }

      return this.$createElement('div', {
        staticClass: 'v-select__selections'
      }, children)
    },
    selectItems (items: any[]) {
      this.selectedItems = items
      if (!this.$props.multiple) {
        this.$data.isMenuActive = false
      }
    },
    clearableCallback () {
      this.$data.internalValue = null;
      // this.$refs.input.internalValue = '';
      (this.$refs.input as HTMLInputElement).value = ''
      this.selectedItems = []
      this.$nextTick(() => (this.$refs.input as HTMLInputElement).focus())
    }
  }
})
