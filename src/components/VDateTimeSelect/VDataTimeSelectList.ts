import Vue, { VNode } from 'vue'
import { VDatePickerA, VTimePickerA, VRowA, VColA, VBtnA, VSheetA } from '../../shims-vuetify'
import commonSelectorCard from '../mixin/commonSelectorCard'
import { Command, defaultDateTimeSelectCommands } from '../../utils/ToolbarCommand'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VDatePickerProps = ((VDatePickerA as any).options as any).props

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VTimePickerProps = ((VTimePickerA as any).options as any).props

const DEFAULT_DATE = '1980-01-01'
const DEFAULT_TIME = '00:00:00'

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
    value: {
      type: [String, Date],
      default: () => DEFAULT_DATE
    },
    date: String,
    time: String,
    datetime: String,
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
    selectedDate: DEFAULT_DATE,
    selectedTime: DEFAULT_TIME
  }),
  computed: {
    computedToolbarCommands (): Command[] {
      return this.$props.toolbarCommands.length > 0 ? this.$props.toolbarCommands : defaultDateTimeSelectCommands(this as any)
    },
    computedTime (): string {
      if (this.selectedTime.length === 5) {
        return this.selectedTime + ':00'
      } else if (!this.selectedTime) {
        return '00:00:00'
      }
      return this.selectedTime
    },
    computedDateTime (): string {
      return this.selectedDate + 'T' + this.computedTime
    },
    computedDT (): Date {
      return new Date(this.computedDateTime)
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
              value: this.$props.date
            },
            style: {
              'padding-right': this.$props.selectionType === 'datetime' ? 0 : 15
            },
            on: {
              'click:date': (e: string) => {
                this.$data.selectedDate = e
                if (this.$refs.timepicker) {
                  (this.$refs.timepicker as any).$data.selecting = 1
                }
                this.EmitInput()
              }
            }
          })
        ])
    },
    genTimePicker (): VNode {
      return this.$createElement(VColA, {},
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
              value: this.$props.time,
              ampmInTitle: this.$props.ampmInTitle,
              noTitle: true
            },
            on: {
              change: (e: string) => {
                this.selectedTime = e
                this.EmitInput()
              }
            }
          })
        ])
    },
    genSelectList (): VNode {
      return this.$createElement(VSheetA, {
        ref: 'selectList',
        staticClass: 'v-select-list v-card'
      },
      [
        this.$createElement(VRowA, {
          props: {
            toolbarCommands: this.computedToolbarCommands
          }
        }, [
          this.$props.selectionType === 'date' || this.$props.selectionType === 'datetime' ? this.genDatePicker() : undefined,
          this.$props.selectionType === 'time' || this.$props.selectionType === 'datetime' ? this.genTimePicker() : undefined])
      ])
    },
    EmitInput () {
      if (this.$props.selectionType === 'datetime') {
        this.$emit('input', this.computedDateTime)
      } else if (this.$props.selectionType === 'date') {
        this.$emit('input', this.selectedDate)
      } else this.$emit('input', this.selectedTime)
    }
  }
})
