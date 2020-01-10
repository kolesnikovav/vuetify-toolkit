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
    isMenuActive: false
  }),
  computed: {
    computedHeadersTable () {
      if (!this.headers) return []
      const headers = this.headers
      const defaultHeader = { text: '', sortable: false, width: '18px' }
      const index = headers.findIndex(h => h.value === 'data-table-settings')
      if (index < 0) headers.push({ ...defaultHeader, value: 'data-table-settings' })
      return headers
    }
  },
  methods: {
    genHeaderSettings () {
      const editedHeaders = this.headers.filter(v => v.value !== 'data-table-settings')
      return this.$createElement(VColumnEditor, {
        props: {
          headers: editedHeaders,
          headerIcon: this.headerIcon,
          headerIconColor: this.headerIconColor,
          dark: this.dark,
          dense: this.dense
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
    const currentProps = this.$props
    currentProps.headers = this.computedHeadersTable

    const scopedSlots = this.genTableScopedSlots()
    return this.$createElement(VDataTable, {
      props: currentProps,
      scopedSlots: scopedSlots
    }, this.$slots)
  }
})
