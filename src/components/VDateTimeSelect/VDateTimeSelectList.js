import { mixins, VDatePicker, VTimePicker, VRow, VCol, VBtn, Themeable, Colorable } from '../../vuetify-import'

export default mixins(
  Themeable, Colorable
  /* @vue/component */
).extend({
  name: 'v-date-time-select-list',
  props: {
    ...VDatePicker.options.props,
    ...VTimePicker.options.props,
    selectionType: {
      type: String,
      default: 'datetime',
      validator: (v) => ['date', 'time', 'datetime'].includes(v)
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
    genHeader () {
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
          click: e => { this.$emit('input', this.selectedDate + ':' + this.selectedTime) }
        }
      }, 'OK')
      const btnCancel = this.$createElement(VBtn, {
        props: {
          text: true
        },
        on: {
          click: e => { this.$emit('close-menu') }
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
          ...this.themeClasses
        },
        style: {
          width: '100%',
          height: '48px',
          background: this.color ? this.color : 'primary',
          'align-items': 'center',
          display: 'flex',
          'justify-content': 'space-between'
        }
      }, [
        headerText,
        btnBlock
      ])
    },
    genDatePicker () {
      return this.$createElement(VCol, {},
        [
          this.$createElement(VDatePicker, {
            props: {
              locale: this.locale,
              dark: this.dark,
              allowedDates: this.allowedDates,
              dayFormat: this.dayFormat,
              disabledDate: this.disabledDate,
              events: this.events,
              eventColor: this.eventColor,
              firstDayOfWeek: this.firstDayOfWeek,
              headerDateFormat: this.headerDateFormat,
              max: this.maxDate,
              min: this.minDate,
              monthFormat: this.monthFormat,
              multiple: this.multiple,
              nextIcon: this.nextIcon,
              picker: this.pickerDate,
              prevIcon: this.prevIcon,
              range: this.range,
              reactive: this.reactive,
              readonlyDate: this.readonlyDate,
              scrollable: this.scrollableDate,
              showCurrent: this.showCurrent,
              selectedItemsText: this.selectedItemsText,
              showWeek: this.showWeek,
              titleDateFormat: this.titleDateFormat,
              valueDate: this.valueDate,
              weekdayFormat: this.weekdayFormat,
              yearFormat: this.yearFormat,
              yearIcon: this.yearIcon,
              noTitle: true,
              width: this.selectionType === 'datetime' ? this.widthSelector - 310 : this.widthSelector
            },
            style: {
              'padding-right': this.selectionType === 'datetime' ? 0 : 15
            },
            on: {
              input: e => {
                this.selectedDate = e
                this.$refs['timepicker'].$data.selecting = 1
              }
            }
          })
        ])
    },
    genTimePicker () {
      return this.$createElement(VCol, {
        style: {
          'padding-left': this.selectionType === 'datetime' ? 0 : 15
        }
      },
      [
        this.$createElement(VTimePicker, {
          ref: 'timepicker',
          props: {
            locale: this.locale,
            allowedHours: this.allowedHours,
            allowedMinutes: this.allowedHours,
            allowedSeconds: this.allowedSeconds,
            disabledTime: this.disabledTime,
            format: this.format,
            min: this.minTime,
            max: this.maxTime,
            readonly: this.readonlyTime,
            scrollable: this.scrollableTime,
            useSeconds: this.useSeconds,
            value: this.valueTime,
            ampmInTitle: this.ampmInTitle,
            noTitle: true,
            width: 290
          },
          on: {
            input: e => {
              this.selectedTime = e
            }
          }
        })
      ])
    }
  },
  render () {
    const children = []
    if (!this.items || !Array.isArray(this.items) || this.items.length < 1) {
      children.push(this.$slots['no-data'] || this.staticNoDataTile)
    }
    this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])
    const childrenAppend = []
    this.$slots['append-item'] && childrenAppend.push(this.$slots['append-item'])

    return this.$createElement('div', {
      staticClass: 'v-select-list v-card',
      'class': this.themeClasses
    },
    [
      this.genHeader(),
      children,
      this.$createElement(VRow, {
        props: {
          align: 'stretch'
        }
      }, [
        this.selectionType === 'date' || this.selectionType === 'datetime' ? this.genDatePicker() : undefined,
        this.selectionType === 'time' || this.selectionType === 'datetime' ? this.genTimePicker() : undefined]), [ ...childrenAppend ]
    ])
  }
})
