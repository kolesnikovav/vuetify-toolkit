import { mixins, VTreeviewNodeProps, VListItem, VListItemContent, VListItemTitle, Themeable, Colorable } from '../../vuetify-import'

import VTreeViewSelector from './VTreeViewSelector'

export default mixins(
  Themeable, Colorable
  /* @vue/component */
).extend({
  name: 'v-tree-select-list',
  props: {
    selectedItems: {
      type: Array,
      default: () => ([])
    },
    noDataText: String,
    dense: Boolean,
    multiple: Boolean,
    items: {
      type: Array,
      default: () => ([])
    },
    openAll: Boolean,
    returnObject: {
      type: Boolean,
      default: false // TODO: Should be true in next major
    },
    value: {
      type: Array,
      default: () => ([])
    },
    search: String,
    filter: {
      type: Function,
      default: undefined
    },
    useDefaultToolbarCommand: {
      type: Boolean,
      default: false
    },
    // custom commands
    toolbarCommands: {
      type: Array,
      default: () => []
    },
    ...VTreeviewNodeProps
  },
  computed: {
    staticNoDataTile () {
      const tile = {
        on: {
          mousedown: e => e.preventDefault() // Prevent onBlur from being called
        }
      }
      return this.$createElement(VListItem, tile, [
        this.genTileNoDataContent()
      ])
    }
  },
  methods: {
    genTileNoDataContent () {
      const innerHTML = this.noDataText
      return this.$createElement(VListItemContent,
        [this.$createElement(VListItemTitle, {
          domProps: { innerHTML }
        })]
      )
    }
  },
  render () {
    const children = []
    if (!this.items || !Array.isArray(this.items) || this.items.length < 1) {
      children.push(this.$slots['no-data'] || this.staticNoDataTile)
    }
    this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])
    const childrenAppend = []
    this.$slots['append-item'] && childrenAppend.push(this.$slots['append-item'])

    return this.$createElement('div', {
      staticClass: 'v-select-list v-card',
      'class': this.themeClasses
    }, [
      children,
      this.$createElement(VTreeViewSelector, {
        props: {
          dense: this.dense,
          items: this.items,
          itemDisabled: this.itemDisabled,
          itemText: this.itemText,
          itemKey: this.itemKey,
          itemChildren: this.itemChildren,
          loadChildren: this.loadChildren,
          selectable: true,
          returnObject: true,
          selectOnly: true,
          selectedItems: this.selectedItems,
          openAll: this.openAll,
          shaped: this.shaped,
          rounded: this.rounded
        },
        scopedSlots: this.$scopedSlots,
        on: {
          input: e => {
            this.$emit('select', e)
          }
        }
      }), childrenAppend
    ])
  }
})
