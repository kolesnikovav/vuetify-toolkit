import Vue from 'vue'
import { VCard, VDivider, VDataTable, VTreeview, VTreeviewNodeProps, VPagination, VRow, VCol, VIcon, getObjectValueByPath } from '../../vuetify-import'
import treeviewScopedSlots from '../../utils/TreeviewScopedSlots'
import tableScopedSlots from '../../utils/TableScopedSlots'

/* @vue/component */
export default Vue.extend({
  name: 'v-md-view',
  props: {
    ...VDataTable.options.props,
    ...VTreeviewNodeProps,
    ...VCard.options.props,
    multiple: {
      type: Boolean,
      default: false
    },
    hierarchy: {
      type: Boolean,
      default: true
    },
    folderIcon: {
      type: [String, Function],
      default: undefined
    },
    folderOpenIcon: {
      type: [String, Function],
      default: undefined
    },
    itemIcon: {
      type: [String, Function],
      default: undefined
    },
    folderIconColor: {
      type: [String, Function],
      default: undefined
    },
    itemIconColor: {
      type: [String, Function],
      default: undefined
    }
  },
  data: () => ({
    currentNode: null,
    openNodes: [],
    treeviewCashe: new Map(),
    parents: new Map(),
    currentPage: 1
  }),
  computed: {
    treeItems () {
      return this.buildTree(this.items)
    },
    tableHeaders () {
      if (this.folderIcon || this.folderOpenIcon || this.itemIcon) {
        const iconHeader = {
          text: '',
          value: 'itemIcon',
          align: 'start',
          sortable: false,
          filterable: false,
          divider: false,
          width: 20
        }
        return [iconHeader, ...this.headers]
      }
      return this.headers
    },
    tableItems () {
      if (this.hierarchy) {
        const currentItem = this.treeviewCashe.get(this.currentNode)
        return getObjectValueByPath(currentItem, this.itemChildren, [])
      } else {
        const allItems = []
        this.getAllItems(this.items, allItems)
        return allItems
      }
    },
    pageCount () {
      if (this.itemsPerPage && Array.isArray(this.tableItems)) {
        if (this.itemsPerPage < this.tableItems.length) {
          let res = Math.floor(this.tableItems.length / this.itemsPerPage)
          res += (this.tableItems.length % this.itemsPerPage) > 0 ? 1 : 0
          return res
        }
      }
      return 0
    }
  },
  methods: {
    buildTree (items, parentkey) {
      const newItems = []
      items.map(item => {
        const localChildren = getObjectValueByPath(item, this.itemChildren, [])
        const itemKey = getObjectValueByPath(item, this.itemKey, [])
        if (localChildren.length > 0) {
          const newChildren = this.buildTree(localChildren, itemKey)
          const clone = Object.assign({}, item)
          clone[this.itemChildren] = newChildren
          newItems.push(clone)
          this.treeviewCashe.set(itemKey, item)
          this.parents.set(itemKey, parentkey)
        } else {
          this.parents.set(itemKey, parentkey)
        }
      })
      return newItems
    },
    getAllItems (items, allItems) {
      items.map(item => {
        const localChildren = getObjectValueByPath(item, this.itemChildren, [])
        if (localChildren.length > 0) {
          this.getAllItems(localChildren, allItems)
        } else {
          allItems.push(item)
        }
      })
    },
    updateTable (e) {
      if (this.hierarchy) {
        this.currentNode = e[0]
      }
    },
    genDivider () {
      return this.$createElement(VDivider, {
        props: {
          vertical: true
        }
      })
    },
    genPagination () {
      if (this.itemsPerPage && Array.isArray(this.tableItems)) {
        if (this.itemsPerPage < this.tableItems.length) {
          return [
            this.$createElement(VDivider, {
              props: {
                vertical: false
              }
            }),
            this.$createElement(VPagination, {
              ref: 'data-table-pagination',
              props: {
                length: this.pageCount,
                dark: this.dark,
                value: this.currentPage
              },
              style: {
                'vertical-align': 'bottom'
              },
              on: {
                input: (e) => { this.currentPage = e }
              }
            })
          ]
        }
      }
      return undefined
    },
    genItemIconIcon (item) {
      const itemKey = getObjectValueByPath(item.item, this.itemKey, [])
      let fn
      let color
      if (this.treeviewCashe.get(itemKey)) {
        if (this.openNodes.indexOf(itemKey) >= 0) {
          fn = this.folderOpenIcon
        } else {
          fn = this.folderIcon
        }
        color = this.folderIconColor
      } else {
        fn = this.itemIcon
        color = this.itemIconColor
      }
      return this.$createElement(VIcon, {
        props: {
          color: color
        }
      }, fn)
    },
    genTableScopedSlots () {
      let slots = tableScopedSlots(this.$scopedSlots)
      if (this.folderIcon || this.folderOpenIcon || this.itemIcon) {
        slots = Object.assign(slots, { 'item.itemIcon': this.genItemIconIcon })
      }
      return slots
    },
    genTable () {
      const slots = [
        'body',
        'body.append',
        'body.prepend',
        'footer',
        'loading',
        'no-data',
        'no-results',
        'header',
        'progress',
        'top'
      ]
        .filter(slotName => this.$slots[slotName])
        .map(slotName => this.$createElement('template', {
          slot: slotName
        }, this.$slots[slotName]))

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
            headers: this.tableHeaders,
            items: this.tableItems,
            itemsPerPage: this.itemsPerPage,
            page: this.currentPage,
            hideDefaultFooter: true,
            showSelect: this.selectable,
            singleSelect: !this.multiple
          },
          scopedSlots: this.genTableScopedSlots(),
          on: {
            'click:row': (e) => this.synchronyzeActiveNode(e)
          }
        }, slots)
      ])
    },
    getParents (key) {
      const result = []
      const parent = this.parents.get(key)
      if (parent) {
        result.push(parent)
        const p = this.getParents(parent)
        result.push(...p)
      }
      return result
    },
    synchronyzeActiveNode (e) {
      const itemKey = getObjectValueByPath(e, this.itemKey, [])
      this.currentNode = this.parents.get(itemKey)
      const parents = this.getParents(itemKey)
      this.openNodes.push(...parents)
      this.$nextTick(() => {})
    },
    genCombinedTreeViewSlot (props) {
      return (props) => {
        this.$createElement('div', {},
          [this.genItemIconIcon(props), this.$scopedSlots['prependTree'](props)]
        )
      }
    },
    genTreeViewScopedSlots () {
      let slots = treeviewScopedSlots(this.$scopedSlots)
      console.log(slots)

      if (this.folderIcon || this.folderOpenIcon) {
        if (slots['prepend']) {
          // // slots['prepend'] = this.genCombinedTreeViewSlot
          // console.log(slots)
          // slots = Object.assign({}, { prepend: (props) => this.genCombinedTreeViewSlot(props) })
          // slots = Object.assign({}, { prepend: (props) => this.genCombinedTreeViewSlot(props) })
          // slots['prepend'] = (props) => this.genCombinedTreeViewSlot(props)
        } else {
          slots = Object.assign(slots, { prepend: this.genItemIconIcon })
        }
        // slots = Object.assign(slots, { 'item.itemIcon': this.genItemIconIcon })
      }
      // console.log(this.$scopedSlots)
      // console.log(slots)
      return slots
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
            active: [this.currentNode],
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
            open: this.openNodes,
            openOnClick: this.openOnClick,
            rounded: this.rounded,
            selectable: false,
            selectedColor: this.selectedColor,
            shaped: this.shaped,
            transition: this.transition
          },
          scopedSlots: this.genTreeViewScopedSlots(),
          on: {
            'update:active': this.updateTable,
            'update:open': (e) => { this.openNodes = e }
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
      ]),
      this.genPagination()
    ])
  }
})
