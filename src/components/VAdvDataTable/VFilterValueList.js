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
          autocomplete: 'off'
        },
        domProps: {
          checked: v.selected
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
        staticClass: 'v-table-filter-item',
        on: {
          '~!click': (e) => {
            e.stopPropagation()
            e.preventDefault()
            const emitEvent = listeners['change-value-selection']
            if (emitEvent) {
              emitEvent('change-value-selection', v)
            }
          }
        }
      }, [td])
    })
    return h('table', {
      staticClass: 'v-table-filter-value-list',
      items
    }, [
      h('thead'),
      h('tbody', {}, items)
    ])
  }
})
