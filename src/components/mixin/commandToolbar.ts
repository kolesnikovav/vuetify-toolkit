import Vue, { VNode } from 'vue'
import { Themeable, Colorable } from '../../vuetify-import'
import { VToolbarA, VToolbarTitleA, VSpacerA, VDividerA } from '../../shims-vuetify'
import { Command } from '../../utils/ToolbarCommand'
import VTootipBtn from '../VTootipBtn'

export default Vue.extend({
  mixins: [
    Themeable, Colorable
  ],
  props: {
    dense: Boolean,
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
      default: false
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
      default: false
    },
    toolbarButtonText: {
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
    toolbarButtonSize: {
      type: String,
      default: 'small',
      validator: (v: string) => ['medium', 'large', 'xlarge', 'xsmall', 'small'].includes(v)
    },
    toolbarHeader: {
      type: String,
      default: undefined
    },
    toolbarHeaderStyle: {
      type: Object,
      default: undefined
    },
    toolbarHasDivider: {
      type: Boolean,
      default: true
    },
    toolbarStyle: {
      type: Object,
      default: undefined
    },
    toolbarHeight: {
      type: [Number, String],
      default: undefined
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
          medium: this.$props.toolbarButtonSize === 'medium',
          large: this.$props.toolbarButtonSize === 'large',
          small: this.$props.toolbarButtonSize === 'small',
          xSmall: this.$props.toolbarButtonSize === 'xsmall',
          xLarge: this.$props.toolbarButtonSize === 'xlarge',
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
          text: this.toolbarButtonText,
          action: v.action,
          disabled: v.disabled()
        },
        on: {
          click: (e: string | Function) => {
            if (!v.target && typeof v.action === 'string') {
              this.$emit(v.action)
            }
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
    genToolbar (): VNode|VNode[] {
      const buttons: VNode[] = []
      if (['top-right', 'bottom-right'].includes(this.$props.toolbarPosition)) {
        if (this.toolbarHeader) {
          buttons.push(this.$createElement(VToolbarTitleA, {
            style: this.$props.toolbarHeaderStyle,
            props: {
              dense: this.$props.dense
            }
          }, this.toolbarHeader))
          buttons.push(this.$createElement(VSpacerA))
        }
      }
      this.$props.toolbarCommands.map((v: Command) => buttons.push(this.genButtonWithTooltip(v)))

      if (this.toolbarHeader && ['top-left', 'bottom-left'].includes(this.$props.toolbarPosition)) {
        buttons.push(this.$createElement(VSpacerA))
        buttons.push(this.$createElement(VToolbarTitleA, {
          style: this.$props.toolbarHeaderStyle,
          props: {
            dense: this.$props.dense
          }
        }, this.toolbarHeader))
      }
      const toolbar = (this as any).$createElement(VToolbarA, {
        style: this.$props.toolbarStyle,
        slot: 'toolbar',
        props: {
          flat: this.$props.toolbarFlat,
          dense: this.$props.dense,
          height: this.$props.toolbarHeight
        }
      }, buttons)
      if (!this.$props.toolbarHasDivider) return toolbar
      if (['top-left', 'top-right'].includes(this.$props.toolbarPosition)) {
        return [toolbar, this.$createElement(VDividerA)]
      }
      return [this.$createElement(VDividerA), toolbar]
    }
  }
})
