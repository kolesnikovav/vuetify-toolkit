<template>
  <div class="about">
    <h2>Installation</h2>
    <pre>
      <code class="bash" style="dracula">npm install vuetify-toolkit -save</code>
    </pre>
    <p>or</p>
    <pre>
      <code class="bash" style="dracula">yarn add vuetify-toolkit</code>
    </pre>
    <h2>Basic usage</h2>
    <span />
    <p>Change your src/plugins/vuetify.js file as follows</p>
    <pre>
      <code class="javascript" style="dracula">
        import Vue from 'vue';
        import Vuetify from 'vuetify/lib';
        import {
          VTreeSelect,
          VCascader,
          VDataGridSelect,
          VmdView } from 'vuetify-toolkit/vuetify-toolkit.umd'

        Vue.use(Vuetify,{
          VTreeSelect,
          VCascader,
          VDataGridSelect,
          VmdViewv  });
        export default new Vuetify({
            icons: {
            iconfont: 'mdi',
          },
        });
      </code>
    </pre>
    <span />
    <p>Use this components like</p>
    <pre>
      <code class="html" style="dracula">{{htmlDefault}}</code>
    </pre>
  </div>
</template>

<script>
export default {
  data: () => ({
    htmlDefault:
      '<template>\n' +
      '  <v-app>\n    <v-tree-select>\n    </v-tree-select>' +
      '\n    <v-cascader>\n    </v-cascader>' +
      '\n    <v-data-grid-select>\n    </v-data-grid-select>' +
      '\n    <v-md-view>\n    </v-md-view>' +
      '\n  </v-app>\n' +
      '</template>'
  }),
  methods: {
    paint () {
      document.querySelectorAll('pre code').forEach(block => {
        window.hljs.highlightBlock(block)
      })
    }
  },
  mounted () {
    this.paint()
  }
}
</script>
