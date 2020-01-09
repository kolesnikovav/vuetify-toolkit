import Vue from 'vue'
import { VDataTable } from '../../vuetify-import'
import VColumnEditor from './VColumnEditor'
import placeSettingsBar from './VPlaceSettingsBar'

export default Vue.extend({
  name: 'v-adv-data-table',
  directives: {
    placeSettingsBar
  },
  props: {
    headerIcon: {
      type: String,
      default: undefined
    },
    headerIconColor: {
      type: String,
      default: undefined
    },
    upIcon: {
      type: String,
      default: 'expand_more'
    },
    downIcon: {
      type: String,
      default: 'expand_less'
    },
    ...VDataTable.options.props
  },
  computed: {

  },
  mounted () {
    const head = this.$el.getElementsByTagName('thead')
    if (head) {
      const tHeaders = head[0].getElementsByTagName('tr')
      if (tHeaders) {
        // tHeaders.in
        console.log(tHeaders[0].vm)
        // tHeaders[0].insertBefore(this.genHeader().el, tHeaders[0])
      }
    }
  },
  methods: {
    genHeader () {
      return this.$createElement(VColumnEditor, {
        props: {
          headers: this.headers,
          headerIcon: this.headerIcon,
          headerIconColor: this.headerIconColor,
          dark: this.dark,
          dense: this.dense
        }
      })
    }
  },
  render () {
    // const currentProps = this.$props
    // const slots = [
    //   'body',
    //   'body.append',
    //   'body.prepend',
    //   'footer',
    //   'loading',
    //   'no-data',
    //   'no-results',
    //   'progress',
    //   'top'
    // ]
    //   .filter(slotName => this.$slots[slotName])
    //   .map(slotName => this.$createElement('template', {
    //     slot: slotName
    //   }, this.$slots[slotName]))
    // slots.push(this.$createElement('template', {
    //   slot: 'header'
    // }, [
    //   this.genHeader()
    // ]))
    // return this.$createElement(VDataTable, {
    //   props: currentProps
    // }, slots)
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
    const dataTable = this.$createElement(VDataTable, {
      props: currentProps,
      directives: [
        {
          name: 'v-place-settings-bar'
        }
      ]
    }, slots)
    const a = dataTable.el
    console.log(a)
    return dataTable
  }
})
