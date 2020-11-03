import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { VTreeSelect, VCascader, VDataGridSelect, VDateTimeSelect, VMdView, VAdvDataTable, VTootipBtn } from '../components'

Vue.use(Vuetify,
  {
    components: {
      VTreeSelect,
      VCascader,
      VDataGridSelect,
      VDateTimeSelect,
      VMdView,
      VAdvDataTable,
      VTootipBtn
    }
  }
)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  }
})
