import { VNode, VNodeData } from 'vue'
import { VMenuA } from '../../shims-vuetify'
import ComandToolbar from './commandToolbar'

/* This is headered menu.
This menu can contains fixed header or footer and scrolled content the same as native v-menu
For best user expirience, in this component included no-scrolled search results
*/

export default VMenuA.extend({
  name: 'v-headered-menu',
  mixins: [
    ComandToolbar
  ],
  methods: {
    /* This method have been overriden for provide no-scroll header/footer and search results in menu */
    genContent (): VNode {
      const menuStyles = Object.assign({}, (this as any).styles)
      menuStyles['overflow-Y'] = this.$props.useToolbar ? 'hidden' : 'auto'
      const menuStylesContent = Object.assign({}, (this as any).styles)
      menuStylesContent['overflow-Y'] = 'auto'
      const options = {
        attrs: {
          ...(this as any).getScopeIdAttrs(),
          role: 'role' in this.$attrs ? this.$attrs.role : 'menu'
        },
        staticClass: 'v-menu__content',
        class: {
          ...(this as any).rootThemeClasses,
          ...(this as any).roundedClasses,
          'v-menu__content--auto': (this as any).auto,
          'v-menu__content--fixed': (this as any).activatorFixed,
          menuable__content__active: (this as any).isActive,
          [(this as any).contentClass.trim()]: true
        },
        style: menuStyles,
        directives: (this as any).genDirectives(),
        ref: 'content',
        on: {
          click: (e: Event) => {
            const target = e.target as HTMLElement

            if (target.getAttribute('disabled')) return
            if ((this as any).closeOnContentClick) (this as any).isActive = false
          },
          keydown: (this as any).onKeyDown
        }
      } as VNodeData

      const optionsInternal = {
        style: menuStylesContent
      } as VNodeData

      if (this.$listeners.scroll) {
        options.on = options.on || {}
        options.on.scroll = this.$listeners.scroll
      }

      if (!(this as any).disabled && (this as any).openOnHover) {
        options.on = options.on || {}
        options.on.mouseenter = (this as any).mouseEnterHandler
      }

      if ((this as any).openOnHover) {
        options.on = options.on || {}
        options.on.mouseleave = (this as any).mouseLeaveHandler
      }
      /* for fixed header or footer */
      if (this.$props.useToolbar) {
        return this.$createElement('div', options, [
          ['top-left', 'top-right'].includes((this as any).toolbarPosition) ? (this as any).genToolbar() : undefined,
          this.$createElement('div', optionsInternal, [(this as any).getContentSlot()]),
          ['bottom-left', 'bottom-right'].includes((this as any).toolbarPosition) ? (this as any).genToolbar() : undefined
        ])
      }
      return this.$createElement('div', options, [(this as any).getContentSlot()])
    }
  }
})
