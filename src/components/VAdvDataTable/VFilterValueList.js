import Vue from 'vue'
import './VTableFilter.sass'

export default Vue.extend({
  name: 'v-value-list',
  props: {
    values: {
      type: Array
    }
  },
  methods: {
    genItem (item) {
      return this.$createElement('tr', {
        staticClass: 'v-table-filter-item',
        style: {
          'padding-left': '12px'
        }
      }, [
        this.$createElement('td', {
          attrs: {
            title: item
          }
        }, [
          this.$createElement('input', {
            functional: true,
            attrs: {
              type: 'checkbox',
              autocomplete: 'off'
            },
            style: {
              display: 'inline-block',
              'padding-left': '12px',
              'padding-right': '12px'
            }
          }),
          this.$createElement('label', {
            style: {
              display: 'inline-block',
              'padding-left': '12px',
              'padding-right': '12px'
            },
            domProps: {
              innerText: item
            }
          })
        ])
      ])
    },
    genTable () {
      const items = this.values.map(v => this.genItem(v))
      return this.$createElement('table', {
        staticClass: 'v-table-filter-value-list'
      }, [
        this.$createElement('thead'),
        this.$createElement('tbody', {}, items)
      ])
    }
  },
  render () {
    return this.genTable()
  }
})
