import { VNode } from 'vue'
import { VTreeviewNodeA, VIconA } from '../../shims-vuetify'
import { getObjectValueByPath } from '../../vuetify-import'
import getMaskedCharacters from '../mixin/highlightedItem'

const InternalTreeViewNode = VTreeviewNodeA.extend({
  name: 'internal-treeview-node',
  data: () => ({
    hasLoaded: false,
    isActive: false, // Node is selected (row)
    isIndeterminate: false, // Node has at least one selected child
    isLoading: false,
    isOpen: false, // Node is open/expanded
    isSelected: false // Node is selected (checkbox)
  }),
  created () {
    (this as any).treeview.register(this)
  },
  beforeDestroy () {
    (this as any).treeview.unregister(this)
  },
  methods: {
    genCheckbox (): VNode|undefined {
      if (!(this as any).treeview.$props.allowSelectParents && this.$props.item.hasChildren) {
        return undefined
      }
      return this.$createElement(VIconA, {
        staticClass: 'v-treeview-node__checkbox',
        props: {
          color: (this as any).isSelected || (this as any).isIndeterminate ? (this as any).selectedColor : undefined,
          disabled: (this as any).disabled
        },
        on: {
          click: (e: MouseEvent) => {
            e.stopPropagation()
            if ((this as any).isLoading) return
            (this as any).checkChildren().then(() => {
              // // We nextTick here so that items watch in VTreeview has a chance to run first
              this.$nextTick(() => {
                this.isSelected = !this.isSelected;
                (this as any).treeview.updateSelected((this as any).key, this.isSelected)
              })
            })
          }
        }
      }, [(this as any).computedIcon])
    },
    genLabel () {
      const children = []
      const txt = String((this as any).treeview.$props.searchText)

      if (this.$scopedSlots.label) children.push(this.$scopedSlots.label((this as any).scopedProps))
      else {
        const { start, middle, end } = getMaskedCharacters((this as any).text, txt)
        const highlightClass = String((this as any).treeview.$props.highlightClass)
        children.push(start)
        children.push(this.$createElement('span', {
          class: highlightClass
        }, middle))
        children.push(end)
      }
      return this.$createElement('div', {
        slot: 'label',
        staticClass: 'v-treeview-node__label'
      }, children)
    },
    genNode (): VNode {
      const children = [(this as any).genContent()]

      if ((this as any).selectable) children.unshift(this.genCheckbox())

      if ((this as any).hasChildren) {
        children.unshift((this as any).genToggle())
      } else {
        children.unshift(...(this as any).genLevel(1))
      }

      children.unshift(...(this as any).genLevel((this as any).level))

      return this.$createElement('div', (this as any).setTextColor((this as any).isActive && (this as any).color, {
        staticClass: 'v-treeview-node__root',
        class: {
          [(this as any).activeClass]: (this as any).isActive
        },
        on: {
          click: () => {
            this.$nextTick(() => {
              // only one of items can be active!
              (this as any).treeview.updateActive((this as any).key)
            })
          }
        }
      }), children)
    },
    genChild (item: any, parentIsDisabled: boolean): VNode {
      const key = getObjectValueByPath(item, (this as any).itemKey)
      const node = this.$createElement(InternalTreeViewNode, {
        key,
        props: {
          activatable: this.$props.activatable,
          activeClass: this.$props.activeClass,
          item,
          selectable: (this as any).selectable,
          selectedColor: this.$props.selectedColor,
          color: this.$props.color,
          expandIcon: this.$props.expandIcon,
          indeterminateIcon: this.$props.indeterminateIcon,
          offIcon: this.$props.offIcon,
          onIcon: this.$props.onIcon,
          loadingIcon: this.$props.loadingIcon,
          itemKey: this.$props.itemKey,
          itemText: this.$props.itemText,
          itemDisabled: this.$props.itemDisabled,
          itemChildren: this.$props.itemChildren,
          loadChildren: this.$props.loadChildren,
          transition: (this as any).transition,
          openOnClick: this.$props.openOnClick,
          rounded: this.$props.rounded,
          shaped: this.$props.shaped,
          level: (this as any).level + 1,
          selectionType: this.$props.selectionType,
          parentIsDisabled
        },
        scopedSlots: this.$scopedSlots
      })
      return node
    }
  }
})

export default InternalTreeViewNode
