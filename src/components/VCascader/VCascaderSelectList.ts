import { VNode } from 'vue'
import { Themeable, Colorable } from '../../vuetify-import'
import {
  VSelectA,
  VExpansionPanelsA,
  VExpansionPanelA,
  VExpansionPanelHeaderA,
  VExpansionPanelContentA
} from '../../shims-vuetify'
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
    ...(VSelectA as any).options.props
  },
  methods: {
    getChildren (item: object) {
      return (item as any)[this.$props.itemChildren]
    },
    genItemContent (item: object): VNode {
      const chld = this.getChildren(item)

      if (chld) {
        const content: VNode[] = []
        const a = chld.map((v: object) => {
          const el = this.genItem(v)
          content.push(el)
        })
        const wrapper = this.$createElement(VExpansionPanelsA, content)
        return wrapper
      } else {
        return this.$createElement(VExpansionPanelContentA, {})
      }
    },
    genHeader (item: object): VNode {
      return this.$createElement(VExpansionPanelHeaderA, (item as any).name)
    },
    genItem (item: object): VNode {
      const children = this.getChildren(item)
      if (children) {
        return this.$createElement(VExpansionPanelA, {},
          [
            this.genHeader(item),
            this.genItemContent(item)
          ])
      } else {
        return this.genHeader(item)
      }
    }
  },
  render (): VNode {
    const children = []
    if (!this.$props.items || !Array.isArray(this.$props.items) || this.$props.items.length < 1) {
      children.push(this.$slots['no-data'] || (this as any).staticNoDataTile)
    }
    this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])
    const childrenAppend = []
    this.$slots['append-item'] && childrenAppend.push(this.$slots['append-item'])
    const content:VNode[] = []
    this.$props.items.map((item: object) => {
      content.push(this.genItem(item))
    })
    return this.$createElement('div', {
      staticClass: 'v-select-list v-card',
      class: (this as any).themeClasses
    }, [
      children,
      // this.genHeader(),
      this.$createElement(VExpansionPanelsA, {
        // props: {
        //   selected: true,
        //   dense: this.dense,
        //   items: this.items,
        //   itemKey: this.itemKey,
        //   returnObject: false,
        //   itemText: this.itemText,
        //   headers: this.headers,
        //   headersLength: this.headersLength,
        //   headerText: this.headerText,
        //   headerKey: this.headerKey,
        //   hideHeaders: this.hideHeaders,
        //   rowsPerPageText: this.rowsPerPageText,
        //   customFilter: this.customFilter,
        //   showSelect: true,
        //   singleSelect: !this.multiple
        // },
        // scopedSlots: this.$scopedSlots,
        // on: {
        //   input: (e: any[]) => {
        //     this.$emit('input', e)
        //   }
        // }
      }, content), childrenAppend
    ])
  }
})
