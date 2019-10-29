import Vue from 'vue'
import { VCard, VDivider, VDataTable, VTreeview, VTreeviewNodeProps, VPagination, VRow, VCol, getObjectValueByPath } from '../../vuetify-import'

/* @vue/component */
export default Vue.extend({
  name: 'v-md-view',
  props: {
    ...VDataTable.options.props,
    ...VTreeviewNodeProps,
    ...VCard.options.props
  },
  data: () => ({
    // selectedItems: [],
    // treeviewItems: [],
    currentNode: null,
    treeviewCashe: new Map()
  }),
  computed: {
    treeItems () {
      return this.buildTree(this.items)
    },
    tableItems () {
      const currentItem = this.treeviewCashe.get(this.currentNode)
      return getObjectValueByPath(currentItem, this.itemChildren, [])
    }
  },
  methods: {
    buildTree (items) {
      const newItems = []
      items.map(item => {
        const localChildren = getObjectValueByPath(item, this.itemChildren, [])
        const itemKey = getObjectValueByPath(item, this.itemKey, [])
        if (localChildren.length > 0) {
          const newChildren = this.buildTree(localChildren)
          const clone = Object.assign({}, item)
          clone[this.itemChildren] = newChildren
          newItems.push(clone)
          this.treeviewCashe.set(itemKey, item)
        }
      })
      return newItems
    },
    updateTable (e) {
      this.currentNode = e[0]
    },
    genDivider () {
      return this.$createElement(VDivider, {
        props: {
          vertical: true
        }
      })
    },
    genPagination () {
      return this.$createElement(VPagination, {
        ref: 'data-table-pagination',
        style: {
          'vertical-align': 'bottom'
        }
      }, [])
    },
    genTable () {
      return this.$createElement(VCol, {
        props: {
          alignSelf: 'stretch',
          cols: 8.9
        }
      },
      [
        this.$createElement(VDataTable, {
          ref: 'data-table',
          props: {
            selected: this.selectable,
            dense: this.dense,
            headers: this.headers,
            items: this.tableItems,
            hideDefaultFooter: true,
            selectable: this.selectable,
            multiple: this.multiple,
            showSelect: this.selectable,
            singleSelect: !this.multiple
          }
        }),
        this.genPagination()
      ])
    },
    genTreeView () {
      return this.$createElement(VCol, {
        ref: 'treeview',
        props: {
          alignSelf: 'stretch',
          cols: 3
        }
      },
      [
        this.$createElement(VTreeview, {
          ref: 'treeview',
          props: {
            dense: this.dense,
            hoverable: this.hoverable,
            multipleActive: false,
            search: this.search,
            items: this.treeItems,
            activatable: true,
            activeClass: this.activeClass,
            color: this.color,
            expandIcon: this.expandIcon,
            itemChildren: this.itemChildren,
            itemDisabled: this.itemDisabled,
            itemKey: this.itemKey,
            itemText: this.itemText,
            loadChildren: this.loadChildren,
            loadingIcon: this.loadingIcon,
            offIcon: this.offIcon,
            onIcon: this.onIcon,
            openOnClick: this.openOnClick,
            rounded: this.rounded,
            selectable: false,
            selectedColor: this.selectedColor,
            shaped: this.shaped,
            transition: this.transition
          },
          on: {
            'update:active': this.updateTable
          }
        })
      ])
    }
  },
  render () {
    return this.$createElement(VCard, {}, [
      this.$createElement(VRow, {
        props: {
          align: 'stretch'
        }
      }, [
        this.genTreeView(),
        this.genDivider(),
        this.genTable()
      ])
    ])
  }
})
