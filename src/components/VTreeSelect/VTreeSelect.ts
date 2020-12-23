import { VNode, VNodeData, PropType } from 'vue'
import { VTreeviewNodeProps, consoleError, getPropertyFromItem, getObjectValueByPath } from '../../vuetify-import'
import { VChipA } from '../../shims-vuetify'
import VTreeSelectList from './VTreeSelectList'
import treeviewScopedSlots from '../../utils/TreeviewScopedSlots'
import commonSelect from '../mixin/commonSelect'
import { mergeProps } from '../../utils/mergeProps'
import { openCloseCommands } from '../../utils/ToolbarCommand'

export default commonSelect.extend({
  name: 'v-tree-select',
  props: {
    ...VTreeviewNodeProps,
    allowSelectParents: {
      type: Boolean,
      default: false
    },
    showFullPath: {
      type: Boolean,
      default: true
    },
    delimeter: {
      type: [String],
      default: ','
    },
    toolbarCommands: {
      type: Array,
      default: function () {
        return openCloseCommands(this as any)
      }
    },
    openAll: Boolean,
    selectionType: {
      type: String as PropType<'leaf' | 'independent'>,
      default: 'leaf',
      validator: (v: string) => ['leaf', 'independent'].includes(v)
    }
  },
  computed: {
    filteredItems (): any[] {
      const items = this.buildTree(this.$props.items)
      return items
    },
    listData (): Object {
      const data = (commonSelect as any).options.computed.listData.call(this)
      mergeProps(data.props, this.$props, VTreeviewNodeProps)
      data.props.allowSelectParents = this.$props.allowSelectParents
      data.props.items = this.filteredItems
      data.props.returnObject = false
      data.props.currentItem = this.$data.currentItem
      data.props.itemCashe = this.itemCashe
      data.props.selectedCashe = this.selectedCashe
      Object.assign(data.on, {
        'update:selected': (e: { key: string| number, isSelected: boolean}) => {
          this.updateSelectedItems(e)
        },
        'update:open': (e: any[]) => {
          (this.$refs.menu as any).updateDimensions()
          this.selectItems(e)
        },
        'update-dimensions': () => (this.$refs.menu as any).updateDimensions()
      })
      Object.assign(data.scopedSlots, treeviewScopedSlots(this.$scopedSlots))
      return data
    },
    staticList (): VNode {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        consoleError('assert: staticList should not be called if slots are used')
      }
      return this.$createElement(VTreeSelectList, this.listData)
    }
  },
  data: () => ({
    parents: new Map(),
    itemCashe: new Map(),
    selectedCashe: new Map()
  }),
  watch: {
    items: {
      immediate: true,
      handler (val) { this.buildTree(val) }
    },
    internalSearch: {
      immediate: true,
      handler (val) {
        this.buildTree(this.$props.items)
      }
    },
    showFullPath: {
      immediate: true,
      handler (val) {
        (this as any).updateSelectedPresentation()
      }
    },
    delimeter: {
      immediate: true,
      handler (val) {
        (this as any).updateSelectedPresentation()
      }
    }
  },
  methods: {
    itemMatchFilter (item: any): boolean {
      if (this.internalSearch && this.internalSearch != null) {
        const comparedVal = getPropertyFromItem(item, this.$props.itemText)
        return this.$props.filter(item, this.internalSearch, comparedVal)
      } else return true
    },
    getDescendantKeys (key: string | number, descendants: (string | number)[] = []) {
      const item = this.itemCashe.get(key)
      const localChildren = getObjectValueByPath(item, this.$props.itemChildren, [])
      if (item && localChildren.length > 0) {
        localChildren.map((v: any) => {
          const itemKey = getObjectValueByPath(v, this.$props.itemKey, [])
          descendants.push(itemKey)
          this.getDescendantKeys(itemKey, descendants)
        })
      }
      return descendants
    },
    buildTree (items: any, parentkey?: string|number|undefined, forceInclude?: false): any[] {
      const newItems: any[] = []
      const pk = parentkey
      items.map((item: any) => {
        const localChildren = getObjectValueByPath(item, this.$props.itemChildren, [])
        const itemKey = getObjectValueByPath(item, this.$props.itemKey, [])
        this.itemCashe.set(itemKey, item)
        const itemForceInclude = forceInclude || this.itemMatchFilter(item)
        if (localChildren.length > 0) {
          const newChildren = (this as any).buildTree(localChildren, itemKey, itemForceInclude)
          if (newChildren.length > 0) {
            const clone = Object.assign({}, item)
            clone[this.$props.itemChildren] = newChildren
            clone.hasChildren = true
            newItems.push(clone)
            this.parents.set(itemKey, pk)
          }
        } else {
          this.parents.set(itemKey, pk)
          if (itemForceInclude) {
            const clone = Object.assign({}, item)
            newItems.push(clone)
          }
        }
      })
      return newItems
    },
    genChipSelection (item: object, index: number) {
      const itemKey = getObjectValueByPath(item, this.$props.itemKey, [])
      const s = this.textItem(itemKey)
      const isDisabled = false // (
      //   !(this as any).isInteractive ||
      //   (this as any).getDisabled(item)
      // )
      return this.$createElement(VChipA, {
        staticClass: 'v-chip--select',
        attrs: { tabindex: -1 },
        props: {
          close: this.$props.deletableChips && !isDisabled,
          disabled: isDisabled,
          inputValue: s,
          small: this.$props.smallChips,
          value: s // (item as any).text
        },
        on: {
          click: (e: MouseEvent) => {
            if (isDisabled) return
            this.currentItem = item as any
            (this as any).selectedIndex = index
          },
          'click:close': () => {
            this.selectedCashe.delete(getObjectValueByPath(item, this.$props.itemKey))
            this.updateSelectedItemsFromCashe()
            // this.selectedItems = this.selectedItems.filter(v => v.key !== (item as any).key);
            // (this as any).emitInput()
          }
        },
        key: getObjectValueByPath(item, this.$props.itemKey)
      }, this.textItem(getObjectValueByPath(item, this.$props.itemKey)))
    },
    genCommaSelection (item: object, index: number, last: boolean) {
      const color = index === (this as any).selectedIndex && (this as any).computedColor
      const isDisabled = false // (
      //   !(this as any).isInteractive ||
      //   (this as any).getDisabled(item)
      // )
      return this.$createElement('div', (this as any).setTextColor(color, {
        staticClass: 'v-select__selection v-select__selection--comma',
        class: {
          'v-select__selection--disabled': isDisabled
        },
        on: {
          click: (e: MouseEvent) => {
            if (isDisabled) return
            this.currentItem = item as any
            (this as any).selectedIndex = index
          }
        },
        key: getObjectValueByPath(item, this.$props.itemKey)
      }), `${this.textItem(getObjectValueByPath(item, this.$props.itemKey))}${last ? '' : ', '}`)
    },
    textItem (itemkey: any): string {
      let txt = ''
      if (this.$props.showFullPath) {
        const p = (this as any).retrieveParentKeys(itemkey)
        p.map((v:any) => {
          const item = this.itemCashe.get(v)
          txt += getPropertyFromItem(item, this.$props.itemText) + this.$props.delimeter
        })
      }
      txt += getPropertyFromItem((this as any).itemCashe.get(itemkey), this.$props.itemText)
      return txt
    },
    retrieveParentKeys (itemKey: any): any[] {
      const result: any[] = []
      let parentKey = this.$data.parents.get(itemKey)
      while (parentKey) {
        result.unshift(parentKey)
        parentKey = this.$data.parents.get(parentKey)
      }
      return result
    },
    updateSelectedItems (e: { key: string| number, isSelected: boolean}) {
      if (this.$props.selectionType === 'independent') {
        if (!this.$props.multiple) {
          this.selectedCashe.clear()
        }
        e.isSelected === true ? this.selectedCashe.set(e.key, e.isSelected) : this.selectedCashe.delete(e.key)
      } else {
        const descendants = this.getDescendantKeys(e.key)
        descendants.unshift(e.key)
        descendants.map(v => {
          e.isSelected === true ? this.selectedCashe.set(v, e.isSelected) : this.selectedCashe.delete(v)
        })
      }
      this.updateSelectedItemsFromCashe()
    },
    updateSelectedItemsFromCashe () {
      const result = []
      for (const key of this.selectedCashe.keys()) {
        result.push(this.itemCashe.get(key))
      }
      this.selectedItems = result
      this.$emit('input', this.selectedItems)
    },
    updateSelectedPresentation () {
      this.$nextTick(() => {
        this.$data.selectedItems.map((v: any) => {
          const key = getObjectValueByPath(v, this.$props.itemKey)
          v.text = (this as any).textItem(key)
        })
      })
    },
    genListWithSlot (): VNode {
      const slots = ['prepend-item', 'no-data', 'append-item']
        .filter(slotName => this.$slots[slotName])
        .map(slotName => this.$createElement('template', {
          slot: slotName
        }, this.$slots[slotName]))
      // Requires destructuring due to Vue
      // modifying the `on` property when passed
      // as a referenced object
      return this.$createElement(VTreeSelectList, ({ ...this.listData }) as VNodeData, slots)
    }
  }
})
