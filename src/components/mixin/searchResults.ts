import Vue, { VNode, VNodeData } from 'vue'
import {
  VListA, VListItemA, VDividerA, VIconA
} from '../../shims-vuetify'
import { getPropertyFromItem } from '../../vuetify-import'

export default Vue.extend({
  name: 'v-search-result',
  props: {
    filteredItems: {
      type: [Array],
      default: () => []
    },
    queryText: {
      type: String,
      default: ''
    },
    itemParents: {
      type: String,
      default: 'parents'
    },
    itemText: {
      type: [String, Array, Function],
      default: 'text'
    },
    foundedItemsLimit: {
      type: Number,
      default: 20
    },
    autocomplete: {
      type: Boolean,
      default: false
    },
    useInternalItemFilter: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    genVerticalDivider (): VNode {
      return this.$createElement(VDividerA, {
        props: {
          vertical: true
        }
      })
    },
    genSearchParents (item: any): VNode[] {
      const result:VNode[] = []
      // const parents = getPropertyFromItem(item, this.$props.itemParents)
      // parents.map((v:any) => {
      //   result.push(this.$createElement('span', getPropertyFromItem(v, this.$props.itemText)))
      //   result.push(this.genVerticalDivider())
      // })
      return result
    },
    genSearchContent (): VNode[] {
      const result:VNode[] = []
      this.filteredItems.map((v:any) => {
        const parents = this.genSearchParents(v)
        const content = parents.length === 0 ? getPropertyFromItem(v, this.$props.itemText) : [
          ...parents, getPropertyFromItem(v, this.$props.itemText)
        ]
        result.push(this.$createElement(VListItemA, {
          style: {
            'min-height': '32px'
          }
        }, content))
      })
      return result
    },
    genSearchResults (): VNode|undefined {
      if (!this.$props.autocomplete || this.$props.queryText === '' || this.$props.filteredItems.length === 0) {
        return undefined
      }
      return this.$createElement(VListA, {}, this.genSearchContent())
    }
  }
})
