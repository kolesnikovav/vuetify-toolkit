import Vue, { VNode } from 'vue'
import { Themeable, Colorable } from '../../vuetify-import'
import { VToolbarA, VSpacerA } from '../../shims-vuetify'
import { Command } from '../../utils/ToolbarCommand'
import VTootipBtn from '../VTootipBtn'

export default Vue.extend({
  mixins: [
    Themeable, Colorable
  ],
  props: {
    useDefaultToolbarCommand: {
      type: Boolean,
      default: false
    },
    // custom commands
    toolbarCommands: {
      type: Array,
      default: () => [] as Command[]
    },
    toolbarPosition: {
      type: String,
      default: 'top-left',
      validator: (v: string) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(v)
    },
    toolbarFlat: {
      type: Boolean,
      default: true
    },
    toolbarButtonOutlined: {
      type: Boolean,
      default: true
    },
    toolbarButtonRounded: {
      type: Boolean,
      default: false
    },
    toolbarButtonTile: {
      type: Boolean,
      default: true
    },
    toolbarButtonTextVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tooltipPosition (): string {
      return ['bottom-left', 'bottom-right'].includes(this.$props.toolbarPosition) ? 'bottom' : 'top'
    }
  },
  methods: {
    genButtonWithTooltip (v: Command): VNode {
      return this.$createElement(VTootipBtn, {
        props: {
          hint: v.hint,
          btnIcon: v.icon,
          btnText: this.toolbarButtonTextVisible ? v.text : '',
          icon: !!v.icon,
          iconColor: v.iconColor,
          tooltipPosition: this.tooltipPosition
        }
      })
    },
    genToolbar (): VNode {
      const buttons: VNode[] = []
      if (['top-right', 'bottom-right'].includes(this.$props.toolbarPosition)) {
        buttons.push(this.$createElement(VSpacerA))
      }
      this.$props.toolbarCommands.map((v: Command) => buttons.push(this.genButtonWithTooltip(v)))
      return (this as any).$createElement(VToolbarA, {
        style: {
          border: '1px solid'
        },
        props: {
          flat: this.$props.toolbarFlat,
          dense: this.$props.dense
        }
      }, buttons)
    }
  },
  render (): VNode {
    return this.genToolbar()
  }
})
