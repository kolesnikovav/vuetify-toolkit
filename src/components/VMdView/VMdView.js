import Vue from 'vue'
import { VCard, VDivider, VDataTable, VTreeview, VTreeviewNodeProps, VPagination, VRow, VCol, getObjectValueByPath } from '../../vuetify-import'
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
    }
  },
  data: () => ({
    currentNode: null,
    treeviewCashe: new Map(),
    page: 1
  }),
  computed: {
    treeItems () {
      return this.buildTree(this.items)
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
                value: this.page
              },
              style: {
                'vertical-align': 'bottom'
              },
              on: {
                input: (e) => { this.page = e }
              }
            })
          ]
        }
      }
      return undefined
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
            headers: this.headers,
            items: this.tableItems,
            itemsPerPage: this.itemsPerPage,
            page: this.page,
            hideDefaultFooter: true,
            showSelect: this.selectable,
            singleSelect: !this.multiple
          },
          scopedSlots: tableScopedSlots(this.$scopedSlots)
        }, slots)
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
          scopedSlots: treeviewScopedSlots(this.$scopedSlots),
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
      ]),
      this.genPagination()
    ])
  }
})
