import Vue from 'vue'
import {
  VBtn,
  VIcon,
  VMenu,
  VDivider,
  VCard,
  VCardActions
} from '../../vuetify-import'
import VFilterValueList from './VFilterValueList'
import { VTextField } from 'vuetify/lib'

export default Vue.extend({
  name: 'v-table-filter',
  props: {
    header: {
      type: Object
    },
    getItemValues: {
      type: Function
    },
    filterIcon: {
      type: String,
      default: undefined
    },
    filterActiveIcon: {
      type: String,
      default: undefined
    },
    filterIconColor: {
      type: String,
      default: undefined
    },
    dark: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    values () {
      return this.getItemValues(this.header.value)
    },
    filteredValues () {
      return (this.filterText === '' || !this.filterText) ? this.values
        : this.values.filter(v => v.toString().toLocaleLowerCase().indexOf(this.filterText.toLocaleLowerCase()) >= 0)
    }
  },
  data: () => ({
    isMenuActive: false,
    dataHeaders: undefined,
    filterText: ''
  }),
  methods: {
    deactivateMenu (e, payload) {
      if (payload === 'CLOSE') {
        this.isMenuActive = true
      } else {
        e.stopPropagation()
        this.isMenuActive = false
        if (payload === 'OK') {
          this.$emit('headers-changed', this.resultHeaders)
        }
      }
    },
    valueFilterChange (e) {
      this.filterText = e || ''
    },
    genActivator (listeners) {
      return this.$createElement(VBtn, {
        props: {
          icon: true
        },
        slot: 'activator',
        on: {
          click: (e) => {
            e.stopPropagation()
            this.isMenuActive = !this.isMenuActive
          },
          listeners
        }
      }, [
        this.genIcon()
      ])
    },
    genIcon () {
      return this.$createElement(VIcon, {
        props: {
          color: this.filterIconColor
        }
      }, [this.filterIcon])
    },
    genMenuContent () {
      if (!this.header || !this.header.value) return
      return this.$createElement(VCard, {
        props: {
          dark: this.dark,
          dense: this.dense
        }
      },
      [
        this.$createElement(VTextField, {
          props: {
            label: 'Filter by condition',
            clearable: true,
            outlined: true,
            dense: true,
            appendIcon: 'place'
          },
          style: {
            'padding-left': '16px',
            'padding-right': '16px',
            'padding-top': '16px'
          }
        }),
        this.$createElement(VTextField, {
          props: {
            label: 'Filter by value',
            clearable: true,
            outlined: true,
            dense: true,
            appendIcon: 'place'
          },
          style: {
            'padding-left': '16px',
            'padding-right': '16px',
            'padding-top': '16px'
          },
          on: {
            input: (e) => this.valueFilterChange(e)
          }
        }),
        this.$createElement(VFilterValueList, {
          props: {
            values: this.filteredValues
          }
        }),
        this.$createElement(VDivider, {}),
        this.$createElement(VCardActions, {
          style: {
            'justify-content': 'flex-end'
          },
          props: {
            dark: this.dark,
            dense: this.dense
          }
        }, [
          this.$createElement(VBtn, {
            props: {
              text: true,
              dark: this.dark,
              dense: this.dense
            },
            domProps: {
              innerHTML: 'Cancel'
            },
            on: {
              click: (e) => this.deactivateMenu(e, 'CANCEL')
            }
          }),
          this.$createElement(VBtn, {
            props: {
              text: true,
              dark: this.dark,
              dense: this.dense
            },
            on: {
              click: (e) => this.deactivateMenu(e, 'OK')
            },
            domProps: {
              innerHTML: 'OK'
            }
          })
        ])

      ])
    }

  },
  render () {
    const self = this
    return this.$createElement(VMenu, {
      props: {
        closeOnContentClick: false,
        value: this.isMenuActive,
        dark: this.dark,
        dense: this.dense
      },
      on: {
        input: (e) => this.deactivateMenu(e, 'CLOSE')
      },
      slot: 'header.data-table-settings',
      scopedSlots: {
        'activator' (on) {
          return self.genActivator(on)
        }
      }
    }, [
      this.genMenuContent()
    ])
  }
})
