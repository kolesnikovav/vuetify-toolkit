import { VNode, VNodeChildren } from 'vue'
import { VDatePickerA, VTimePickerA, VSelectA } from '../../shims-vuetify'
import VDateTimeSelectList from './VDataTimeSelectList'
import commonSelect from '../mixin/commonSelect'
import { Command, defaultDateTimeSelectCommands } from '../../utils/ToolbarCommand'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VDatePickerProps = ((VDatePickerA as any).options as any).props

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VTimePickerProps = ((VTimePickerA as any).options as any).props

const DefaultMenuProps = {
  closeOnClick: false,
  closeOnContentClick: false,
  openOnClick: false,
  maxHeight: 'auto',
  maxWidth: '620',
  offsetY: true,
  offsetOverflow: true,
  transition: false
}
const DEFAULT_DATE = '1980-01-01'
const DEFAULT_TIME = '00:00:00'
const DEFAULT_DATE_TIME = '1980-01-01T00:00:00'
const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd'
const DEFAULT_TIME_FORMAT = 'HH:mm:ss'

export default commonSelect.extend({
  name: 'v-date-time-select',
  props: {
    toolbarCommands: {
      type: Array,
      default: function () { defaultDateTimeSelectCommands(this as any) }
    },
    ...VDatePickerProps,
    ...VTimePickerProps,
    menuProps: {
      type: [String, Array, Object],
      default: () => DefaultMenuProps
    },
    value: {
      type: [String, Date],
      default: () => DEFAULT_DATE
    },
    dateFormat: {
      type: String,
      default: DEFAULT_DATE_FORMAT
    },
    timeFormat: {
      type: String,
      default: 'HH:mm'
    },
    selectionType: {
      type: String,
      default: 'datetime',
      validator: (v: string) => ['date', 'time', 'datetime'].includes(v)
    },
    textAlign: {
      type: String,
      default: 'left',
      validator: (v: string) => ['right', 'left', 'center'].includes(v)
    },
    maxDate: String,
    minDate: String,
    maxTime: String,
    minTime: String,
    readonlyDate: Boolean,
    readonlyTime: Boolean,
    scrollableDate: Boolean,
    scrollableTime: Boolean,
    disabledDate: Boolean,
    disabledTime: Boolean
  },
  data: () => ({
    date: DEFAULT_DATE,
    time: DEFAULT_TIME,
    datetime: DEFAULT_DATE_TIME
  }),
  computed: {
    dateTimeFormat (): string {
      return this.$props.dateFormat + ' ' + this.$props.timeFormat
    },
    defaultDateTimeFormat (): string {
      return DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT
    },
    formatedDate (): string {
      if (this.$props.selectionType === 'date') return this.date
      if (this.$props.selectionType === 'time') return this.time
      else return this.datetime
    },
    listData (): Object {
      const data = (commonSelect as any).options.computed.listData.call(this)
      let selectorValue
      if (this.$props.selectionType === 'date') selectorValue = this.date
      if (this.$props.selectionType === 'time') selectorValue = this.time
      else selectorValue = this.datetime

      Object.assign(data.props, {
        maxDate: this.$props.maxDate,
        minDate: this.$props.minDate,
        maxTime: this.$props.maxTime,
        minTime: this.$props.minTime,
        readonlyDate: this.$props.readonlyDate,
        readonlyTime: this.$props.readonlyTime,
        scrollableDate: this.$props.scrollableDate,
        scrollableTime: this.$props.scrollableTime,
        disabledDate: this.$props.disabledDate,
        disabledTime: this.$props.disabledTime,
        toolbarHeader: this.formatedDate,
        selectionType: this.$props.selectionType,
        locale: this.$props.locale,
        value: selectorValue
      })
      Object.assign(data.on, {
        input: (e: string) => this.handleInput(e)
      })
      Object.assign(data.scopedSlots, this.$scopedSlots)
      return data
    },
    internalSearch: {
      get (): string {
        return ''
      },
      set (val: string) {
      }
    },
    staticList (): VNode {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        // consoleError('assert: staticList should not be called if slots are used')
      }
      const slots: VNodeChildren = []
      slots.push((this.$scopedSlots.items as any))
      return this.$createElement(VDateTimeSelectList, (this as any).listData, slots)
    }
  },
  watch: {
    textAlign: {
      deep: true,
      immediate: true,
      handler (val: string) {
        // this.setTextAlign(val)
      }
    }
  },
  methods: {
    genInput (): VNode {
      return (VSelectA as any).options.methods.genInput.call(this)
    },
    handleInput (e: string): void {
      if (this.$props.selectionType === 'date') this.date = e
      if (this.$props.selectionType === 'time') this.time = e
      else this.datetime = e
      this.selectedItems = [e]
    },
    Now () {
      // const dt = new Date()
      // this.selectedDate = dt.toISOString().slice(0, 10)
      // this.selectedTime = dt.toTimeString().slice(0, 8)
      // this.EmitInput()
    }
  }
})
