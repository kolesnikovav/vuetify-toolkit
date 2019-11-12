import Vue from 'vue'
import { VCard, VDivider, VDataTable, VTreeview, VTreeviewNodeProps, VPagination, VRow, VIcon, getObjectValueByPath } from '../../vuetify-import'
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
    currentPage: 1,
    x: 0,
    clientwidth: 0,
    treeWidth: 300
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
    },
    tableWidth () {
      return this.clientwidth - 10 - this.treeWidth
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
        },
        style: {
          cursor: 'col-resize',
          width: '10px'
        },
        on: {
          mousedown: this.startResizing
        }
      })
    },
    /* resising parts of component */
    updateDimensions () {
      const rect = this.$el.getBoundingClientRect()
      this.x = rect.x
      this.clientwidth = rect.width
      this.treeWidth = Math.min(this.clientwidth - 10, this.treeWidth)
      this.$nextTick()
    },
    startResizing () {
      this.updateDimensions()
      this.$el.addEventListener('mousemove', this.Resizing)
    },
    Resizing (e) {
      this.$el.style.cursor = 'col-resize'
      this.$el.addEventListener('mouselive', this.endResizing)
      this.$el.addEventListener('mouseup', this.endResizing)
      this.treeWidth = e.x - this.x
    },
    endResizing () {
      this.$el.removeEventListener('mousemove', this.Resizing)
      this.$el.removeEventListener('mouselive', this.endResizing)
      this.$el.removeEventListener('mouseup', this.endResizing)
      this.$el.style.cursor = ''
    },
    /* resising parts of component */
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
    genItemIcon (item) {
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
        slots = Object.assign(slots, { 'item.itemIcon': this.genItemIcon })
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

      return this.$createElement(VDataTable, {
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
        style: {
          width: this.tableWidth + 'px'
        },
        scopedSlots: this.genTableScopedSlots(),
        on: {
          'click:row': (e) => this.synchronyzeActiveNode(e)
        }
      }, slots)
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
      return this.$createElement('div', {},
        [this.genItemIcon(props), this.$scopedSlots['prependTree'](props)]
      )
    },
    genTreeViewScopedSlots () {
      let slots
      if (this.$scopedSlots['prependTree'] && (this.folderIcon || this.folderOpenIcon)) {
        // needs combined scoped slot
        slots = Object.assign({}, { prepend: this.genCombinedTreeViewSlot })
        if (this.$scopedSlots['appendTree']) {
          slots = Object.assign({}, { append: (props) => this.$scopedSlots['appendTree'](props) })
        }
        if (this.$scopedSlots['labelTree']) {
          slots = Object.assign({}, { label: (props) => this.$scopedSlots['labelTree'](props) })
        }
      } else {
        slots = treeviewScopedSlots(this.$scopedSlots)
      }
      if (this.folderIcon || this.folderOpenIcon) {
        if (!slots['prepend']) {
          slots = Object.assign(slots, { prepend: this.genItemIcon })
        }
      }
      return slots
    },
    genTreeView () {
      return this.$createElement(VTreeview, {
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
        style: {
          width: this.treeWidth + 'px',
          padding: '16px'
        },
        scopedSlots: this.genTreeViewScopedSlots(),
        on: {
          'update:active': this.updateTable,
          'update:open': (e) => { this.openNodes = e }
        }
      })
    }
  },
  mounted () {
    window.addEventListener('resize', this.updateDimensions)
    window.addEventListener('load', this.updateDimensions)
    this.updateDimensions()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateDimensions)
    window.removeEventListener('load', this.updateDimensions)
  },
  render () {
    return this.$createElement(VCard, {},
      [
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
