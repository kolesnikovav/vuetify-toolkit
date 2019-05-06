import { mixins, VDataTable, VListTile, VListTileContent, VListTileTitle, Themeable, Colorable } from '../../../vuetify-import'

export default mixins(
  Themeable, Colorable
  /* @vue/component */
).extend({
  name: 'v-data-grid-select-list',
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
    itemKey: {
      type: String,
      default: 'id'
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
    ...VDataTable.props
  },
  computed: {
    staticNoDataTile () {
      const tile = {
        on: {
          mousedown: e => e.preventDefault() // Prevent onBlur from being called
        }
      }
      return this.$createElement(VListTile, tile, [
        this.genTileNoDataContent()
      ])
    }
  },
  methods: {
    genTileNoDataContent () {
      const innerHTML = this.noDataText
      return this.$createElement(VListTileContent,
        [this.$createElement(VListTileTitle, {
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
      this.$createElement(VDataTable, {
        props: {
          selected: true,
          dense: this.dense,
          items: this.items,
          itemKey: this.itemKey,
          selectable: true,
          returnObject: true,
          selectOnly: true,
          selectedItems: this.selectedItems,
          openAll: this.openAll,
          itemText: this.itemText,
          headers: this.headers,
          headersLength: this.headersLength,
          headerText: this.headerText,
          headerKey: this.headerKey,
          hideHeaders: this.hideHeaders,
          rowsPerPageText: this.rowsPerPageText,
          customFilter: this.customFilter,
          selectAll: true
        },
        scopedSlots: {
          items: props => this.$scopedSlots['items'](props)
        },
      }), childrenAppend
    ])
  }
})