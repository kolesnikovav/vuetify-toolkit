import { VAutocomplete, VTextField, VSelect, VDatePicker, VTimePicker, consoleError } from '../../vuetify-import'
import VDateTimeSelectList from './VDateTimeSelectList'
import DefaultMenuProps from '../../utils/MenuProps'

export default VAutocomplete.extend({
  name: 'v-date-time-select',
  props: {
    ...VSelect.options.props,
    ...VAutocomplete.options.props,
    ...VDatePicker.options.props,
    ...VTimePicker.options.props,
    autocomplete: {
      type: Boolean,
      default: false
    },
    menuProps: {
      type: [String, Array, Object],
      default: () => DefaultMenuProps
    },
    selectionType: {
      type: String,
      default: 'datetime',
      validator: (v) => ['date', 'time', 'datetime'].includes(v)
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
    selectedItems: [],
    widthSelector: 0
  }),
  computed: {
    classes () {
      // if (this.autocomplete) {
      //   return Object.assign({}, VSelect.options.computed.classes.call(this), {
      //     'v-autocomplete': true,
      //     'v-autocomplete--is-selecting-index': this.selectedIndex > -1
      //   })
      // } else {
      return Object.assign({}, VSelect.options.computed.classes.call(this), {})
      // }
    },
    internalSearch: {
      get () {
        // const result = this.autocomplete ? VAutocomplete.options.computed.internalSearch.get.call(this)
        //   : ''
        return ''
      },
      set (val) {
        // if (this.autocomplete) {
        //   VAutocomplete.options.computed.internalSearch.set.call(this, val)
        // }
      }
    },
    listData () {
      const data = VSelect.options.computed.listData.call(this)
      Object.assign(data.props, {
        dark: this.dark,
        dense: this.dense,
        locale: this.locale,
        /* date-picker */
        allowedDates: this.allowedDates,
        dayFormat: this.dayFormat,
        disabledDate: this.disabledDate,
        events: this.events,
        eventColor: this.eventColor,
        firstDayOfWeek: this.firstDayOfWeek,
        headerDateFormat: this.headerDateFormat,
        maxDate: this.maxDate,
        minDate: this.minDate,
        monthFormat: this.monthFormat,
        multiple: this.multiple,
        nextIcon: this.nextIcon,
        pickerDate: this.pickerDate,
        prevIcon: this.prevIcon,
        range: this.range,
        reactive: this.reactive,
        readonlyDate: this.readonlyDate,
        scrollableDate: this.scrollableDate,
        showCurrent: this.showCurrent,
        selectedItemsText: this.selectedItemsText,
        showWeek: this.showWeek,
        titleDateFormat: this.titleDateFormat,
        valueDate: this.valueDate,
        weekdayFormat: this.weekdayFormat,
        yearFormat: this.yearFormat,
        yearIcon: this.yearIcon,
        /* time-picker */
        allowedHours: this.allowedHours,
        allowedMinutes: this.allowedHours,
        allowedSeconds: this.allowedSeconds,
        disabledTime: this.disabledTime,
        format: this.format,
        minTime: this.minTime,
        maxTime: this.maxTime,
        readonlyTime: this.readonlyTime,
        scrollableTime: this.scrollableTime,
        useSeconds: this.useSeconds,
        valueTime: this.valueTime,
        ampmInTitle: this.ampmInTitle,
        widthSelector: this.widthSelector,
        selectionType: this.selectionType
      })
      Object.assign(data.on, {
        select: e => {
          this.selectItems(e)
        },
        input: e => {
          this.selectItems(e)
        },
        'close-menu': e => {
          this.isMenuActive = false
        }
      })
      Object.assign(data.scopedSlots, this.$scopedSlots)
      return data
    },
    staticList () {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        consoleError('assert: staticList should not be called if slots are used')
      }
      const slots = []
      slots.push(this.$scopedSlots.items)
      return this.$createElement(VDateTimeSelectList, this.listData, slots)
    }
  },
  mounted () {
    this.getWidth()
    window.addEventListener('resize', this.getWidth)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWidth)
  },
  methods: {
    register () {},
    genInputAutocomplete () {
      const input = VTextField.options.methods.genInput.call(this)

      input.data = input.data || {}
      input.data.attrs = input.data.attrs || {}
      input.data.attrs.autocomplete = input.data.attrs.autocomplete || 'disabled'

      input.data.domProps = input.data.domProps || {}
      input.data.domProps.value = this.internalSearch
      input.data.attrs.type = 'text'

      return input
    },
    genInput () {
      const input = this.autocomplete ? this.genInputAutocomplete()
        : VSelect.options.methods.genInput.call(this)
      // this.$refs['input'].type = 'text'
      return input
    },
    genList () {
      // If there's no slots, we can use a cached VNode to improve performance
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        return this.genListWithSlot()
      } else {
        return this.staticList
      }
    },
    genListWithSlot () {
      const slots = ['prepend-item', 'no-data', 'append-item']
        .filter(slotName => this.$slots[slotName])
        .map(slotName => this.$createElement('template', {
          slot: slotName
        }, this.$slots[slotName]))
      return this.$createElement(VDateTimeSelectList, {
        ...this.listData
      }, slots)
    },
    genSelections () {
      return VSelect.options.methods.genSelections.call(this)
    },
    getWidth () {
      this.widthSelector = this.$el.getBoundingClientRect().width
    },
    selectItems (items) {
      this.selectedItems = []
      this.selectedItems.push(items)
      if (!this.multiple) {
        this.isMenuActive = false
      }
    },
    clearableCallback () {
      this.internalValue = null
      this.$refs.input.internalValue = ''
      this.$refs.input.value = ''
      this.selectedItems = []
      this.$nextTick(() => this.$refs.input.focus())
    }
  }
})
