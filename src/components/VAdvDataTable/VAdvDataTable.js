import Vue from 'vue'
import { VDataTable, VIcon } from '../../vuetify-import'
import VColumnEditor from './VColumnEditor'
import VTableFilter from './VTableFilter'

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
    ...VDataTable.options.props
  },
  data: () => ({
    isMenuActive: false,
    dataHeaders: [],
    valueFilter: new Map()
  }),
  computed: {
    computedHeadersTable () {
      if (!this.dataHeaders) return []
      const headers = this.dataHeaders
      const defaultHeader = { text: '', sortable: false, width: '18px' }
      const index = headers.findIndex(h => h.value === 'data-table-settings')
      if (index < 0) headers.push({ ...defaultHeader, value: 'data-table-settings' })
      return headers
    },
    visibleHeaders () {
      return this.computedHeadersTable.filter(v => v.visible || v.value === 'data-table-settings')
    },
    editedHeaders () {
      return this.dataHeaders.filter(v => v.value !== 'data-table-settings')
    },
    filteredItems: {
      get: function () {
        return this.items.filter(row => {
          for (const [key, value] of this.valueFilter) {
            console.log(key)
            console.log(value)
            if (Array.isArray(value) && value.length > 0) {
              if (row[key] && value.indexOf(row[key]) === -1) return false
            }
          }
          return true
        })
      },
      set: function (payload) {
        console.log(payload)
        this.filteredItems.filter(row => {
          return (row[payload.header] && payload.values.indexOf(row[payload.header]) >= 0)
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
      if (this.headers && this.headers.length > 0) {
        for (let i = 0; i < this.headers.length; i++) {
          const hdr = Object.assign({}, this.headers[i])
          hdr.visible = true
          hdr.order = i
          this.dataHeaders.push(hdr)
        }
      }
    },
    genHeaderSettings () {
      return this.$createElement(VColumnEditor, {
        props: {
          headers: this.editedHeaders,
          headerIcon: this.headerIcon,
          headerIconColor: this.headerIconColor,
          dark: this.dark,
          dense: this.dense
        },
        on: {
          'headers-changed': (newHeaders) => {
            this.dataHeaders = newHeaders
            this.$nextTick()
          }
        }
      })
    },
    getValues (val) {
      return this.items.map(v => v[val])
    },
    applyFilter (vals, header) {
      if (header.value) {
        this.valueFilter.set(header.value, vals)
        const payload = { header: header.value, values: vals }
        this.filteredItems = payload
      }
    },
    genFilter (header) {
      return this.$createElement(VTableFilter, {
        props: {
          header: header,
          getItemValues: this.getValues,
          filterIcon: this.filterIcon,
          filterActiveIcon: this.filterActiveIcon,
          filterIconColor: this.filterIconColor,
          filterActiveIconColor: this.filterActiveIconColor,
          dense: this.dense,
          dark: this.dark
        },
        on: {
          'filter-change': (values) => this.applyFilter(values, header)
        }
      })
    },
    genSortIcon () {
      return this.$createElement(VIcon, {
        staticClass: 'v-data-table-header__icon',
        props: {
          size: 18
        }
      }, [this.sortIcon])
    },
    genDefaultHeader (header) {
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
    genDefaultHeaderWithSlot (header, slot) {
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
    genTableScopedSlots () {
      let slots = {}
      this.headers.forEach(element => {
        const slotName = 'header.' + element.value
        let currentSlot
        if (this.$scopedSlots[slotName]) {
          currentSlot = this.genDefaultHeaderWithSlot.bind(this, element, this.$scopedSlots[slotName])
        }
        const slotnew = {}
        slotnew[slotName] = currentSlot || this.genDefaultHeader.bind(this, element)
        slots = Object.assign(slots, slotnew)
      })
      slots = Object.assign(slots, { 'header.data-table-settings': this.genHeaderSettings })
      return slots
    }
  },
  render () {
    const currentProps = Object.assign({}, this.$props)
    this.visibleHeaders.map(el => { el.sortable = false })
    currentProps.headers = this.visibleHeaders
    console.log(this.filteredItems)
    currentProps.items = this.filteredItems
    const scopedSlots = this.genTableScopedSlots()
    return this.$createElement(VDataTable, {
      props: currentProps,
      scopedSlots: scopedSlots
    }, this.$slots)
  }
})
