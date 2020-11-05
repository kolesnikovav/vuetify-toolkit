import { VNode, VNodeData, PropType } from 'vue'
import { consoleError } from '../../vuetify-import'
import { VAutocompleteA, VSelectA, VChipA } from '../../shims-vuetify'
import DefaultMenuProps from '../../utils/MenuProps'
import ComandToolbar from './comandToolbar'

export default VAutocompleteA.extend({
  props: {
    ...(VSelectA as any).options.props,
    ...(VAutocompleteA as any).options.props,
    autocomplete: {
      type: Boolean,
      default: false
    },
    menuProps: {
      type: [String, Array, Object],
      default: () => DefaultMenuProps
    },
    ...(ComandToolbar as any).options.props
  },
  data: () => ({
    selectedItems: [] as any[],
    currentItem: null as any
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
      Object.assign(data.props, {
        toolbarPosition: this.$props.toolbarPosition,
        toolbarButtonTextVisible: this.$props.toolbarButtonTextVisible,
        toolbarFlat: this.$props.toolbarFlat,
        toolbarButtonOutlined: this.$props.toolbarButtonOutlined,
        toolbarButtonRounded: this.$props.toolbarButtonRounded,
        toolbarButtonShaped: this.$props.toolbarButtonShaped,
        toolbarButtonFab: this.$props.toolbarButtonFab,
        toolbarButtonTile: this.$props.toolbarButtonTile,
        toolbarButtonElevation: this.$props.toolbarButtonElevation,
        toolbarHeader: this.$props.toolbarHeader
      })
      return data
    },
    staticList (): VNode {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        consoleError('assert: staticList should not be called if slots are used')
      }
      return this.$createElement('div', this.listData)
    },
    hasChips (): boolean {
      return this.$props.chips || this.$props.smallChips || this.$props.deletableChips
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        if (val) {
          if (Array.isArray(val)) {
            this.selectedItems = val.flat()
          } else {
            this.selectedItems = []
          }
        }
      }
    }
  },
  methods: {
    register () {},
    genInput (): VNode {
      return this.$props.autocomplete ? (VAutocompleteA as any).options.methods.genInput.call(this)
        : (VSelectA as any).options.methods.genInput.call(this)
    },
    genSlots (): VNode[] {
      return ['prepend-item', 'no-data', 'append-item']
        .filter(slotName => this.$slots[slotName])
        .map(slotName => this.$createElement('template', {
          slot: slotName
        }, this.$slots[slotName]))
    },
    genChipSelection (item: object, index: number) {
      const isDisabled = false // (
      //   !(this as any).isInteractive ||
      //   (this as any).getDisabled(item)
      // )

      return this.$createElement(VChipA, {
        staticClass: 'v-chip--select',
        attrs: { tabindex: -1 },
        props: {
          close: this.$props.deletableChips && !isDisabled,
          disabled: isDisabled,
          inputValue: item, // index === (this as any).selectedIndex,
          small: this.$props.smallChips
        },
        on: {
          click: (e: MouseEvent) => {
            if (isDisabled) return

            // e.stopPropagation()

            (this as any).selectedIndex = index
          },
          'click:close': () => (this as any).onChipInput(item)
        },
        key: JSON.stringify((this as any).getValue(item))
      }, (this as any).getText(item))
    },
    // genCommaSelection (item: object, index: number, last: boolean) {
    //   const color = index === this.selectedIndex && this.computedColor
    //   const isDisabled = (
    //     !this.isInteractive ||
    //     this.getDisabled(item)
    //   )

    //   return this.$createElement('div', this.setTextColor(color, {
    //     staticClass: 'v-select__selection v-select__selection--comma',
    //     class: {
    //       'v-select__selection--disabled': isDisabled,
    //     },
    //     key: JSON.stringify(this.getValue(item)),
    //   }), `${this.getText(item)}${last ? '' : ', '}`)
    // },
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
      this.$emit('input', items)
    },
    clearableCallback () {
      this.selectedItems = []
      this.$emit('change', [])
      this.$emit('input', [])
    }
  }
})
