import Vue, { VNode, PropType } from 'vue'
import { VDataTable, VIcon } from '../../vuetify-import'
import VColumnEditor from './VColumnEditor'
import VTableFilter from './VTableFilter'
import { TableHeader, TableHeaderEdition, ColumnEditorResult } from '../VAdvDataTable/utils/AdvTableUtils'
import { ScopedSlot } from 'vue/types/vnode'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VDataTableProps = ((VDataTable as any).options as any).props

export default Vue.extend({
  name: 'v-adv-data-table',
  props: {
    headerIcon: {
      type: String,
      default: undefined
    },
    headerIconColor: {
      type: String,
      default: undefined
    },
    filterIcon: {
      type: String,
      default: undefined
    },
    filterActiveIcon: {
      type: String,
      default: undefined
    },
    filterActiveIconColor: {
      type: String,
      default: undefined
    },
    filterOnHover: {
      type: Boolean,
      default: false
    },
    upIcon: {
      type: String,
      default: 'expand_more'
    },
    downIcon: {
      type: String,
      default: 'expand_less'
    },
    sortIcon: {
      type: String,
      default: '$sort'
    },
    ...VDataTableProps,
    headers: Array as PropType<TableHeader[]>
  },
  data: () => ({
    isMenuActive: false,
    dataHeaders: [] as TableHeader[],
    valueFilter: new Map(),
    valueFilterUpdateTracker: 1,
    invisibleHeaders: new Set<string>(),
    order: [] as TableHeaderEdition[]
  }),
  computed: {
    computedHeadersTable (): TableHeader[] {
      const headers = this.$props.headers.slice()
      const defaultHeader = { text: '', sortable: false, width: '18px' }
      const index = headers.findIndex((h: TableHeader) => h.value === 'data-table-settings')
      if (index < 0) headers.push({ ...defaultHeader, value: 'data-table-settings' })
      return headers
    },
    visibleHeaders (): TableHeader[] {
      const headers: TableHeader[] = []
      this.order.forEach(val => {
        const current = this.$props.headers.find((v:TableHeader) => v.value === val.value)
        if (current) headers.push(current)
      })
      const defaultSeettings = this.computedHeadersTable.find((v:TableHeader) => v.value === 'data-table-settings')
      if (defaultSeettings) headers.push(defaultSeettings)
      return headers.filter((v: TableHeader) => !this.invisibleHeaders.has(v.value) || v.value === 'data-table-settings')
    },
    editedHeaders (): TableHeader[] {
      const headers: TableHeader[] = []
      this.order.forEach(val => {
        const current = this.$props.headers.find((v:TableHeader) => v.value === val.value)
        if (current) headers.push(current)
      })
      headers.map((v: TableHeader) => {
        if (!this.invisibleHeaders.has(v.value)) v.visible = true
        else v.visible = false
      })
      return headers
    },
    filteredItems (): any[] {
      if (this.valueFilterUpdateTracker || !this.valueFilterUpdateTracker) {
        return this.$props.items.filter((row: any) => {
          for (const [key, value] of this.valueFilter) {
            if (Array.isArray(value) && value.length > 0) {
              if (row[key] && value.indexOf(row[key].toString()) === -1) return false
            }
          }
          return true
        })
      } else {
        return this.$props.items.filter((row: any) => {
          for (const [key, value] of this.valueFilter) {
            if (Array.isArray(value) && value.length > 0) {
              if (row[key] && value.indexOf(row[key].toString()) === -1) return false
            }
          }
          return true
        })
      }
    }
  },
  created () {
    this.refreshHeaders()
  },
  methods: {
    refreshHeaders () {
      this.order = []
      this.$props.headers.map((v:TableHeader) => {
        this.order.push({
          value: v.value,
          text: v.text,
          visible: true
        })
      })
    },
    genHeaderSettings (): VNode {
      return this.$createElement(VColumnEditor, {
        props: {
          editedHeaders: this.editedHeaders,
          headerIcon: this.$props.headerIcon,
          headerIconColor: this.$props.headerIconColor,
          upIcon: this.$props.upIcon,
          downIcon: this.$props.downIcon,
          dark: this.$props.dark,
          dense: this.$props.dense
        },
        on: {
          'headers-changed': (newSettings: ColumnEditorResult) => {
            this.$nextTick(() => {
              this.invisibleHeaders = newSettings.invisible
              this.order = newSettings.order
            })
          }
        }
      })
    },
    getValues (val: string) {
      return this.$props.items.map((v: any) => v[val])
    },
    applyFilter (vals: any[], header: TableHeader) {
      if (header.value) {
        this.valueFilter.set(header.value, vals)
        this.valueFilterUpdateTracker += 1
      }
    },
    clearFilter (header: TableHeader) {
      if (header.value && this.valueFilter.has(header.value)) {
        this.valueFilter.delete(header.value)
        this.valueFilterUpdateTracker += 1
      }
    },
    genFilter (header: TableHeader): VNode {
      return this.$createElement(VTableFilter, {
        props: {
          header: header,
          getItemValues: this.getValues,
          filterIcon: this.$props.filterIcon,
          filterActiveIcon: this.$props.filterActiveIcon,
          filterIconColor: this.$props.filterIconColor,
          filterActiveIconColor: this.$props.filterActiveIconColor,
          dense: this.$props.dense,
          dark: this.$props.dark
        },
        on: {
          'filter-change': (values: any[]) => this.applyFilter(values, header),
          'clear-filter': (header: TableHeader) => this.clearFilter(header)
        }
      })
    },
    genSortIcon (): VNode {
      return this.$createElement(VIcon, {
        staticClass: 'v-data-table-header__icon',
        props: {
          size: 18
        }
      }, [this.$props.sortIcon])
    },
    genDefaultHeader (header: TableHeader): VNode[] {
      const res = [] as VNode[]
      res.push(
        this.$createElement('span', {
          style: {
            display: 'inline-block',
            'align-items': 'center'
          }
        }, [header.text])
      )
      if (header.filterable) res.push(this.genFilter(header))
      if (header.sortable) res.push(this.genSortIcon())
      return res
    },
    genDefaultHeaderWithSlot (header: TableHeader, slot: any): VNode[] {
      const res = []
      res.push(slot.call(this))
      if (header.filterable) {
        res.push(this.genFilter(header))
      }
      if (header.sortable) {
        res.push(this.genSortIcon())
      }
      return res
    },
    genTableScopedSlots (): {[key: string]: ScopedSlot| undefined}| undefined {
      let slots = {}
      this.visibleHeaders.forEach((element: TableHeader) => {
        const slotName = 'header.' + element.value
        let currentSlot
        if (this.$scopedSlots[slotName]) {
          currentSlot = this.genDefaultHeaderWithSlot.bind(this, element, this.$scopedSlots[slotName])
        }
        const slotnew: any = {} as any
        (slotnew as any)[slotName] = currentSlot || this.genDefaultHeader.bind(this, element)
        slots = Object.assign(slots, slotnew)
        const slotNameItemName = 'item.' + element.value
        let currentSlotItem
        if (this.$scopedSlots[slotNameItemName]) {
          currentSlotItem = this.$scopedSlots[slotNameItemName]
          const slotnewItem: any = {} as any
          (slotnewItem as any)[slotNameItemName] = currentSlotItem
          slots = Object.assign(slots, slotnewItem)
        }
      })
      slots = Object.assign(slots, { 'header.data-table-settings': this.genHeaderSettings })
      return slots
    }
  },
  render (): VNode {
    const currentProps = Object.assign({}, this.$props)
    currentProps.headers = this.visibleHeaders
    currentProps.items = this.filteredItems
    const scopedSlots = this.genTableScopedSlots()
    return this.$createElement(VDataTable, {
      props: currentProps,
      scopedSlots: scopedSlots
    })
  }
})
