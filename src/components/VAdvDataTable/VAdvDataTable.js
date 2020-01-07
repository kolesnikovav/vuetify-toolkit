import Vue from 'vue'
import { VDataTable } from '../../vuetify-import'
import VColumnEditor from './VColumnEditor'

export default Vue.extend({
  name: 'v-adv-data-table',
  props: {
    headerIcon: {
      type: String,
      default: undefined
    },
    headerIconColor: {
      type: String,
      default: undefined
    },
    ...VDataTable.options.props
  },
  computed: {

  },
  methods: {
    genHeader () {
      return this.$createElement(VColumnEditor, {
        props: {
          headers: this.headers,
          headerIcon: this.headerIcon,
          headerIconColor: this.headerIconColor
        }
      })
    }
  },
  render () {
    const currentProps = this.$props
    const slots = [
      'body',
      'body.append',
      'body.prepend',
      'footer',
      'loading',
      'no-data',
      'no-results',
      'progress',
      'top'
    ]
      .filter(slotName => this.$slots[slotName])
      .map(slotName => this.$createElement('template', {
        slot: slotName
      }, this.$slots[slotName]))
    slots.push(this.$createElement('template', {
      slot: 'header'
    }, [
      this.genHeader()
    ]))
    return this.$createElement(VDataTable, {
      props: currentProps
    }, slots)
  }
})
