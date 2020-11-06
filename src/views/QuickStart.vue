<template>
  <div class="about">
    <h2>About</h2>
    <span></span>
    <p>
      <a href = "https://vuetifyjs.com/">Vuetify.js</a> is the amazing library for creating material design styled user interfaces.
      This library contains several components for using inside vuetify application.
    </p>
    <h2>Installation</h2>
    <div class = "v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
    <pre class = "language-bash">
      <code class="language-bash code-text" >npm install vuetify-toolkit -save</code>
    </pre>
    </div>
    <p>or</p>
    <div class = "v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
    <pre class = "language-bash">
      <code class="language-bash code-text">yarn add vuetify-toolkit</code>
    </pre>
    </div>
    <h2>Basic usage</h2>
    <span />
    <p>Change your src/plugins/vuetify.js file as follows</p>
    <div class = "v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
    <pre class = "language-javascript">
      <code class="language-javascript code-text">
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
    </div>
    <span />
    <p>Use this components like</p>
    <div class = "v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
    <pre class = "language-html">
      <code class="language-html code-text">{{htmlDefault}}</code>
    </pre>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    htmlDefault:
      `<template>
        <v-app>
         <v-tree-select>
         </v-tree-select>
         <v-cascader></v-cascader>
         <v-data-grid-select> </v-data-grid-select>
         <v-md-view> </v-md-view>
         </v-app>
      </template>`
  })
}
</script>
