/*eslint-disable*/
import Vue, { VNode } from 'vue'
import { VMenuA, VListA, VListItemTitleA, VIconA, VDividerA, } from '../../shims-vuetify'
import { ContextMenuCommand } from '../mixin/contextmenu'
import { consoleError } from '../../vuetify-import'

interface MenuItemsMap {
  [id: string]: ContextMenuCommand
}

export default Vue.extend({
  name: 'context-menu',
  data: () => ({
    isContextMenuActive: false,
    commands: ([] as ContextMenuCommand[]),
    positionX: 0,
    positionY: 0,
    positionXSubmenu: 0,
    positionYSubmenu: 0,
    menuItemsMap: ({} as MenuItemsMap)
  }),
  mounted () {
    this.$root.$on('context-menu-call', this.activateContextMenu)
  },
  methods: {
    genTileText (text: string): VNode {
      return this.$createElement('div',{
        staticClass: 'v-list__tile__title',
        domProps: {
          innerText: text
        }
      })
    },
     genContextMenuItem (cmd: ContextMenuCommand, indexes: any): VNode[] {
      indexes.submenuIndex++
      const divider = this.$createElement(VDividerA)
      const children: VNode[] = []
      if (cmd.text) {
        const title = this.genTileText(cmd.text)
        children.push(title)
      }
      if (cmd.icon) {
        children.push(this.$createElement(VIconA, cmd.icon))
      }
      if (cmd.submenu) {
        children.push(this.$createElement(VIconA,'$vuetify.icons.subgroup'))
      }
      if (!cmd.submenu) {
        const cMenuRef = 'CMenuItem'+ indexes.itemindex
        indexes.itemindex++
        indexes.menuItemsMap[cMenuRef] = cmd
        let cmdCanBeExecuted = true
        if (typeof cmd.disabled === 'boolean') {
          cmdCanBeExecuted = cmd.disabled
        } else if (typeof cmd.disabled === 'function') {
          //cmdCanBeExecuted = cmd.disabled()
        }
        return [this.$createElement(VListItemTitleA, {
          ref: cMenuRef,
          props: {
            title: cmd.text,
            disabled: !cmdCanBeExecuted
          },
          on: {
            click: (e: Event) => {
              e.stopPropagation()
              e.preventDefault()
              this.executeAction(e, cMenuRef)
              this.deactivateContextMenu()
            },
            contextmenu: (e: Event) => {
              e.preventDefault()
              e.stopPropagation()
            }
          }
        }, children), divider]
      } else {
        const cmdSub = (cmd.submenu instanceof Array ? cmd.submenu : (cmd.submenu as () => ContextMenuCommand[]).call(this) as ContextMenuCommand[])
        const submenuItems: VNode[] = []
        cmdSub.forEach((v: any)  => {
          const subm = this.genContextMenuItem(v, indexes)
          submenuItems.push(...subm)
        })
        const submenuContent = this.$createElement(VListA,{
          ref: 'content'
        },submenuItems)

        const submenuTile = this.$createElement(VListItemTitleA, {
          ref: 'activator' + indexes.submenuIndex,
          props: {
            title: cmd.text
          },
          on: {
            click: (e: Event) => {
              e.stopPropagation()
              this.activateSubmenu('submenu' + indexes.submenuIndex, e)
            },
            contextmenu: (e: Event) => {
              e.preventDefault()
            }
          }
        }, [children])
        return [submenuTile, this.$createElement(VMenuA, {
          ref: 'submenu' + indexes.submenuIndex,
          props: {
            absolute: true,
            positionX: this.positionXSubmenu,
            positionY: this.positionYSubmenu
          }
        }, [submenuContent, divider])]
      }
    },
    genContextMenu (): VNode {
      this.menuItemsMap =  ({} as MenuItemsMap)
      let idxMenu = {
        submenuIndex: 0,
        itemindex: 0,
        menuItemsMap: ({} as MenuItemsMap)
      }
      const children: VNode[] = []
      const datacmd = this.$data.commands as ContextMenuCommand[]
      datacmd.forEach(cmd => {
        const chItem = this.genContextMenuItem(cmd, idxMenu )
        children.push(...chItem)
      })
      this.menuItemsMap = idxMenu.menuItemsMap;
      return this.$createElement(VListA, {
        ref: 'content'
      }, children)
    },
    activateSubmenu ( refSub: string, e: Event) {
      if (e instanceof MouseEvent) {
        this.positionXSubmenu = e.clientX + 2;
        this.positionYSubmenu = e.clientY + 2
      }
      (this.$refs[refSub] as any).$data.isActive = true
    },
    activateContextMenu (e: any) {
      this.commands = e.commands
      this.isContextMenuActive = true
      if (e.event instanceof MouseEvent) {
          this.positionX = e.event.x
          this.positionY = e.event.y
      }
      (this.$refs.contextmenu as any).$data.isActive = true;
      (e.event as Event).stopPropagation()
    },
    deactivateContextMenu () {
      (this.$refs.contextmenu as any).$data.isActive = false;
    },
    executeAction (e: any, c: string) {
      // const cmd = this.menuItemsMap[c]
      // if (typeof cmd.action === 'string') {
      //   if (cmd.target) {
      //     if (cmd.target[cmd.action]) {
      //       cmd.container[cmd.action](cmd.target)
      //     } else {
      //       consoleError(`container not have a method ` + cmd.action, cmd)
      //     }
      //   } else {
      //     consoleError(`container property must be defined if action  type is string`, cmd)
      //   }
      // } else if (typeof cmd.action === 'function') {
      //   cmd.action(cmd.target)
      // }
    },
  },
  render (h): VNode {
    return h(VMenuA, {
      ref: 'contextmenu',
      props: {
        absolute: true,
        positionX: this.positionX,
        positionY: this.positionY,
        isActive: this.isContextMenuActive
      },
      on: {
        contextmenu: (e: Event) => {
          e.preventDefault()
        }
      }
    }, [this.genContextMenu()])
  }
})

