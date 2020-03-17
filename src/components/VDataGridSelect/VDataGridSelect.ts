import Vue, { VNode, VueConstructor } from 'vue'
import { VAutocomplete, VSelect, VDataTable, consoleError } from '../../vuetify-import'
import VDataGridSelectList from './VDataGridSelectList'
import DefaultMenuProps from '../../utils/MenuProps'
import { NormalizedScopedSlot, VNodeChildren } from 'vue/types/vnode'

const VAutocompleteComponent = VAutocomplete as VueConstructor<Vue>

export default VAutocompleteComponent.extend({
  name: 'v-data-grid-select',
  props: {
    ...(VSelect as any).options.props,
    ...(VAutocomplete as any).options.props,
    ...(VDataTable as any).options.props,
    autocomplete: {
      type: Boolean,
      default: false
    },
    openAll: Boolean,
    menuProps: {
      type: [String, Array, Object],
      default: () => DefaultMenuProps
    },
    itemText: {
      type: [String, Array, Function],
      default: 'text'
    }
  },
  data: () => ({
    selectedItems: []
  }),
  computed: {
    classes (): Object {
      if (this.$props.autocomplete) {
        return Object.assign({}, (VSelect as any).options.computed.classes.call(this), {
          'v-autocomplete': true,
          'v-autocomplete--is-selecting-index': (this as any).selectedIndex > -1
        })
      } else {
        return Object.assign({}, (VSelect as any).options.computed.classes.call(this), {})
      }
    },
    internalSearch: {
      get () {
        const result = (this as any).autocomplete ? (VAutocomplete as any).options.computed.internalSearch.get.call(this)
          : ''
        return result
      },
      set (val) {
        if ((this as any).autocomplete) {
          (VAutocomplete as any).options.computed.internalSearch.set.call(this, val)
        }
      }
    },
    listData (): Object {
      const data = (VSelect as any).options.computed.listData.call(this)
      Object.assign(data.props, {
        activatable: this.$props.activatable,
        activeClass: this.$props.activeClass,
        dark: this.$props.dark,
        selectable: true,
        selectedColor: this.$props.selectedColor,
        indeterminateIcon: this.$props.indeterminateIcon,
        onIcon: this.$props.onIcon,
        offIcon: this.$props.offIcon,
        expandIcon: this.$props.expandIcon,
        loadingIcon: this.$props.loadingIcon,
        itemKey: this.$props.itemKey,
        itemText: this.$props.itemText,
        multiple: this.$props.multiple,
        transition: this.$props.transition,
        selectedItems: this.$props.selectedItems,
        openAll: this.$props.openAll,
        openOnClick: this.$props.openOnClick,
        headers: this.$props.headers,
        headersLength: this.$props.headersLength,
        headerText: this.$props.headerText,
        headerKey: this.$props.headerKey,
        hideHeaders: this.$props.hideHeaders,
        rowsPerPageText: this.$props.rowsPerPageText,
        customFilter: this.$props.customFilter,
        useDefaultCommands: this.$props.useDefaultCommands
      })
      Object.assign(data.on, {
        select: (e:any[]) => {
          (this as any).selectItems(e)
        },
        input: (e: any[]) => {
          (this as any).selectItems(e)
        }
      })
      Object.assign(data.scopedSlots, this.$scopedSlots)
      return data
    },
    staticList (): VNode {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        consoleError('assert: staticList should not be called if slots are used')
      }
      const slots: VNodeChildren = []
      slots.push((this.$scopedSlots.items as any))
      return this.$createElement(VDataGridSelectList, (this as any).listData, slots)
    }
  },
  methods: {
    register () {},
    genInput (): VNode {
      return this.$props.autocomplete ? (VAutocomplete as any).options.methods.genInput.call(this)
        : (VSelect as any).options.methods.genInput.call(this)
    },
    genList () {
      // If there's no slots, we can use a cached VNode to improve performance
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        return (this as any).genListWithSlot()
      } else {
        return (this as any).staticList
      }
    },
    genListWithSlot (): VNode {
      const slots = ['prepend-item', 'no-data', 'append-item']
        .filter(slotName => this.$slots[slotName])
        .map(slotName => this.$createElement('template', {
          slot: slotName
        }, this.$slots[slotName]))
      return this.$createElement(VDataGridSelectList, {
        ...(this as any).listData
      }, slots)
    },
    genSelections (): VNode {
      return (VSelect as any).options.methods.genSelections.call(this)
    },
    selectItems (items: any[]) {
      (this as any).selectedItems = items
      if (!this.$props.multiple) {
        this.$data.isMenuActive = false
      }
    },
    clearableCallback () {
      // this.internalValue = null
      // this.$refs.input.internalValue = ''
      // this.$refs.input.value = ''
      // this.selectedItems = []
      // this.$nextTick(() => this.$refs.input.focus())
    }
  }
})
