<template>
  <div>
    <h1>VDataGridSelect</h1>
    <span></span>
    <p>
      VDataGridSelect is the component that uses for selection from tabular data.
      It allows display full information for users. This component can be highly customized.
    </p>
    <p>
      This component extends <a href = "https://vuetifyjs.com/en/components/autocompletes">VAutocomplete</a> component.
      The part of VDataGridSelect component is <a href = "https://vuetifyjs.com/en/components/data-tables">VDataTable</a>. Properties and events are repeated.
      Scoped slots of <a href = "https://vuetifyjs.com/en/components/data-tables">VDataTable</a> are transformed:
        <ul>
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
           <code class="language-json code-text">{{dataGridHeaders}}</code>
          </pre>
          </div>
        </v-tab-item>
      </v-tabs>
        <v-card-text>
          <v-row justify="space-around">
          <v-switch v-model="autocomplete" class="ma-2" label="autocomplete"></v-switch>
          <v-switch v-model="multiple" class="ma-2" label="multiple"></v-switch>
          <v-switch v-model="chips" class="ma-2"    label="chips"></v-switch>
          <v-switch v-model="deletableChips" class="ma-2"    label="Deletable chips"></v-switch>
          <v-switch v-model="smallChips" class="ma-2"    label="Small chips"></v-switch>
          <v-switch v-model="dense" class="ma-2"    label="dense"></v-switch>
          <v-switch v-model="clearable" class="ma-2"    label="clearable"></v-switch>
          <v-switch v-model="dark" class="ma-2"    label="dark"></v-switch>
          <v-switch v-model="customSlots" class="ma-2" label="Custom slots"></v-switch>
          <v-switch v-model="useToolbar" class="ma-2" label="useToolbar"></v-switch>
          </v-row>
          <v-data-grid-select v-model = "selectedItems" :autocomplete = "autocomplete" :chips = "chips" :dense = "dense" :multiple = "multiple" :items="items" :clearable = "clearable"
            :headers="dataGridHeaders" item-key = "name" item-text = "name" :dark = "dark"
            :smallChips = "smallChips" :deletableChips = "deletableChips"
            :useToolbar = "useToolbar"
            toolbarHeader = "Press something"
          >
          <template v-if="customSlots" v-slot:headerTable.fat>
            <v-icon color ="red">mdi-cake</v-icon>
          </template>
          <template v-if="customSlots" v-slot:itemTable.calories="{ item }">
            <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip>
          </template>
          <template v-if="customSlots" v-slot:itemTable.fat="{ item }">
            <v-chip :color="getColorFat(item.fat)" dark>{{ item.fat }}</v-chip>
          </template>
          </v-data-grid-select>
        </v-card-text>
      </v-card>
      <h2>Examples</h2>
    <h3>v-data-grid-select example</h3>
    <v-data-grid-select chips :items="items" :headers="dataGridHeaders" item-key = "name" item-text = "name" clearable>
    </v-data-grid-select>
    <h3>v-data-grid-select example (multiple select dense)</h3>
    <v-data-grid-select chips :items="items" :headers="dataGridHeaders" item-key="name" item-text = "name" clearable multiple dense>
    </v-data-grid-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { dataGridHeaders, desserts } from '../example-data'

const sandboxTemplate =
`<v-data-grid-select
 :autocomplete = "autocomplete"
 :chips = "chips"
 :dense = "dense"
 :multiple = "multiple"
 :items="items"
 :clearable = "clearable"
 :headers="dataGridHeaders"
 item-key = "name"
 item-text = "name"
 :dark = "dark"
          >
          <template v-if="customSlots" v-slot:headerTable.fat="{ header }">
            <v-icon color ="red">mdi-cake</v-icon>
          </template>
          <template v-if="customSlots" v-slot:itemTable.calories="{ item }">
            <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip>
          </template>
          <template v-if="customSlots" v-slot:itemTable.fat="{ item }">
            <v-chip :color="getColorFat(item.fat)" dark>{{ item.fat }}</v-chip>
          </template>
</v-data-grid-select>`

const sandboxCode =
`export default ({
  data: () => ({
    items: desserts, // see items
    dataGridHeaders: dataGridHeaders, // see headers
    chips: false,
    multiple: false,
    dense: false,
    clearable: false,
    dark: false,
    autocomplete: false,
    customSlots: false,
  }),
  methods: {
    getColor (calories) {
      if (calories > 400) return "red"
      else if (calories > 200) return "orange"
      else return "green"
    },
    getColorFat (fat: any) {
      if (fat > 20) return "red"
      else if (fat > 10) return "orange"
      else return "green"
    }
  }
})`

export default Vue.extend({
  data: () => ({
    items: desserts,
    dataGridHeaders: dataGridHeaders,
    desserts: desserts,
    //
    chips: false,
    multiple: false,
    dense: false,
    clearable: false,
    dark: false,
    autocomplete: false,
    customSlots: false,
    deletableChips: false,
    smallChips: false,
    selectedItems: [],
    useToolbar: false,
    //
    codeSandbox: false,
    sandboxTemplate: sandboxTemplate,
    sandboxCode: sandboxCode
  }),
  methods: {
    getColor (calories: any) {
      if (calories > 400) return 'red'
      else if (calories > 200) return 'orange'
      else return 'green'
    },
    getColorFat (fat: any) {
      if (fat > 20) return 'red'
      else if (fat > 10) return 'orange'
      else return 'green'
    }
  }
})
</script>
