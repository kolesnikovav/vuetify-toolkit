import Vue, { VNode } from 'vue'
import { Themeable, Colorable } from '../../vuetify-import'
import { VToolbarA, VToolbarTitleA, VSpacerA } from '../../shims-vuetify'
import { Command } from '../../utils/ToolbarCommand'
import VTootipBtn from '../VTootipBtn'

export default Vue.extend({
  mixins: [
    Themeable, Colorable
  ],
  props: {
    // custom commands
    useToolbar: {
      type: Boolean,
      default: false
    },
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
    toolbarButtonShaped: {
      type: Boolean,
      default: false
    },
    toolbarButtonFab: {
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
    },
    toolbarButtonElevation: {
      type: [Number, String],
      default: undefined
    },
    toolbarHeader: {
      type: String,
      default: undefined
    }
  },
  computed: {
    tooltipPosition (): string {
      return ['bottom-left', 'bottom-right'].includes(this.$props.toolbarPosition) ? 'bottom' : 'top'
    },
    computedToolbarCommands (): Command[] {
      return this.$props.toolbarCommands
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
          tooltipPosition: this.tooltipPosition,
          tile: this.toolbarButtonTile,
          fab: this.toolbarButtonFab,
          rounded: this.toolbarButtonRounded,
          shaped: this.toolbarButtonShaped,
          outlined: this.toolbarButtonOutlined,
          elevation: this.toolbarButtonElevation,
          action: v.action,
          disabled: v.disabled()
        },
        on: {
          click: (e: string | Function) => {
            if (v.action && v.action instanceof Function) {
              v.action.call(v.target)
            } else if (v.action && typeof v.action === 'string') {
              const methodName = v.action;
              (v.target as any)[methodName].call(v.target)
            }
          }
        }
      })
    },
    genToolbar (): VNode {
      const buttons: VNode[] = []
      if (['top-right', 'bottom-right'].includes(this.$props.toolbarPosition)) {
        if (this.toolbarHeader) buttons.push(this.$createElement(VToolbarTitleA, this.toolbarHeader))
        buttons.push(this.$createElement(VSpacerA))
      }
      this.computedToolbarCommands.map((v: Command) => buttons.push(this.genButtonWithTooltip(v)))

      if (this.toolbarHeader && ['top-left', 'bottom-left'].includes(this.$props.toolbarPosition)) {
        buttons.push(this.$createElement(VSpacerA))
        buttons.push(this.$createElement(VToolbarTitleA, this.toolbarHeader))
      }
      return (this as any).$createElement(VToolbarA, {
        style: {
          border: '1px solid'
        },
        slot: 'toolbar',
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
