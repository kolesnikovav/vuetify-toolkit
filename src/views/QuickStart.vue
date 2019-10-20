<template>
  <div class="about">
    <h2>Installation</h2>
    <pre>
      <code class="bash" style="darcula">npm install vuetify-toolkit -save</code>
    </pre>
    <p>or</p>
    <pre>
      <code class="bash" style="darcula">yarn add vuetify-toolkit</code>
    </pre>
    <h2>Basic usage</h2>
    <span />
    <p>Change your src/plugins/vuetify.js file as follows</p>
    <pre>
      <code class="javascript"  style="darcula">
        import Vue from 'vue';
        import Vuetify from 'vuetify/lib';
        import {VTreeSelect} from 'vuetify-toolkit/vuetify-toolkit.umd'
        Vue.use(Vuetify,{VTreeSelect});
        export default new Vuetify({
        icons: {
        iconfont: 'mdi',
        },
        });
      </code>
    </pre>
  </div>
</template>
