<template>
  <div>
    <h1>VAdvDataTable</h1>
    <span></span>
    <p>
      VAdvDataTable means "Advanced Data Table". This component wraps <a
        href="https://vuetifyjs.com/en/components/data-tables">VDataTable</a> and add new possibilities in this
      component.
      User can select table columns order and visibility.
    </p>
    <p>Added properties are below</p>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Icon and style properties </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table class="v-card__text v-data-table elevation-1 theme--light">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Describtion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>headerIcon</td>
                <td>string</td>
                <td>undefined</td>
                <td>Determines header settings icon</td>
              </tr>
              <tr>
                <td>headerIconColor</td>
                <td>string</td>
                <td>undefined</td>
                <td>Settings icon color</td>
              </tr>
              <tr>
                <td>upIcon</td>
                <td>String</td>
                <td>'expand_more'</td>
                <td>The button icon to move header up</td>
              </tr>
              <tr>
                <td>downIcon</td>
                <td>string</td>
                <td>'expand_less'</td>
                <td>The button icon to move header down</td>
              </tr>
              <tr>
                <td>filterIcon</td>
                <td>string</td>
                <td>undefined</td>
                <td>Filter icon</td>
              </tr>
              <tr>
                <td>filterActiveIcon</td>
                <td>string</td>
                <td>undefined</td>
                <td>Filter icon when filter is active</td>
              </tr>
              <tr>
                <td>filterIconColor</td>
                <td>String</td>
                <td>'undefined'</td>
                <td>Default filter icon color</td>
              </tr>
              <tr>
                <td>filterActiveIconColor</td>
                <td>string</td>
                <td>'undefined'</td>
                <td>Filter icon color when it active</td>
              </tr>
              <tr>
                <td>filterActiveIconColor</td>
                <td>string</td>
                <td>'undefined'</td>
                <td>Filter icon color when it active</td>
              </tr>
            </tbody>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Datatable header modifications </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>Original vuetifyjs datatable header object is changed</p>
          <table class="v-card__text v-data-table elevation-1 theme--light">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Describtion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>filterable</td>
                <td>boolean</td>
                <td>false</td>
                <td>Allow to use value filter</td>
              </tr>
              <tr>
                <td>datatype</td>
                <td>['number', 'date, 'string']</td>
                <td>'string'</td>
                <td>Determines column datatype. If type is 'date' or 'number', then compare for equal than, more than, less than and between to becomes available</td>
              </tr>
            </tbody>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

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
           <code class="language-json code-text">{{headers}}</code>
          </pre>
          </div>
        </v-tab-item>
      </v-tabs>
      <v-card-text>
        <v-row justify="space-around">
          <v-switch v-model="showSelect" class="ma-2" label="showSelect"></v-switch>
          <v-switch v-model="singleSelect" class="ma-2" label="singleSelect"></v-switch>
          <v-switch v-model="dense" class="ma-2" label="dense"></v-switch>
          <v-switch v-model="dark" class="ma-2" label="dark"></v-switch>
          <v-switch v-model="customSlots" class="ma-2" label="Custom slots"></v-switch>
        </v-row>
        <v-adv-data-table :items="items" :dark="dark" :headers="headers" headerIcon="mdi-settings"
        upIcon = "mdi-arrow-expand-up"
        downIcon = "mdi-arrow-expand-down"
          headerIconColor="error" :showSelect="showSelect" :singleSelect="singleSelect" :dense="dense"
          :folder-icon="folderIcon" :folder-open-icon="folderOpenIcon" :item-icon="itemIcon"
          :folder-icon-color="folderIconColor" :item-icon-color="itemIconColor" :filter-icon="filterIcon"
          :filter-icon-color="filterIconColor" :filter-active-icon-color="filterActiveIconColor" :items-per-page=5>
          <template v-if="customSlots" v-slot:header.fat>
            <v-icon color="red">mdi-cake</v-icon>
          </template>
          <template v-if="customSlots" v-slot:item.calories="{ item }">
            <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip>
          </template>
          <template v-if="customSlots" v-slot:item.fat="{ item }">
            <v-chip :color="getColorFat(item.fat)" dark>{{ item.fat }}</v-chip>
          </template>
        </v-adv-data-table>
      </v-card-text>
    </v-card>
    <span />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { dataGridHeaders, desserts } from '../example-data'

const sandboxTemplateHTML =
`<v-adv-data-table
 :dense = "dense"
 :showSelect = "showSelect"
 :items="items"
 :headers="dataGridHeaders"
 :dark = "dark"
          >
          <template v-if="customSlots" v-slot:header.fat="{ header }">
            <v-icon color ="red">mdi-cake</v-icon>
          </template>
          <template v-if="customSlots" v-slot:item.calories="{ item }">
            <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip>
          </template>
          <template v-if="customSlots" v-slot:item.fat="{ item }">
            <v-chip :color="getColorFat(item.fat)" dark>{{ item.fat }}</v-chip>
          </template>
</v-adv-data-table>`

const sandboxCode =
`export default ({
  data: () => ({
    items: desserts, // see items
    dataGridHeaders: dataGridHeaders, // see headers
    multiple: false,
    dense: false,
    dark: false,
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
    headers: dataGridHeaders,
    showSelect: true,
    singleSelect: false,
    dense: false,
    dark: false,
    customSlots: false,
    filterIcon: 'mdi-text-subject',
    filterIconColor: 'red',
    filterActiveIconColor: 'green',
    folderIcon: 'folder',
    folderOpenIcon: 'folder-open',
    itemIcon: 'file',
    itemIconColor: 'cyan',
    folderIconColor: 'amber',

    codeSandbox: false,
    sandboxTemplate: sandboxTemplateHTML,
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
