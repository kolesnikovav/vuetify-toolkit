import VuetifyToolkit from './framework'
import VTreeSelect from './VTreeSelect'
import VCascader from './VCascader'
import VDataGridSelect from './VDataGridSelect'
import VDateTimeSelect from './VDateTimeSelect'
import VMdView from './VMdView'
import VAdvDataTable from './VAdvDataTable'

export default VuetifyToolkit

export {
  VTreeSelect,
  VCascader,
  VDataGridSelect,
  VDateTimeSelect,
  VMdView,
  VAdvDataTable
}

const install = VuetifyToolkit.install

const components = {
  'v-tree-select': VTreeSelect,
  'v-cascader': VCascader,
  'v-data-grid-select': VDataGridSelect,
  'v-date-time-select': VDateTimeSelect,
  'v-md-view': VMdView,
  'v-adv-data-table': VAdvDataTable
}

VuetifyToolkit.install = (Vue, args) => {
  install.call(VuetifyToolkit, Vue, {
    components
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuetifyToolkit)
}
