import Vue, { VNode } from 'vue'
import { VBtnA, VIconA, VTooltipA } from '../../shims-vuetify'
import { ScopedSlot } from 'vue/types/vnode'

export default Vue.extend({
  name: 'v-tooltip-btn',
  props: {
    value: Boolean,
    hint: String,
    btnIcon: String,
    ...(VBtnA as any).options.props
  },
  methods: {
    genActivator (listeners: any, attrs: any): any {
      const btn = this.$createElement(VBtnA, {
        props: this.$props,
        slot: 'activator',
        on: listeners,
        attrs: attrs
      }, [
        this.$props.icon ? this.$createElement(VIconA, {
          props: {
            color: this.$props.color
          }
        }, this.$props.btnIcon) : undefined]
      )
      return () => btn
    }
  },
  render (): VNode {
    return this.$createElement(VTooltipA, {
      props: {
        top: true,
        internalActivator: true
      },
      scopedSlots: {
        default: () => this.$createElement('span', this.$props.hint),
        activator: () => this.genActivator(this.$listeners, this.$attrs)
      }
    }, [
      this.$createElement('span', this.$props.hint)
    ])
  }
})
