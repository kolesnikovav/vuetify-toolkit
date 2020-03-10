import Vue, { VNode } from 'vue'
import { VDatePicker, VTimePicker, VRow, VCol, VBtn, VSheet } from '../../vuetify-import'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VDatePickerProps = ((VDatePicker as any).options as any).props

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VTimePickerProps = ((VTimePicker as any).options as any).props

export default Vue.extend({
  name: 'v-date-time-select-list',
  props: {
    ...VDatePickerProps,
    ...VTimePickerProps,
    selectionType: {
      type: String,
      default: 'datetime',
      validator: (v: string) => ['date', 'time', 'datetime'].includes(v)
    },
    dark: Boolean,
    dense: Boolean,
    locale: String,
    maxDate: String,
    minDate: String,
    maxTime: String,
    minTime: String,
    readonlyDate: Boolean,
    readonlyTime: Boolean,
    scrollableDate: Boolean,
    scrollableTime: Boolean,
    disabledDate: Boolean,
    disabledTime: Boolean,
    widthSelector: Number
  },
  data: () => ({
    selectedDate: '',
    selectedTime: '',
    datePickerWidth: 290
  }),
  computed: {
  },
  methods: {
    genHeader (): VNode {
      const headerText = this.$createElement('div', {
        style: {
          'font-size': '30px',
          'text-align': 'center',
          justify: 'center',
          'font-weight': 500
        }
      },
      [this.selectedDate + ':' + this.selectedTime])
      const btnOK = this.$createElement(VBtn, {
        props: {
          text: true
        },
        on: {
          click: (e: string) => { this.$emit('input-value', this.selectedDate + ':' + this.selectedTime) }
        }
      }, 'OK')
      const btnCancel = this.$createElement(VBtn, {
        props: {
          text: true
        },
        on: {
          click: () => { this.$emit('close-menu') }
        }
      }, 'Cancel')
      const btnBlock = this.$createElement('div', {
        style: {
          'align-items': 'center',
          display: 'flex',
          'justify-content': 'end'
        }
      }, [btnCancel, btnOK])
      return this.$createElement('div', {
        staticClass: 'v-date-picker-header',
        class: {
          // ...this.themeClasses
        },
        style: {
          width: '100%',
          height: '48px',
          background: this.$props.color ? this.$props.color : 'primary',
          'align-items': 'center',
          display: 'flex',
          'justify-content': 'space-between'
        }
      }, [
        headerText,
        btnBlock
      ])
    },
    genDatePicker (): VNode {
      return this.$createElement(VCol, {},
        [
          this.$createElement(VDatePicker, {
            props: {
              locale: this.$props.locale,
              dark: this.$props.dark,
              allowedDates: this.$props.allowedDates,
              dayFormat: this.$props.dayFormat,
              disabledDate: this.$props.disabledDate,
              events: this.$props.events,
              eventColor: this.$props.eventColor,
              firstDayOfWeek: this.$props.firstDayOfWeek,
              headerDateFormat: this.$props.headerDateFormat,
              max: this.$props.maxDate,
              min: this.$props.minDate,
              monthFormat: this.$props.monthFormat,
              multiple: this.$props.multiple,
              nextIcon: this.$props.nextIcon,
              picker: this.$props.pickerDate,
              prevIcon: this.$props.prevIcon,
              range: this.$props.range,
              reactive: this.$props.reactive,
              readonlyDate: this.$props.readonlyDate,
              scrollable: this.$props.scrollableDate,
              showCurrent: this.$props.showCurrent,
              selectedItemsText: this.$props.selectedItemsText,
              showWeek: this.$props.showWeek,
              titleDateFormat: this.$props.titleDateFormat,
              valueDate: this.$props.valueDate,
              weekdayFormat: this.$props.weekdayFormat,
              yearFormat: this.$props.yearFormat,
              yearIcon: this.$props.yearIcon,
              noTitle: true,
              width: this.$props.selectionType === 'datetime' ? this.$props.widthSelector - 310 : this.$props.widthSelector
            },
            style: {
              'padding-right': this.$props.selectionType === 'datetime' ? 0 : 15
            },
            on: {
              input: (e: string) => {
                this.$data.selectedDate = e;
                (this.$refs.timepicker as any).$data.selecting = 1
              }
            }
          })
        ])
    },
    genTimePicker (): VNode {
      return this.$createElement(VCol, {
        style: {
          'padding-left': this.$props.selectionType === 'datetime' ? 0 : 15
        }
      },
      [
        this.$createElement(VTimePicker, {
          ref: 'timepicker',
          props: {
            locale: this.$props.locale,
            allowedHours: this.$props.allowedHours,
            allowedMinutes: this.$props.allowedHours,
            allowedSeconds: this.$props.allowedSeconds,
            disabledTime: this.$props.disabledTime,
            format: this.$props.format,
            min: this.$props.minTime,
            max: this.$props.maxTime,
            readonly: this.$props.readonlyTime,
            scrollable: this.$props.scrollableTime,
            useSeconds: this.$props.useSeconds,
            value: this.$props.valueTime,
            ampmInTitle: this.$props.ampmInTitle,
            noTitle: true,
            width: 290
          },
          on: {
            input: (e: string) => {
              this.selectedTime = e
            }
          }
        })
      ])
    }
  },
  render (): VNode {
    const children = []
    // if (!this.items || !Array.isArray(this.items) || this.items.length < 1) {
    //   children.push(this.$slots['no-data'] || this.staticNoDataTile)
    // }
    this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])
    const childrenAppend = []
    this.$slots['append-item'] && childrenAppend.push(this.$slots['append-item'])

    return this.$createElement(VSheet, {
      // staticClass: 'v-select-list v-card'
      // class: this.themeClasses
    },
    [
      this.genHeader(),
      children,
      this.$createElement(VRow, {
        props: {
          align: 'stretch'
        }
      }, [
        this.$props.selectionType === 'date' || this.$props.selectionType === 'datetime' ? this.genDatePicker() : undefined,
        this.$props.selectionType === 'time' || this.$props.selectionType === 'datetime' ? this.genTimePicker() : undefined]), [...childrenAppend]
    ])
  }
})
