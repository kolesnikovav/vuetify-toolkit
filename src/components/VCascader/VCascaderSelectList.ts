// import { VNode } from 'vue'
// import { Themeable, Colorable } from '../../vuetify-import'
// import {
//   VSelectA,
//   VExpansionPanelsA,
//   VExpansionPanelA,
//   VExpansionPanelHeaderA,
//   VExpansionPanelContentA
// } from '../../shims-vuetify'
// import mixins from '../../utils/mixins'

// export default mixins(
//   Themeable, Colorable
//   /* @vue/component */
// ).extend({
//   name: 'v-cascader-select-list',
//   props: {
//     itemChildren: {
//       type: [String, Function],
//       default: 'children'
//     },
//     selectedItems: {
//       type: Array,
//       default: () => ([])
//     },
//     ...(VSelectA as any).options.props
//   },
//   methods: {
//     getChildren (item: object) {
//       return (item as any)[this.$props.itemChildren]
//     },
//     genItemContent (item: object): VNode {
//       const chld = this.getChildren(item)

//       if (chld) {
//         const content: VNode[] = []
//         const a = chld.map((v: object) => {
//           const el = this.genItem(v)
//           content.push(el)
//         })
//         const wrapper = this.$createElement(VExpansionPanelsA, content)
//         return wrapper
//       } else {
//         return this.$createElement(VExpansionPanelContentA, {})
//       }
//     },
//     genHeader (item: object): VNode {
//       return this.$createElement(VExpansionPanelHeaderA, (item as any).name)
//     },
//     genItem (item: object): VNode {
//       const children = this.getChildren(item)
//       if (children) {
//         return this.$createElement(VExpansionPanelA, {},
//           [
//             this.genHeader(item),
//             this.genItemContent(item)
//           ])
//       } else {
//         return this.genHeader(item)
//       }
//     }
//   },
//   render (): VNode {
//     const children = []
//     if (!this.$props.items || !Array.isArray(this.$props.items) || this.$props.items.length < 1) {
//       children.push(this.$slots['no-data'] || (this as any).staticNoDataTile)
//     }
//     this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])
//     const childrenAppend = []
//     this.$slots['append-item'] && childrenAppend.push(this.$slots['append-item'])
//     const content:VNode[] = []
//     this.$props.items.map((item: object) => {
//       content.push(this.genItem(item))
//     })
//     return this.$createElement('div', {
//       staticClass: 'v-select-list v-card',
//       class: (this as any).themeClasses
//     }, [
//       children,
//       // this.genHeader(),
//       this.$createElement(VExpansionPanelsA, {
//         // props: {
//         //   selected: true,
//         //   dense: this.dense,
//         //   items: this.items,
//         //   itemKey: this.itemKey,
//         //   returnObject: false,
//         //   itemText: this.itemText,
//         //   headers: this.headers,
//         //   headersLength: this.headersLength,
//         //   headerText: this.headerText,
//         //   headerKey: this.headerKey,
//         //   hideHeaders: this.hideHeaders,
//         //   rowsPerPageText: this.rowsPerPageText,
//         //   customFilter: this.customFilter,
//         //   showSelect: true,
//         //   singleSelect: !this.multiple
//         // },
//         // scopedSlots: this.$scopedSlots,
//         // on: {
//         //   input: (e: any[]) => {
//         //     this.$emit('input', e)
//         //   }
//         // }
//       }, content), childrenAppend
//     ])
//   }
// })

import { VNode } from 'vue'
import { mixins, Themeable, Colorable } from '../../vuetify-import'
import { VDataTableA, VListItemA, VListItemContentA, VListItemTitleA } from '../../shims-vuetify'
import tableScopedSlots from '../../utils/TableScopedSlots'
import commonSelectorCard from '../mixin/commonSelectorCard'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VDataTableProps = ((VDataTableA as any).options as any).props

export default commonSelectorCard.extend({
  name: 'v-cascader-select-list',
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
    ...VDataTableProps
  },
  computed: {
    staticNoDataTile (): VNode {
      const tile = {
        on: {
          mousedown: (e: MouseEvent) => e.preventDefault() // Prevent onBlur from being called
        }
      }
      return (this as any).$createElement(VListItemA, tile, [
        (this as any).genTileNoDataContent()
      ])
    }
  },
  methods: {
    genTileNoDataContent (): VNode {
      const innerHTML = (this as any).noDataText
      return (this as any).$createElement(VListItemContentA,
        [(this as any).$createElement(VListItemTitleA, {
          domProps: { innerHTML }
        })]
      )
    },
    genSelectList (): VNode {
      const inputHandler = { input: (e: any[]) => { this.$emit('input', e) } }
      return (this as any).$createElement(VDataTableA, {
        props: {
          selected: true,
          dense: this.dense,
          items: this.items,
          itemKey: this.$props.itemKey,
          returnObject: false,
          itemText: this.$props.itemText,
          headers: this.$props.headers,
          headersLength: this.$props.headersLength,
          headerText: this.$props.headerText,
          headerKey: this.$props.headerKey,
          hideHeaders: this.$props.hideHeaders,
          rowsPerPageText: this.$props.rowsPerPageText,
          customFilter: this.$props.customFilter,
          showSelect: true,
          singleSelect: !this.multiple,
          value: this.value
        },
        scopedSlots: tableScopedSlots(this.$scopedSlots),
        on: inputHandler
      })
    }
  }
})
