import { VAutocomplete, getPropertyFromItem } from '../../../vuetify-import'

/* @vue/component */
export default VAutocomplete.extend({
  name: 'v-step-select',
  props: {
    itemChildren: {
      type: [String, Array, Function],
      default: 'children'
    },
    stepsCount: {
      type: Number,
      default: 1
    },
    ...VAutocomplete.props
  },
  data: vm => ({
    currentStep: 0,
    cachedItems: vm.cacheItems ? vm.items : [],
    selectedItems: [],
  }),
  computed: {
    allItems () {
      return this.filterDuplicates(this.cachedItems.concat(this.items))
    },
    computedItems () {
      return this.getItemsByStep()
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
          noDataText: this.$vuetify.t(this.noDataText),
          selectedItems: this.selectedItems,
          itemAvatar: this.itemAvatar,
          itemDisabled: this.itemDisabled,
          itemValue: this.itemValue,
          itemText: this.getItemText()
        },
        on: {
          select: this.selectItem
          ,
          scopedSlots: {
            item: this.$scopedSlots.item
          }
        }
      }
    },
    watch: {
      internalValue (val) {
        this.initialValue = val
        //this.setSelectedItems()
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
      },
    },
    methods: {
      clearableCallback () {
        this.internalValue = null
        this.$refs.input.internalValue = []
        this.$refs.input.value = ''
        this.selectedItems = []
        this.currentStep = 0
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
          if (this.currentStep + 1  >= this.stepsCount) {
            this.isMenuActive = false
            if (this.selectedItems.lenght < this.stepsCount) {
              this.selectedItems.push(item)
            } else {
              this.selectedItems.push(item)
            }
            this.isMenuActive = false
          } else {
            this.currentStep++
            this.selectedItems.push(item)
          }
          // When selecting multiple
          // adjust menu after each
          // selection
          this.$nextTick(() => {
            this.$refs.menu &&
              this.$refs.menu.updateDimensions()
          })
      },
        /* get Items by Current step */
        getItemsByStep () {
          if (this.currentStep === 0) return this.items
          const selParent = this.selectedItems[this.currentStep-1]
          if (this.itemChildren instanceof Array) {
            const iChildren = this.itemChildren[this.currentStep-1]
            if ( typeof iChildren === 'string' ) {
              return selParent[iChildren]
            } else if (iChildren instanceof Function) {
              return iChildren(selParent)
            }
          } else if (this.itemChildren instanceof Function) {
            return this.itemChildren(selParent)
          }
          return selParent[this.itemChildren]
        },
        setValue (value) {
          const oldValue = this.internalValue
          this.internalValue.push = value
          value !== oldValue && this.$emit('change', value)
        }
    }
  }
})
