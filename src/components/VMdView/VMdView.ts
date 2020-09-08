import Vue, { VNode } from 'vue'
import { VTreeviewNodeProps, getObjectValueByPath } from '../../vuetify-import'
import { VCardA, VDividerA, VTreeviewA, VPaginationA, VRowA, VIconA } from '../../shims-vuetify'
import VAdvDataTable from '../VAdvDataTable'
import treeviewScopedSlots from '../../utils/TreeviewScopedSlots'
import tableScopedSlots from '../../utils/TableScopedSlots'
import { ScopedSlot } from 'vue/types/vnode'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VDataTableProps = ((VAdvDataTable as any).options as any).props

type ScopedSlotType = { [key: string]: ScopedSlot | undefined }

/* @vue/component */
export default Vue.extend({
  name: 'v-md-view',
  props: {
    ...VDataTableProps,
    ...VTreeviewNodeProps,
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
    openNodes: [] as any[],
    treeviewCashe: new Map(),
    parents: new Map(),
    currentPage: 1,
    x: 0,
    clientwidth: 0,
    treeWidth: 300,
    filteredTableItemsCount: 0
  }),
  computed: {
    treeItems (): any[] {
      return this.buildTree(this.$props.items)
    },
    tableHeaders (): any[] {
      if (this.$props.folderIcon || this.$props.folderOpenIcon || this.$props.itemIcon) {
        const iconHeader = {
          text: '',
          value: 'itemIcon',
          align: 'start',
          sortable: false,
          filterable: false,
          divider: false,
          width: 20
        }
        return [iconHeader, ...this.$props.headers]
      }
      return this.$props.headers
    },
    tableItems (): any[] {
      if (this.$props.hierarchy) {
        const currentItem = this.treeviewCashe.get(this.currentNode)
        return getObjectValueByPath(currentItem, this.$props.itemChildren, [])
      } else {
        const allItems: any[] = []
        this.getAllItems(this.$props.items, allItems)
        return allItems
      }
    },
    pageCount (): number {
      if (this.$props.itemsPerPage && Array.isArray(this.tableItems)) {
        if (this.$props.itemsPerPage < this.filteredTableItemsCount) {
          let res = Math.floor(this.filteredTableItemsCount / this.$props.itemsPerPage)
          res += (this.filteredTableItemsCount % this.$props.itemsPerPage) > 0 ? 1 : 0
          return res
        }
      }
      return 0
    },
    tableWidth (): number {
      return this.clientwidth - 10 - this.treeWidth
    }
  },
  methods: {
    buildTree (items: any, parentkey?: any): any[] {
      const newItems: any[] = []
      items.map((item: any) => {
        const localChildren = getObjectValueByPath(item, this.$props.itemChildren, [])
        const itemKey = getObjectValueByPath(item, this.$props.itemKey, [])
        if (localChildren.length > 0) {
          const newChildren = this.buildTree(localChildren, itemKey)
          const clone = Object.assign({}, item)
          clone[this.$props.itemChildren] = newChildren
          newItems.push(clone)
          this.treeviewCashe.set(itemKey, item)
          this.parents.set(itemKey, parentkey)
        } else {
          this.parents.set(itemKey, parentkey)
        }
      })
      return newItems
    },
    getAllItems (items: any[], allItems: any[]) {
      items.map(item => {
        const localChildren = getObjectValueByPath(item, this.$props.itemChildren, [])
        if (localChildren.length > 0) {
          this.getAllItems(localChildren, allItems)
        } else {
          allItems.push(item)
        }
      })
    },
    updateTable (e: any[]) {
      if (this.$props.hierarchy) {
        this.currentNode = e[0]
      }
    },
    genDivider (): VNode {
      return this.$createElement(VDividerA, {
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
      this.updateDimensions();
      (this.$el as HTMLBaseElement).addEventListener('mousemove', this.Resizing)
    },
    Resizing (e: MouseEvent) {
      (this.$el as HTMLBaseElement).style.cursor = 'col-resize'
      this.$el.addEventListener('mouselive', this.endResizing)
      this.$el.addEventListener('mouseup', this.endResizing)
      this.treeWidth = e.x - this.x
    },
    endResizing () {
      (this.$el as HTMLBaseElement).removeEventListener('mousemove', this.Resizing);
      (this.$el as HTMLBaseElement).removeEventListener('mouselive', this.endResizing);
      (this.$el as HTMLBaseElement).removeEventListener('mouseup', this.endResizing);
      (this.$el as HTMLBaseElement).style.cursor = ''
    },
    /* resising parts of component */
    genPagination (): VNode| VNode[]| undefined {
      if (this.$props.itemsPerPage && Array.isArray(this.tableItems)) {
        // if (this.$props.itemsPerPage < this.tableItems.length) {
        if (this.$props.itemsPerPage < this.filteredTableItemsCount) {
          return [
            this.$createElement(VDividerA, {
              props: {
                vertical: false
              }
            }),
            this.$createElement(VPaginationA, {
              ref: 'data-table-pagination',
              props: {
                length: this.pageCount,
                dark: this.$props.dark,
                value: this.currentPage
              },
              style: {
                'vertical-align': 'bottom'
              },
              on: {
                input: (e: number) => { this.currentPage = e }
              }
            })
          ]
        }
      }
      return undefined
    },
    genItemIcon (item: any): VNode {
      const itemKey = getObjectValueByPath(item.item, this.$props.itemKey, [])
      let fn
      let color
      if (this.treeviewCashe.get(itemKey)) {
        if (this.openNodes.indexOf(itemKey) >= 0) {
          fn = this.$props.folderOpenIcon
        } else {
          fn = this.$props.folderIcon
        }
        color = this.$props.folderIconColor
      } else {
        fn = this.$props.itemIcon
        color = this.$props.itemIconColor
      }
      return this.$createElement(VIconA, {
        props: {
          color: color
        }
      }, fn)
    },
    genTableScopedSlots (): ScopedSlotType {
      let slots = tableScopedSlots(this.$scopedSlots)
      if (this.$props.folderIcon || this.$props.folderOpenIcon || this.$props.itemIcon) {
        slots = Object.assign(slots, { 'item.itemIcon': this.genItemIcon })
      }
      return slots as ScopedSlotType
    },
    genTable (): VNode {
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
      const TableScopedSlots = this.genTableScopedSlots()

      return this.$createElement(VAdvDataTable, {
        ref: 'data-table',
        props: {
          selected: this.$props.selectable,
          dense: this.$props.dense,
          headers: this.tableHeaders,
          items: this.tableItems,
          itemsPerPage: this.$props.itemsPerPage,
          page: this.currentPage,
          hideDefaultFooter: true,
          showSelect: this.$props.selectable,
          singleSelect: !this.$props.multiple,
          headerIcon: this.$props.headerIcon,
          headerIconColor: this.$props.headerIconColor,
          upIcon: this.$props.upIcon,
          downIcon: this.$props.downIcon,
          filterIcon: this.$props.filterIcon,
          filterActiveIcon: this.$props.filterActiveIcon,
          filterSelectionIcon: this.$props.filterSelectionIcon,
          filterActiveIconColor: this.$props.filterActiveIconColor,
          sortIcon: this.$props.sortIcon
        },
        style: {
          width: this.tableWidth + 'px'
        },
        scopedSlots: TableScopedSlots,
        on: {
          'click:row': (e: any) => this.synchronyzeActiveNode(e),
          'items-count-change': (e: number) => { this.filteredTableItemsCount = e }
        }
      }, slots)
    },
    getParents (key: number|string): any[] {
      const result = []
      const parent = this.parents.get(key)
      if (parent) {
        result.push(parent)
        const p = this.getParents(parent)
        result.push(...p)
      }
      return result
    },
    synchronyzeActiveNode (e: object) {
      const itemKey = getObjectValueByPath(e, this.$props.itemKey, [])
      this.currentNode = this.parents.get(itemKey)
      const parents = this.getParents(itemKey)
      this.openNodes.push(...parents)
      this.$nextTick(() => {})
    },
    genCombinedTreeViewSlot (props: any): VNode {
      if (this.$scopedSlots.prependTree) {
        return this.$createElement('div', {},
          [this.genItemIcon(props), this.$scopedSlots.prependTree(props)]
        )
      } else {
        return this.$createElement('div', {},
          [this.genItemIcon(props)]
        )
      }
    },
    genTreeViewScopedSlots (): ScopedSlotType {
      let slots
      if (this.$scopedSlots.prependTree && (this.$props.folderIcon || this.$props.folderOpenIcon)) {
        // needs combined scoped slot
        slots = Object.assign({}, { prepend: this.genCombinedTreeViewSlot })
        if (this.$scopedSlots.appendTree) {
          const slotAppend = this.$scopedSlots.appendTree
          slots = Object.assign({}, { append: (props: any) => slotAppend(props) })
        }
        if (this.$scopedSlots.labelTree) {
          const slotLabel = this.$scopedSlots.labelTree
          slots = Object.assign({}, { label: (props: any) => slotLabel(props) })
        }
      } else {
        slots = treeviewScopedSlots(this.$scopedSlots)
      }
      if (this.$props.folderIcon || this.$props.folderOpenIcon) {
        // if (!slots.prependTree) {
        //   const slotPrepend = this.$scopedSlots.labelTree
        //   slots = Object.assign(slots, { prepend: this.genItemIcon })
        // }
      }
      return slots as ScopedSlotType
    },
    genTreeView (): VNode {
      return this.$createElement(VTreeviewA, {
        ref: 'treeview',
        props: {
          dense: this.$props.dense,
          hoverable: this.$props.hoverable,
          multipleActive: false,
          search: this.$props.search,
          items: this.treeItems,
          active: [this.currentNode],
          activatable: true,
          activeClass: this.$props.activeClass,
          color: this.$props.color,
          expandIcon: this.$props.expandIcon,
          itemChildren: this.$props.itemChildren,
          itemDisabled: this.$props.itemDisabled,
          itemKey: this.$props.itemKey,
          itemText: this.$props.itemText,
          loadChildren: this.$props.loadChildren,
          loadingIcon: this.$props.loadingIcon,
          offIcon: this.$props.offIcon,
          onIcon: this.$props.onIcon,
          open: this.openNodes,
          openOnClick: this.$props.openOnClick,
          rounded: this.$props.rounded,
          selectable: false,
          selectedColor: this.$props.selectedColor,
          shaped: this.$props.shaped,
          transition: this.$props.transition
        },
        style: {
          width: this.treeWidth + 'px',
          padding: '16px'
        },
        scopedSlots: this.genTreeViewScopedSlots(),
        on: {
          'update:active': this.updateTable,
          'update:open': (e: any) => { this.openNodes = e }
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
  render (): VNode {
    return this.$createElement(VCardA, {},
      [
        this.$createElement(VRowA, {
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
