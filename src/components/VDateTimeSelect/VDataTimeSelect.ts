import { VNode, VNodeChildren } from 'vue'
import { VMenuA, VTextFieldA, VDatePickerA, VTimePickerA, VSelectA } from '../../shims-vuetify'
import VDateTimeSelectList from './VDataTimeSelectList'
import commonSelect from '../mixin/commonSelect'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VDatePickerProps = ((VDatePickerA as any).options as any).props

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VTimePickerProps = ((VTimePickerA as any).options as any).props

export default commonSelect.extend({
  name: 'v-date-time-select',
  props: {
    ...VDatePickerProps,
    ...VTimePickerProps,
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
    // // internalValue: '',
    // widthSelector: 0,
    // isMenuActive: false,
    // x: 0,
    // y: 0,
    // bottom: 0,
    // right: 0
  }),
  computed: {
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
