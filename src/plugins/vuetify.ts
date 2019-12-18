import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { VTreeSelect, VCascader, VDataGridSelect, VDateTimeSelect, VMdView, VPropEditor, VDataTableEditable } from '../components'

Vue.use(Vuetify,
  {
    components: {
      VTreeSelect,
      VCascader,
      VDataGridSelect,
      VDateTimeSelect,
      VMdView,
      VPropEditor,
      VDataTableEditable
    }
  })

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  }
})
