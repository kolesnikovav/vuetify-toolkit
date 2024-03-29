import Vue, { VueConstructor, Component } from 'vue'
import VTreeSelect from './VTreeSelect'
import VCascader from './VCascader'
import VDataGridSelect from './VDataGridSelect'
import VDateTimeSelect from './VDateTimeSelect'
import VMdView from './VMdView'
import VAdvDataTable from './VAdvDataTable'
import VTootipBtn from './VTootipBtn'
import VContextMenu from './VContextMenu'

export interface VuetifyToolkitUseOptions {
  components?: Record<string, Component>
}

const defaultComponents = {
  'v-tree-select': VTreeSelect,
  'v-cascader': VCascader,
  'v-data-grid-select': VDataGridSelect,
  'v-date-time-select': VDateTimeSelect,
  'v-md-view': VMdView,
  'v-adv-data-table': VAdvDataTable,
  'v-tooltip-btn': VTootipBtn,
  'v-context-menu': VContextMenu
}

function VuetifyToolkit (v: VueConstructor, args?: VuetifyToolkitUseOptions): VueConstructor<Vue> {
  const components = args ? args.components : defaultComponents
  for (const key in components) {
    const component = components[key]
    if (component) {
      v.component(key, component as typeof v)
    }
  }
  return v
}

export default VuetifyToolkit

export {
  VTreeSelect,
  VCascader,
  VDataGridSelect,
  VDateTimeSelect,
  VMdView,
  VAdvDataTable,
  VTootipBtn,
  VContextMenu
}

Vue.use(VuetifyToolkit)
