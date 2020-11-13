import { VNode, VNodeChildren } from 'vue'
import { VDatePickerA, VTimePickerA, VSelectA } from '../../shims-vuetify'
import VDateTimeSelectList from './VDataTimeSelectList'
import commonSelect from '../mixin/commonSelect'

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
const DEFAULT_DATE = '00010101'
const DEFAULT_TIME = '00:00:00'
const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd'
const DEFAULT_TIME_FORMAT = 'HH:mm:ss'

export default commonSelect.extend({
  name: 'v-date-time-select',
  props: {
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
    time: DEFAULT_TIME
  }),
  computed: {
    dateTimeFormat (): string {
      return this.$props.dateFormat + ' ' + this.$props.timeFormat
    },
    defaultDateTimeFormat (): string {
      return DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT
    },
    selectedDatetime (): Date|string|undefined {
      // if (this.$props.selectionType === 'date') {
      //   return new Date(this.date)
      // } else if (this.$props.selectionType === 'datetime') {
      //   let time = this.time ? this.time : DEFAULT_TIME
      //   if (time.length === 5) {
      //     time += ':00'
      //   }
      //   return new Date(this.date + ' ' + time)
      // }
      // return this.time
      return new Date(this.date + ' ' + this.time)
    },
    formatedDate (): string {
      if (this.$props.selectionType === 'date') {
        return this.date.toLocaleString()
      } else if (this.$props.selectionType === 'datetime') {
        if (this.selectedDatetime instanceof Date) {
          return this.selectedDatetime.toISOString()
        } else return this.selectedDatetime ? this.selectedDatetime : ''
      }
      return ''
    },
    listData (): Object {
      const data = (commonSelect as any).options.computed.listData.call(this)
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
        selectionType: this.$props.selectionType
      })
      Object.assign(data.on, {
        input: (e: any[]) => {
          (this as any).selectItems(e)
        }
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
    }
  }
})
