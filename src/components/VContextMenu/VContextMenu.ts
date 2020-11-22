import Vue, { VNode } from 'vue'
import { VMenuA, VListA, VListItemA, VIconA, VDividerA } from '../../shims-vuetify'
import { ContextMenuCommand } from '../mixin/contextmenu'

export default Vue.extend({
  name: 'context-menu',
  data: () => ({
    isContextMenuActive: false,
    commands: ([] as ContextMenuCommand[]),
    item: undefined as any,
    positionX: 0,
    positionY: 0,
    positionXSubmenu: 0,
    positionYSubmenu: 0
  }),
  mounted () {
    this.$root.$on('context-menu-call', this.activateContextMenu)
  },
  methods: {
    genIcon (cmd: ContextMenuCommand): VNode|undefined {
      return cmd.icon ? this.$createElement(VIconA, cmd.icon) : undefined
    },
    genContextMenu (): VNode {
      const children: VNode[] = []
      const datacmd = this.$data.commands as ContextMenuCommand[]
      datacmd.map(v => {
        children.push(this.$createElement(VListItemA, {
          on: {
            click: (e: any) => this.executeAction(e, v.action)
          }
        }, [
          v.text, this.genIcon(v)]))
        if (datacmd.indexOf(v) !== datacmd.length - 1) {
          children.push(this.$createElement(VDividerA))
        }
      })
      return this.$createElement(VListA, {
        ref: 'content'
      }, children)
    },
    activateSubmenu (refSub: string, e: Event) {
      if (e instanceof MouseEvent) {
        this.positionXSubmenu = e.clientX + 2
        this.positionYSubmenu = e.clientY + 2
      }
      (this.$refs[refSub] as any).$data.isActive = true
    },
    activateContextMenu (e: any) {
      this.commands = e.commands
      this.item = e.item
      this.isContextMenuActive = true
      if (e.event instanceof MouseEvent) {
        this.positionX = e.event.x
        this.positionY = e.event.y
      }
      (this.$refs.contextmenu as any).$data.isActive = true;
      (e.event as Event).stopPropagation()
    },
    deactivateContextMenu () {
      (this.$refs.contextmenu as any).$data.isActive = false
    },
    executeAction (e: any, c: String| Function) {
      alert(this.item)
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
    }
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
