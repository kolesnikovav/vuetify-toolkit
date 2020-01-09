import Vue from 'vue'
import VColumnEditor from './VColumnEditor'

const columnEditor = Vue.extend({
  name: 'ce',
  components: {
    VColumnEditor
  }
})

export default Vue.directive('v-place-settings-bar', {
  inserted (el, binding, vnode) {
    const head = el.getElementsByTagName('thead')
    if (head) {
      const e = columnEditor[0]
      e.insertBefore()
      console.log(e)
    }
    console.log(head)
    console.log(binding)
    console.log(vnode)
  }
})
// export const PlaceSettingsBar = {
//   inserted (el, binding) {
//     // const onClick = (e) => directive(e, el, binding)
//     // // iOS does not recognize click events on document
//     // // or body, this is the entire purpose of the v-app
//     // // component and [data-app], stop removing this
//     // const app = document.querySelector('[data-app]') ||
//     //     document.body // This is only for unit tests
//     // app.addEventListener('click', onClick, true)
//     // el._clickOutside = onClick
//   },

//   unbind (el) {
//     if (!el._clickOutside) return

//     const app = document.querySelector('[data-app]') ||
//         document.body // This is only for unit tests
//     app && app.removeEventListener('click', el._clickOutside, true)
//     delete el._clickOutside
//   }
// }

// export default PlaceSettingsBar
