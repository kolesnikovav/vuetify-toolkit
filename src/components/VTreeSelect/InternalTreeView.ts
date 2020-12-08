import { VTreeviewA } from '../../shims-vuetify'

export default VTreeviewA.extend({
  name: 'v-internal-treeview',
  props: {
    initialItem: {
      default: null
    },
    allowSelectParents: {
      type: Boolean,
      default: false
    }
  },
  methods: {

  }
})
