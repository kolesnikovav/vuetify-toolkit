<template>
  <div>
    <h1>ComandToolbar</h1>
    <span></span>
    <p>
      Some components needs a toolbar.
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
      </v-tabs>
      <v-card-text>
        <v-row justify="space-around">
        </v-row>
        <v-tree-extended
        :items = "items"
        :toolbarCommands = "toolbarCommandsTreeView"
        >
        <!-- <template v-slot:toolbar></template> -->
        </v-tree-extended>

      </v-card-text>
    </v-card>
    <span />
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import Vue, { VNode } from 'vue'
import ComandToolbar from '../components/mixin/comandToolbar'
import { staticitems } from '../example-data'
import { defaultTreeSelectCommands } from '../utils/ToolbarCommand'
import { VTreeview } from 'vuetify/lib'

const sandboxTemplateHTML = '<v-adv-data-table\n' +
' :dense = "dense"\n' +
' :showSelect = "showSelect"\n' +
' :items="items"\n' +
' :headers="dataGridHeaders"\n' +
' :dark = "dark"\n' +
'          >\n' +
'          <template v-if="customSlots" v-slot:header.fat="{ header }">\n' +
'            <v-icon color ="red">mdi-cake</v-icon>\n' +
'          </template>\n' +
'          <template v-if="customSlots" v-slot:item.calories="{ item }">\n' +
'            <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip>\n' +
'          </template>\n' +
'          <template v-if="customSlots" v-slot:item.fat="{ item }">\n' +
'            <v-chip :color="getColorFat(item.fat)" dark>{{ item.fat }}</v-chip>\n' +
'          </template>\n' +
'</v-adv-data-table>\n'

const sandboxCode = 'export default ({\n' +
'  data: () => ({\n' +
'    items: desserts, // see items\n' +
'    dataGridHeaders: dataGridHeaders, // see headers\n' +
'    multiple: false,\n' +
'    dense: false,\n' +
'    dark: false,\n' +
'    customSlots: false,\n' +
'  }),\n' +
'  methods: {\n' +
'    getColor (calories) {\n' +
'      if (calories > 400) return "red"\n' +
'      else if (calories > 200) return "orange"\n' +
'      else return "green"\n' +
'    },\n' +
'    getColorFat (fat: any) {\n' +
'      if (fat > 20) return "red"\n' +
'      else if (fat > 10) return "orange"\n' +
'      else return "green"\n' +
'    }\n' +
'  }\n' +
'})'

const VTreeViewExtended = VTreeview.extend({
  name: 'v-tree-extended',
  mixins: [
    ComandToolbar
  ]
  // render (): VNode {
  //   return this.$createElement(VTreeview, {
  //     props: this.$options.props
  //   }, [
  //     (this as any).genToolbar()
  //   ])
  // }
})

Vue.component('v-tree-extended', VTreeViewExtended)
// Vue.use(VTreeViewExtended)

export default Vue.extend({
  data: () => ({
    items: staticitems,
    toolbarCommandsTreeView: defaultTreeSelectCommands(),
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
