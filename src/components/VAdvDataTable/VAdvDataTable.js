import Vue from 'vue'
import { VDataTable } from '../../vuetify-import'
import VColumnEditor from './VColumnEditor'

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
    genTableScopedSlots () {
      let slots = this.$scopedSlots
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
