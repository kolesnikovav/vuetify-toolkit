import Vue, { VNode } from 'vue'
import { VBtnA, VIconA, VTooltipA } from '../../shims-vuetify'

export default Vue.extend({
  name: 'v-tooltip-btn',
  props: {
    value: Boolean,
    hint: String,
    btnIcon: String,
    ...(VBtnA as any).options.props
  },
  render (): VNode {
    const btn = this.$createElement(VBtnA, {
      props: this.$props,
      slot: 'activator',
      on: this.$listeners
    }, [
      this.$props.icon ? this.$createElement(VIconA, {
        props: {
          color: this.$props.color
        }
      }, this.$props.btnIcon) : undefined]
    )
    // rrn btn
    return this.$createElement(VTooltipA, {
      props: {
        // activator: btn
      }
    }, [
      btn,
      this.$createElement('span', this.$props.hint)
    ])
  }
})
