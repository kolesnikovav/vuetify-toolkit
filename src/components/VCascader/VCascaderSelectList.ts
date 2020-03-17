import { VNode } from 'vue'
import {
  VSelect,
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelHeader,
  VExpansionPanelContent,
  Themeable, Colorable
} from '../../vuetify-import'
import mixins from '../../utils/mixins'

export default mixins(
  Themeable, Colorable
  /* @vue/component */
).extend({
  name: 'v-cascader-select-list',
  props: {
    itemChildren: {
      type: [String, Function],
      default: 'children'
    },
    selectedItems: {
      type: Array,
      default: () => ([])
    },
    ...(VSelect as any).options.props
    // noDataText: String,
    // dense: Boolean,
    // multiple: Boolean,
    // openAll: Boolean,
    // returnObject: {
    //   type: Boolean,
    //   default: false // TODO: Should be true in next major
    // },
    // value: {
    //   type: Array,
    //   default: () => ([])
    // },
    // search: String,
    // filter: {
    //   type: Function,
    //   default: undefined
    // }
  },
  //   computed: {
  //     staticNoDataTile (): VNode {
  //       const tile = {
  //         on: {
  //           mousedown: (e: MouseEvent) => e.preventDefault() // Prevent onBlur from being called
  //         }
  //       }
  //       return (this as any).$createElement(VListItem, tile, [
  //         (this as any).genTileNoDataContent()
  //       ])
  //     }
  //   },
  methods: {
    genItemContent (item: object): VNode {
      return this.$createElement(VExpansionPanelContent, {})
    },
    genHeader (item: object): VNode {
      return this.$createElement(VExpansionPanelHeader, {})
    },
    genItem (item: object): VNode {
      return this.$createElement(VExpansionPanel, {},
        [
          this.genHeader(item),
          this.genItemContent(item)
        ])
    }
    // genTileNoDataContent (): VNode {
    //   const innerHTML = (this as any).noDataText
    //   return (this as any).$createElement(VListItemContent,
    //     [(this as any).$createElement(VListItemTitle, {
    //       domProps: { innerHTML }
    //     })]
    //   )
    // }
  },
  render (): VNode {
    const children = []
    if (!this.items || !Array.isArray(this.items) || this.items.length < 1) {
      children.push(this.$slots['no-data'] || this.staticNoDataTile)
    }
    this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])
    const childrenAppend = []
    this.$slots['append-item'] && childrenAppend.push(this.$slots['append-item'])

    return this.$createElement('div', {
      staticClass: 'v-select-list v-card',
      class: this.themeClasses
    }, [
      children,
      // this.genHeader(),
      this.$createElement(VExpansionPanels, {
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
        scopedSlots: this.$scopedSlots,
        on: {
          input: (e: any[]) => {
            this.$emit('input', e)
          }
        }
      }), childrenAppend
    ])
  }
})
