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
           <tr>
            <td>folder-icon</td> <td>[String, Function]</td> <td>undefined</td>
            <td>folder icon</td>
           </tr>
           <tr>
            <td>folder-open-icon</td> <td>[String, Function]</td> <td>undefined</td>
            <td>folder icon if folder is open</td>
           </tr>
           <tr>
            <td>item-icon</td> <td>[String, Function]</td> <td>undefined</td>
            <td>item icon</td>
           </tr>
           <tr>
            <td>folder-icon-color</td> <td>[String, Function]</td> <td>undefined</td>
            <td>Color of folder icon</td>
           </tr>
           <tr>
            <td>item-icon-color</td> <td>[String, Function]</td> <td>undefined</td>
            <td>item icon color</td>
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
          :folder-icon = "folderIcon"
          :folder-open-icon = "folderOpenIcon"
          :item-icon = "itemIcon"
          :folder-icon-color = "folderIconColor"
          :item-icon-color = "itemIconColor"
          :items-per-page = 5
          header-icon = "mdi-settings"
          upIcon = "mdi-arrow-expand-up"
          downIcon = "mdi-arrow-expand-down"
          filterIcon = "mdi-text-subject"
          filterSelectionIcon = "mdi-select-all"
          filterActiveIconColor = "red"
        >
          <template v-if="customSlots" v-slot:prependTree="{ item, open }">
            <v-icon >{{ open ? 'mdi-play' : 'mdi-pause' }}</v-icon>
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

import {
  staticitems,
  mdvHeaders
} from '../example-data'

const sandboxTemplateHTML =
`<v-md-view
          :items="items"
          :dark="dark"
          :headers="mdvHeaders"
          :selectable="selectable"
          :multiple="multiple"
          :dense="dense"
          :hierarchy = "hierarchy"
          :items-per-page = 5
          header-icon = "mdi-settings"
          upIcon = "mdi-arrow-expand-up"
          downIcon = "mdi-arrow-expand-down"
          filterIcon = "mdi-text-subject"
          filterActiveIconColor = "red"
        >
          <template v-if="customSlots" v-slot:prependTree="{ item, open }">
            <v-icon >{{ open ? "mdi-folder-open" : "mdi-folder" }}</v-icon>
          </template>
          <template v-if="customSlots" v-slot:itemTable.data-table-select="{ isSelected, select }">
            <v-simple-checkbox color="green" :value="isSelected" @input="select($event)"></v-simple-checkbox>
          </template>
</v-md-view>`

const sandboxCode =
`export default ({
  data: () => ({
    items: staticitems, // see items
    mdvHeaders: mdvHeaders, // see headers
    selectable: true,
    multiple: false,
    dense: false,
    dark: false,
    customSlots: false,
    hierarchy: false
  })
})`

export default Vue.extend({
  data: () => ({
    items: staticitems,
    mdvHeaders: mdvHeaders,
    selectable: true,
    multiple: false,
    dense: false,
    dark: false,
    customSlots: false,
    hierarchy: false,
    folderIcon: 'mdi-folder',
    folderOpenIcon: 'mdi-folder-open',
    itemIcon: 'mdi-file',
    itemIconColor: 'cyan',
    folderIconColor: 'amber',

    codeSandbox: false,
    sandboxTemplate: sandboxTemplateHTML,
    sandboxCode: sandboxCode

  })
})
</script>
