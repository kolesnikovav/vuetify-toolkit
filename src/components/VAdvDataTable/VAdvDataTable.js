import Vue from 'vue'
import { VDataTable } from '../../vuetify-import'
import VColumnEditor from './VColumnEditor'
// eslint-disable-next-line no-unused-vars
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
    ...VDataTable.options.props
  },
  data: () => ({
    isMenuActive: false,
    dataHeaders: []
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
    editedHeaders () {
      return this.dataHeaders.filter(v => v.value !== 'data-table-settings')
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
        }
      })
    },
    genDefaultHeader (header) {
      return this.$createElement('div', {
        style: {
          display: 'flex',
          'justify-content': 'flex-start',
          'align-content': 'center'
        }
      }, [
        this.$createElement('span', {
          style: {
            display: 'inline-block'
          }
        }, [header.text]),
        this.genFilter(header)
      ])
    },
    genDefaultHeaderWithSlot (header, slot) {
      const res = []
      res.push(slot.call(this))
      res.push(this.genFilter(header))
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
    const visibleHeaders = this.computedHeadersTable.filter(v => v.visible || v.value === 'data-table-settings')
    currentProps.headers = visibleHeaders
    const scopedSlots = this.genTableScopedSlots()
    return this.$createElement(VDataTable, {
      props: currentProps,
      scopedSlots: scopedSlots
    }, this.$slots)
  }
})
