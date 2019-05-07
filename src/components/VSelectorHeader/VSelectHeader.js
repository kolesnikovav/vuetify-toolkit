import { VToolbar, VBtn, VIcon, VTooltip } from '../../../vuetify-import'

/**
 * @typedef { Object } ToolbarCommand
 * @property { string | undefined } icon - command icon
 * @property { string | undefined } text - command text
 * @property { function | boolean | undefined } commandDisabled
 * @property { function | string } commandHandler
 * @property { string | undefined } tooltip - tooltip text
 */
/** @type {ToolbarCommand[]} */

export default VToolbar.extend({
    name: 'v-select-header',
    props: {
        /** @type {ToolbarCommand[]} */
        toolbarCommands: [],
        ...VToolbar.props
    },
    computed: {
        classes() {
            return Object.assign({}, VToolbar.options.computed.classes.call(this), {})
        },
    },
    methods: {
        genCommand( /** @type {ToolbarCommand} */ cmd ) {
            const children = []
            if (cmd.text) children.push(cmd.text)
            if (cmd.icon) {
                children.push(
                    this.$createElement(VIcon, {
                        domProps: {
                            innerHTML: cmd.icon
                        },
                    })
                )
            }
            let disabledCmd = false
            if (typeof cmd.commandDisabled === 'function') {
                disabledCmd = cmd.commandDisabled()
            } else {
                disabledCmd = cmd.commandDisabled ? true : false
            }
            return this.$createElement(VBtn, {
                props: {
                    disabled: disabledCmd,
                    icon: cmd.text ? false : true
                },
                on: {
                    click: cmd.commandHandler,
                },
                slot: cmd.tooltip ? 'activator' : 'default'
                //ref: 'activator',
            }, children)
        },
        genTooltip( /** @type {ToolbarCommand} */ cmd) {
            if (cmd.tooltip) {
                return this.$createElement(VTooltip,{},[
                    this.genCommand(cmd),
                    this.$createElement('span',cmd.tooltip)
                ])
            } else return this.genCommand(cmd)
        }
    },
    render() {
        const children = []
        this.toolbarCommands.forEach(cmd => {
            children.push(this.genTooltip(cmd))
        })
        return this.$createElement(VToolbar, {}, children)
    }
})