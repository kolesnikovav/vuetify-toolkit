<template>
  <div>
    <h1>VMdView</h1>
    <span></span>
    <p>
      VMdView is the component that uses for master-detail view.
      It can be used separately or as a part of your custom pickers.
    </p>
    <p>
      This component consist of two parts. The left part is treeview. The right part is data table. For data table provide paginator. It appears if nessesary
      The parts of VMdView component is <a href = "https://vuetifyjs.com/en/components/treeview">VTreeview</a> and <a href = "https://vuetifyjs.com/en/components/data-tables">VDataTable</a>.
      Scoped slots of <a href = "https://vuetifyjs.com/en/components/treeview">VTreeview</a> and  <a href = "https://vuetifyjs.com/en/components/data-tables">VDataTable</a> are transformed:
        <ul>
          <li>prepend = prependTree</li>
          <li>apend = apendTree</li>
          <li>label = labelTree</li>
          <li>item = itemTable</li>
          <li>header = headerTable</li>
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
            <td>multiple</td> <td>boolean</td> <td>false</td>
            <td>Allow multiple selections in table</td>
           </tr>
           <tr>
            <td>hierarchy</td> <td>boolean</td> <td>true</td>
            <td>If true, only children of left active node should be displayed, else - all items</td>
           </tr>
           <tr>
            <td>item-children</td> <td>[String, Function]</td> <td>'children'</td>
            <td>Is the name or function of children items property</td>
           </tr>
        </tbody>
    </table>
    <span />
    <h2>Sandbox</h2>
    <v-card :dark="dark">
      <v-toolbar dense flat grey lighten-3>
        <v-spacer></v-spacer>
        <v-btn icon @click="codeSandbox = !codeSandbox">
          <v-icon>mdi-codepen</v-icon>
        </v-btn>
      </v-toolbar>
      <v-tabs v-if="codeSandbox" :dark="dark" right>
        <v-tab>Template</v-tab>
        <v-tab>Script</v-tab>
        <v-tab>Items</v-tab>
        <v-tab>Headers</v-tab>
        <v-tab-item>
          <div class="v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
            <pre class="language-html">
           <code class="language-html code-text">{{sandboxTemplate}}</code>
          </pre>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
            <pre class="language-javascript">
           <code class="language-javascript code-text">{{sandboxCode}}</code>
          </pre>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
            <pre class="language-json">
           <code class="language-json code-text">{{items}}</code>
          </pre>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
            <pre class="language-json">
           <code class="language-json code-text">{{mdvHeaders}}</code>
          </pre>
          </div>
        </v-tab-item>
      </v-tabs>
      <v-card-text>
        <v-row justify="space-around">
          <v-switch v-model="selectable" class="ma-2" label="selectable"></v-switch>
          <v-switch v-model="multiple" class="ma-2" label="multiple"></v-switch>
          <v-switch v-model="dense" class="ma-2" label="dense"></v-switch>
          <v-switch v-model="dark" class="ma-2" label="dark"></v-switch>
          <v-switch v-model="customSlots" class="ma-2" label="Custom slots"></v-switch>
          <v-switch v-model="hierarchy" class="ma-2" label="hierarchy"></v-switch>
        </v-row>
        <v-md-view
          :items="items"
          :dark="dark"
          :headers="mdvHeaders"
          :selectable="selectable"
          :multiple="multiple"
          :dense="dense"
          :hierarchy = "hierarchy"
          :items-per-page = 5
        >
          <template v-if="customSlots" v-slot:prependTree="{ item, open }">
            <v-icon >{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
          </template>
          <template v-if="customSlots" v-slot:itemTable.data-table-select="{ isSelected, select }">
            <v-simple-checkbox color="green" :value="isSelected" @input="select($event)"></v-simple-checkbox>
          </template>
        </v-md-view>
      </v-card-text>
    </v-card>
    <span />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VMdView from '../components/VMdView'

import {
  staticitems,
  mdvHeaders
} from '../example-data'

const sandboxTemplateHTML = '<v-md-view\n' +
'          :items="items"\n' +
'          :dark="dark"\n' +
'          :headers="mdvHeaders"\n' +
'          :selectable="selectable"\n' +
'          :multiple="multiple"\n' +
'          :dense="dense"\n' +
'          :hierarchy = "hierarchy"\n' +
'          :items-per-page = 5\n' +
'        >\n' +
'          <template v-if="customSlots" v-slot:prependTree="{ item, open }">\n' +
'            <v-icon >{{ open ? "mdi-folder-open" : "mdi-folder" }}</v-icon>\n' +
'          </template>\n' +
'          <template v-if="customSlots" v-slot:itemTable.data-table-select="{ isSelected, select }">\n' +
'            <v-simple-checkbox color="green" :value="isSelected" @input="select($event)"></v-simple-checkbox>\n' +
'          </template>\n' +
'</v-md-view>'

const sandboxCode = '\n' +
'export default ({\n' +
'  data: () => ({\n' +
'    items: staticitems, // see items\n' +
'    mdvHeaders: mdvHeaders, // see headers\n' +
'    selectable: true,\n' +
'    multiple: false,\n' +
'    dense: false,\n' +
'    dark: false,\n' +
'    customSlots: false,\n' +
'    hierarchy: false\n' +
'  })\n' +
'})\n'

export default Vue.extend({
  components: {
    VMdView
  },
  data: () => ({
    items: staticitems,
    mdvHeaders: mdvHeaders,
    selectable: true,
    multiple: false,
    dense: false,
    dark: false,
    customSlots: false,
    hierarchy: false,

    codeSandbox: false,
    sandboxTemplate: sandboxTemplateHTML,
    sandboxCode: sandboxCode

  })
})
</script>
