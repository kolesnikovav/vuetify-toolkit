import Vue from 'vue'
import './VTableFilter.sass'

export default Vue.extend({
  name: 'v-value-list',
  functional: true,
  props: {
    values: {
      type: Array
    }
  },
  render (h, { props, listeners }) {
    const items = props.values.map(v => {
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
              emitEvent('change-value-selection', v)
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
      functional: true,
      staticClass: 'v-table-filter-value-list',
      items
    }, [
      h('thead'),
      h('tbody', {
        functional: true
      }, items)
    ])
  }
})
