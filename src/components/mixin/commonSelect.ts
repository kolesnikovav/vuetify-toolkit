import { VNode } from 'vue'
import { consoleError } from '../../vuetify-import'
import { VAutocompleteA, VSelectA, VChipA } from '../../shims-vuetify'
import DefaultMenuProps from '../../utils/MenuProps'
import CommandToolbar from './commandToolbar'
import InternalMenu from '../mixin/internalMenu'
import { mergeProps } from '../../utils/mergeProps'

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
    ...(CommandToolbar as any).options.props
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
      mergeProps(data.props, this.$props, (CommandToolbar as any).options.props)
      data.props.multiple = this.$props.multiple
      Object.assign(data.on, {
        'close-menu': () => { this.$data.isMenuActive = false },
        'select-ok': (items: any[]) => {
          this.selectItems(items)
          this.$data.isMenuActive = false
        },
        'update-dimensions': () => ((this as any).$refs.menu as any).updateDimensions()
      })
      return data
    },
    staticList (): VNode {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item'] ||
       this.$slots['search-item'] || this.$slots['search-overflow']) {
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
            this.currentItem = null
          }
        }
      }
    },
    currentItem: {
      immediate: true,
      handler (val) {
        if (this.$refs.menu) {
          (this.$refs.menu as any).updateDimensions()
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
    genMenu (): VNode {
      const props = (this as any).$_menuProps as any
      props.activator = this.$refs['input-slot']

      // Attach to root el so that
      // menu covers prepend/append icons
      if (
        // TODO: make this a computed property or helper or something
        (this as any).attach === '' || // If used as a boolean prop (<v-menu attach>)
        (this as any).attach === true || // If bound to a boolean (<v-menu :attach="true">)
        (this as any).attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
      ) {
        props.attach = this.$el
      } else {
        props.attach = (this as any).attach
      }
      mergeProps(props, this.$props, (CommandToolbar as any).options.props)
      props.filteredItems = (this as any).filteredItems
      props.itemText = this.$props.itemText
      props.autocomplete = this.$props.autocomplete
      props.dense = this.$props.dense

      return this.$createElement(InternalMenu, {
        attrs: { role: undefined },
        props,
        on: {
          input: (val: boolean) => {
            (this as any).isMenuActive = val;
            (this as any).isFocused = val
          },
          scroll: (this as any).onScroll
        },
        ref: 'menu'
      }, [(this as any).genList()])
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
          small: this.$props.smallChips,
          value: item
        },
        on: {
          click: (e: MouseEvent) => {
            if (isDisabled) return
            this.currentItem = item as any
            (this as any).selectedIndex = index
          },
          'click:close': () => {
            this.selectedItems = this.selectedItems.filter(v => v !== item)
          }
        },
        key: JSON.stringify((this as any).getValue(item))
      }, (this as any).getText(item))
    },
    genCommaSelection (item: object, index: number, last: boolean) {
      const color = index === (this as any).selectedIndex && (this as any).computedColor
      const isDisabled = false // (
      //   !(this as any).isInteractive ||
      //   (this as any).getDisabled(item)
      // )

      return this.$createElement('div', (this as any).setTextColor(color, {
        staticClass: 'v-select__selection v-select__selection--comma',
        class: {
          'v-select__selection--disabled': isDisabled
        },
        on: {
          click: (e: MouseEvent) => {
            if (isDisabled) return
            this.currentItem = item as any
            (this as any).selectedIndex = index
          }
        },
        key: JSON.stringify((this as any).getValue(item))
      }), `${(this as any).getText(item)}${last ? '' : ', '}`)
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
      this.$data.internalSearch = ''
      this.$emit('input', items)
    },
    clearableCallback () {
      this.currentItem = null
      this.selectedItems = []
      this.$emit('change', [])
      this.$emit('input', [])
    },
    OK () {
      this.$data.isMenuActive = false
    },
    closeMenu () {
      this.$data.isMenuActive = false
    }
  }
})
