<template>
  <div>
    <h1>VTreeSelect</h1>
    <span></span>
    <p>
      VTreeSelect is the component that provide tree-like data selection. This combines original Vuetify components VAutocomplete and VTreeview in one.
      You can use any nested data like item source.
    </p>
    <p>
      This component extends <a href = "https://vuetifyjs.com/ru/components/autocompletes">VAutocomplete</a> component.
      It contains all propertyes, slots, events of extended component.
      The part of VTreeSelect component is <a href = "https://vuetifyjs.com/ru/components/treeview">VTreeview</a>. Properties and events are repeated.
      Scoped slots of <a href = "https://vuetifyjs.com/ru/components/treeview">VTreeview</a> are transformed:
        <ul>
          <li>prepend = prependTree</li>
          <li>apend = apendTree</li>
          <li>label = labelTree</li>
        </ul>
    </p>
    <p>Added properties are below</p>
    <table class="v-card__text v-data-table elevation-1 theme--light">
        <thead>
           <tr>
            <th>Name</th> <th>Type</th> <th>Default</th><th>Describtion</th>
           </tr>
        </thead>
        <tbody>
           <tr>
            <td>autocomplete</td> <td>boolean</td> <td>true</td>
            <td>Switch between autocomplete/select behavior</td>
           </tr>
        </tbody>
    </table>
    <span />
    <h2>Sandbox</h2>
    <v-card :dark="dark">
      <v-toolbar dense flat grey lighten-3>
        <v-spacer></v-spacer>
        <v-btn icon @click = "change('codeSandbox')">
          <v-icon >mdi-codepen</v-icon>
        </v-btn>
      </v-toolbar>
      <div v-if = "codeSandbox">
    <v-tabs
      background-color="white"
      color="black"
      right
    >
      <v-tab>Template</v-tab>
      <v-tab>Script</v-tab>
      <v-tab-item>
        <!-- <pre>
          <code class="html"  style="dracula">{{sandboxTemplate}}</code>
        </pre> -->
        <highlight-code lang="vue">{{sandboxTemplate}}</highlight-code>
      </v-tab-item>
      <v-tab-item>
        <!-- <pre>
          <code class="javascript"  style="dracula">
export default ({
  data: () => ({
    items: staticitems,
    dataGridHeaders: dataGridHeaders,
    desserts: desserts,
    chips: false,
    multiple: false,
    dense: false,
    clearable: false,
    dark: false,
    autocomplete: false,
    customSlots: false
  })
})

          </code>
        </pre> -->
      </v-tab-item>
    </v-tabs>
      </div>
      <v-card-text>
        <v-row justify="space-around">
          <v-switch v-model="autocomplete" class="ma-2" label="autocomplete"></v-switch>
          <v-switch v-model="multiple" class="ma-2" label="multiple"></v-switch>
          <v-switch v-model="chips" class="ma-2" label="chips"></v-switch>
          <v-switch v-model="dense" class="ma-2" label="dense"></v-switch>
          <v-switch v-model="clearable" class="ma-2" label="clearable"></v-switch>
          <v-switch v-model="dark" class="ma-2" label="dark"></v-switch>
          <v-switch v-model="customSlots" class="ma-2" label="Custom slots"></v-switch>
        </v-row>
        <v-tree-select
          :autocomplete="autocomplete"
          :chips="chips"
          :dense="dense"
          :multiple="multiple"
          :items="items"
          :clearable="clearable"
          :dark="dark"
        >
          <template v-if="customSlots" v-slot:prependTree="{ item, open }">
            <v-icon v-if = "item.children">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
            <v-icon v-else>mdi-file</v-icon>
          </template>
        </v-tree-select>
      </v-card-text>
    </v-card>
    <span />
    <h2>Examples</h2>
    <h3>v-tree-select-select example (chips selections)</h3>
    <v-tree-select chips :items="items" clearable></v-tree-select>
    <h3>v-tree-select-select example (no data)</h3>
    <v-tree-select chips clearable></v-tree-select>
    <h3>v-tree-select-select example (multiple selection)</h3>
    <v-tree-select chips :items="items" clearable multiple></v-tree-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VTreeSelect from '../components/VTreeSelect'
import VueHighlightJS from 'vue-highlight.js'
import { escapeHTML } from '../utils/Helper'
import { staticitems, dataGridHeaders, desserts } from '../example-data'

const sandboxTemplateHTML = '<v-tree-select\n' +
          '  :autocomplete="autocomplete"\n' +
          '  :chips="chips"\n' +
          '  :dense="dense"\n' +
          '  :multiple="multiple"\n' +
          '  :items="items"\n' +
          '  :clearable="clearable"\n' +
          '  :dark="dark"\n' +
          '>\n' +
          '<template v-if="customSlots" v-slot:prependTree="{ item, open }">\n' +
          '  <v-icon v-if = "item.children">{{ open ? "mdi-folder-open" : "mdi-folder" }}</v-icon>\n' +
          '  <v-icon v-else>mdi-file</v-icon>\n' +
          '</template>\n' +
          '</v-tree-select>'

export default Vue.extend({
  components: {
    VTreeSelect
  },
  data: () => ({
    items: staticitems,
    dataGridHeaders: dataGridHeaders,
    desserts: desserts,
    chips: false,
    multiple: false,
    dense: false,
    clearable: false,
    dark: false,
    autocomplete: false,
    customSlots: false,

    codeSandbox: false,
    sandboxTemplate: sandboxTemplateHTML,

    sandboxScript: ''

  }),
  methods: {
    change (val:string) {
      console.log(val)
      let changed = false
      if (val === 'codeSandbox') {
        this.codeSandbox = !this.codeSandbox
        changed = this.codeSandbox
      }
      console.log(changed)
      if (changed) this.paint()
    },
    paint () {
      // // console.log((window as any).hljs)
      // document.querySelectorAll('pre code').forEach(block => {
      //   (window as any).hljs.highlightBlock(block)
      // })
    }
  },
  mounted () {
    this.paint()
  },
  created () {
    this.paint()
  }
})
</script>
