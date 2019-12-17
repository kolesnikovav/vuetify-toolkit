import Vue from 'vue'
import { VBtn, VCard, VListItem, VSelect, VRow, VCheckbox } from '../../vuetify-import'

/* @vue/component */
export default Vue.extend({
  name: 'v-prop-editor',
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    icon: {
      type: [String, Function],
      default: undefined
    },
    iconColor: {
      type: [String, Function],
      default: undefined
    }
  },
  data: () => ({
    isMenuActive: false
  }),
  computed: {

  },
  methods: {
    genSortSelect () {
      return this.$createElement(VSelect, {
        props: {
          items: [
            'Asc',
            'Desc',
            'No'
          ]
        }
      })
    },
    genCheckBox () {
      return this.$createElement(VCheckbox, {
        props: {
          items: [
            'Asc',
            'Desc',
            'No'
          ]
        }
      })
    },
    genText (text) {
      return this.$createElement('div', {
        props: {
        }
      }, text)
    },
    genItem (item) {
      return this.$createElement(VListItem, {

      }, [
        this.genCheckBox(),
        this.genText(item.name),
        this.genSortSelect()
      ])
    }
  },
  render () {
    if (!this.isMenuActive) {
      return this.$createElement(VBtn, {
        props: {
          icon: true
        },
        on: {
          click: () => {
            this.isMenuActive = true
          }
        }
      })
    }
    const content = []
    this.headers.map(item => {
      content.push(this.genItem(item))
    })
    return this.$createElement(VCard, {},
      [
        this.$createElement(VRow, {
          props: {
            align: 'stretch'
          }
        }, [
          ...content
        ])
      ])
  }

})
