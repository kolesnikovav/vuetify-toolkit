import Vue, { VueConstructor, VNodeData, VNode, VNodeChildren } from 'vue'
import { VAutocomplete, VSelect, getPropertyFromItem } from '../../vuetify-import'
import DefaultMenuProps from '../../utils/MenuProps'
import VCascaderSelectList from './VCascaderSelectList'

const VAutocompleteComponent = VAutocomplete as VueConstructor<Vue>

/* @vue/component */
export default VAutocompleteComponent.extend({
  name: 'v-cascader',
  props: {
    itemChildren: {
      type: [String, Function],
      default: 'children'
    },
    autocomplete: {
      type: Boolean,
      default: false
    },
    ...(VSelect as any).options.props,
    ...(VAutocomplete as any).options.props,
    menuProps: {
      type: [String, Array, Object],
      default: () => DefaultMenuProps
    }
  },
  data: (vm: any) => ({
    currentStep: 0,
    parentItem: undefined,
    parentItems: [],
    cachedItems: vm.cacheItems ? vm.items : [],
    selectedItems: []
  }),
  computed: {
    allItems (): any[] {
      return (this as any).filterDuplicates((this as any).cachedItems.concat(this.items))
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
    listData (): VNodeData {
      const scopeId = this.$vnode && (this.$vnode as any).context.$options._scopeId
      return {
        attrs: scopeId ? {
          [scopeId]: true
        } : undefined,
        props: {
          action: this.multiple && !this.isHidingSelected,
          dark: this.dark,
          color: this.color,
          dense: this.dense,
          hideSelected: this.hideSelected,
          items: this.virtualizedItems,
          noDataText: this.noDataText,
          selectedItems: this.selectedItems,
          itemAvatar: this.itemAvatar,
          itemDisabled: this.itemDisabled,
          itemValue: this.itemValue,
          itemText: this.getText
        },
        on: {
          select: (item: object) => (this as any).selectItem(item)
        },
        scopedSlots: {
          item: (this.$scopedSlots as any).item
        }
      }
    },
    staticList (): VNode {
      // if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
      //   consoleError('assert: staticList should not be called if slots are used')
      // }
      const slots: VNodeChildren = []
      slots.push((this.$scopedSlots as any).items)
      return (this as any).$createElement(VCascaderSelectList, (this as any).listData, slots)
    }
  },
  watch: {
    internalValue (val) {
      this.initialValue = val
    },
    isBooted () {
      (this as any).$nextTick(() => {
        if (this.content && (this.content as any).addEventListener) {
          (this.content as any).addEventListener('scroll', this.onScroll, false)
        }
      })
    },
    isMenuActive (val) {
      if (!val) return

      (this as any).isBooted = true
    }
  },
  methods: {
    clearableCallback () {
      this.$data.internalValue = null;
      (this.$refs.input as any).internalValue = [] as any[]
      (this.$refs.input as any).value = ''
      this.$data.selectedItems = []
      this.$data.parentItem = undefined
      this.$data.parentItems = []
      this.$nextTick(() => (this.$refs.input as HTMLInputElement).focus())
    },
    // // getText (item): string {
    // //   return getPropertyFromItem(item, (this as any).getItemText(), item)
    // // },
    // getItemText (item: ): string {

    //   // if (this.$props.itemText instanceof Array) {
    //   //   const iText = this.$props.itemText[this.$data.currentStep]
    //   //   return iText
    //   // } else if (this.$props.itemText instanceof Function) {
    //   //   return this.$props.itemText()
    //   // } else {
    //   //   return this.$props.itemText
    //   // }
    // },
    genInput (): VNode {
      return this.$props.autocomplete ? (VAutocomplete as any).options.methods.genInput.call(this)
        : (VSelect as any).options.methods.genInput.call(this)
    },
    genSelections () {
      let length = (this as any).selectedItems.length
      const children = new Array(length)

      let genSelection
      if (this.$scopedSlots.selection) {
        genSelection = (this as any).genSlotSelection
      } else if (this.$props.hasChips) {
        genSelection = (this as any).genChipSelection
      } else {
        genSelection = (this as any).genCommaSelection
      }

      while (length--) {
        children[length] = genSelection(
          (this as any).selectedItems[length],
          length,
          length === children.length - 1
        )
      }

      return this.$createElement('div', {
        staticClass: 'v-select__selections'
      }, children)
    },

    selectItem (item: object) {
      /* change parent item if item has children */
      const chld = (this as any).getChildren(item)
      console.log(chld)
      if (Array.isArray(chld) && chld.length > 0) {
        this.$data.parentItems.push(this.$data.parentItem)
        this.$data.parentItem = item
      } else {
        this.$data.selectedItems.push(item)
        if (!this.$props.multiple) {
          this.$data.isMenuActive = false
        }
      }
      // When selecting multiple
      // adjust menu after each
      // selection
      this.$nextTick(() => {
        this.$refs.menu &&
          (this.$refs.menu as any).updateDimensions()
      })
    },
    getChildren (item: any): any[] {
      if (!this.$data.parentItem) {
        return this.$props.items
      }
      if (this.$props.itemChildren && typeof this.$props.itemChildren === 'string') {
        const res = item[this.$props.itemChildren] ? item[this.$props.itemChildren] : this.$props.parentItem[this.$props.itemChildren]
        return res || []
      } else if (this.$props.itemChildren && typeof this.$props.itemChildren === 'function') {
        const res = item ? this.$props.itemChildren.call(item) : this.$props.itemChildren.call(this.$props.parentItem)
        return res || []
      }
      return []
    },
    // filterDuplicates (arr) {
    //   const uniqueValues = new Map()
    //   const arrChildren = this.getChildren()
    //   if (!arrChildren | !Array.isArray(arrChildren) | arrChildren.length < 1) return []
    //   for (let index = 0; index < arrChildren.length; ++index) {
    //     const item = arrChildren[index]
    //     const val = this.getValue(item)

    //     // TODO: comparator
    //     !uniqueValues.has(val) && uniqueValues.set(val, item)
    //   }
    //   return Array.from(uniqueValues.values())
    // },
    setValue (value: any) {
      const oldValue = (this as any).internalValue;
      (this as any).internalValue.push = value
      value !== oldValue && this.$emit('change', value)
    }
  }
})
