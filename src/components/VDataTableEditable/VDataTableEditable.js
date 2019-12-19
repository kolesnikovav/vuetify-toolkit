import Vue from 'vue'
import { VDataTable, VBtn, VIcon, VMenu, VListItem, VList } from '../../vuetify-import'
import { VPropEditor } from '../VPropEditor'

/* @vue/component */
export default Vue.extend({
  name: 'v-data-table-editable',
  props: {
    ...VDataTable.options.props
  },
  data: () => ({
    isMenuActive: false,
    x: 0,
    y: 0
  }),
  computed: {
    tableHeaders () {
      const result = this.headers
      const tHeader = {
        text: '',
        value: 'settings-header',
        align: 'start',
        sortable: false,
        filterable: false,
        divider: false,
        width: 20
      }
      result.push(tHeader)
      return result
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuActive = !this.isMenuActive
    },
    genList () {
      return this.$createElement(VList, {

      }, [
        this.$createElement(VListItem, 'dadasdas')
      ])
    },
    genMenu () {
      if (this.isMenuActive) {
        const btn = this.$refs['settings-button'].$el.getBoundingClientRect()
        const propEditor = this.$createElement(VPropEditor, {
          headers: this.headers
        })
        return this.$createElement(VMenu, {
          props: {
            positionX: btn.x,
            positionY: btn.y,
            absolute: true,
            model: true
          }
        }, [this.genList(), propEditor])
      } else return undefined
    },
    genHeader () {
      if (this.$slots.header) {
        return this.$createElement('template', {
          slot: 'header'
        }, [
          this.$slots.header,
          this.genBtn()
        ])
      } else {

      }
    },
    genBtn () {
      return this.$createElement(VBtn, {
        ref: 'settings-button',
        props: {
          icon: true
        },
        slot: 'activator',
        on: {
          click: (e) => {
            e.stopPropagation()
            e.preventDefault()
            this.toggleMenu()
          }
        }
      }, [
        this.$createElement(VIcon, 'mdi-settings')
      ])
    }
  },
  render () {
    const currentProps = this.$props
    currentProps.headers = this.tableHeaders
    return this.$createElement(VDataTable, {
      props: currentProps,
      slots: {
        header: this.genHeader()
      },
      scopedSlots: {
        'header.settings-header': () => this.genBtn()
      }
    }, [
      this.genMenu()
    ])
  }
})
