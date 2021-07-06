import { VNode, VNodeChildren, PropType } from 'vue'
import { VTreeviewNodeA, VIconA } from '../../shims-vuetify'
import { getObjectValueByPath } from '../../vuetify-import'
import getMaskedCharacters from '../mixin/highlightedItem'

const InternalTreeViewNode = VTreeviewNodeA.extend({
  name: 'internal-treeview-node',
  props: {
    itemOpen: {
      type: Boolean,
      default: false
    },
    itemSelected: {
      type: Boolean,
      default: false
    },
    parentIsDisabled: Boolean,
    loadChildren: Function as PropType<(item: any) => Promise<void>>
  },
  data: () => ({
    hasLoaded: false,
    isActive: false, // Node is selected (row)
    isIndeterminate: false, // Node has at least one selected child
    isLoading: false,
    isOpen: false, // Node is open/expanded
    isSelected: false // Node is selected (checkbox)
  }),
  computed: {
    disabled (): boolean {
      return (
        getObjectValueByPath(this.$props.item, this.$props.itemDisabled) ||
        (this.parentIsDisabled && this.$props.selectionType === 'leaf')
      )
    },
    children (): any[] | null {
      const children = getObjectValueByPath(this.$props.item, this.$props.itemChildren)
      return children && children.filter((child: any) => !(this as any).treeview.isExcluded(getObjectValueByPath(child, this.$props.itemKey)))
    },
    hasChildren (): boolean {
      return !!this.children && (!!this.children.length || !!this.loadChildren)
    },
    computedIcon (): string {
      if (this.isIndeterminate) return this.$props.indeterminateIcon
      else if (this.itemSelected) return this.$props.onIcon
      else return this.$props.offIcon
    }
  },
  created () {
    (this as any).treeview.register(this)
  },
  beforeDestroy () {
    (this as any).treeview.unregister(this)
  },
  methods: {
    checkChildren (): Promise<void> {
      return new Promise<void>(resolve => {
        // TODO: Potential issue with always trying
        // to load children if response is empty?
        if (!this.children || this.children.length || !this.loadChildren || this.hasLoaded) return resolve()

        this.isLoading = true
        resolve(this.loadChildren(this.$props.item))
      }).then(() => {
        this.isLoading = false
        this.hasLoaded = true
      })
    },
    genToggle (): VNode {
      return this.$createElement(VIconA, {
        staticClass: 'v-treeview-node__toggle',
        class: {
          'v-treeview-node__toggle--open': this.itemOpen,
          'v-treeview-node__toggle--loading': this.isLoading
        },
        slot: 'prepend',
        on: {
          click: (e: MouseEvent) => {
            e.stopPropagation()

            if (this.isLoading) return

            this.checkChildren().then(() => (this as any).open())
          }
        }
      }, [this.isLoading ? this.$props.loadingIcon : this.$props.expandIcon])
    },
    genCheckbox (): VNode|undefined {
      if (!(this as any).treeview.$props.allowSelectParents && this.$props.item.hasChildren) {
        return undefined
      }
      return this.$createElement(VIconA, {
        staticClass: 'v-treeview-node__checkbox',
        props: {
          color: this.itemSelected || (this as any).isIndeterminate ? (this as any).selectedColor : undefined,
          disabled: this.disabled
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
    genChild (item: any, parentIsDisabled: boolean): any {
      return ((this as any).treeview.genChildNode(item, parentIsDisabled, (this as any).level + 1))
    },
    genChildrenWrapper (): VNode|null {
      if (!this.itemOpen || !this.children) return null

      const children = [this.children.map(c => this.genChild(c, this.disabled))]

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__children'
      }, children)
    }
  },
  render (h): VNode {
    const children: VNodeChildren = [this.genNode()]

    if (this.$props.transition) children.push((this as any).genTransition())
    else children.push(this.genChildrenWrapper())

    return h('div', {
      staticClass: 'v-treeview-node',
      class: {
        'v-treeview-node--leaf': !this.hasChildren,
        'v-treeview-node--click': this.$props.openOnClick,
        'v-treeview-node--disabled': this.disabled,
        'v-treeview-node--rounded': this.$props.rounded,
        'v-treeview-node--shaped': this.$props.shaped,
        'v-treeview-node--selected': this.isSelected
      },
      attrs: {
        'aria-expanded': String(this.itemOpen)
      }
    }, children)
  }
})

export default InternalTreeViewNode
