import { VAutocomplete, VSelect, VDataIterator, DataIterable, consoleError } from '../../../vuetify-import'
import VDataIteratorSelectList from './VDataIteratorSelectList'

export default VAutocomplete.extend({
  name: 'v-data-iterator-select',
  props: {
    autocomplete: {
      type: Boolean,
      default: false
    },
    openAll: Boolean,
    ...VSelect.options.props,
    ...VAutocomplete.options.props,
    ...VDataIterator.props,
    ...DataIterable.props
  },
  data: () => ({
    selectedItems: []
  }),
  computed: {
    classes () {
      if (this.autocomplete) {
        return Object.assign({}, VSelect.options.computed.classes.call(this), {
          'v-autocomplete': true,
          'v-autocomplete--is-selecting-index': this.selectedIndex > -1
        })
      } else {
        return Object.assign({}, VSelect.options.computed.classes.call(this), {})
      }
    },
    listData () {
      const data = VSelect.options.computed.listData.call(this)
      Object.assign(data.props, {
        activatable: this.activatable,
        activeClass: this.activeClass,
        selectable: true,
        selectedColor: this.selectedColor,
        indeterminateIcon: this.indeterminateIcon,
        onIcon: this.onIcon,
        offIcon: this.offIcon,
        expandIcon: this.expandIcon,
        loadingIcon: this.loadingIcon,
        itemKey: this.itemKey,
        itemText: this.itemText,
        itemChildren: this.itemChildren,
        transition: this.transition,
        selectedItems: this.selectedItems,
        openAll: this.openAll,
        openOnClick: this.openOnClick,
        headers: this.headers,
        headersLength: this.headersLength,
        headerText: this.headerText,
        headerKey: this.headerKey,
        hideHeaders: this.hideHeaders,
        rowsPerPageText: this.rowsPerPageText,
        customFilter: this.customFilter,
        contentTag: this.contentTag,
        contentClass: this.contentClass
      })
      Object.assign(data.on, {
        select: e => {
          this.selectItems(e)
        }
      })
      Object.assign(data.scopedSlots, { item: this.$scopedSlots['item'] })
      return data
    },
    staticList () {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        consoleError('assert: staticList should not be called if slots are used')
      }
      return this.$createElement(VDataIteratorSelectList, this.listData, this.$scopedSlots['items'])
    }
  },
  methods: {
    register () {},
    genList () {
      // If there's no slots, we can use a cached VNode to improve performance
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        return this.genListWithSlot()
      } else {
        return this.staticList
      }
    },
    genListWithSlot () {
      const slots = ['prepend-item', 'no-data', 'append-item']
        .filter(slotName => this.$slots[slotName])
        .map(slotName => this.$createElement('template', {
          slot: slotName
        }, this.$slots[slotName]))
      // Requires destructuring due to Vue
      // modifying the `on` property when passed
      // as a referenced object
      return this.$createElement(VDataIteratorSelectList, {
        ...this.listData
      }, slots)
    },
    selectItems (items) {
      this.selectedItems = items
      if (!this.multiple) {
        this.isMenuActive = false
      }
    },
    clearableCallback () {
      this.internalValue = null
      this.$refs.input.internalValue = ''
      this.$refs.input.value = ''
      this.selectedItems = []
      this.$nextTick(() => this.$refs.input.focus())
    }
  }
})
