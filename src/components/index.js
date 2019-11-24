import VTreeSelect from './VTreeSelect'
import VCascader from './VCascader'
import VDataGridSelect from './VDataGridSelect'
import VDateTimeSelect from './VDateTimeSelect'
import VMdView from './VMdView'

import Vuetify from 'vuetify/lib'

const install = Vuetify.install

const components = {
  VTreeSelect,
  VCascader,
  VDataGridSelect,
  VDateTimeSelect,
  VMdView
}

Vuetify.install = (Vue, args) => {
  install.call(Vuetify, Vue, {
    components
  })
}

export default {
  VTreeSelect,
  VCascader,
  VDataGridSelect,
  VDateTimeSelect,
  VMdView
}

export {
  VTreeSelect,
  VCascader,
  VDataGridSelect,
  VMdView
}
