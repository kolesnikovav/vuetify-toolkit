import Vue, { VNode, PropType } from 'vue'
import { VDataTable, VIcon } from '../../vuetify-import'
import VColumnEditor from './VColumnEditor'
import VTableFilter from './VTableFilter'
import { TableHeader, FilterCondition, GetItem } from '../VAdvDataTable/utils/AdvTableUtils'
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
    valueFilterUpdateTracker: 1
  }),
  computed: {
    computedHeadersTable (): TableHeader[] {
      if (!this.dataHeaders) return []
      const headers = this.dataHeaders
      const defaultHeader = { text: '', sortable: false, width: '18px' }
      const index = headers.findIndex(h => h.value === 'data-table-settings')
      if (index < 0) headers.push({ ...defaultHeader, value: 'data-table-settings' })
      return headers
    },
    visibleHeaders (): TableHeader[] {
      return this.computedHeadersTable.filter((v: TableHeader) => v.visible || v.value === 'data-table-settings')
    },
    editedHeaders (): TableHeader[] {
      return this.dataHeaders.filter(v => v.value !== 'data-table-settings')
    },
    filteredItems (): any[] {
      if (this.valueFilterUpdateTracker || !this.valueFilterUpdateTracker) {
        return this.$props.items.filter((row: any) => {
          for (const [key, value] of this.valueFilter) {
            if (Array.isArray(value) && value.length > 0) {
              if (row[key] && value.indexOf(row[key]) === -1) return false
            }
          }
          return true
        })
      } else {
        return this.$props.items.filter((row: any) => {
          for (const [key, value] of this.valueFilter) {
            if (Array.isArray(value) && value.length > 0) {
              if (row[key] && value.indexOf(row[key]) === -1) return false
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
      this.dataHeaders = []
      if (this.$props.headers && this.$props.headers.length > 0) {
        for (let i = 0; i < this.$props.headers.length; i++) {
          const hdr = Object.assign({}, this.$props.headers[i])
          hdr.visible = true
          hdr.order = i
          this.dataHeaders.push(hdr)
        }
      }
    },
    genHeaderSettings (): VNode {
      return this.$createElement(VColumnEditor, {
        props: {
          headers: this.editedHeaders,
          headerIcon: this.$props.headerIcon,
          headerIconColor: this.$props.headerIconColor,
          dark: this.$props.dark,
          dense: this.$props.dense
        },
        on: {
          'headers-changed': (newHeaders: TableHeader[]) => {
            this.dataHeaders = newHeaders
            this.$nextTick()
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
    genDefaultHeader (header: TableHeader): VNode {
      return this.$createElement('div', {
        style: {
          'justify-content': 'flex-start',
          'align-content': 'center'
        }
      }, [
        this.$createElement('span', {
          style: {
            display: 'inline-block',
            'align-items': 'center'
          }
        }, [header.text]),
        header.filterable ? this.genFilter(header)
          : undefined,
        header.sortable ? this.genSortIcon()
          : undefined
      ])
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
      this.$props.headers.forEach((element: TableHeader) => {
        const slotName = 'header.' + element.value
        let currentSlot
        if (this.$scopedSlots[slotName]) {
          currentSlot = this.genDefaultHeaderWithSlot.bind(this, element, this.$scopedSlots[slotName])
        }
        slots = Object.assign(slots, currentSlot || this.genDefaultHeader.bind(this, element))
      })
      slots = Object.assign(slots, { 'header.data-table-settings': this.genHeaderSettings })
      return slots
    }
  },
  render (): VNode {
    const currentProps = Object.assign({}, this.$props)
    this.visibleHeaders.map(el => { el.sortable = false })
    currentProps.headers = this.visibleHeaders
    currentProps.items = this.filteredItems
    const scopedSlots = this.genTableScopedSlots()
    return this.$createElement(VDataTable, {
      props: currentProps,
      scopedSlots: scopedSlots
    })
  }
})
