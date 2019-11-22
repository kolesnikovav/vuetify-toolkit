import { mixins, VDatePicker, VTimePicker, VRow, VCol, VListItem, VListItemContent, VListItemTitle, Themeable, Colorable } from '../../vuetify-import'

export default mixins(
  Themeable, Colorable
  /* @vue/component */
).extend({
  name: 'v-date-time-select-list',
  props: {
    ...VDatePicker.options.props,
    ...VTimePicker.options.props,
    dark: Boolean,
    dense: Boolean,
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
    datePickerWidth: 290
  }),
  computed: {
  },
  methods: {
    genDatePicker () {
      return this.$createElement(VCol, {
        props: {
          // cols: 4
        }
      },
      [
        this.$createElement(VDatePicker, {
          props: {
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
            width: this.widthSelector - 310
          },
          style: {
            'padding-right': 0
          }
        })
      ])
    },
    genTimePicker () {
      return this.$createElement(VCol, {
        style: {
          'padding-left': 0
        }
      },
      [
        this.$createElement(VTimePicker, {
          props: {
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
          }
        })
      ])
    }
    // updateDimensions () {
    //   const rect = this.$el.getBoundingClientRect()
    //   this.datePickerWidth = rect.width - 290
    //   this.$nextTick()
    // }
  },
  // mounted () {
  //   this.updateDimensions()
  // },
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
      // style: {
      //   width: '610px'
      // }
    },
    [
      children,
      this.$createElement(VRow, {
        // style: {
        //   width: '580px'
        // }
        props: {
          align: 'stretch'
        }
      }, [this.genDatePicker(), this.genTimePicker()]), [ ...childrenAppend ]
    ])
  }
})
