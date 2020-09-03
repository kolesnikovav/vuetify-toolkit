import { VueConstructor } from 'vue'
import VTreeSelect from './VTreeSelect'
import VCascader from './VCascader'
import VDataGridSelect from './VDataGridSelect'
import VDateTimeSelect from './VDateTimeSelect'
import VMdView from './VMdView'
import VAdvDataTable from './VAdvDataTable'

function VuetifyToolkit (v: VueConstructor) {
  v.component('v-tree-select', VTreeSelect)
  v.component('v-cascader', VCascader)
  v.component('v-data-grid-select', VDataGridSelect)
  v.component('v-date-time-select', VDateTimeSelect)
  v.component('v-md-view', VMdView)
  v.component('v-adv-data-table', VAdvDataTable)
}

export default VuetifyToolkit

export {
  VTreeSelect,
  VCascader,
  VDataGridSelect,
  VDateTimeSelect,
  VMdView,
  VAdvDataTable
}
