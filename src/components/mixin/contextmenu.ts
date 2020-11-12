import Vue from 'vue'
import { PropValidator } from 'vue/types/options'
import { Command } from '../../utils/ToolbarCommand'

// Types
type CommandArrayOrFunc = PropValidator<ContextMenuCommand[] | (() => ContextMenuCommand[])>

export interface ContextMenuCommand extends Command {
    item? : any,
    submenu? : CommandArrayOrFunc
}

export default Vue.extend({
  name: 'context-menu',
  props: {
    contextMenuCommands: {
      type: [Array, Function],
      default: () => ([])
    } as CommandArrayOrFunc
  },
  data: () => ({
    isContextMenuActive: false,
    compiledMenu: null as any
  }),
  computed: {
    computedCommands (): ContextMenuCommand[] {
      if (this.contextMenuCommands instanceof Array) return this.contextMenuCommands
      const cmd = this.contextMenuCommands()
      return cmd
    },
    hasCommands (): boolean {
      return this.computedCommands && this.computedCommands.length > 0
    }
  },
  mounted () {
    if (this.hasCommands) {
      this.$el.addEventListener('contextmenu', this.genContextMenu)
    }
  },
  methods: {
    genContextMenu (e: Event) {
      e.preventDefault()
      this.$root.$emit('context-menu-call', { event: e, commands: this.computedCommands })
    }
  }
})
