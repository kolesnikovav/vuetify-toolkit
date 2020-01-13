import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { VTreeSelect, VCascader, VDataGridSelect, VDateTimeSelect, VMdView, VAdvDataTable } from '../components'

Vue.use(Vuetify,
  {
    components: {
      VTreeSelect,
      VCascader,
      VDataGridSelect,
      VDateTimeSelect,
      VMdView,
      VAdvDataTable
    }
  })

export default new Vuetify({})
