import Vue, { VNode } from 'vue'
import { VMenu, VTextField, VDatePicker, VTimePicker, consoleError } from '../../vuetify-import'
import VDateTimeSelectList from './VDataTimeSelectList'
// import DefaultMenuProps from '../../utils/MenuProps'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VDatePickerProps = ((VDatePicker as any).options as any).props

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VTimePickerProps = ((VTimePicker as any).options as any).props

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VTextFieldProps = ((VTextField as any).options as any).props

export default Vue.extend({
  name: 'v-date-time-select',
  props: {
    ...VTextFieldProps,
    ...VDatePickerProps,
    ...VTimePickerProps,
    autocomplete: {
      type: Boolean,
      default: false
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
    internalValue: '',
    widthSelector: 0,
    isMenuActive: false,
    x: 0,
    y: 0,
    bottom: 0,
    right: 0
  }),
  computed: {
  },
  watch: {
    textAlign: {
      deep: true,
      immediate: true,
      handler (val: string) {
        this.setTextAlign(val)
      }
    }
  },
  mounted () {
    this.setTextAlign(this.$props.textAlign)
    window.addEventListener('resize', this.updateDimensions)
    window.addEventListener('load', this.updateDimensions)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateDimensions)
    window.removeEventListener('load', this.updateDimensions)
  },
  methods: {
    activateSelector () {
      this.isMenuActive = true
    },
    keyProcess (e: KeyboardEvent) {
      if (e.key === 'Enter') {
        this.isMenuActive = true
      }
    },
    closeMenu () {
      this.isMenuActive = false
    },
    changeValue (val: string|number) {
      this.internalValue = val as string
      this.isMenuActive = false
    },
    genTextInput (): HTMLInputElement|undefined {
      const element = (this.$refs.inputField) as any
      if (element && element.$el) {
        const inputs = element.$el.getElementsByTagName('input')
        if (inputs && inputs.length > 0) {
          return inputs[0]
        }
      }
      return undefined
    },
    setTextAlign (val?: string) {
      const input = this.genTextInput()
      if (input) {
        (input.style as any).textAlign = val || null
      }
    },
    updateDimensions () {
      const input = this.genTextInput()
      if (input) {
        const rect = input.getBoundingClientRect()
        this.x = rect.x
        this.y = rect.y
        this.bottom = rect.bottom
        this.right = rect.right
      }
    },
    genInput (): VNode {
      const props = Object.assign({}, this.$props)
      props.value = this.internalValue
      props.type = 'text'
      return this.$createElement(VTextField, {
        ref: 'inputField',
        props,
        slot: 'activator',
        on: {
          click: () => this.activateSelector(),
          keydown: (e: KeyboardEvent) => this.keyProcess(e)
        //   blur: (e: Event) => {
        //     e.stopImmediatePropagation()
        //     e.preventDefault()
        //     this.closeMenu()
        //   }
        //   'resize-numeric-input': (rect: PosMenuType) => this.setMenuPosition(rect)
        }
      })
    },
    genPicker (): VNode {
      return this.$createElement(VDateTimeSelectList, {
        on: {
          'close-menu': () => this.closeMenu(),
          'input-value': (val: string|number) => this.changeValue(val)
        }
      })
    },
    closeSelector (val: string|number|undefined) {
    }
  },
  render (): VNode {
    const inputFeild = this.genInput()
    return this.$createElement(VMenu, {
      props: {
        // absolute: true,
        // positionX: this.x,
        // positionY: this.y,
        closeOnContentClick: false,
        value: this.isMenuActive,
        dark: this.$props.dark,
        dense: this.$props.dense,
        right: this.$props.textAlign === 'right',
        left: this.$props.textAlign === 'left'
        // auto: true
      },
      scopedSlots: {
        'activator' () {
          return inputFeild
        }
      }
    //   on: {
    //     'update:return-value': (val: string|number|undefined) => this.closeSelector(val)
    //   }
    }, [
      this.genPicker()
    ])
  }
})
