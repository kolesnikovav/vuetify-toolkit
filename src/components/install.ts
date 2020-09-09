import { VueConstructor, Component } from 'vue'

export interface VuetifyToolkitUseOptions {
  components?: Record<string, Component>
}

export function install (Vue: VueConstructor, args: VuetifyToolkitUseOptions) {
  if ((install as any).installed) return
  (install as any).installed = true
  const components = args.components || {}

  for (const key in components) {
    const component = components[key]
    if (component) {
      Vue.component(key, component as typeof Vue)
    }
  }
  // Used to avoid multiple mixins being setup
  // when in dev mode and hot module reload
  // https://github.com/vuejs/vue/issues/5089#issuecomment-284260111
  if ((Vue as any).$_vuetify_toolkit_installed) return
  (Vue as any).$_vuetify_toolkit_installed = true
}
