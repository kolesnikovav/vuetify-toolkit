import Vue, { PropType, VNode } from 'vue'
import { SelectableValue } from '../VAdvDataTable/utils/AdvTableUtils'
import './VTableFilter.sass'

export default Vue.extend({
  name: 'v-value-list',
  functional: true,
  props: {
    values: Array as PropType<SelectableValue[]>
  },
  render (h, { props, listeners }): VNode {
    const items = props.values.map((v:SelectableValue) => {
      const input = h('input', {
        attrs: {
          type: 'checkbox',
          autocomplete: 'off',
          checked: v.selected
        },
        domProps: {
          value: v.selected,
          checked: v.selected
        },
        on: {
          input: () => {
            const emitEvent = listeners['change-value-selection']
            if (emitEvent) {
              (emitEvent as any)('change-value-selection', v)
            }
          }
        },
        style: {
          display: 'inline-block',
          'padding-left': '12px',
          'padding-right': '12px',
          cursor: 'pointer',
          height: '16px',
          width: '16px'
        }
      })
      const label = h('label', {
        domProps: {
          innerText: v.text
        },
        style: {
          display: 'inline-block',
          'padding-left': '12px',
          'padding-right': '12px',
          cursor: 'pointer',
          height: '16px',
          width: '16px'
        }
      })
      const td = h('td', {
        attrs: {
          title: v.text
        },
        style: {
          cursor: 'pointer'
        }
      }, [input, label])
      return h('tr', {
        staticClass: 'v-table-filter-item'
      }, [td])
    })
    return h('table', {
      staticClass: 'v-table-filter-value-list'
    }, [
      h('thead'),
      h('tbody', {}, items)
    ])
  }
})
