import Vue from 'vue'
import { VDataTable } from '../../vuetify-import'

/* @vue/component */
export default Vue.extend({
  name: 'v-data-table-editable',
  props: {
    ...VDataTable.options.props
  },
  computed: {

  },
  methods: {

  },
  render () {
    return this.$createElement(VDataTable, {
      props: this.$props
    })
  }

})
