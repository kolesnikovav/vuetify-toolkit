import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/default.css'

// // Highlight.js languages (Only required languages)
// import css from 'highlight.js/lib/languages/css'
// import javascript from 'highlight.js/lib/languages/javascript'
// import vue from 'vue-highlight.js/lib/languages/vue'

Vue.use(VueHighlightJS)

/*
* Import Highlight.js theme
* Find more: https://highlightjs.org/static/demo/
*/
// import 'highlight.js/styles/default.css';
// import 'highlight.js/styles/darcula.css'
// const hljs = require('highlight.js/lib/highlight')
// const javascript = require('highlight.js/lib/languages/javascript')
// const bash = require('highlight.js/lib/languages/bash')
// const xml = require('highlight.js/lib/languages/xml')

// hljs.registerLanguage('javascript', javascript)
// hljs.registerLanguage('bash', bash)
// hljs.registerLanguage('xml', xml)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
