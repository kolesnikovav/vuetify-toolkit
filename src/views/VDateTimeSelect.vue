<template>
  <div>
    <h1>VDateTimeSelect</h1>
    <span></span>
    <p>
      VDateTimeSelect is specialy designed for datetime selection.
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
    </v-tabs>
      <v-card-text>
        <v-row justify="space-around">
          <v-switch v-model="autocomplete" class="ma-2" label="autocomplete"></v-switch>
          <v-switch v-model="dense" class="ma-2" label="dense"></v-switch>
          <v-switch v-model="clearable" class="ma-2" label="clearable"></v-switch>
          <v-switch v-model="dark" class="ma-2" label="dark"></v-switch>
          <v-switch v-model="customSlots" class="ma-2" label="Custom slots"></v-switch>
        </v-row>
        <v-date-time-select
          :autocomplete="autocomplete"
          :chips="chips"
          :dense="dense"
          :clearable="clearable"
          :dark="dark"
        >
        </v-date-time-select>
      </v-card-text>
    </v-card>
    <span />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VDateTimeSelect from '../components/VDateTimeSelect'
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
  components: {
    VDateTimeSelect
  },
  data: () => ({
    items: [],
    chips: false,
    multiple: false,
    dense: false,
    clearable: false,
    dark: false,
    autocomplete: false,
    customSlots: false,
    // //
    codeSandbox: false,
    sandboxTemplate: sandboxTemplateHTML,
    sandboxCode: sandboxCode
    // dataSource: staticitems

  })
})
</script>
