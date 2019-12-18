<template>
  <div>
    <h1>VPropEditor</h1>
    <span></span>
    <p>
      VPropEditor is designed for simplify control on VDataTable headers and rows. This combines original Vuetify components VAutocomplete and VTreeview in one.
      You can use any nested data as item source.
    </p>
    <p>
      This component extends <a href = "https://vuetifyjs.com/en/components/autocompletes">VAutocomplete</a> component.
      It contains all properties, slots, events of extended component.
      The part of VTreeSelect component is <a href = "https://vuetifyjs.com/en/components/treeview">VTreeview</a>. Properties and events are repeated.
      Scoped slots of <a href = "https://vuetifyjs.com/en/components/treeview">VTreeview</a> are transformed:
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
        <v-btn icon @click = "codeSandbox = !codeSandbox">
          <v-icon >mdi-codepen</v-icon>
        </v-btn>
      </v-toolbar>
      <v-tabs
          v-if = "codeSandbox"
          :dark="dark"
          right
      >
      <v-tab>Template</v-tab>
      <v-tab>Script</v-tab>
      <v-tab>Data source</v-tab>
      <v-tab-item>
        <div class = "v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
          <pre class = "language-html">
           <code class="language-html code-text" >{{sandboxTemplate}}</code>
          </pre>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class = "v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
          <pre class = "language-javascript">
           <code class="language-javascript code-text" >{{sandboxCode}}</code>
          </pre>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class = "v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
          <pre class = "language-json">
           <code class="language-json code-text" >{{dataSource}}</code>
          </pre>
        </div>
      </v-tab-item>
    </v-tabs>
      <v-card-text>
        <v-row justify="space-around">
          <v-switch v-model="autocomplete" class="ma-2" label="autocomplete"></v-switch>
          <v-switch v-model="multiple" class="ma-2" label="multiple"></v-switch>
          <v-switch v-model="dense" class="ma-2" label="dense"></v-switch>
          <v-switch v-model="dark" class="ma-2" label="dark"></v-switch>
          <v-switch v-model="customSlots" class="ma-2" label="Custom slots"></v-switch>
        </v-row>
          <v-data-table-editable :items="items" :headers="dataGridHeaders" item-key = "name" item-text = "name" :dark = "dark" :dense = "dense"
          >
          </v-data-table-editable>
      </v-card-text>
    </v-card>
    <span />
    <h2>Examples</h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { dataGridHeaders, desserts } from '../example-data'

const sandboxTemplateHTML = '<v-data-table-editable\n' +
          '  :dense="dense"\n' +
          '  :multiple="multiple"\n' +
          '  :items="items"\n' +
          '  :dark="dark"\n' +
          '>\n' +
          '<template v-if="customSlots" v-slot:prependTree="{ item, open }">\n' +
          '  <v-icon v-if = "item.children">{{ open ? "mdi-folder-open" : "mdi-folder" }}</v-icon>\n' +
          '  <v-icon v-else>mdi-file</v-icon>\n' +
          '</template>\n' +
          '</v-data-table-editable>'

const sandboxCode = '\n' +
'export default ({\n' +
'  data: () => ({\n' +
'    items: staticitems, // see data source \n' +
'    multiple: false,\n' +
'    dense: false,\n' +
'    dark: false,\n' +
'    customSlots: false\n' +
'  })\n' +
'})\n'

export default Vue.extend({
  data: () => ({
    items: desserts,
    dataGridHeaders: dataGridHeaders,
    multiple: false,
    dense: false,
    clearable: false,
    dark: false,
    autocomplete: false,
    customSlots: false,
    //
    codeSandbox: false,
    sandboxTemplate: sandboxTemplateHTML,
    sandboxCode: sandboxCode,
    dataSource: desserts
  })
})
</script>
