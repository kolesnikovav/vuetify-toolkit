import VTreeSelect from './VTreeSelect'
import VCascader from './VCascader'
import VDataGridSelect from './VDataGridSelect'

import Vuetify from 'vuetify/lib'

const install = Vuetify.install

const components = {
  VTreeSelect,
  VCascader,
  VDataGridSelect
}

Vuetify.install = (Vue, args) => {
  install.call(Vuetify, Vue, {
    components
  })
}

export default {
  VTreeSelect,
  VCascader,
  VDataGridSelect
}

export {
  VTreeSelect,
  VCascader,
  VDataGridSelect
}
