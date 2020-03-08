import Vue, { PropType, VNode } from 'vue'
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
import { SelectableValue, TableHeader, FilterCondition, GetItem } from '../VAdvDataTable/utils/AdvTableUtils'

export default Vue.extend({
  name: 'v-table-filter',
  props: {
    header: Object as PropType<TableHeader>,
    getItemValues: {
      type: Function,
      default: Function as PropType<GetItem>
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
    filterActiveIconColor: {
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
    values (): string[]| number[] {
      if (this.valueDataType === 'text') {
        return [...new Set((this.getItemValues as GetItem)(this.header.value) as string[])]
      } else {
        return [...new Set((this.getItemValues as GetItem)(this.header.value) as number[])]
      }
    },
    conditions (): FilterCondition[] {
      const result: FilterCondition[] = []
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
    defaultCondition (): FilterCondition {
      if (this.header.datatype === 'date' || this.header.datatype === 'number') {
        return { id: 'equals', text: 'equals' }
      }
      return { id: 'contains', text: 'contains' }
    },
    valueDataType (): string {
      if (!this.header.datatype || this.header.datatype === 'string') {
        return 'text'
      } else if (this.header.datatype === 'date') {
        return 'text'
      } else if (this.header.datatype === 'number') {
        return 'number'
      }
      return 'text'
    },
    filteredValues (): string[]|number[] {
      const conditions = this.selectedCondition ? this.selectedCondition : this.defaultCondition
      if (this.header.datatype) {
        if (this.header.datatype === 'number') {
          const vals = this.values as number[]
          if (conditions && conditions.id === 'lessThen' && this.filterText && this.filterText !== '') {
            return vals.filter((v: number) => v < Number(this.filterText))
          } else if (conditions && conditions.id === 'moreThan' && this.filterText && this.filterText !== '') {
            return vals.filter((v: number) => v > Number(this.filterText))
          } else if (conditions && conditions.id === 'equals' && this.filterText && this.filterText !== '') {
            return vals.filter((v: number) => v === Number(this.filterText))
          } else if (conditions && conditions.id === 'between' && this.filterText && this.filterText !== '' &&
           this.filterTextMax && this.filterTextMax !== '') {
            return vals.filter((v: number) => v >= Number(this.filterText) && v <= Number(this.filterTextMax))
          } else return this.values
        } else if (this.header.datatype === 'date') {
          const vals = this.values as string[]
          if (conditions && conditions.id === 'lessThen' && this.filterText && this.filterText !== '') {
            return vals.filter((v: string) => v < this.filterText)
          } else if (conditions && conditions.id === 'moreThan' && this.filterText && this.filterText !== '') {
            return vals.filter((v: string) => v > this.filterText)
          } else if (conditions && conditions.id === 'equals' && this.filterText && this.filterText !== '') {
            return vals.filter((v: string) => v === this.filterText)
          } else if (conditions && conditions.id === 'between' && this.filterText && this.filterText !== '' &&
           this.filterTextMax && this.filterTextMax !== '') {
            return vals.filter((v: string) => v >= this.filterText && v <= this.filterTextMax)
          } else return this.values
        }
      }
      if (this.filterText === '' || !this.filterText || !conditions) return this.values
      const vals = this.values as string[]
      console.log(vals)
      if (conditions.id === 'startsWith') {
        return vals.filter(v => v.toLocaleLowerCase().startsWith(this.filterText.toLocaleLowerCase()))
      } else if (conditions.id === 'endsWith') {
        return vals.filter(v => v.toLocaleLowerCase().endsWith(this.filterText.toLocaleLowerCase()))
      }
      return vals.filter(v => v.toLocaleLowerCase().indexOf(this.filterText.toLocaleLowerCase()) >= 0)
    },
    filteredValuesSelected (): SelectableValue[] {
      const vals: SelectableValue[] = []
      if (this.valueDataType === 'number') {
        const filteredVals = this.filteredValues as number[]
        filteredVals.map(v => vals.push({ text: v.toString(), selected: true }))
      } else {
        const filteredVals = this.filteredValues as string[]
        filteredVals.map(v => {
          vals.push({ text: v, selected: true })
        })
      }
      return vals
    },
    resultValues (): string[] {
      const vals: string[] = []
      this.filteredValuesSelected.map((v:SelectableValue) => {
        if (this.unSelectedValues.indexOf(v.text) === -1) {
          vals.push(v.text)
        }
      })
      return vals
    }
  },
  data: () => ({
    isActive: false,
    isMenuActive: false,
    dataHeaders: undefined,
    filterText: '',
    filterTextMax: '',
    selectedCondition: undefined as FilterCondition|undefined,
    unSelectedValues: [] as string[]
  }),
  methods: {
    setCondition (e: FilterCondition) {
      this.selectedCondition = e
    },
    changeSelection (item: SelectableValue) {
      item.selected = !item.selected
      if (!item.selected) {
        this.unSelectedValues.push(item.text)
      } else {
        const i = this.unSelectedValues.indexOf(item.text)
        if (i > -1) {
          this.unSelectedValues.splice(i, 1)
        }
      }
    },
    clearFilter () {
      this.isMenuActive = false
      this.isActive = false
      this.unSelectedValues = []
      this.filterText = ''
      this.filterTextMax = ''
      this.selectedCondition = undefined
      this.$emit('clear-filter', this.header)
    },
    invertSelection () {
      const v:SelectableValue[] = []
      this.unSelectedValues = []
      this.filteredValuesSelected.map(item => {
        v.push({ text: item.text, selected: !item.selected })
        if (item.selected) {
          this.unSelectedValues.push(item.text)
        }
      })
      this.filteredValuesSelected = v
      this.$nextTick()
    },
    valueFilterChange (e?: string) {
      this.filterText = e || ''
    },
    valueFilterChangeMax (e?: string) {
      this.filterTextMax = e || ''
    },
    genActivator (listeners: any): VNode {
      return this.$createElement(VBtn, {
        props: {
          icon: true
        },
        slot: 'activator',
        on: {
          click: (e: any) => {
            e.stopPropagation()
            this.isMenuActive = !this.isMenuActive
          },
          listeners
        }
      }, [
        this.genIcon()
      ])
    },
    genIcon (): VNode {
      return this.$createElement(VIcon, {
        props: {
          color: this.isActive ? this.filterActiveIconColor : this.filterIconColor
        }
      }, [this.filterIcon])
    },
    genDualConditionsField (): VNode {
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
            input: (e: string|undefined) => this.valueFilterChange(e)
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
            input: (e: string|undefined) => this.valueFilterChangeMax(e)
          }
        })
      ])
    },
    genMonoConditionsField (): VNode {
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
          input: (e: string|undefined) => this.valueFilterChange(e),
          'click:append': () => this.invertSelection()
        }
      })
    },
    genConditionsField (): VNode {
      if (this.selectedCondition && this.selectedCondition.id === 'between') {
        return this.genDualConditionsField()
      }
      return this.genMonoConditionsField()
    },
    genMenuContent (): VNode|undefined {
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
            dense: true,
            dark: this.dark
          },
          style: {
            'padding-left': '16px',
            'padding-right': '16px',
            'padding-top': '16px'
          },
          on: {
            change: (e: FilterCondition) => this.setCondition(e)
          }
        }),
        this.genConditionsField(),
        this.$createElement(VFilterValueList, {
          props: {
            values: this.filteredValuesSelected
          },
          on: {
            'change-value-selection': (e: any, payload: SelectableValue) => {
              this.changeSelection(payload)
            }
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
              innerHTML: 'Clear'
            },
            on: {
              click: () => this.clearFilter()
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
              click: () => this.changeFilter()
            }
          })
        ])
      ])
    },
    changeFilter () {
      this.isMenuActive = false
      this.isActive = true
      this.$emit('filter-change', this.resultValues)
    }
  },
  render (): VNode {
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
