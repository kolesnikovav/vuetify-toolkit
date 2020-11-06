import Vue, { VNode } from 'vue'
import { VDatePickerA, VTimePickerA, VRowA, VColA, VBtnA, VSheetA } from '../../shims-vuetify'
import commonSelectorCard from '../mixin/commonSelectorCard'
import { Command, defaultDateTimeSelectCommands } from '../../utils/ToolbarCommand'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VDatePickerProps = ((VDatePickerA as any).options as any).props

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VTimePickerProps = ((VTimePickerA as any).options as any).props

export default commonSelectorCard.extend({
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
    widthSelector: Number,
    // custom commands
    toolbarCommands: {
      type: Array,
      default: defaultDateTimeSelectCommands(this as any)
    }
  },
  data: () => ({
    selectedDate: '',
    selectedTime: '',
    datePickerWidth: 290
  }),
  computed: {
    computedToolbarCommands (): Command[] {
      return this.$props.toolbarCommands.length > 0 ? this.$props.toolbarCommands : defaultDateTimeSelectCommands(this as any)
    },
    hasData (): boolean { return true }
  },
  methods: {
    genDatePicker (): VNode {
      return this.$createElement(VColA, {},
        [
          this.$createElement(VDatePickerA, {
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
      return this.$createElement(VColA, {
        style: {
          'padding-left': this.$props.selectionType === 'datetime' ? 0 : 15
        }
      },
      [
        this.$createElement(VTimePickerA, {
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
    },
    genSelectList (): VNode {
      return this.$createElement(VSheetA, {
        // staticClass: 'v-select-list v-card'
        // class: this.themeClasses
      },
      [
        this.$createElement(VRowA, {
          props: {
            align: 'stretch',
            toolbarCommands: this.computedToolbarCommands
          }
        }, [
          this.$props.selectionType === 'date' || this.$props.selectionType === 'datetime' ? this.genDatePicker() : undefined,
          this.$props.selectionType === 'time' || this.$props.selectionType === 'datetime' ? this.genTimePicker() : undefined])
      ])
    }
  }
})
