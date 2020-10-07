<template>
  <div>
    <h1>VTreeSelect</h1>
    <span></span>
    <p>
      VTreeSelect is the component that provide tree-like data selection. This combines original Vuetify components VAutocomplete and VTreeview in one.
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
           <tr>
            <td>selection-type</td> <td>boolean</td> <td>'leaf'</td>
            <td>Controls how the treeview selects nodes. There are two modes available: 'leaf' and 'independent'</td>
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
          <v-switch v-model="chips" class="ma-2" label="chips"></v-switch>
          <v-switch v-model="deletableChips" class="ma-2"    label="Deletable chips"></v-switch>
          <v-switch v-model="smallChips" class="ma-2"    label="Small chips"></v-switch>
          <v-switch v-model="dense" class="ma-2" label="dense"></v-switch>
          <v-switch v-model="clearable" class="ma-2" label="clearable"></v-switch>
          <v-switch v-model="dark" class="ma-2" label="dark"></v-switch>
          <v-switch v-model="customSlots" class="ma-2" label="Custom slots"></v-switch>
          <v-switch v-model="independent" class="ma-2" :label="getSelectionType()"></v-switch>
        </v-row>
        <v-tree-select
          v-model = "selectedItems"
          :autocomplete="autocomplete"
          :chips="chips"
          :dense="dense"
          :multiple="multiple"
          :items="items"
          :clearable="clearable"
          :dark="dark"
          :selectionType = "getSelectionType()"
          :smallChips = "smallChips"
          :deletableChips = "deletableChips"
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
    <v-tree-select v-model = "selectedItems" chips :items="items" clearable></v-tree-select>
    <h3>v-tree-select-select example (no data)</h3>
    <v-tree-select chips clearable></v-tree-select>
    <h3>v-tree-select-select example (multiple selection)</h3>
    <v-tree-select chips :items="items" clearable multiple></v-tree-select>
    <h3>v-tree-select disabled nodes</h3>
    <v-tree-select chips :items="items" item-disabled="locked" clearable multiple></v-tree-select>
    <h3>v-tree-select custom slots</h3>
    <v-tree-select chips :items="items" clearable multiple>
          <template v-slot:prependTree="{ item, open }">
            <v-icon v-if = "item.children">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
            <v-icon v-else>mdi-file</v-icon>
          </template>
          <template v-slot:labelTree="{ item }">
            <small>This is label slot... {{item.name}}</small>
          </template>
          <template v-slot:appendTree="{ item, open }">
            <v-icon v-if = "item.children">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
            <v-icon v-else>mdi-file</v-icon>
          </template>
    </v-tree-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { staticitems } from '../example-data'

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

const sandboxCode = '\n' +
'export default ({\n' +
'  data: () => ({\n' +
'    items: staticitems, // see data source \n' +
'    chips: false,\n' +
'    multiple: false,\n' +
'    dense: false,\n' +
'    clearable: false,\n' +
'    dark: false,\n' +
'    autocomplete: false,\n' +
'    customSlots: false\n' +
'  })\n' +
'})\n'

export default Vue.extend({
  data: () => ({
    items: staticitems,
    chips: false,
    multiple: false,
    dense: false,
    clearable: false,
    dark: false,
    autocomplete: false,
    customSlots: false,
    independent: true,
    deletableChips: false,
    smallChips: false,
    selectedItems: [],
    //
    codeSandbox: false,
    sandboxTemplate: sandboxTemplateHTML,
    sandboxCode: sandboxCode,
    dataSource: staticitems
  }),
  methods: {
    getSelectionType () { return (this.independent) ? 'independent' : 'leaf' }
  }
})
</script>
