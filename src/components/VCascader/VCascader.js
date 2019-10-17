import { VAutocomplete, VSelect, getPropertyFromItem } from '../../vuetify-import'
import DefaultMenuProps from '../../utils/MenuProps'

/* @vue/component */
export default VAutocomplete.extend({
  name: 'v-cascader',
  props: {
    itemChildren: {
      type: [String, Function],
      default: 'children'
    },
    ...VSelect.options.props,
    ...VAutocomplete.options.props,
    menuProps: {
      type: [String, Array, Object],
      default: () => DefaultMenuProps
    }
  },
  data: vm => ({
    currentStep: 0,
    parentItem: undefined,
    parentItems: [],
    cachedItems: vm.cacheItems ? vm.items : [],
    selectedItems: []
  }),
  computed: {
    allItems () {
      return this.filterDuplicates(this.cachedItems.concat(this.items))
    },
    listData () {
      const scopeId = this.$vnode && this.$vnode.context.$options._scopeId
      return {
        attrs: scopeId ? {
          [scopeId]: true
        } : null,
        props: {
          action: this.multiple && !this.isHidingSelected,
          color: this.color,
          dense: this.dense,
          hideSelected: this.hideSelected,
          items: this.virtualizedItems,
          noDataText: this.noDataText,
          selectedItems: this.selectedItems,
          itemAvatar: this.itemAvatar,
          itemDisabled: this.itemDisabled,
          itemValue: this.itemValue,
          itemText: this.getItemText()
        },
        on: {
          select: this.selectItem,
          scopedSlots: {
            item: this.$scopedSlots.item
          }
        }
      }
    }
  },
  watch: {
    internalValue (val) {
      this.initialValue = val
    },
    isBooted () {
      this.$nextTick(() => {
        if (this.content && this.content.addEventListener) {
          this.content.addEventListener('scroll', this.onScroll, false)
        }
      })
    },
    isMenuActive (val) {
      if (!val) return

      this.isBooted = true
    }
  },
  methods: {
    clearableCallback () {
      this.internalValue = null
      this.$refs.input.internalValue = []
      this.$refs.input.value = ''
      this.selectedItems = []
      this.parentItem = undefined
      this.parentItems = []
      this.$nextTick(() => this.$refs.input.focus())
    },
    getText (item) {
      return getPropertyFromItem(item, this.getItemText(), item)
    },
    getItemText () {
      if (this.itemText instanceof Array) {
        const iText = this.itemText[this.currentStep]
        return iText
      } else if (this.itemText instanceof Function) {
        return this.itemText
      } else {
        return this.itemText
      }
    },
    genSelections () {
      let length = this.selectedItems.length
      const children = new Array(length)

      let genSelection
      if (this.$scopedSlots.selection) {
        genSelection = this.genSlotSelection
      } else if (this.hasChips) {
        genSelection = this.genChipSelection
      } else {
        genSelection = this.genCommaSelection
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

    selectItem (item) {
      /* change parent item if item has children */
      let chld = this.getChildren(item)
      if (Array.isArray(chld) && chld.length > 0) {
        this.parentItems.push(this.parentItem)
        this.parentItem = item
      } else {
        this.selectedItems.push(item)
        if (!this.multiple) {
          this.isMenuActive = false
        }
      }
      // When selecting multiple
      // adjust menu after each
      // selection
      this.$nextTick(() => {
        this.$refs.menu &&
          this.$refs.menu.updateDimensions()
      })
    },
    getChildren (item) {
      if (!this.parentItem) {
        return this.items
      }
      if (this.itemChildren && typeof this.itemChildren === 'string') {
        let res = item ? item[this.itemChildren] : this.parentItem[this.itemChildren]
        return res || []
      } else if (this.itemChildren && typeof this.itemChildren === 'function') {
        let res = item ? this.itemChildren.call(item) : this.itemChildren.call(this.parentItem)
        return res || []
      }
      return []
    },
    filterDuplicates (arr) {
      const uniqueValues = new Map()
      const arrChildren = this.getChildren()
      if (!arrChildren | !Array.isArray(arrChildren) | arrChildren.length < 1) return []
      for (let index = 0; index < arrChildren.length; ++index) {
        const item = arrChildren[index]
        const val = this.getValue(item)

        // TODO: comparator
        !uniqueValues.has(val) && uniqueValues.set(val, item)
      }
      return Array.from(uniqueValues.values())
    },
    setValue (value) {
      const oldValue = this.internalValue
      this.internalValue.push = value
      value !== oldValue && this.$emit('change', value)
    }
  }
})
