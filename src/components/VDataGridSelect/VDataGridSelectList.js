// import { mixins, VDataTable, VListTile, VListTileContent, VListTileTitle, Themeable, Colorable } from '../../vuetify-import'
import { mixins, VDataTable, VListItem, VListItemContent, VListItemTitle, Themeable, Colorable } from '../../vuetify-import'
import tableScopedSlots from '../../utils/TableScopedSlots'
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
    headers: {
      type: Array,
      default: () => []
    },
    ...VDataTable.options.props
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
      // this.genHeader(),
      this.$createElement(VDataTable, {
        props: {
          selected: true,
          dense: this.dense,
          items: this.items,
          itemKey: this.itemKey,
          returnObject: false,
          itemText: this.itemText,
          headers: this.headers,
          headersLength: this.headersLength,
          headerText: this.headerText,
          headerKey: this.headerKey,
          hideHeaders: this.hideHeaders,
          rowsPerPageText: this.rowsPerPageText,
          customFilter: this.customFilter,
          showSelect: true,
          singleSelect: !this.multiple
        },
        scopedSlots: tableScopedSlots(this.$scopedSlots),
        on: {
          'input': e => {
            this.$emit('input', e)
          }
        }
      }), childrenAppend
    ])
  }
})
