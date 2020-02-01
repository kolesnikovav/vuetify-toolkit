import Vue from 'vue'
import {
  VBtn,
  VIcon,
  VSelect,
  VTextField,
  VMenu,
  VDivider,
  VCard,
  VCardActions,
  VRow
} from '../../vuetify-import'
import VFilterValueList from './VFilterValueList'

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
      return [...new Set(this.getItemValues(this.header.value))]
    },
    conditions () {
      const result = []
      if (!this.header.datatype || this.header.datatype === 'string') {
        result.push({ id: 'contains', text: 'contains' })
        result.push({ id: 'startsWith', text: 'starts with' })
        result.push({ id: 'endsWith', text: 'ends with' })
      } else if (this.header.datatype === 'date' || this.header.datatype === 'number') {
        result.push({ id: 'lessThen', text: 'less than' })
        result.push({ id: 'moreThan', text: 'more than' })
        result.push({ id: 'between', text: 'between' })
        result.push({ id: 'equals', text: 'equals' })
      }
      return result
    },
    defaultCondition () {
      if (this.header.datatype === 'date' || this.header.datatype === 'number') {
        return { id: 'equals', text: 'equals' }
      }
      return { id: 'contains', text: 'contains' }
    },
    valueDataType () {
      if (!this.header.datatype || this.header.datatype === 'string') {
        return 'text'
      } else if (this.header.datatype === 'date') {
        return 'text'
      } else if (this.header.datatype === 'number') {
        return 'number'
      }
      return 'text'
    },
    filteredValues () {
      const conditions = this.selectedCondition ? this.selectedCondition : this.defaultCondition
      if (this.header.datatype) {
        if (this.header.datatype === 'date' || this.header.datatype === 'number') {
          if (conditions && conditions.id === 'lessThen' && this.filterText && this.filterText !== '') {
            return this.values.filter(v => v < this.filterText)
          } else if (conditions && conditions.id === 'moreThan' && this.filterText && this.filterText !== '') {
            return this.values.filter(v => v > this.filterText)
          } else if (conditions && conditions.id === 'equals' && this.filterText && this.filterText !== '') {
            return this.values.filter(v => v.toString() === this.filterText)
          } else if (conditions && conditions.id === 'between' && this.filterText && this.filterText !== '' && this.filterTextMax && this.filterTextMax !== '') {
            return this.values.filter(v => v >= this.filterText && v <= this.filterTextMax)
          } else return this.values
        }
      }
      if (this.filterText === '' || !this.filterText || !conditions) return this.values
      if (conditions.id === 'startsWith') {
        return this.values.filter(v => v.toString().toLocaleLowerCase().startsWith(this.filterText.toLocaleLowerCase()))
      } else if (conditions.id === 'endsWith') {
        return this.values.filter(v => v.toString().toLocaleLowerCase().endsWith(this.filterText.toLocaleLowerCase()))
      }
      return this.values.filter(v => v.toString().toLocaleLowerCase().indexOf(this.filterText.toLocaleLowerCase()) >= 0)
    },
    filteredValuesSelected () {
      const vals = []
      this.filteredValues.map(v => {
        vals.push({ text: v, selected: false })
      })
      return vals
    }
  },
  data: () => ({
    isMenuActive: false,
    dataHeaders: undefined,
    filterText: '',
    filterTextMax: '',
    selectedCondition: undefined
  }),
  methods: {
    setCondition (e) {
      this.selectedCondition = e
    },
    changeSelection () {

    },
    valueFilterChange (e) {
      this.filterText = e || ''
    },
    valueFilterChangeMax (e) {
      this.filterTextMax = e || ''
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
    genDualConditionsField () {
      return this.$createElement(VRow, {
        staticClass: 'v-dual-conditions-field-row'
      }, [
        this.$createElement(VTextField, {
          props: {
            type: this.valueDataType,
            label: 'min value',
            clearable: true,
            outlined: true,
            dark: this.dark,
            dense: true
          },
          on: {
            input: (e) => this.valueFilterChange(e)
          }
        }),
        this.$createElement(VTextField, {
          props: {
            type: this.valueDataType,
            label: 'max value',
            clearable: true,
            outlined: true,
            dark: this.dark,
            dense: true
          },
          on: {
            input: (e) => this.valueFilterChangeMax(e)
          }
        })
      ])
    },
    genMonoConditionsField () {
      return this.$createElement(VTextField, {
        props: {
          type: this.valueDataType,
          label: 'Filter by value',
          clearable: true,
          outlined: true,
          dark: this.dark,
          dense: true,
          appendIcon: 'check'
        },
        style: {
          'padding-left': '16px',
          'padding-right': '16px',
          'padding-top': '16px'
        },
        on: {
          input: (e) => this.valueFilterChange(e),
          'click:append': () => this.changeSelection()
        }
      })
    },
    genConditionsField () {
      if (this.selectedCondition && this.selectedCondition.id === 'between') {
        return this.genDualConditionsField()
      }
      return this.genMonoConditionsField()
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
        this.$createElement(VSelect, {
          props: {
            label: 'Filter by condition',
            items: this.conditions,
            itemKey: 'id',
            itemText: 'text',
            returnObject: true,
            value: this.selectedCondition ? this.selectedCondition : this.defaultCondition,
            outlined: true,
            dense: true
          },
          style: {
            'padding-left': '16px',
            'padding-right': '16px',
            'padding-top': '16px'
          },
          on: {
            change: (e) => this.setCondition(e)
          }
        }),
        this.genConditionsField(),
        this.$createElement(VFilterValueList, {
          props: {
            values: this.filteredValuesSelected
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
              click: () => { this.isMenuActive = false }
            }
          }),
          this.$createElement(VBtn, {
            props: {
              text: true,
              dark: this.dark,
              dense: this.dense
            },
            domProps: {
              innerHTML: 'OK'
            },
            on: {
              click: () => { this.isMenuActive = false }
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
